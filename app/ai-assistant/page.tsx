"use client"

import AppLayout from "@/app/app-layout"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BrainCircuit,
  RefreshCw,
  Zap,
  Code,
  FileText,
  AlertCircle,
  BarChart,
  Download,
  Share2,
  MessageSquare,
  Bot,
  History,
  Bookmark,
  Settings,
} from "lucide-react"

export default function AiAssistantPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "您好！我是启智AI助手，有什么可以帮助您的吗？" },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 发送消息
  const sendMessage = () => {
    if (!input.trim()) return

    // 添加用户消息
    setMessages([...messages, { role: "user", content: input }])
    setLoading(true)

    // 清空输入框
    setInput("")

    // 模拟AI响应
    setTimeout(() => {
      const responses = [
        "我可以帮您查询API文档、生成示例代码或解答技术问题。您需要了解哪方面的内容？",
        "您可以在API沙盒中测试这个功能，那里有详细的参数说明和实时响应。",
        "这个问题在教程中心有详细的解答，我可以为您找到相关内容或者直接解释关键概念。",
        "根据您的描述，您可能需要使用我们的认证API，您可以在文档中查看详细用法，或者我可以为您生成示例代码。",
        "我理解您的需求。您可以使用批量导出API来实现这个功能，它支持多种格式和过滤条件。需要我展示具体用法吗？",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      setMessages([...messages, { role: "user", content: input }, { role: "assistant", content: randomResponse }])
      setLoading(false)
    }, 1500)
  }

  // 处理快速问题点击
  const handleQuickQuestion = (question) => {
    setInput(question)
  }

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* 侧边栏 */}
          <div className="md:col-span-1 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BrainCircuit className="h-5 w-5 mr-2 text-blue-500" />
                  AI助手
                </CardTitle>
                <CardDescription>智能助手随时为您服务</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full mb-4 bg-blue-600 hover:bg-blue-700">
                  <Zap className="h-4 w-4 mr-2" />
                  新对话
                </Button>

                <div className="space-y-1">
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    当前对话
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <History className="h-4 w-4 mr-2" />
                    历史对话
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Bookmark className="h-4 w-4 mr-2" />
                    保存的对话
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    AI设置
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Bot className="h-5 w-5 mr-2 text-blue-500" />
                  AI能力
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">API文档解析</span>
                  <Badge variant="outline" className="bg-green-50 text-green-600">
                    强
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">代码生成</span>
                  <Badge variant="outline" className="bg-green-50 text-green-600">
                    强
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">错误诊断</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-600">
                    中
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">数据分析</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-600">
                    中
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 主聊天区域 */}
          <div className="md:col-span-3">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-2 border-b">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center">
                    <BrainCircuit className="h-5 w-5 mr-2 text-blue-500" />
                    AI对话
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      分享
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      导出
                    </Button>
                  </div>
                </div>
                <CardDescription>与AI助手进行实时对话，获取API使用帮助</CardDescription>
              </CardHeader>

              <Tabs defaultValue="chat" className="flex-1 flex flex-col">
                <div className="px-4 pt-2 border-b">
                  <TabsList>
                    <TabsTrigger value="chat">对话</TabsTrigger>
                    <TabsTrigger value="code">代码生成</TabsTrigger>
                    <TabsTrigger value="docs">文档解析</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0">
                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 border border-gray-200"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 border border-gray-200 flex items-center space-x-2">
                          <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
                          <span>AI助手正在思考...</span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </CardContent>

                  <div className="p-4 border-t">
                    <div className="grid grid-cols-4 gap-2 mb-4">
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

                    <div className="flex space-x-2">
                      <Input
                        placeholder="输入您的问题..."
                        className="flex-1"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            sendMessage()
                          }
                        }}
                      />
                      <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={sendMessage}
                        disabled={!input.trim() || loading}
                      >
                        {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="code" className="flex-1 flex flex-col p-0 m-0">
                  <CardContent className="p-4">
                    <div className="text-center py-12">
                      <Code className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                      <h3 className="text-lg font-medium mb-2">代码生成助手</h3>
                      <p className="text-muted-foreground mb-4">描述您需要的功能，AI将为您生成相应的代码示例</p>
                      <Button className="bg-blue-600 hover:bg-blue-700">开始生成代码</Button>
                    </div>
                  </CardContent>
                </TabsContent>

                <TabsContent value="docs" className="flex-1 flex flex-col p-0 m-0">
                  <CardContent className="p-4">
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                      <h3 className="text-lg font-medium mb-2">文档解析助手</h3>
                      <p className="text-muted-foreground mb-4">上传API文档或提供链接，AI将帮您解析和理解文档内容</p>
                      <Button className="bg-blue-600 hover:bg-blue-700">开始解析文档</Button>
                    </div>
                  </CardContent>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
