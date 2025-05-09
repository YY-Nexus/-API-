import type { Metadata } from "next"
import AppLayout from "@/app/app-layout"
import { AITechClientPage } from "./AITechClientPage"

export const metadata: Metadata = {
  title: "智能技术 | 启智云枢³",
  description: "人工智能、机器学习和智能应用开发",
}

export default function AITechPage() {
  return (
    <AppLayout>
      <AITechClientPage />
    </AppLayout>
  )
}
