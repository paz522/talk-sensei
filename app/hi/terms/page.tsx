import TermsPage from "@/app/terms/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms | TalkSensei - AI इंग्लिश कन्वर्सेशन प्रैक्टिस",
  description: "TalkSensei के लिए उपयोग की शर्तें। AI इंग्लिश कन्वर्सेशन प्रैक्टिस ऐप के नियम और शर्तें।",
  alternates: {
    canonical: "https://speakpro-india.vercel.app/hi/terms",
    languages: {
      "en": "https://speakpro-india.vercel.app/terms",
      "hi": "https://speakpro-india.vercel.app/hi/terms",
      "ta": "https://speakpro-india.vercel.app/ta/terms",
      "te": "https://speakpro-india.vercel.app/te/terms",
    },
  },
};

export default TermsPage; 