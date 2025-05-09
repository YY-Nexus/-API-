import type { Metadata } from "next"
import AppLayout from "@/app/app-layout"
import { WebDevClientPage } from "./WebDevClientPage"

export const metadata: Metadata = {
  title: "网页开发 | 启智云枢³",
  description: "网页开发相关的资源、工具和教程",
}

export default function WebDevPage() {
  return (
    <AppLayout>
      <WebDevClientPage />
    </AppLayout>
  )
}
