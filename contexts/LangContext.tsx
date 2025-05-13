'use client'

import { createContext, useState, useEffect } from "react";

export const LangContext = createContext({ lang: "en", setLang: (l: string) => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState("en");

  // クライアントでのみlocalStorageの値を反映
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem("lang");
      if (stored && stored !== lang) {
        setLang(stored);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("lang", lang);
    }
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
} 