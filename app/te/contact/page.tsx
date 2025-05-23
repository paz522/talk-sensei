import ContactPage from "@/app/contact/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | TalkSensei - AI ఇంగ్లీష్ సంభాషణ అభ్యాసం",
  description: "TalkSensei సంప్రదించండి. AI ఇంగ్లీష్ సంభాషణ అభ్యాస యాప్ కోసం సహాయం మరియు సమాచారం పొందండి.",
  alternates: {
    canonical: "https://speakpro-india.vercel.app/te/contact",
    languages: {
      "en": "https://speakpro-india.vercel.app/contact",
      "hi": "https://speakpro-india.vercel.app/hi/contact",
      "ta": "https://speakpro-india.vercel.app/ta/contact",
      "te": "https://speakpro-india.vercel.app/te/contact",
    },
  },
};

export default ContactPage; 