import AppLayout from "@/app/app-layout"
import { ApiDocsClientPage } from "./ApiDocsClientPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "API文档 | 启智云枢³",
  description: "启智云枢³ API接口文档和使用说明",
}

export default function ApiDocsPage() {
  return (
    <AppLayout>
      <ApiDocsClientPage />
    </AppLayout>
  )
}
