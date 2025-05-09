import CodeSnippetsClientPage from "./CodeSnippetsClientPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "代码片段 | 启智云枢³",
  description: "浏览和使用常用的代码片段 - 启智云枢³",
}

export default function CodeSnippetsPage() {
  return <CodeSnippetsClientPage />
}
