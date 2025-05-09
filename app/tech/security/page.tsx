import type { Metadata } from "next"
import AppLayout from "@/app/app-layout"
import { SecurityTechClientPage } from "./SecurityTechClientPage"

export const metadata: Metadata = {
  title: "安全防护 | 启智云枢³",
  description: "网络安全、数据保护和安全最佳实践",
}

export default function SecurityTechPage() {
  return (
    <AppLayout>
      <SecurityTechClientPage />
    </AppLayout>
  )
}
