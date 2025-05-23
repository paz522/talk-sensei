import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | TalkSensei - AI English Conversation Practice",
  description: "Contact TalkSensei. Get support and information for the AI English Conversation Practice app.",
  alternates: {
    canonical: "https://speakpro-india.vercel.app/contact",
    languages: {
      "en": "https://speakpro-india.vercel.app/contact",
      "hi": "https://speakpro-india.vercel.app/hi/contact",
      "ta": "https://speakpro-india.vercel.app/ta/contact",
      "te": "https://speakpro-india.vercel.app/te/contact",
    },
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-2">For support or inquiries about TalkSensei, please email us at:</p>
      <a href="mailto:support@talksensei.com" className="text-primary underline">
        support@talksensei.com
      </a>
    </div>
  );
}
 