import DashboardPage from "@/app/dashboard/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | TalkSensei - AI इंग्लिश कन्वर्सेशन प्रैक्टिस",
  description: "TalkSensei डैशबोर्ड: अपनी प्रगति ट्रैक करें और AI इंग्लिश कन्वर्सेशन प्रैक्टिस के लिए अनुशंसित योजना देखें।",
  alternates: {
    canonical: "https://speakpro-india.vercel.app/hi/dashboard",
    languages: {
      "en": "https://speakpro-india.vercel.app/dashboard",
      "hi": "https://speakpro-india.vercel.app/hi/dashboard",
      "ta": "https://speakpro-india.vercel.app/ta/dashboard",
      "te": "https://speakpro-india.vercel.app/te/dashboard",
    },
  },
};

export default DashboardPage; 