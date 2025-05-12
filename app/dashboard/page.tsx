"use client"

import AppLayout from "@/app/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  FileText,
  Code,
  Terminal,
  Users,
  Activity,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  AlertCircle,
  RefreshCw,
  Zap,
  MessageSquare,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BeijingTime } from "@/components/beijing-time"
import { formatWeekday } from "@/utils/date-utils"

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState({
    systemStatus: false,
    usageStats: false,
    aiAssistant: false,
  })
  const [aiMessage, setAiMessage] = useState("")
  const [aiConversation, setAiConversation] = useState([
    { role: "assistant", content: "您好！我是启智AI助手，有什么可以帮助您的吗？" },
  ])

  // 系统状态刷新功能
  const refreshSystemStatus = () => {
    setLoading({ ...loading, systemStatus: true })
    // 模拟API调用
    setTimeout(() => {
      setLoading({ ...loading, systemStatus: false })
    }, 1000)
  }

  // 使用统计刷新功能
  const refreshUsageStats = () => {
    setLoading({ ...loading, usageStats: true })
    // 模拟API调用
    setTimeout(() => {
      setLoading({ ...loading, usageStats: false })
    }, 1000)
  }

  // AI助手发送消息功能
  const sendAiMessage = () => {
    if (!aiMessage.trim()) return

    // 添加用户消息
    setAiConversation([...aiConversation, { role: "user", content: aiMessage }])
    setLoading({ ...loading, aiAssistant: true })

    // 清空输入框
    setAiMessage("")

    // 模拟AI响应
    setTimeout(() => {
      const responses = [
        "我可以帮您查询API文档、生成示例代码或解答技术问题。",
        "您可以在API沙盒中测试这个功能，那里有详细的参数说明。",
        "这个问题在教程中心有详细的解答，我可以为您找到相关内容。",
        "根据您的描述，您可能需要使用我们的认证API，您可以在文档中查看详细用法。",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      setAiConversation([
        ...aiConversation,
        { role: "user", content: aiMessage },
        { role: "assistant", content: randomResponse },
      ])
      setLoading({ ...loading, aiAssistant: false })
    }, 1500)
  }

  // 处理快速问题点击
  const handleQuickQuestion = (question) => {
    setAiMessage(question)
  }

  return (
    <AppLayout>
      <div className="container mx-auto py-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">欢迎使用启智云枢³</h1>
            <p className="text-muted-foreground">智联万物丨枢启未来 - Connect Intelligence, Hub the Future</p>
            <p className="text-sm text-muted-foreground mt-1">
              上次登录: <BeijingTime showSeconds={false} /> · 北京 · {formatWeekday(new Date())}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/settings/users">
                <Users className="h-4 w-4 mr-2" />
                邀请团队
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/api-docs">
                <FileText className="h-4 w-4 mr-2" />
                查看API文档
              </Link>
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/api-docs/quickstart">
                <Terminal className="h-4 w-4 mr-2" />
                快速开始
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 系统状态模块 */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-blue-500" />
                  系统状态
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={refreshSystemStatus}
                  disabled={loading.systemStatus}
                >
                  <RefreshCw className={`h-4 w-4 ${loading.systemStatus ? "animate-spin" : ""}`} />
                </Button>
              </div>
              <CardDescription className="flex items-center">
                所有服务运行正常
                <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 border-green-200">
                  正常运行
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">API服务</span>
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-sm font-medium text-green-500">正常</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">数据库</span>
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-sm font-medium text-green-500">正常</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">存储服务</span>
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-sm font-medium text-green-500">正常</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">AI服务</span>
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-sm font-medium text-green-500">正常</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-4 text-blue-600" asChild>
                <Link href="/api-status">查看详细状态</Link>
              </Button>
            </CardContent>
          </Card>

          {/* 使用统计模块 */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-blue-500" />
                  使用统计
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={refreshUsageStats}
                  disabled={loading.usageStats}
                >
                  <RefreshCw className={`h-4 w-4 ${loading.usageStats ? "animate-spin" : ""}`} />
                </Button>
              </div>
              <CardDescription className="flex items-center">
                过去30天的使用情况
                <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-600 border-blue-200">
                  增长 12%
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">API调用次数</span>
                  <span className="text-sm font-medium">12,458</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "65%" }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">活跃用户</span>
                  <span className="text-sm font-medium">342</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "48%" }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">文件上传</span>
                  <span className="text-sm font-medium">1.2 GB</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "32%" }}></div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-4 text-blue-600" asChild>
                <Link href="/analytics">查看详细统计</Link>
              </Button>
            </CardContent>
          </Card>

          {/* AI助手模块 */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BrainCircuit className="h-5 w-5 mr-2 text-blue-500" />
                AI助手
              </CardTitle>
              <CardDescription>智能助手随时为您服务</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="max-h-[120px] overflow-y-auto space-y-2 pr-1">
                  {aiConversation.map((message, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded-lg text-sm ${
                        message.role === "assistant"
                          ? "bg-blue-50 border border-blue-100 text-blue-800"
                          : "bg-gray-100 border border-gray-200 ml-4"
                      }`}
                    >
                      {message.content}
                    </div>
                  ))}
                  {loading.aiAssistant && (
                    <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg border border-blue-100">
                      <RefreshCw className="h-3 w-3 text-blue-500 animate-spin" />
                      <span className="text-xs text-blue-500">AI助手正在思考...</span>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start text-xs"
                    onClick={() => handleQuickQuestion("如何生成API示例代码？")}
                  >
                    <Code className="h-3.5 w-3.5 mr-1.5" />
                    生成API示例代码
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start text-xs"
                    onClick={() => handleQuickQuestion("如何生成API示例代码？")}
                  >
                    <Code className="h-3.5 w-3.5 mr-1.5" />
                    生成API示例代码
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start text-xs"
                    onClick={() => handleQuickQuestion("如何理解API文档？")}
                  >
                    <FileText className="h-3.5 w-3.5 mr-1.5" />
                    解释API文档
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start text-xs"
                    onClick={() => handleQuickQuestion("如何诊断API错误？")}
                  >
                    <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
                    诊断API错误
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start text-xs"
                    onClick={() => handleQuickQuestion("如何分析使用数据？")}
                  >
                    <BarChart className="h-3.5 w-3.5 mr-1.5" />
                    分析使用数据
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    placeholder="输入您的问题..."
                    className="pr-12 border-blue-200 focus:border-blue-400"
                    value={aiMessage}
                    onChange={(e) => setAiMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        sendAiMessage()
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    className="absolute right-1 top-1 h-7 bg-blue-600 hover:bg-blue-700"
                    onClick={sendAiMessage}
                    disabled={!aiMessage.trim() || loading.aiAssistant}
                  >
                    {loading.aiAssistant ? (
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Zap className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="w-full text-blue-600" asChild>
                  <Link href="/ai-assistant">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    打开完整AI助手
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="quick-access">
          <TabsList className="mb-4">
            <TabsTrigger value="quick-access">快速访问</TabsTrigger>
            <TabsTrigger value="recent">最近使用</TabsTrigger>
            <TabsTrigger value="favorites">收藏夹</TabsTrigger>
          </TabsList>

          <TabsContent value="quick-access">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* API文档卡片 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-500" />
                    API文档
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">浏览和测试所有可用的API端点</p>
                  <div className="flex items-center text-xs text-muted-foreground mb-3">
                    <span className="flex-1">最近更新: 2023年5月5日</span>
                    <Badge variant="outline">v3.2.1</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full group" asChild>
                    <Link href="/api-docs">
                      查看文档
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* 代码片段卡片 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Code className="h-5 w-5 mr-2 text-blue-500" />
                    代码片段
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">查找和使用常用的代码片段</p>
                  <div className="flex items-center text-xs text-muted-foreground mb-3">
                    <span className="flex-1">共152个代码片段</span>
                    <Badge variant="outline">8种语言</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full group" asChild>
                    <Link href="/code-snippets">
                      浏览代码
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* API沙盒卡片 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Terminal className="h-5 w-5 mr-2 text-blue-500" />
                    API沙盒
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">在安全环境中测试API调用</p>
                  <div className="flex items-center text-xs text-muted-foreground mb-3">
                    <span className="flex-1">支持所有API端点</span>
                    <Badge variant="outline">实时测试</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full group" asChild>
                    <Link href="/api-sandbox">
                      打开沙盒
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* 教程中心卡片 */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                    教程中心
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">学习如何有效使用平台功能</p>
                  <div className="flex items-center text-xs text-muted-foreground mb-3">
                    <span className="flex-1">最新: API批量处理</span>
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                      新增
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full group" asChild>
                    <Link href="/tutorials">
                      浏览教程
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-500" />
                      用户认证API
                    </CardTitle>
                    <CardDescription className="text-xs">2023年5月9日 08:30</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="sm" className="w-full text-blue-600" asChild>
                      <Link href="/api-docs/auth">继续查看</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center">
                      <Code className="h-4 w-4 mr-2 text-blue-500" />
                      Node.js认证示例
                    </CardTitle>
                    <CardDescription className="text-xs">2023年5月9日 08:15</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="sm" className="w-full text-blue-600" asChild>
                      <Link href="/code-snippets/auth-nodejs">继续查看</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center">
                      <Terminal className="h-4 w-4 mr-2 text-blue-500" />
                      API沙盒测试
                    </CardTitle>
                    <CardDescription className="text-xs">2023年5月9日 08:00</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="sm" className="w-full text-blue-600" asChild>
                      <Link href="/api-sandbox">继续测试</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-500" />
                      批量导出API
                    </CardTitle>
                    <CardDescription className="text-xs">API文档</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="sm" className="w-full text-blue-600" asChild>
                      <Link href="/api-docs/export">查看文档</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                      API认证教程
                    </CardTitle>
                    <CardDescription className="text-xs">教程中心</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="sm" className="w-full text-blue-600" asChild>
                      <Link href="/tutorials/auth">查看教程</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center">
                      <Code className="h-4 w-4 mr-2 text-blue-500" />
                      Python客户端示例
                    </CardTitle>
                    <CardDescription className="text-xs">代码片段</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="sm" className="w-full text-blue-600" asChild>
                      <Link href="/code-snippets/python-client">查看代码</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">最近活动</h2>
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted px-4 py-2 border-b">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium">
                <div className="col-span-3">时间</div>
                <div className="col-span-2">类型</div>
                <div className="col-span-5">描述</div>
                <div className="col-span-2">状态</div>
              </div>
            </div>
            <div className="divide-y">
              <div className="px-4 py-3 hover:bg-muted/50 transition-colors">
                <div className="grid grid-cols-12 gap-4 text-sm">
                  <div className="col-span-3 text-muted-foreground">2023-05-09 08:30</div>
                  <div className="col-span-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                      API调用
                    </Badge>
                  </div>
                  <div className="col-span-5">调用用户认证API</div>
                  <div className="col-span-2 text-green-600">成功</div>
                </div>
              </div>
              <div className="px-4 py-3 hover:bg-muted/50 transition-colors">
                <div className="grid grid-cols-12 gap-4 text-sm">
                  <div className="col-span-3 text-muted-foreground">2023-05-09 08:15</div>
                  <div className="col-span-2">
                    <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                      文件
                    </Badge>
                  </div>
                  <div className="col-span-5">上传文件 data.json</div>
                  <div className="col-span-2 text-green-600">成功</div>
                </div>
              </div>
              <div className="px-4 py-3 hover:bg-muted/50 transition-colors">
                <div className="grid grid-cols-12 gap-4 text-sm">
                  <div className="col-span-3 text-muted-foreground">2023-05-09 08:00</div>
                  <div className="col-span-2">
                    <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                      系统
                    </Badge>
                  </div>
                  <div className="col-span-5">用户登录</div>
                  <div className="col-span-2 text-green-600">成功</div>
                </div>
              </div>
            </div>
            <div className="px-4 py-2 border-t bg-muted/30 text-center">
              <Button variant="ghost" size="sm" className="text-blue-600" asChild>
                <Link href="/activity-log">查看所有活动</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
