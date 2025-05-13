"use client"
import { useTranslation } from "@/hooks/useTranslation"

export default function FAQPage() {
  const t = useTranslation()
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold mb-6">{t('faq_title')}</h1>
      <div className="prose max-w-2xl">
        <h2>{t('faq_heading')}</h2>
        <ul>
          <li>
            <strong>{t('faq_q1')}</strong>
            <br />{t('faq_a1')}
          </li>
          <li className="mt-4">
            <strong>{t('faq_q2')}</strong>
            <br />{t('faq_a2')}
          </li>
          <li className="mt-4">
            <strong>{t('faq_q3')}</strong>
            <br />{t('faq_a3')}
          </li>
          <li className="mt-4">
            <strong>{t('faq_q4')}</strong>
            <br />{t('faq_a4')}
          </li>
          <li className="mt-4">
            <strong>{t('faq_q5')}</strong>
            <br />{t('faq_a5')}
          </li>
          <li className="mt-4">
            <strong>{t('faq_q6')}</strong>
            <br />{t('faq_a6')}
          </li>
        </ul>
      </div>
    </main>
  )
} 