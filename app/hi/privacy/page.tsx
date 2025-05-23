import PrivacyPage from "@/app/privacy/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | TalkSensei - AI इंग्लिश कन्वर्सेशन प्रैक्टिस",
  description: "TalkSensei के लिए गोपनीयता नीति। AI इंग्लिश कन्वर्सेशन प्रैक्टिस ऐप में आपकी जानकारी की सुरक्षा कैसे की जाती है।",
  alternates: {
    canonical: "https://speakpro-india.vercel.app/hi/privacy",
    languages: {
      "en": "https://speakpro-india.vercel.app/privacy",
      "hi": "https://speakpro-india.vercel.app/hi/privacy",
      "ta": "https://speakpro-india.vercel.app/ta/privacy",
      "te": "https://speakpro-india.vercel.app/te/privacy",
    },
  },
};

export default PrivacyPage; 