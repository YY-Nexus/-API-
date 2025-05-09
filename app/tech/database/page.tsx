import type { Metadata } from "next"
import AppLayout from "@/app/app-layout"
import { DatabaseTechClientPage } from "./DatabaseTechClientPage"

export const metadata: Metadata = {
  title: "数据存储 | 启智云枢³",
  description: "数据库技术、存储解决方案和最佳实践",
}

export default function DatabaseTechPage() {
  return (
    <AppLayout>
      <DatabaseTechClientPage />
    </AppLayout>
  )
}
