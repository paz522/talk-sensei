import FAQPage from "@/app/faq/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | TalkSensei - AI ఇంగ్లీష్ సంభాషణ అభ్యాసం",
  description: "TalkSensei గురించి తరచుగా అడిగే ప్రశ్నలు. AI ఇంగ్లీష్ సంభాషణ అభ్యాస యాప్ గురించి సమాచారం.",
  alternates: {
    canonical: "https://speakpro-india.vercel.app/te/faq",
    languages: {
      "en": "https://speakpro-india.vercel.app/faq",
      "hi": "https://speakpro-india.vercel.app/hi/faq",
      "ta": "https://speakpro-india.vercel.app/ta/faq",
      "te": "https://speakpro-india.vercel.app/te/faq",
    },
  },
};

export default FAQPage; 