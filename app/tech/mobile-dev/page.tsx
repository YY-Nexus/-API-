import type { Metadata } from "next"
import AppLayout from "@/app/app-layout"
import { MobileDevClientPage } from "./MobileDevClientPage"

export const metadata: Metadata = {
  title: "移动开发 | 启智云枢³",
  description: "移动应用开发相关的资源、工具和教程",
}

export default function MobileDevPage() {
  return (
    <AppLayout>
      <MobileDevClientPage />
    </AppLayout>
  )
}
