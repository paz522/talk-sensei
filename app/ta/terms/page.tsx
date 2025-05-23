import TermsPage from "@/app/terms/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms | TalkSensei - AI ஆங்கில உரையாடல் பயிற்சி",
  description: "TalkSensei பயன்பாட்டு விதிகள். AI ஆங்கில உரையாடல் பயிற்சி செயலிக்கான விதிகள் மற்றும் நிபந்தனைகள்.",
  alternates: {
    canonical: "https://speakpro-india.vercel.app/ta/terms",
    languages: {
      "en": "https://speakpro-india.vercel.app/terms",
      "hi": "https://speakpro-india.vercel.app/hi/terms",
      "ta": "https://speakpro-india.vercel.app/ta/terms",
      "te": "https://speakpro-india.vercel.app/te/terms",
    },
  },
};

export default TermsPage; 