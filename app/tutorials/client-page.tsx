"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"

// 动态导入客户端组件
const ClientApiTutorials = dynamic(
  () => import("@/components/client-api-tutorials"),
  { ssr: false }, // 禁用SSR以避免hydration错误
)

// 加载状态组件
function TutorialsLoading() {
  return (
    <div className="w-full h-64 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg font-medium">加载教程内容中...</p>
      </div>
    </div>
  )
}

export default function TutorialsClientPage() {
  return (
    <Suspense fallback={<TutorialsLoading />}>
      <ClientApiTutorials />
    </Suspense>
  )
}
