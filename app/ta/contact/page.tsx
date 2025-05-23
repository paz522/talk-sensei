import ContactPage from "@/app/contact/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | TalkSensei - AI ஆங்கில உரையாடல் பயிற்சி",
  description: "TalkSensei தொடர்புக்கு. AI ஆங்கில உரையாடல் பயிற்சி செயலிக்கான உதவி மற்றும் தகவலைப் பெறுங்கள்.",
  alternates: {
    canonical: "https://speakpro-india.vercel.app/ta/contact",
    languages: {
      "en": "https://speakpro-india.vercel.app/contact",
      "hi": "https://speakpro-india.vercel.app/hi/contact",
      "ta": "https://speakpro-india.vercel.app/ta/contact",
      "te": "https://speakpro-india.vercel.app/te/contact",
    },
  },
};

export default ContactPage; 