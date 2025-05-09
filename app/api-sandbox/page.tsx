import AppLayout from "@/app/app-layout"
import { ApiSandbox } from "@/components/api-sandbox"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "API沙盒环境 | 启智云枢³",
  description: "在安全的环境中测试API，不会影响生产数据",
}

export default function ApiSandboxPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <ApiSandbox />
      </div>
    </AppLayout>
  )
}
