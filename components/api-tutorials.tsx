"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

export function ApiTutorials() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("basic")

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("tutorials.title")}</h1>
        <p className="text-muted-foreground">{t("tutorials.description")}</p>
      </div>

      <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="basic">{t("tutorials.basic")}</TabsTrigger>
          <TabsTrigger value="advanced">{t("tutorials.advanced")}</TabsTrigger>
          <TabsTrigger value="integration">{t("tutorials.integration")}</TabsTrigger>
          <TabsTrigger value="bestPractices">{t("tutorials.bestPractices")}</TabsTrigger>
          <TabsTrigger value="troubleshooting">{t("tutorials.troubleshooting")}</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <TutorialCard
            title="API基础入门"
            description="了解API的基本概念和使用方法"
            level="初级"
            time="15分钟"
            tags={["基础", "入门"]}
          />
          <TutorialCard
            title="认证与授权"
            description="学习如何进行API认证和授权"
            level="初级"
            time="20分钟"
            tags={["安全", "认证"]}
          />
          <TutorialCard
            title="发送请求与处理响应"
            description="掌握发送API请求和处理响应的技巧"
            level="初级"
            time="25分钟"
            tags={["请求", "响应"]}
          />
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <TutorialCard
            title="高级查询参数"
            description="学习使用复杂的查询参数优化API请求"
            level="中级"
            time="30分钟"
            tags={["查询", "优化"]}
          />
          <TutorialCard
            title="批量操作"
            description="了解如何使用批量API提高效率"
            level="中级"
            time="25分钟"
            tags={["批量", "效率"]}
          />
          <TutorialCard
            title="错误处理与重试策略"
            description="掌握API错误处理和请求重试的最佳实践"
            level="中级"
            time="35分钟"
            tags={["错误处理", "重试"]}
          />
        </TabsContent>

        <TabsContent value="integration" className="space-y-4">
          <TutorialCard
            title="与前端框架集成"
            description="学习如何在React、Vue等前端框架中集成API"
            level="中级"
            time="40分钟"
            tags={["前端", "集成"]}
          />
          <TutorialCard
            title="与后端服务集成"
            description="了解如何在Node.js、Java等后端服务中集成API"
            level="中级"
            time="45分钟"
            tags={["后端", "集成"]}
          />
          <TutorialCard
            title="与第三方服务集成"
            description="掌握将API与第三方服务集成的技巧"
            level="高级"
            time="50分钟"
            tags={["第三方", "集成"]}
          />
        </TabsContent>

        <TabsContent value="bestPractices" className="space-y-4">
          <TutorialCard
            title="API性能优化"
            description="学习优化API请求性能的技巧"
            level="中级"
            time="35分钟"
            tags={["性能", "优化"]}
          />
          <TutorialCard
            title="缓存策略"
            description="了解API缓存的最佳实践"
            level="中级"
            time="30分钟"
            tags={["缓存", "性能"]}
          />
          <TutorialCard
            title="安全最佳实践"
            description="掌握API安全的最佳实践"
            level="高级"
            time="40分钟"
            tags={["安全", "最佳实践"]}
          />
        </TabsContent>

        <TabsContent value="troubleshooting" className="space-y-4">
          <TutorialCard
            title="常见错误解决"
            description="学习解决API常见错误的方法"
            level="中级"
            time="25分钟"
            tags={["错误", "解决"]}
          />
          <TutorialCard
            title="调试技巧"
            description="了解API调试的技巧和工具"
            level="中级"
            time="30分钟"
            tags={["调试", "工具"]}
          />
          <TutorialCard
            title="性能问题排查"
            description="掌握API性能问题的排查方法"
            level="高级"
            time="35分钟"
            tags={["性能", "排查"]}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface TutorialCardProps {
  title: string
  description: string
  level: string
  time: string
  tags: string[]
}

function TutorialCard({ title, description, level, time, tags }: TutorialCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="font-medium">难度：</span>
              <span>{level}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">时长：</span>
              <span>{time}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-muted text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
