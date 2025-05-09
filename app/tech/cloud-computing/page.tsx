import type { Metadata } from "next"
import AppLayout from "@/app/app-layout"
import { CloudComputingClientPage } from "./CloudComputingClientPage"

export const metadata: Metadata = {
  title: "云端计算 | 启智云枢³",
  description: "云计算服务、架构和最佳实践",
}

export default function CloudComputingPage() {
  return (
    <AppLayout>
      <CloudComputingClientPage />
    </AppLayout>
  )
}
