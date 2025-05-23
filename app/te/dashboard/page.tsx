import DashboardPage from "@/app/dashboard/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | TalkSensei - AI ఇంగ్లీష్ సంభాషణ అభ్యాసం",
  description: "TalkSensei డాష్‌బోర్డ్: మీ పురోగతిని ట్రాక్ చేయండి మరియు AI ఇంగ్లీష్ సంభాషణ అభ్యాసానికి సిఫార్సు చేసిన ప్రణాళికను చూడండి.",
  alternates: {
    canonical: "https://speakpro-india.vercel.app/te/dashboard",
    languages: {
      "en": "https://speakpro-india.vercel.app/dashboard",
      "hi": "https://speakpro-india.vercel.app/hi/dashboard",
      "ta": "https://speakpro-india.vercel.app/ta/dashboard",
      "te": "https://speakpro-india.vercel.app/te/dashboard",
    },
  },
};

export default DashboardPage; 