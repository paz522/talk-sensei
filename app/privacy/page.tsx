"use client"
import { useTranslation } from "@/hooks/useTranslation"

export default function PrivacyPage() {
  const t = useTranslation()
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold mb-6">{t('privacy_title')}</h1>
      <div className="prose max-w-2xl">
        <p>{t('privacy_intro')}</p>
        <h2>{t('privacy_section1_title')}</h2>
        <ul>
          <li>{t('privacy_section1_account')}</li>
          <li>{t('privacy_section1_usage')}</li>
          <li>{t('privacy_section1_device')}</li>
        </ul>
        <h2>{t('privacy_section2_title')}</h2>
        <ul>
          <li>{t('privacy_section2_provide')}</li>
          <li>{t('privacy_section2_personalize')}</li>
          <li>{t('privacy_section2_communicate')}</li>
        </ul>
        <h2>{t('privacy_section3_title')}</h2>
        <p>{t('privacy_section3_body')}</p>
        <h2>{t('privacy_section4_title')}</h2>
        <p>{t('privacy_section4_body')}</p>
        <h2>{t('privacy_section5_title')}</h2>
        <p>{t('privacy_section5_body')}</p>
        <h2>{t('privacy_section6_title')}</h2>
        <ul>
          <li>{t('privacy_section6_access')}</li>
          <li>{t('privacy_section6_erase')}</li>
        </ul>
        <h2>{t('privacy_section7_title')}</h2>
        <p>{t('privacy_section7_body')}</p>
        <h2>{t('privacy_section8_title')}</h2>
        <p>{t('privacy_section8_body')}</p>
      </div>
    </main>
  )
} 