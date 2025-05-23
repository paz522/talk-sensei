import PrivacyPage from "@/app/privacy/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | TalkSensei - AI ஆங்கில உரையாடல் பயிற்சி",
  description: "TalkSensei தனியுரிமைக் கொள்கை. AI ஆங்கில உரையாடல் பயிற்சி செயலியில் உங்கள் தகவல் எப்படி பாதுகாக்கப்படுகிறது.",
  alternates: {
    canonical: "https://speakpro-india.vercel.app/ta/privacy",
    languages: {
      "en": "https://speakpro-india.vercel.app/privacy",
      "hi": "https://speakpro-india.vercel.app/hi/privacy",
      "ta": "https://speakpro-india.vercel.app/ta/privacy",
      "te": "https://speakpro-india.vercel.app/te/privacy",
    },
  },
};

export default PrivacyPage; 