"use client"

import { useState, useEffect, useContext } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, X, Globe } from "lucide-react"
import { usePathname } from "next/navigation"
import { useTranslation } from "@/hooks/useTranslation"
import { LangContext } from "@/contexts/LangContext"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { lang, setLang } = useContext(LangContext)
  const t = useTranslation()

  const handleLangChange = (newLang: string) => {
    setLang(newLang)
    if (typeof window !== 'undefined') {
      localStorage.setItem("lang", newLang)
    }
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">TalkSensei</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/practice"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/practice") ? "text-primary" : "text-foreground"}`}
          >
            {t('practice')}
          </Link>
          <Link
            href="/dashboard"
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/dashboard") ? "text-primary" : "text-foreground"}`}
          >
            {t('my_page')}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleLangChange("hi")}>हिन्दी (Hindi)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLangChange("ja")}>日本語 (Japanese)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLangChange("en")}>English</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden container py-4 border-t">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/practice"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/practice") ? "text-primary" : "text-foreground"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('practice')}
            </Link>
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/dashboard") ? "text-primary" : "text-foreground"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('my_page')}
            </Link>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <span className="text-sm font-medium">
                {lang === "en" && "English"}
                {lang === "hi" && "हिन्दी"}
                {lang === "ja" && "日本語"}
              </span>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
