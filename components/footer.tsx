'use client'

import Link from "next/link"
import { Facebook, Instagram, Youtube, X as XIcon, Linkedin } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { usePathname } from "next/navigation"
import { useTranslation } from "@/hooks/useTranslation"

export default function Footer() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const shareUrl = typeof window !== 'undefined' ? window.location.origin + pathname : 'https://speakpro-india.vercel.app/';
  const tweetText = encodeURIComponent('AI-powered English conversation practice app: ' + shareUrl);
  const xShareUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

  // FacebookシェアURL
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  // Instagramは公式シェアintentがないため、プロフィールページに飛ばす（またはダイアログ案内）
  // YouTubeもシェアintentがないため、公式チャンネルページに飛ばす（またはダイアログ案内）

  // LinkedInシェアURL
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  // LINEシェアURL
  const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`;

  const t = useTranslation()

  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container grid gap-6 md:grid-cols-[1fr_1fr_auto]">
        <div className="space-y-3">
          <h3 className="text-lg font-bold">TalkSensei</h3>
          <p className="text-sm text-muted-foreground">
            AI-powered English conversation practice app to boost your speaking skills fast.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold">Legal</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3 flex flex-col items-start md:items-center">
          <h3 className="text-lg font-bold">Connect</h3>
          <div className="flex space-x-4">
            {/* Facebookシェアボタン */}
            <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Share on Facebook</span>
            </a>
            {/* X（旧Twitter）シェアボタン */}
            <a href={xShareUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <svg viewBox="0 0 120 120" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M93.5 18.5H110L74.5 58.5L116 110H83.5L59.5 80.5L32.5 110H16L54 67.5L14 18.5H47L68.5 45.5L93.5 18.5ZM87.5 102H97.5L41.5 27.5H31.5L87.5 102Z" />
              </svg>
              <span className="sr-only">Share on X (Twitter)</span>
            </a>
            {/* LinkedInシェアボタン */}
            <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">Share on LinkedIn</span>
            </a>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            © {new Date().getFullYear()} TalkSensei. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
