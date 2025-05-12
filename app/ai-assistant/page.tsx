// 更新AI助手页面，使用增强型AI助手组件
import { EnhancedAIAssistant } from "@/components/enhanced-ai-assistant"

export default function AIAssistantPage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">AI助手</h1>
      <EnhancedAIAssistant />
    </div>
  )
}
