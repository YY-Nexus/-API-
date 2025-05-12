"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useNotification } from "@/contexts/notification-context"
import {
  BrainIcon,
  Code,
  FileText,
  MessageSquare,
  Send,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Lightbulb,
  HelpCircle,
  BookOpen,
  Search,
} from "lucide-react"

// AI助手模式
type AssistantMode = "chat" | "code" | "document" | "search" | "explain"

// 消息类型
interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

// 代码生成选项
interface CodeGenerationOptions {
  language: string
  framework?: string
  includeComments: boolean
  complexity: "simple" | "medium" | "complex"
}

// 文档生成选项
interface DocumentGenerationOptions {
  format: "markdown" | "html" | "text"
  includeExamples: boolean
  detailLevel: "basic" | "detailed" | "comprehensive"
}

export function EnhancedAIAssistant() {
  const [mode, setMode] = useState<AssistantMode>("chat")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [codeOptions, setCodeOptions] = useState<CodeGenerationOptions>({
    language: "javascript",
    framework: "react",
    includeComments: true,
    complexity: "medium",
  })
  const [documentOptions, setDocumentOptions] = useState<DocumentGenerationOptions>({
    format: "markdown",
    includeExamples: true,
    detailLevel: "detailed",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [codeToExplain, setCodeToExplain] = useState("")
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { showSuccess, showError } = useNotification()

  // 滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // 生成唯一ID
  const generateId = () => Math.random().toString(36).substring(2, 9)

  // 发送消息
  const sendMessage = async () => {
    if (!input.trim() && mode === "chat") return
    if (!searchQuery.trim() && mode === "search") return
    if (!codeToExplain.trim() && mode === "explain") return

    let content = ""
    switch (mode) {
      case "chat":
        content = input
        break
      case "search":
        content = `搜索: ${searchQuery}`
        break
      case "explain":
        content = `解释以下代码:\n\`\`\`\n${codeToExplain}\n\`\`\``
        break
      case "code":
        content = `生成${codeOptions.language}${codeOptions.framework ? `(${codeOptions.framework})` : ""}代码: ${input}`
        break
      case "document":
        content = `生成${documentOptions.format}格式文档: ${input}`
        break
    }

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsProcessing(true)
    setInput("")
    setSearchQuery("")
    setCodeToExplain("")

    try {
      // 模拟AI响应
      await new Promise((resolve) => setTimeout(resolve, 1500))

      let responseContent = ""

      switch (mode) {
        case "chat":
          responseContent = "这是AI助手的回复。在实际实现中，这里会调用AI服务API获取真实的回复内容。"
          break
        case "code":
          responseContent = generateMockCodeResponse(codeOptions)
          break
        case "document":
          responseContent = generateMockDocumentResponse(documentOptions)
          break
        case "search":
          responseContent = `搜索"${searchQuery}"的结果：\n\n1. 相关API文档\n2. 代码示例\n3. 最佳实践指南`
          break
        case "explain":
          responseContent =
            "代码分析：\n\n这段代码实现了一个简单的功能。它首先初始化变量，然后处理输入数据，最后返回结果。"
          break
      }

      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error getting AI response:", error)
      showError("获取AI响应失败", "请稍后重试")
    } finally {
      setIsProcessing(false)
    }
  }

  // 生成模拟代码响应
  const generateMockCodeResponse = (options: CodeGenerationOptions) => {
    const { language, framework, includeComments } = options

    if (language === "javascript" || language === "typescript") {
      if (framework === "react") {
        return `${includeComments ? "// React组件示例\n" : ""}import React, { useState } from 'react';\n\nfunction ExampleComponent() {\n  const [count, setCount] = useState(0);\n\n  ${includeComments ? "// 增加计数器\n" : ""}  const increment = () => {\n    setCount(prev => prev + 1);\n  };\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={increment}>Increment</button>\n    </div>\n  );\n}\n\nexport default ExampleComponent;`
      } else {
        return `${includeComments ? "// JavaScript函数示例\n" : ""}function processData(data) {\n  ${includeComments ? "// 验证输入\n" : ""}  if (!data || !Array.isArray(data)) {\n    throw new Error('Invalid input');\n  }\n\n  ${includeComments ? "// 处理数据\n" : ""}  return data.map(item => ({\n    ...item,\n    processed: true,\n    timestamp: new Date().toISOString()\n  }));\n}`
      }
    } else if (language === "python") {
      return `${includeComments ? "# Python函数示例\n" : ""}def process_data(data):\n    ${includeComments ? "# 验证输入\n" : ""}    if not data or not isinstance(data, list):\n        raise ValueError("Invalid input")\n    \n    ${includeComments ? "# 处理数据\n" : ""}    result = []\n    for item in data:\n        item_copy = item.copy()\n        item_copy["processed"] = True\n        item_copy["timestamp"] = datetime.now().isoformat()\n        result.append(item_copy)\n    \n    return result`
    } else {
      return `// 示例代码 (${language})\n// 这里将生成${language}的代码示例`
    }
  }

  // 生成模拟文档响应
  const generateMockDocumentResponse = (options: DocumentGenerationOptions) => {
    const { format, includeExamples, detailLevel } = options

    if (format === "markdown") {
      return `# API文档示例\n\n## 介绍\n\n这是一个示例API文档。\n\n## 安装\n\n\`\`\`bash\nnpm install example-package\n\`\`\`\n\n## 使用方法\n\n\`\`\`javascript\nimport { exampleFunction } from 'example-package';\n\nconst result = exampleFunction();\n\`\`\`\n\n${includeExamples ? "## 示例\n\n这里是一些使用示例...\n" : ""}${detailLevel === "comprehensive" ? "\n## 高级用法\n\n这里是一些高级用法...\n" : ""}`
    } else if (format === "html") {
      return `<h1>API文档示例</h1>\n\n<h2>介绍</h2>\n<p>这是一个示例API文档。</p>\n\n<h2>安装</h2>\n<pre><code>npm install example-package</code></pre>\n\n<h2>使用方法</h2>\n<pre><code>import { exampleFunction } from 'example-package';\n\nconst result = exampleFunction();</code></pre>\n\n${includeExamples ? "<h2>示例</h2>\n<p>这里是一些使用示例...</p>\n" : ""}${detailLevel === "comprehensive" ? "\n<h2>高级用法</h2>\n<p>这里是一些高级用法...</p>\n" : ""}`
    } else {
      return `API文档示例\n\n介绍\n这是一个示例API文档。\n\n安装\nnpm install example-package\n\n使用方法\nimport { exampleFunction } from 'example-package';\n\nconst result = exampleFunction();\n\n${includeExamples ? "示例\n这里是一些使用示例...\n" : ""}${detailLevel === "comprehensive" ? "\n高级用法\n这里是一些高级用法...\n" : ""}`
    }
  }

  // 复制内容到剪贴板
  const copyToClipboard = (content: string, messageId: string) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setCopiedMessageId(messageId)
        showSuccess("复制成功", "内容已复制到剪贴板")
        setTimeout(() => setCopiedMessageId(null), 2000)
      })
      .catch(() => {
        showError("复制失败", "无法复制内容到剪贴板")
      })
  }

  // 清空对话
  const clearConversation = () => {
    setMessages([])
    showSuccess("对话已清空", "所有消息记录已清除")
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BrainIcon className="h-6 w-6 mr-2 text-primary" />
            <CardTitle>增强型AI助手</CardTitle>
          </div>
          <Button variant="outline" size="sm" onClick={clearConversation}>
            清空对话
          </Button>
        </div>
        <CardDescription>选择助手模式，获取智能帮助和建议</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={mode} onValueChange={(value) => setMode(value as AssistantMode)}>
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="chat">
              <MessageSquare className="h-4 w-4 mr-2" />
              聊天
            </TabsTrigger>
            <TabsTrigger value="code">
              <Code className="h-4 w-4 mr-2" />
              代码生成
            </TabsTrigger>
            <TabsTrigger value="document">
              <FileText className="h-4 w-4 mr-2" />
              文档生成
            </TabsTrigger>
            <TabsTrigger value="search">
              <Search className="h-4 w-4 mr-2" />
              智能搜索
            </TabsTrigger>
            <TabsTrigger value="explain">
              <Lightbulb className="h-4 w-4 mr-2" />
              代码解释
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-4">
            <div className="text-sm text-muted-foreground">与AI助手进行自然语言对话，获取帮助和建议。</div>
          </TabsContent>

          <TabsContent value="code" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>编程语言</Label>
                  <Select
                    value={codeOptions.language}
                    onValueChange={(value) => setCodeOptions({ ...codeOptions, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择语言" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="typescript">TypeScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="csharp">C#</SelectItem>
                      <SelectItem value="go">Go</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(codeOptions.language === "javascript" || codeOptions.language === "typescript") && (
                  <div className="space-y-2">
                    <Label>框架</Label>
                    <Select
                      value={codeOptions.framework}
                      onValueChange={(value) => setCodeOptions({ ...codeOptions, framework: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择框架" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="vue">Vue</SelectItem>
                        <SelectItem value="angular">Angular</SelectItem>
                        <SelectItem value="node">Node.js</SelectItem>
                        <SelectItem value="none">不使用框架</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-comments">包含注释</Label>
                  <Switch
                    id="include-comments"
                    checked={codeOptions.includeComments}
                    onCheckedChange={(checked) => setCodeOptions({ ...codeOptions, includeComments: checked })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>复杂度</Label>
                  <Select
                    value={codeOptions.complexity}
                    onValueChange={(value) =>
                      setCodeOptions({ ...codeOptions, complexity: value as "simple" | "medium" | "complex" })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择复杂度" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">简单</SelectItem>
                      <SelectItem value="medium">中等</SelectItem>
                      <SelectItem value="complex">复杂</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="document" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>文档格式</Label>
                  <Select
                    value={documentOptions.format}
                    onValueChange={(value) =>
                      setDocumentOptions({ ...documentOptions, format: value as "markdown" | "html" | "text" })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择格式" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="markdown">Markdown</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="text">纯文本</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>详细程度</Label>
                  <Select
                    value={documentOptions.detailLevel}
                    onValueChange={(value) =>
                      setDocumentOptions({
                        ...documentOptions,
                        detailLevel: value as "basic" | "detailed" | "comprehensive",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择详细程度" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">基础</SelectItem>
                      <SelectItem value="detailed">详细</SelectItem>
                      <SelectItem value="comprehensive">全面</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-examples">包含示例</Label>
                  <Switch
                    id="include-examples"
                    checked={documentOptions.includeExamples}
                    onCheckedChange={(checked) => setDocumentOptions({ ...documentOptions, includeExamples: checked })}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="search" className="space-y-4">
            <div className="text-sm text-muted-foreground">使用AI搜索API文档、代码示例和最佳实践。</div>
            <div className="flex space-x-2">
              <Input
                placeholder="输入搜索关键词..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage} disabled={isProcessing || !searchQuery.trim()}>
                {isProcessing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="explain" className="space-y-4">
            <div className="text-sm text-muted-foreground">粘贴代码，AI将解释其功能和工作原理。</div>
            <div className="space-y-2">
              <Textarea
                placeholder="粘贴需要解释的代码..."
                className="font-mono text-sm h-32"
                value={codeToExplain}
                onChange={(e) => setCodeToExplain(e.target.value)}
              />
              <Button onClick={sendMessage} disabled={isProcessing || !codeToExplain.trim()}>
                {isProcessing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Lightbulb className="h-4 w-4 mr-2" />}
                解释代码
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* 消息历史 */}
        <div className="border rounded-md p-4 h-80 overflow-y-auto space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
              <BrainIcon className="h-12 w-12 mb-4 opacity-20" />
              <h3 className="text-lg font-medium">AI助手已准备就绪</h3>
              <p className="max-w-md">选择助手模式，输入您的问题或需求，AI将为您提供帮助。</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 relative group ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => copyToClipboard(message.content, message.id)}
                            >
                              {copiedMessageId === message.id ? (
                                <Check className="h-3 w-3" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>复制内容</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div
                    className={`text-xs mt-1 ${
                      message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 输入区域 */}
        {(mode === "chat" || mode === "code" || mode === "document") && (
          <div className="flex space-x-2">
            <Input
              placeholder={
                mode === "chat" ? "输入消息..." : mode === "code" ? "描述需要生成的代码..." : "描述需要生成的文档..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              disabled={isProcessing}
            />
            <Button onClick={sendMessage} disabled={isProcessing || !input.trim()}>
              {isProcessing ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : mode === "chat" ? (
                <Send className="h-4 w-4" />
              ) : mode === "code" ? (
                <Code className="h-4 w-4" />
              ) : (
                <FileText className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 mr-1" />
          由AI提供支持
        </div>
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>使用帮助</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <BookOpen className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>查看示例</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  )
}
