"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Code,
  BookOpen,
  Search,
  ExternalLink,
  Star,
  ThumbsUp,
  Clock,
  Tag,
  Bookmark,
  Share2,
  FileCode,
  Server,
  Layout,
  Palette,
  Zap,
  Users,
} from "lucide-react"

// 资源类型定义
interface Resource {
  id: string
  title: string
  description: string
  url: string
  category: string
  tags: string[]
  rating: number
  popularity: number
  level: "初级" | "中级" | "高级" | "所有级别"
  updatedAt: string
}

// 工具类型定义
interface Tool {
  id: string
  name: string
  description: string
  url: string
  category: string
  tags: string[]
  popularity: number
  free: boolean
  logo: string
}

// 教程类型定义
interface Tutorial {
  id: string
  title: string
  description: string
  url: string
  author: string
  level: "初级" | "中级" | "高级"
  duration: string
  tags: string[]
  rating: number
  views: number
  date: string
}

// 模拟资源数据
const resourcesData: Resource[] = [
  {
    id: "1",
    title: "MDN Web 文档",
    description: "Mozilla 的 Web 技术文档，提供有关 HTML、CSS 和 JavaScript 的详细参考和教程。",
    url: "https://developer.mozilla.org/zh-CN/",
    category: "文档",
    tags: ["HTML", "CSS", "JavaScript", "Web API"],
    rating: 4.9,
    popularity: 98,
    level: "所有级别",
    updatedAt: "2023-05-15",
  },
  {
    id: "2",
    title: "CSS-Tricks",
    description: "提供各种 CSS 技巧和解决方案的网站，包含大量实用示例和教程。",
    url: "https://css-tricks.com/",
    category: "博客",
    tags: ["CSS", "布局", "动画", "响应式设计"],
    rating: 4.8,
    popularity: 92,
    level: "所有级别",
    updatedAt: "2023-05-10",
  },
  {
    id: "3",
    title: "JavaScript.info",
    description: "现代 JavaScript 教程，从基础到高级，包含详细的解释和示例。",
    url: "https://javascript.info/",
    category: "教程",
    tags: ["JavaScript", "ES6", "DOM", "异步编程"],
    rating: 4.9,
    popularity: 95,
    level: "所有级别",
    updatedAt: "2023-05-20",
  },
  {
    id: "4",
    title: "React 官方文档",
    description: "React 官方文档，包含完整的 API 参考、教程和最佳实践。",
    url: "https://reactjs.org/docs/getting-started.html",
    category: "文档",
    tags: ["React", "JavaScript", "前端框架", "组件"],
    rating: 4.8,
    popularity: 96,
    level: "所有级别",
    updatedAt: "2023-05-18",
  },
  {
    id: "5",
    title: "Vue.js 官方指南",
    description: "Vue.js 的官方指南，包含从入门到高级的所有内容。",
    url: "https://cn.vuejs.org/guide/introduction.html",
    category: "文档",
    tags: ["Vue", "JavaScript", "前端框架", "组件"],
    rating: 4.7,
    popularity: 94,
    level: "所有级别",
    updatedAt: "2023-05-12",
  },
  {
    id: "6",
    title: "Web.dev",
    description: "Google 提供的现代 Web 开发指南，涵盖性能、安全性和最佳实践。",
    url: "https://web.dev/",
    category: "指南",
    tags: ["性能优化", "PWA", "Web Vitals", "最佳实践"],
    rating: 4.6,
    popularity: 90,
    level: "中级",
    updatedAt: "2023-05-08",
  },
  {
    id: "7",
    title: "Smashing Magazine",
    description: "专注于 Web 设计和开发的在线杂志，提供高质量的文章和教程。",
    url: "https://www.smashingmagazine.com/",
    category: "博客",
    tags: ["设计", "UX", "CSS", "JavaScript"],
    rating: 4.5,
    popularity: 88,
    level: "所有级别",
    updatedAt: "2023-05-05",
  },
  {
    id: "8",
    title: "Next.js 文档",
    description: "Next.js 的官方文档，包含从入门到高级的所有内容。",
    url: "https://nextjs.org/docs",
    category: "文档",
    tags: ["Next.js", "React", "SSR", "静态生成"],
    rating: 4.8,
    popularity: 93,
    level: "中级",
    updatedAt: "2023-05-17",
  },
  {
    id: "9",
    title: "TypeScript 手册",
    description: "TypeScript 的官方手册，包含语言特性和高级类型的详细说明。",
    url: "https://www.typescriptlang.org/docs/",
    category: "文档",
    tags: ["TypeScript", "JavaScript", "类型系统"],
    rating: 4.7,
    popularity: 91,
    level: "中级",
    updatedAt: "2023-05-14",
  },
  {
    id: "10",
    title: "CSS Grid 完全指南",
    description: "关于 CSS Grid 布局的完整指南，包含大量示例和实用技巧。",
    url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
    category: "指南",
    tags: ["CSS", "Grid", "布局"],
    rating: 4.9,
    popularity: 89,
    level: "中级",
    updatedAt: "2023-05-03",
  },
]

