import type { Metadata } from "next"
import AppLayout from "@/app/app-layout"
import { AnalyticsClientPage } from "./AnalyticsClientPage"

export const metadata: Metadata = {
  title: "数据分析 | 启智云枢³",
  description: "API使用数据分析和可视化展示",
}

export default function AnalyticsPage() {
  return (
    <AppLayout>
      <AnalyticsClientPage />
    </AppLayout>
  )
}
