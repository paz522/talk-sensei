import HomeClient from "@/components/HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TalkSensei - AI ఇంగ్లీష్ సంభాషణ అభ్యాసం | భారతదేశం",
  description: "AI ఆధారిత ఇంగ్లీష్ సంభాషణ అభ్యాస యాప్. ఉచ్చారణ, ప్రవాహం, పదసంపదను మెరుగుపరచండి. ఇంటర్వ్యూలు, ప్రయాణం, వ్యాపారం మొదలైన వాటికి అభ్యాసం చేయండి.",
  alternates: {
    canonical: "https://speakpro-india.vercel.app/te",
    languages: {
      "en": "https://speakpro-india.vercel.app/",
      "hi": "https://speakpro-india.vercel.app/hi",
      "ta": "https://speakpro-india.vercel.app/ta",
      "te": "https://speakpro-india.vercel.app/te",
    },
  },
};

export default function TeluguHome() {
  return <HomeClient />;
} 