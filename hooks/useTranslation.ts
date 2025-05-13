import { useContext, useMemo } from "react";
import { LangContext } from "@/contexts/LangContext";
import en from "@/lib/locales/en.json";
import ja from "@/lib/locales/ja.json";
import hi from "@/lib/locales/hi.json";

const resources: Record<string, Record<string, string>> = { en, ja, hi };

export function useTranslation() {
  const { lang } = useContext(LangContext);
  return useMemo(
    () => (key: string) => resources[lang]?.[key] || resources["en"][key] || key,
    [lang]
  );
} 