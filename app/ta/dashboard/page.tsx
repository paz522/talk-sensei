import DashboardPage from "@/app/dashboard/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | TalkSensei - AI ஆங்கில உரையாடல் பயிற்சி",
  description: "TalkSensei டாஷ்போர்டு: உங்கள் முன்னேற்றத்தை கண்காணிக்கவும் மற்றும் AI ஆங்கில உரையாடல் பயிற்சிக்கான பரிந்துரைக்கப்பட்ட திட்டத்தைப் பார்க்கவும்.",
  alternates: {
    canonical: "https://speakpro-india.vercel.app/ta/dashboard",
    languages: {
      "en": "https://speakpro-india.vercel.app/dashboard",
      "hi": "https://speakpro-india.vercel.app/hi/dashboard",
      "ta": "https://speakpro-india.vercel.app/ta/dashboard",
      "te": "https://speakpro-india.vercel.app/te/dashboard",
    },
  },
};

export default DashboardPage; 