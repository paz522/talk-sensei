import PrivacyPage from "@/app/privacy/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | TalkSensei - AI ఇంగ్లీష్ సంభాషణ అభ్యాసం",
  description: "TalkSensei గోప్యతా విధానం. AI ఇంగ్లీష్ సంభాషణ అభ్యాస యాప్‌లో మీ సమాచారం ఎలా రక్షించబడుతుంది.",
  alternates: {
    canonical: "https://speakpro-india.vercel.app/te/privacy",
    languages: {
      "en": "https://speakpro-india.vercel.app/privacy",
      "hi": "https://speakpro-india.vercel.app/hi/privacy",
      "ta": "https://speakpro-india.vercel.app/ta/privacy",
      "te": "https://speakpro-india.vercel.app/te/privacy",
    },
  },
};

export default PrivacyPage; 