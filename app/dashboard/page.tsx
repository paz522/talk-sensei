"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { BarChart, BookOpen, Clock, Award, ArrowRight } from "lucide-react"
import { useTranslation } from "@/hooks/useTranslation"

// localStorageキー
const STORAGE_KEY = "progressData";

// デフォルトデータ
const defaultWeeklyData = [
  { day: "Mon", minutes: 0, score: 0 },
  { day: "Tue", minutes: 0, score: 0 },
  { day: "Wed", minutes: 0, score: 0 },
  { day: "Thu", minutes: 0, score: 0 },
  { day: "Fri", minutes: 0, score: 0 },
  { day: "Sat", minutes: 0, score: 0 },
  { day: "Sun", minutes: 0, score: 0 },
];
const defaultSkillsData = [
  { skill: "Pronunciation", score: 0 },
  { skill: "Fluency", score: 0 },
  { skill: "Vocabulary", score: 0 },
  { skill: "Grammar", score: 0 },
];

function loadProgress() {
  if (typeof window === "undefined") return { weekly: defaultWeeklyData, skills: defaultSkillsData };
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { weekly: defaultWeeklyData, skills: defaultSkillsData };
  try {
    return JSON.parse(raw);
  } catch {
    return { weekly: defaultWeeklyData, skills: defaultSkillsData };
  }
}

function saveProgress(data: { weekly: typeof defaultWeeklyData, skills: typeof defaultSkillsData }) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [progress, setProgress] = useState(() => loadProgress());
  const t = useTranslation();

  // データが変わったら保存
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // リセット機能
  const handleReset = () => {
    setProgress({ weekly: defaultWeeklyData, skills: defaultSkillsData });
  };

  // 合計練習時間・セッション数・平均スコア・語彙数を計算
  const totalMinutes = progress.weekly.reduce((sum: number, d: { day: string; minutes: number; score: number }) => sum + d.minutes, 0);
  const sessions = progress.weekly.filter((d: { day: string; minutes: number; score: number }) => d.minutes > 0).length;
  // 連続勉強日数の計算
  const today = new Date();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let streak = 0;
  for (let i = 0; i < 7; i++) {
    // 今日から過去にさかのぼる
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dayName = weekDays[d.getDay()];
    const dayData = progress.weekly.find((w: { day: string }) => w.day === dayName);
    if (dayData && dayData.minutes > 0) {
      streak++;
    } else {
      break;
    }
  }
  const vocabLearned = 78; // 仮: 別途管理する場合はここもlocalStorage化
  // 棒グラフの最大値を基準にスケーリング
  const maxMinutes = Math.max(...progress.weekly.map((d: { day: string; minutes: number; score: number }) => d.minutes), 1); // 0除算防止

  return (
    <div className="container py-6 md:py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('dashboard')}</h1>
          <p className="text-muted-foreground">{t('dashboard_desc')}</p>
        </div>
        <div className="flex gap-2">
          <Button className="mt-4 md:mt-0">{t('start_new_practice')}</Button>
          <Button className="mt-4 md:mt-0" variant="outline" onClick={handleReset}>{t('reset') || 'リセット'}</Button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t('total_practice_time')}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m</div>
            <p className="text-xs text-muted-foreground">{t('from_last_week') || '今週'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t('sessions_completed')}</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sessions}</div>
            <p className="text-xs text-muted-foreground">{t('from_last_week') || '今週'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">連続勉強日数</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{streak}日</div>
            <p className="text-xs text-muted-foreground">今日を含む連続記録</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t('vocabulary_learned')}</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vocabLearned}</div>
            <p className="text-xs text-muted-foreground">{t('from_last_week') || '今週'}</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {/* Practice History */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t('practice_history')}</CardTitle>
            <CardDescription>{t('activity_over_time')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="weekly">
              <TabsList className="mb-4">
                <TabsTrigger value="weekly">{t('weekly')}</TabsTrigger>
                <TabsTrigger value="monthly">{t('monthly')}</TabsTrigger>
              </TabsList>
              <TabsContent value="weekly" className="space-y-4">
                <div className="h-[200px] w-full flex items-end justify-between">
                  {progress.weekly.map((day: { day: string; minutes: number; score: number }) => (
                    <div key={day.day} className="flex flex-col items-center">
                      <div className="text-xs text-muted-foreground mb-1">
                        {day.minutes > 0 ? `${day.minutes} min` : "-"}
                      </div>
                      <div
                        className={`w-12 ${day.minutes > 0 ? "bg-primary" : "bg-muted"} rounded-t-md`}
                        style={{ height: `${day.minutes > 0 ? (day.minutes / maxMinutes) * 150 : 5}px` }}
                      ></div>
                      <div className="text-xs font-medium mt-1">{day.day}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end text-xs text-muted-foreground">
                  <span>{t('minutes_practiced')}</span>
                </div>
              </TabsContent>
              <TabsContent value="monthly">
                <div className="h-[200px] w-full flex items-center justify-center text-muted-foreground">
                  {t('monthly_data_placeholder') || 'Monthly data visualization would appear here'}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        {/* カレンダー */}
        <Card>
          <CardHeader>
            <CardTitle>カレンダー</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
