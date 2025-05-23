import HomeClient from "@/components/HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TalkSensei - AI ஆங்கில உரையாடல் பயிற்சி | இந்தியா",
  description: "AI மூலம் இயக்கப்படும் ஆங்கில உரையாடல் பயிற்சி செயலி. உச்சரிப்பு,流畅ம், சொற்கள் மேம்படுத்துங்கள். நேர்காணல், பயணம், வணிகம் மற்றும் பலவற்றிற்கான பயிற்சி.",
  alternates: {
    canonical: "https://speakpro-india.vercel.app/ta",
    languages: {
      "en": "https://speakpro-india.vercel.app/",
      "hi": "https://speakpro-india.vercel.app/hi",
      "ta": "https://speakpro-india.vercel.app/ta",
      "te": "https://speakpro-india.vercel.app/te",
    },
  },
};

export default function TamilHome() {
  return <HomeClient />;
} 