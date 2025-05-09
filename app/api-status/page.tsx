import AppLayout from "@/app/app-layout"
import { ApiStatusMonitor } from "@/components/api-status-monitor"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "API状态监控 | 启智云枢³",
  description: "实时监控API状态和性能指标",
}

export default function ApiStatusPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <ApiStatusMonitor />
      </div>
    </AppLayout>
  )
}