// 模拟工具数据
const toolsData: Tool[] = [
  {
    id: "1",
    name: "Visual Studio Code",
    description: "微软开发的免费、开源代码编辑器，支持多种编程语言和扩展。",
    url: "https://code.visualstudio.com/",
    category: "编辑器",
    tags: ["编辑器", "开发工具", "扩展"],
    popularity: 98,
    free: true,
    logo: "/placeholder.svg?key=pwg3g",
  },
  {
    id: "2",
    name: "Chrome DevTools",
    description: "Chrome 浏览器内置的开发者工具，用于调试和分析网页。",
    url: "https://developer.chrome.com/docs/devtools/",
    category: "调试工具",
    tags: ["调试", "性能", "网络"],
    popularity: 96,
    free: true,
    logo: "/placeholder.svg?key=aew1h",
  },
  {
    id: "3",
    name: "Figma",
    description: "基于浏览器的协作设计工具，用于UI/UX设计和原型制作。",
    url: "https://www.figma.com/",
    category: "设计工具",
    tags: ["设计", "原型", "协作"],
    popularity: 92,
    free: true,
    logo: "/placeholder.svg?key=t50c4",
  },
  {
    id: "4",
    name: "GitHub",
    description: "基于Git的代码托管平台，提供版本控制和协作功能。",
    url: "https://github.com/",
    category: "版本控制",
    tags: ["Git", "协作", "开源"],
    popularity: 97,
    free: true,
    logo: "/github-logo.png",
  },
  {
    id: "5",
    name: "Webpack",
    description: "现代JavaScript应用程序的静态模块打包工具。",
    url: "https://webpack.js.org/",
    category: "构建工具",
    tags: ["打包", "模块化", "构建"],
    popularity: 90,
    free: true,
    logo: "/placeholder.svg?key=55n8i",
  },
  {
    id: "6",
    name: "Postman",
    description: "API开发和测试工具，支持自动化测试和文档生成。",
    url: "https://www.postman.com/",
    category: "API工具",
    tags: ["API", "测试", "文档"],
    popularity: 89,
    free: true,
    logo: "/placeholder.svg?key=b1pba",
  },
  {
    id: "7",
    name: "Lighthouse",
    description: "Google开发的开源工具，用于改进网页质量和性能。",
    url: "https://developers.google.com/web/tools/lighthouse",
    category: "性能工具",
    tags: ["性能", "SEO", "PWA"],
    popularity: 85,
    free: true,
    logo: "/placeholder.svg?key=ifzpu",
  },
  {
    id: "8",
    name: "Vercel",
    description: "面向前端开发者的云平台，提供静态网站和Serverless函数部署。",
    url: "https://vercel.com/",
    category: "部署平台",
    tags: ["部署", "托管", "Serverless"],
    popularity: 88,
    free: true,
    logo: "/placeholder.svg?key=m08o6",
  },
  {
    id: "9",
    name: "Storybook",
    description: "UI组件开发和文档工具，支持多种前端框架。",
    url: "https://storybook.js.org/",
    category: "UI工具",
    tags: ["组件", "文档", "测试"],
    popularity: 84,
    free: true,
    logo: "/placeholder.svg?height=40&width=40&query=storybook",
  },
  {
    id: "10",
    name: "Tailwind CSS",
    description: "功能类优先的CSS框架，用于快速构建自定义用户界面。",
    url: "https://tailwindcss.com/",
    category: "CSS框架",
    tags: ["CSS", "响应式", "设计系统"],
    popularity: 91,
    free: true,
    logo: "/placeholder.svg?height=40&width=40&query=tailwind",
  },
]

