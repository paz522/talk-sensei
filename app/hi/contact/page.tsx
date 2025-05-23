import ContactPage from "@/app/contact/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | TalkSensei - AI इंग्लिश कन्वर्सेशन प्रैक्टिस",
  description: "TalkSensei से संपर्क करें। AI इंग्लिश कन्वर्सेशन प्रैक्टिस ऐप के लिए सहायता और जानकारी प्राप्त करें।",
  alternates: {
    canonical: "https://speakpro-india.vercel.app/hi/contact",
    languages: {
      "en": "https://speakpro-india.vercel.app/contact",
      "hi": "https://speakpro-india.vercel.app/hi/contact",
      "ta": "https://speakpro-india.vercel.app/ta/contact",
      "te": "https://speakpro-india.vercel.app/te/contact",
    },
  },
};

export default ContactPage; 