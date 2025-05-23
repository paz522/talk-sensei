import TermsPage from "@/app/terms/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms | TalkSensei - AI ఇంగ్లీష్ సంభాషణ అభ్యాసం",
  description: "TalkSensei వినియోగ నిబంధనలు. AI ఇంగ్లీష్ సంభాషణ అభ్యాస యాప్ నిబంధనలు మరియు షరతులు.",
  alternates: {
    canonical: "https://speakpro-india.vercel.app/te/terms",
    languages: {
      "en": "https://speakpro-india.vercel.app/terms",
      "hi": "https://speakpro-india.vercel.app/hi/terms",
      "ta": "https://speakpro-india.vercel.app/ta/terms",
      "te": "https://speakpro-india.vercel.app/te/terms",
    },
  },
};

export default TermsPage; 