"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, MicOff, Send, RefreshCw, Volume2, Lightbulb } from "lucide-react"
import { getAIResponse, type ConversationMode, translateWithLang, suggestNextPhrases } from "@/lib/ai-service"
import { useTranslation } from "@/hooks/useTranslation"
import en from "@/lib/locales/en.json"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { LangContext } from "@/contexts/LangContext"
import { useIsMobile } from "@/hooks/use-mobile"

type Message = {
  role: "user" | "assistant"
  content: string
}

// localStorage進捗データ更新用
function updateProgress({ minutes, score }: { minutes: number; score: number }) {
  if (typeof window === "undefined") return;
  const STORAGE_KEY = "progressData";
  const raw = localStorage.getItem(STORAGE_KEY);
  let data = {
    weekly: [
      { day: "Mon", minutes: 0, score: 0 },
      { day: "Tue", minutes: 0, score: 0 },
      { day: "Wed", minutes: 0, score: 0 },
      { day: "Thu", minutes: 0, score: 0 },
      { day: "Fri", minutes: 0, score: 0 },
      { day: "Sat", minutes: 0, score: 0 },
      { day: "Sun", minutes: 0, score: 0 },
    ],
    skills: [
      { skill: "Pronunciation", score: 0 },
      { skill: "Fluency", score: 0 },
      { skill: "Vocabulary", score: 0 },
      { skill: "Grammar", score: 0 },
    ],
  };
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {}
  }
  // 今日の曜日に加算
  const now = new Date();
  const dayIdx = now.getDay() === 0 ? 6 : now.getDay() - 1; // 月曜=0, 日曜=6
  data.weekly[dayIdx].minutes += minutes;
  data.weekly[dayIdx].score = Math.max(data.weekly[dayIdx].score, score); // 最高スコアを記録
  // skillsも仮で全て加算
  data.skills.forEach(s => { s.score = Math.max(s.score, score); });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function PracticePage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [scenario, setScenario] = useState("free")
  const [isLoading, setIsLoading] = useState(false)
  const [showTranslation, setShowTranslation] = useState(false)
  const [suggestedPhrases, setSuggestedPhrases] = useState("")
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [currentSpeech, setCurrentSpeech] = useState("")

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const suggestTimerRef = useRef<NodeJS.Timeout | null>(null)

  const t = useTranslation()
  const { lang } = React.useContext(LangContext)
  const isMobile = useIsMobile();

  // 初期AIメッセージに訳を付与し、音声も1回だけ即座に再生
  useEffect(() => {
    let isMounted = true;
    (async () => {
      // 英語＋訳で初期メッセージをセット
      const aiMsg = en.ai_greeting;
      const aiMsgWithTranslation = await translateWithLang(aiMsg, lang);
      if (isMounted) {
        setMessages([{ role: "assistant", content: aiMsgWithTranslation }]);
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utter = new window.SpeechSynthesisUtterance(aiMsg);
          utter.lang = "en-US";
          window.speechSynthesis.speak(utter);
        }
      }
    })();
    return () => { isMounted = false; };
  }, [t, lang]);

  // Scroll to bottom of messages
  useEffect(() => {
    // 少し余白を持たせて下にスクロール
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    // window.scrollBy(0, -40); // 必要なら微調整
  }, [messages])

  // ページマウント時にスクロール位置を最上部に
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // ユーザーがAI返答後5秒間入力しなければフレーズ提案
  useEffect(() => {
    if (messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.role !== "assistant") return;
    if (isLoading) return;
    setSuggestedPhrases("");
    if (suggestTimerRef.current) clearTimeout(suggestTimerRef.current);
    suggestTimerRef.current = setTimeout(async () => {
      if (input.trim() === "") {
        const phrases = await suggestNextPhrases(messages, scenario, lang);
        setSuggestedPhrases(phrases);
      }
    }, 5000);
    return () => {
      if (suggestTimerRef.current) clearTimeout(suggestTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, scenario, isLoading, lang]);

  // ユーザーが入力を始めたら提案フレーズを非表示
  useEffect(() => {
    if (input.trim() !== "") {
      setSuggestedPhrases("");
      if (suggestTimerRef.current) clearTimeout(suggestTimerRef.current);
    }
  }, [input]);

  // Mock function to simulate AI response
  const handleSendMessage = async (overrideInput?: string, isFromVoiceRecognition: boolean = false) => {
    const messageToSend = overrideInput !== undefined ? overrideInput : input.trim()
    if (!messageToSend) return
    setInput("")
    setIsLoading(true)

    try {
      // 音声認識からの場合は既にメッセージが追加されているため、重複しない
      if (!isFromVoiceRecognition) {
        // ユーザー発話（英語＋訳）を追加
        const userWithTranslation = await translateWithLang(messageToSend, lang)
        setMessages((prev) => [...prev, { role: "user", content: userWithTranslation }])
      }

      const response = await getAIResponse(messageToSend, scenario as ConversationMode, messages, lang)
      setMessages((prev) => [...prev, { role: "assistant", content: response.message }])
      // 進捗データを仮で更新（例: 5分・スコア3~5のランダム）
      updateProgress({ minutes: 5, score: Math.floor(Math.random() * 3) + 3 });
      // AI返答を自動で読み上げ
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        // 英語部分のみを抽出して読み上げ
        const lines = response.message.split(/\n+/);
        const englishText = lines[0] || "";
        
        const utter = new window.SpeechSynthesisUtterance(englishText);
        utter.lang = "en-US";
        
        // 音声読み上げ状態を更新
        setIsSpeaking(true);
        setCurrentSpeech(englishText);
        
        // 読み上げ開始時のログ
        console.log("AI音声読み上げ開始:", englishText);
        
        // 読み上げ完了イベントを監視
        utter.onend = () => {
          console.log("AI音声読み上げ完了");
          setIsSpeaking(false);
          setCurrentSpeech("");
        };
        
        // エラーイベントを監視
        utter.onerror = (e) => {
          console.error("AI音声読み上げエラー:", e);
          setIsSpeaking(false);
          setCurrentSpeech("");
        };
        
        window.speechSynthesis.speak(utter);
      }
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I apologize, but I'm having trouble connecting right now. Please try again later." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // 音声認識の初期化と権限チェック
  const initializeSpeechRecognition = async () => {
    try {
      // マイクの権限確認
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        throw new Error('BROWSER_NOT_SUPPORTED');
      }
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      return recognition;
    } catch (error: any) {
      if (error.name === 'NotAllowedError' || error.message === 'Permission denied') {
        throw new Error('MIC_PERMISSION_DENIED');
      }
      throw error;
    }
  };

  // 詳細なエラーメッセージ
  const handleRecognitionError = (error: any) => {
    let errorMessage = "音声認識に失敗しました。";
    switch(error.message) {
      case 'BROWSER_NOT_SUPPORTED':
        errorMessage = "お使いのブラウザは音声認識に対応していません。ChromeやEdgeなどの最新のブラウザをお試しください。";
        break;
      case 'MIC_PERMISSION_DENIED':
        errorMessage = "マイクへのアクセスが許可されていません。ブラウザの設定でマイクの使用を許可してください。";
        break;
      case 'NETWORK_ERROR':
        errorMessage = "ネットワークエラーが発生しました。インターネット接続を確認してください。";
        break;
    }
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: errorMessage },
    ]);
  };

  // 音声認識の開始・停止（Web Speech API）
  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const recognition = await initializeSpeechRecognition();
        recognitionRef.current = recognition;
        recognition.onresult = async (event: any) => {
          let transcript = "";
          for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript + " ";
          }
          transcript = transcript.trim();
          if (transcript) {
            transcript = transcript.charAt(0).toUpperCase() + transcript.slice(1);
            if (!transcript.endsWith('.') && !transcript.endsWith('?') && !transcript.endsWith('!')) {
              transcript += '.';
            }
            setInput(transcript);
            try {
              const userWithTranslation = await translateWithLang(transcript, lang);
              setMessages((prev) => [...prev, { role: "user", content: userWithTranslation }]);
              handleSendMessage(transcript, true);
            } catch (error) {
              setMessages((prev) => [...prev, { role: "user", content: transcript }]);
              handleSendMessage(transcript, true);
            }
          } else {
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: "Could you say that again?\nもう一度言っていただけますか？" }
            ]);
          }
          setIsRecording(false);
        };
        recognition.onerror = (event: any) => {
          handleRecognitionError(event.error ? { message: event.error } : event);
          setIsRecording(false);
        };
        recognition.onend = () => {
          setIsRecording(false);
        };
        recognition.start();
        setIsRecording(true);
      } catch (error: any) {
        handleRecognitionError(error);
        setIsRecording(false);
      }
    } else {
      recognitionRef.current?.stop();
      setIsRecording(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // フレーズ集の多言語データ
  const phraseSet = t('phrase_set') || {};

  return (
    <div className="flex flex-row w-full min-h-screen h-screen">
      {/* 使い方ガイド（左端） */}
      <div className="w-[260px] flex-shrink-0 flex flex-col justify-start items-start p-4">
        <div className="border border-blue-300 bg-blue-50 rounded-lg p-4 shadow-sm w-full">
          <div className="font-bold text-blue-700 mb-2 flex items-center gap-2">
            <span role='img' aria-label='info'>ℹ️</span> {t('how_to_use_title')}
          </div>
          <div className="text-sm whitespace-pre-line text-blue-900">{t('how_to_use_body')}</div>
        </div>
      </div>
      {/* メインチャットエリア（中央） */}
      <div className="flex-1 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto border rounded-lg p-4 mb-4 bg-white pb-16" style={{ maxHeight: 'calc(100vh - 260px)' }}>
          {messages.map((message, index) => {
            const english = message.content.split(/\n+/)[0] || "";
            if (message.role === "assistant") {
              if (
                !english ||
                english.startsWith("This input is in Japanese") ||
                english.startsWith("It seems like the input is written in Japanese") ||
                english.startsWith("I'm sorry") ||
                english.startsWith("Sorry") ||
                english.startsWith("Please provide") ||
                english.startsWith("This text is already in Japanese") ||
                english.startsWith("This input appears to be in Japanese")
              ) {
                return null;
              }
              const lines = message.content.split(/\n+/);
              const japanese = lines.length > 1 ? lines.slice(1).join(' ').replace(/^(訳[:：]?|\[.*?\])/, '').trim() : '';
              return (
                <div key={index} className="flex mb-4 justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                    <p className="text-sm font-bold">{english}</p>
                    {showTranslation && japanese && (
                      <p className="text-sm mt-1 !text-white" style={{ color: '#fff' }}>{japanese}</p>
                    )}
                  </div>
                </div>
              );
            } else {
              const lines = message.content.split(/\n+/);
              const userEnglish = lines[0] || "";
              const userJapanese = lines.length > 1 ? lines.slice(1).join(' ').replace(/^(訳[:：]?|\[.*?\])/, '').trim() : '';
              return (
                <div key={index} className="flex mb-4 justify-end">
                  <div className="max-w-[80%] rounded-lg p-3 bg-primary text-primary-foreground">
                    <p className="text-sm font-bold">{userEnglish}</p>
                    {showTranslation && userJapanese && (
                      <p className="text-sm mt-1 text-gray-100">{userJapanese}</p>
                    )}
                  </div>
                </div>
              );
            }
          })}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
          {suggestedPhrases && (
            <div className="mt-4 p-3 border-l-4 border-blue-400 bg-blue-50 rounded">
              <div className="font-bold text-blue-700 mb-1">💡フレーズ例（困ったときのヒント）</div>
              <pre className="text-sm text-blue-900 whitespace-pre-wrap">{suggestedPhrases}</pre>
            </div>
          )}
        </div>
        {/* Input Area */}
        <div className="flex items-center gap-2 justify-center mt-4 flex-col py-6">
          <button
            onClick={toggleRecording}
            className={`${isMobile ? 'w-14 h-14 text-base' : 'w-16 h-16 text-2xl'} flex items-center justify-center rounded-full bg-primary text-white shadow-lg transition-colors duration-150 ${isRecording ? 'opacity-70' : 'hover:bg-primary/90'}`}
            style={{ outline: 'none', border: 'none' }}
            aria-label={isRecording ? 'Stop Recording' : 'Start Recording'}
          >
            {isRecording ? <MicOff className={isMobile ? 'h-8 w-8' : 'h-10 w-10'} /> : <Mic className={isMobile ? 'h-8 w-8' : 'h-10 w-10'} />}
          </button>
          {isRecording && (
            <div className="flex flex-col items-center mt-2">
              <span className="text-primary font-semibold text-lg flex items-center">
                Listening
                <span className="dot-animate ml-1">
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                </span>
              </span>
            </div>
          )}
        </div>
        
        {/* 電球アイコン（チャットエリア外の枠下、左寄せ） */}
        <div className="flex items-center mt-2 mb-4 justify-start">
          <button
            type="button"
            className={`p-1 rounded-full shadow-lg transition-colors duration-150 ${showTranslation ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}
            onClick={() => setShowTranslation((prev) => !prev)}
            title={showTranslation ? t('show_translation') : t('show_translation')}
          >
            <Lightbulb className="w-6 h-6" />
          </button>
          <span className="text-xs text-muted-foreground ml-2">{t('show_translation')}</span>
        </div>
      </div>
      {/* フレーズ集（右端） */}
      <div className="w-[370px] h-full overflow-y-auto overflow-x-hidden flex-shrink-0 pr-0 box-border" style={{ maxHeight: 'calc(100vh - 260px)' }}>
        <div className="rounded-lg p-4 shadow-sm w-[370px] h-full">
          <div className="font-bold text-green-700 mb-2 flex items-center gap-2">
            <span role='img' aria-label='spark'>💬</span> {t('phrase_set_title')}
          </div>
          <Accordion type="multiple" className="w-full">
            {Object.entries(phraseSet).map(([categoryKey, phrases]) => (
              <AccordionItem value={categoryKey} key={categoryKey} className="w-full rounded-lg mb-2">
                <AccordionTrigger className="text-white w-full">{t(`phrase_set_category_${categoryKey}`)}</AccordionTrigger>
                <AccordionContent>
                  <ul className="mb-0 list-disc list-inside text-white p-2 w-full">
                    {Array.isArray(phrases) && phrases.map((item, idx) => (
                      <li key={idx} className="text-white">
                        {item.phrase} {item.translation && <span className="text-white">（{item.translation}）</span>}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
