'use client'
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mic, MessageSquare, BarChart4, Award, Globe, BookOpen } from "lucide-react";

export default function HomeClient() {
  const t = useTranslation();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-6xl font-extrabold text-primary mb-2 drop-shadow-lg tracking-tight" style={{letterSpacing: '-0.04em'}}>TalkSensei</h1>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900">
                {t('boost_english')}
              </h1>
              <p className="max-w-[600px] md:text-xl text-gray-800 font-medium">
                {t('practice_description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold">
                  <Link href="/practice">{t('start_practice')}</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[350px] w-full rounded-xl overflow-hidden shadow-xl flex items-center justify-center">
              <div className="bg-white p-6 rounded-xl shadow-lg w-[80%] max-w-md flex flex-col justify-between h-full">
                {/* チャット部分 */}
                <div className="flex flex-col gap-4 flex-1 justify-end">
                  {/* AIメッセージ（常に英語） */}
                  <div className="flex items-start gap-2">
                    <div className="flex flex-col items-center mr-2">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">AI</div>
                      <span className="text-xs text-primary mt-1 font-bold">AI</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 flex-1">
                      <p className="text-sm text-gray-900 font-semibold">Hello! I'm your AI English conversation partner. What would you like to practice today?</p>
                    </div>
                  </div>
                  {/* ユーザーメッセージ（常に英語） */}
                  <div className="flex items-start gap-2 justify-end">
                    <div className="bg-blue-100 rounded-lg p-3 flex-1 text-right">
                      <p className="text-sm text-blue-900 font-semibold">I have a job interview next week, so I'd like to practice a mock interview.</p>
                    </div>
                    <div className="flex flex-col items-center ml-2">
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold">U</div>
                      <span className="text-xs text-accent mt-1 font-bold">You</span>
                    </div>
                  </div>
                </div>
                {/* マイクアイコンのみ表示 */}
                <div className="mt-6 flex items-center justify-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white">
                    <Mic className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">{t('key_features')}</h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-white">
                {t('features_description')}
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <MessageSquare className="w-10 h-10 text-primary mb-2" />
              <h3 className="text-xl font-bold mb-1 !text-black">{t('feature_chat')}</h3>
              <p className="text-black text-sm text-center">{t('feature_chat_desc')}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <BarChart4 className="w-10 h-10 text-primary mb-2" />
              <h3 className="text-xl font-bold mb-1 !text-black">{t('feature_feedback')}</h3>
              <p className="text-black text-sm text-center">{t('feature_feedback_desc')}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <BookOpen className="w-10 h-10 text-primary mb-2" />
              <h3 className="text-xl font-bold mb-1 !text-black">{t('feature_scenario')}</h3>
              <p className="text-black text-sm text-center">{t('feature_scenario_desc')}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <Award className="w-10 h-10 text-primary mb-2" />
              <h3 className="text-xl font-bold mb-1 !text-black">{t('feature_history')}</h3>
              <p className="text-black text-sm text-center">{t('feature_history_desc')}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <Mic className="w-10 h-10 text-primary mb-2" />
              <h3 className="text-xl font-bold mb-1 !text-black">{t('feature_voice')}</h3>
              <p className="text-black text-sm text-center">{t('feature_voice_desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 