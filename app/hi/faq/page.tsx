import FAQPage from "@/app/faq/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | TalkSensei - AI इंग्लिश कन्वर्सेशन प्रैक्टिस",
  description: "TalkSensei के लिए अक्सर पूछे जाने वाले प्रश्न। AI इंग्लिश कन्वर्सेशन प्रैक्टिस ऐप के बारे में जानकारी प्राप्त करें।",
  alternates: {
    canonical: "https://speakpro-india.vercel.app/hi/faq",
    languages: {
      "en": "https://speakpro-india.vercel.app/faq",
      "hi": "https://speakpro-india.vercel.app/hi/faq",
      "ta": "https://speakpro-india.vercel.app/ta/faq",
      "te": "https://speakpro-india.vercel.app/te/faq",
    },
  },
};

export default FAQPage; 