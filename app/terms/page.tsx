"use client"
import { useTranslation } from "@/hooks/useTranslation"

export default function TermsPage() {
  const t = useTranslation()
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold mb-6">{t('terms_title')}</h1>
      <div className="prose max-w-2xl">
        <p>{t('terms_intro')}</p>
        <h2>{t('terms_section1_title')}</h2>
        <ul>
          <li>{t('terms_section1_age')}</li>
          <li>{t('terms_section1_personal')}</li>
        </ul>
        <h2>{t('terms_section2_title')}</h2>
        <ul>
          <li>{t('terms_section2_illegal')}</li>
          <li>{t('terms_section2_hack')}</li>
          <li>{t('terms_section2_inappropriate')}</li>
        </ul>
        <h2>{t('terms_section3_title')}</h2>
        <p>{t('terms_section3_body')}</p>
        <h2>{t('terms_section4_title')}</h2>
        <p>{t('terms_section4_body')}</p>
        <h2>{t('terms_section5_title')}</h2>
        <p>{t('terms_section5_body')}</p>
        <h2>{t('terms_section6_title')}</h2>
        <p>{t('terms_section6_body')}</p>
        <h2>{t('terms_section7_title')}</h2>
        <p>{t('terms_section7_body')}</p>
        <h2>{t('terms_section8_title')}</h2>
        <p>{t('terms_section8_body')}</p>
      </div>
    </main>
  )
} 