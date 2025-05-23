// This is a placeholder for AI service logic
// In a real implementation, you would use OpenRouter API as specified in requirements

export type ConversationMode = "free" | "scenario" | "toefl" | "toeic"

export type FeedbackScore = {
  pronunciation: number
  fluency: number
  vocabulary: number
  grammar: number
  overall: number
}

export type AIResponse = {
  message: string
  feedback?: FeedbackScore
}

// Mock function to simulate AI conversation
export async function getAIResponse(
  message: string,
  mode: ConversationMode,
  previousMessages: { role: "user" | "assistant"; content: string }[],
  lang: string
): Promise<{ message: string }> {
  try {
    const res = await fetch("/api/openrouter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [...previousMessages, { role: "user", content: message }],
        mode,
        lang,
      }),
    })
    if (!res.ok) throw new Error("API error")
    const data = await res.json()
    return { message: data.message }
  } catch (e) {
    return {
      message: "I apologize, but I'm having trouble connecting right now. Please try again later.",
    }
  }
}

// Mock function to simulate speech-to-text
export async function speechToText(audioBlob: Blob): Promise<string> {
  // In a real implementation, this would use a speech recognition API

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return mock transcription
  return "This is a mock transcription of what the user said."
}

// Mock function to get AI-recommended learning plan
export async function getRecommendedLearning(userId: string): Promise<any> {
  // In a real implementation, this would analyze user data and generate recommendations

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock recommendations
  return {
    focusArea: "pronunciation",
    challengingSounds: ["/θ/ (th)", "/ð/ (th)", "/w/ vs /v/"],
    suggestedSessions: [
      {
        title: "Job Interview Preparation",
        duration: "15-20 minutes",
        type: "scenario",
      },
      {
        title: "TOEFL Speaking Task 2",
        duration: "20-25 minutes",
        type: "toefl",
      },
      {
        title: "Business Meeting Vocabulary",
        duration: "10-15 minutes",
        type: "vocabulary",
      },
    ],
  }
}

// ユーザー発言の英語＋多言語訳を取得
export async function translateWithLang(message: string, lang: string): Promise<string> {
  try {
    if (!message || message.trim() === '') {
      console.warn("translateWithLang: 空の入力文字列");
      return message;
    }
    console.log("翻訳リクエスト:", message.substring(0, 50) + (message.length > 50 ? "..." : ""), "lang:", lang);
    const res = await fetch("/api/openrouter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: message }],
        mode: "translate",
        lang,
      }),
    })
    if (!res.ok) {
      console.error("翻訳API エラーステータス:", res.status);
      throw new Error(`API error: ${res.status}`);
    }
    const data = await res.json();
    if (!data.message) {
      console.error("翻訳API 無効なレスポンス:", data);
      throw new Error("Invalid API response");
    }
    return data.message;
  } catch (e) {
    console.error("翻訳エラー:", e);
    return message;
  }
}

// ユーザーが返答に困ったときのためのフレーズ提案API
export async function suggestNextPhrases(
  messages: { role: "user" | "assistant"; content: string }[],
  scenario: string,
  lang: string
): Promise<string> {
  try {
    const res = await fetch("/api/openrouter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages,
        mode: "suggest_phrase",
        scenario,
        lang,
      }),
    })
    if (!res.ok) throw new Error("API error")
    const data = await res.json()
    return data.message
  } catch (e) {
    return "" // エラー時は空文字
  }
}
