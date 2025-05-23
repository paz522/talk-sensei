import HomeClient from "@/components/HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TalkSensei - AI इंग्लिश कन्वर्सेशन प्रैक्टिस | भारत के लिए",
  description: "AI द्वारा संचालित इंग्लिश कन्वर्सेशन प्रैक्टिस ऐप। उच्चारण, प्रवाह, शब्दावली सुधारें। इंटरव्यू, यात्रा, व्यापार आदि के लिए अभ्यास करें।",
  alternates: {
    canonical: "https://speakpro-india.vercel.app/hi",
    languages: {
      "en": "https://speakpro-india.vercel.app/",
      "hi": "https://speakpro-india.vercel.app/hi",
      "ta": "https://speakpro-india.vercel.app/ta",
      "te": "https://speakpro-india.vercel.app/te",
    },
  },
};

export default function HindiHome() {
  return <HomeClient />;
} 