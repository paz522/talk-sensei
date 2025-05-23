export const runtime = 'edge';

import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  // APIキーの一部をログ出力（セキュリティ配慮）
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (apiKey) {
    console.log("OPENROUTER_API_KEY:", apiKey.slice(0, 6) + "..." + apiKey.slice(-4));
  } else {
    console.log("OPENROUTER_API_KEY is undefined or empty");
  }

  const { messages, mode, scenario: scenarioParam, lang } = await req.json()

  let systemPrompt = ""
  if (mode === "translate") {
    // 言語ごとにsystemPromptを切り替え
    if (lang === "hi") {
      systemPrompt = "You are a translator specializing in English-to-Hindi translation. Your task is to determine if the input is English text, and provide a natural Hindi translation (अनुवाद).\n\nFirst, analyze if the input is intended to be English (even if it has grammatical errors or contains some non-English text). If the input appears to be English or meant to be English with errors, correct any minor errors, then translate it to Hindi.\n\nRespond in the following format:\n[Corrected English text]\n[Hindi translation (अनुवाद)]\n\nMake sure the translation starts on a new line after the English sentence.";
    } else if (lang === "ta") {
      systemPrompt = "You are a translator specializing in English-to-Tamil translation. Your task is to determine if the input is English text, and provide a natural Tamil translation (மொழிபெயர்ப்பு).\n\nFirst, analyze if the input is intended to be English (even if it has grammatical errors or contains some non-English text). If the input appears to be English or meant to be English with errors, correct any minor errors, then translate it to Tamil.\n\nRespond in the following format:\n[Corrected English text]\n[Tamil translation (மொழிபெயர்ப்பு)]\n\nMake sure the translation starts on a new line after the English sentence.";
    } else if (lang === "te") {
      systemPrompt = "You are a translator specializing in English-to-Telugu translation. Your task is to determine if the input is English text, and provide a natural Telugu translation (అనువాదం).\n\nFirst, analyze if the input is intended to be English (even if it has grammatical errors or contains some non-English text). If the input appears to be English or meant to be English with errors, correct any minor errors, then translate it to Telugu.\n\nRespond in the following format:\n[Corrected English text]\n[Telugu translation (అనువాదం)]\n\nMake sure the translation starts on a new line after the English sentence.";
    } else {
      // デフォルトは日本語
      systemPrompt = "You are a translator specializing in English-to-Japanese translation. Your task is to determine if the input is English text, and provide a natural Japanese translation (訳).\n\nFirst, analyze if the input is intended to be English (even if it has grammatical errors or contains some non-English text). If the input appears to be English or meant to be English with errors, correct any minor errors, then translate it to Japanese.\n\nRespond in the following format:\n[Corrected English text]\n[Japanese translation (訳)]\n\nMake sure the translation starts on a new line after the English sentence.";
    }
  } else if (mode === "suggest_phrase") {
    let scenario = scenarioParam || "free";
    if (scenario === "interview") {
      systemPrompt = `You are an English job interview assistant. Carefully read the following conversation history. Based on the most recent AI message, suggest AT LEAST 3 (preferably 4 or 5) simple and natural English phrases that a job applicant (the USER) could actually say next in this context, along with their natural Japanese translations. Focus on phrases that a real job applicant would use in an interview, such as self-introduction, answering questions about experience, asking about the company, expressing motivation, or politely responding. Avoid generic or AI-like phrases. Only return the phrases in a numbered list format, like this:\n1. [English phrase] - [Japanese translation]\n2. ...\n3. ...\n4. ...\n5. ...\n\nConversation history:\n` + (messages as Array<{role: string, content: string}>).map(m => `${m.role === "assistant" ? "AI" : "User"}: ${m.content}`).join("\n");
    } else if (scenario === "toefl") {
      systemPrompt = `You are a TOEFL speaking practice assistant. Carefully read the following conversation history. Based on the most recent AI message, suggest AT LEAST 3 (preferably 4 or 5) simple and natural English phrases that a TOEFL test-taker (the USER) could actually say next in this context, along with their natural Japanese translations. Focus on phrases that a real test-taker would use in TOEFL speaking tasks, such as expressing opinions, giving reasons, describing experiences, or supporting arguments. Avoid generic or AI-like phrases. Only return the phrases in a numbered list format, like this:\n1. [English phrase] - [Japanese translation]\n2. ...\n3. ...\n4. ...\n5. ...\n\nConversation history:\n` + (messages as Array<{role: string, content: string}>).map(m => `${m.role === "assistant" ? "AI" : "User"}: ${m.content}`).join("\n");
    } else if (scenario === "toeic") {
      systemPrompt = `You are a TOEIC speaking practice assistant. Carefully read the following conversation history. Based on the most recent AI message, suggest AT LEAST 3 (preferably 4 or 5) simple and natural English phrases that a TOEIC test-taker (the USER) could actually say next in this context, along with their natural Japanese translations. Focus on phrases that a real test-taker would use in TOEIC speaking, such as describing pictures, responding to business situations, or making suggestions. Avoid generic or AI-like phrases. Only return the phrases in a numbered list format, like this:\n1. [English phrase] - [Japanese translation]\n2. ...\n3. ...\n4. ...\n5. ...\n\nConversation history:\n` + (messages as Array<{role: string, content: string}>).map(m => `${m.role === "assistant" ? "AI" : "User"}: ${m.content}`).join("\n");
    } else {
      systemPrompt = `You are an English conversation assistant. Carefully read the following conversation history. Based on the most recent AI message, suggest AT LEAST 3 (preferably 4 or 5) simple and natural English phrases that the user could actually say next in this context, along with their natural Japanese translations. Do NOT include generic or unrelated phrases. Only return the phrases in a numbered list format, like this:\n1. [English phrase] - [Japanese translation]\n2. ...\n3. ...\n4. ...\n5. ...\n\nConversation history:\n` + (messages as Array<{role: string, content: string}>).map(m => `${m.role === "assistant" ? "AI" : "User"}: ${m.content}`).join("\n");
    }
  } else {
    systemPrompt = `You are an English conversation partner. You will help the user practice English speaking.\nMode: ${mode}\n- If mode is 'free', have a casual conversation\n- If mode is 'interview', act as an interviewer\n- If mode is 'toefl', help with TOEFL speaking practice\n- If mode is 'toeic', help with TOEIC speaking practice\nAlways respond in English. After your English response, add a line break, then add a Japanese translation (訳) of your answer. The translation must always start on a new line. Keep responses concise and natural.`
  }

  const openrouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`!,
      "HTTP-Referer": "https://talksensei.vercel.app",
      "X-Title": "TalkSensei",
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      max_tokens: 1300,
    }),
  })

  if (!openrouterRes.ok) {
    return NextResponse.json({ message: "OpenRouter API error" }, { status: 500 })
  }

  const data = await openrouterRes.json()
  if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
    console.error("OpenRouter API unexpected response:", JSON.stringify(data));
    return NextResponse.json({ message: "OpenRouter API unexpected response", detail: data }, { status: 500 });
  }
  return NextResponse.json({ message: data.choices[0].message.content })
} 