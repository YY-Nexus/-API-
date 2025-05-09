import type { Metadata } from "next"
import AppLayout from "@/app/app-layout"
import { TerminalCommandsClientPage } from "./TerminalCommandsClientPage"

export const metadata: Metadata = {
  title: "终端命令 | 启智云枢³",
  description: "常用终端命令、快捷操作和脚本示例",
}

export default function TerminalCommandsPage() {
  return (
    <AppLayout>
      <TerminalCommandsClientPage />
    </AppLayout>
  )
}
