import AppLayout from "@/app/app-layout"
import { ApiTutorials } from "@/components/api-tutorials"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "教程中心 | 启智云枢³",
  description: "学习如何有效使用平台功能和API",
}

export default function TutorialsPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <ApiTutorials />
      </div>
    </AppLayout>
  )
}
