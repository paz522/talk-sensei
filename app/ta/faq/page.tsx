import FAQPage from "@/app/faq/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | TalkSensei - AI ஆங்கில உரையாடல் பயிற்சி",
  description: "TalkSensei பற்றிய அடிக்கடி கேட்கப்படும் கேள்விகள். AI ஆங்கில உரையாடல் பயிற்சி செயலி பற்றிய தகவல்.",
  alternates: {
    canonical: "https://speakpro-india.vercel.app/ta/faq",
    languages: {
      "en": "https://speakpro-india.vercel.app/faq",
      "hi": "https://speakpro-india.vercel.app/hi/faq",
      "ta": "https://speakpro-india.vercel.app/ta/faq",
      "te": "https://speakpro-india.vercel.app/te/faq",
    },
  },
};

export default FAQPage; 