// 模拟教程数据
const tutorialsData: Tutorial[] = [
  {
    id: "1",
    title: "现代JavaScript完全指南",
    description: "从基础到高级的JavaScript教程，涵盖ES6+特性、异步编程和模块化。",
    url: "#",
    author: "张三",
    level: "初级",
    duration: "10小时",
    tags: ["JavaScript", "ES6", "异步编程"],
    rating: 4.8,
    views: 15680,
    date: "2023-04-15",
  },
  {
    id: "2",
    title: "React从入门到精通",
    description: "全面学习React框架，包括组件、状态管理、路由和Hooks。",
    url: "#",
    author: "李四",
    level: "中级",
    duration: "12小时",
    tags: ["React", "Hooks", "状态管理"],
    rating: 4.9,
    views: 18920,
    date: "2023-04-20",
  },
  {
    id: "3",
    title: "CSS Grid和Flexbox布局详解",
    description: "深入学习现代CSS布局技术，掌握响应式设计的核心。",
    url: "#",
    author: "王五",
    level: "中级",
    duration: "6小时",
    tags: ["CSS", "Grid", "Flexbox", "响应式设计"],
    rating: 4.7,
    views: 12450,
    date: "2023-04-10",
  },
  {
    id: "4",
    title: "TypeScript实战教程",
    description: "学习TypeScript的类型系统和高级特性，提升代码质量和可维护性。",
    url: "#",
    author: "赵六",
    level: "中级",
    duration: "8小时",
    tags: ["TypeScript", "类型系统", "接口"],
    rating: 4.6,
    views: 10280,
    date: "2023-04-25",
  },
  {
    id: "5",
    title: "Next.js应用开发",
    description: "使用Next.js构建高性能的React应用，包括SSR、静态生成和API路由。",
    url: "#",
    author: "钱七",
    level: "高级",
    duration: "9小时",
    tags: ["Next.js", "React", "SSR", "API"],
    rating: 4.8,
    views: 9870,
    date: "2023-05-01",
  },
  {
    id: "6",
    title: "Web性能优化指南",
    description: "学习提升网站性能的各种技术和最佳实践，包括加载优化和渲染优化。",
    url: "#",
    author: "孙八",
    level: "高级",
    duration: "7小时",
    tags: ["性能优化", "Web Vitals", "缓存"],
    rating: 4.7,
    views: 8650,
    date: "2023-05-05",
  },
  {
    id: "7",
    title: "现代CSS动画和过渡效果",
    description: "掌握CSS动画、过渡和变换，创建流畅的用户界面交互。",
    url: "#",
    author: "周九",
    level: "中级",
    duration: "5小时",
    tags: ["CSS", "动画", "过渡", "变换"],
    rating: 4.5,
    views: 7890,
    date: "2023-04-18",
  },
  {
    id: "8",
    title: "Vue.js 3完全指南",
    description: "学习Vue.js 3的新特性和Composition API，构建现代化的前端应用。",
    url: "#",
    author: "吴十",
    level: "中级",
    duration: "11小时",
    tags: ["Vue", "Composition API", "状态管理"],
    rating: 4.9,
    views: 14560,
    date: "2023-04-28",
  },
]

export function WebDevClientPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("resources")

  // 过滤资源
  const filteredResources = resourcesData.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // 过滤工具
  const filteredTools = toolsData.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // 过滤教程
  const filteredTutorials = tutorialsData.filter(
    (tutorial) =>
      tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutorial.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">网页开发</h1>
          <p className="text-muted-foreground">探索网页开发的资源、工具和教程，提升您的前端和后端开发技能</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索资源、工具和教程..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-blue-700">
              <Layout className="h-5 w-5 mr-2 text-blue-500" />
              前端开发
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-700">HTML, CSS, JavaScript, 框架和库</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-700">
              <Server className="h-5 w-5 mr-2 text-green-500" />
              后端开发
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-700">服务器, API, 数据库和架构</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-purple-700">
              <Palette className="h-5 w-5 mr-2 text-purple-500" />
              UI/UX设计
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-purple-700">设计原则, 工具和最佳实践</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-orange-700">
              <Zap className="h-5 w-5 mr-2 text-orange-500" />
              性能优化
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-orange-700">加载速度, 渲染性能和用户体验</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            学习资源
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            开发工具
          </TabsTrigger>
          <TabsTrigger value="tutorials" className="flex items-center gap-2">
            <FileCode className="h-4 w-4" />
            教程
          </TabsTrigger>
        </TabsList>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <Card key={resource.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <Badge variant="outline">{resource.category}</Badge>
                    </div>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-1 mt-2">
                      {resource.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-100">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>{resource.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 text-blue-500 mr-1" />
                        <span>{resource.popularity}%</span>
                      </div>
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 text-green-500 mr-1" />
                        <span>{resource.level}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-between items-center border-t">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>更新于 {resource.updatedAt}</span>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        访问
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">没有找到匹配的资源</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.length > 0 ? (
              filteredTools.map((tool) => (
                <Card key={tool.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                        <img
                          src={tool.logo || "/placeholder.svg"}
                          alt={tool.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <Badge variant="outline">{tool.category}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {tool.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-100">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4 text-sm">
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 text-blue-500 mr-1" />
                        <span>{tool.popularity}% 推荐</span>
                      </div>
                      <Badge variant={tool.free ? "success" : "default"}>{tool.free ? "免费" : "付费"}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-end border-t">
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <a href={tool.url} target="_blank" rel="noopener noreferrer">
                        访问官网
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">没有找到匹配的工具</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTutorials.length > 0 ? (
              filteredTutorials.map((tutorial) => (
                <Card key={tutorial.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                      <Badge
                        variant={
                          tutorial.level === "初级" ? "outline" : tutorial.level === "中级" ? "secondary" : "default"
                        }
                      >
                        {tutorial.level}
                      </Badge>
                    </div>
                    <CardDescription>{tutorial.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-1 mt-2">
                      {tutorial.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-100">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-blue-500 mr-1" />
                        <span>{tutorial.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>{tutorial.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-green-500 mr-1" />
                        <span>{tutorial.views.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-between items-center border-t">
                    <div className="text-xs text-muted-foreground">
                      作者: {tutorial.author} | 发布于: {tutorial.date}
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={tutorial.url}>查看</a>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">没有找到匹配的教程</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
