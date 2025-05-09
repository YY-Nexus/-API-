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
  Bookmark,
  Share2,
  Smartphone,
  Layers,
  Apple,
  SmartphoneIcon as Android,
  Users,
} from "lucide-react"

// 框架类型定义
interface Framework {
  id: string
  name: string
  description: string
  url: string
  category: "原生" | "跨平台" | "混合" | "PWA"
  platforms: string[]
  tags: string[]
  popularity: number
  companies: string[]
  logo: string
}

// 工具类型定义
interface Tool {
  id: string
  name: string
  description: string
  url: string
  category: string
  platforms: string[]
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
  platform: string
  level: "初级" | "中级" | "高级"
  duration: string
  tags: string[]
  rating: number
  views: number
  date: string
}

// 模拟框架数据
const frameworksData: Framework[] = [
  {
    id: "1",
    name: "React Native",
    description: "使用React构建原生移动应用的框架，支持iOS和Android平台。",
    url: "https://reactnative.dev/",
    category: "跨平台",
    platforms: ["iOS", "Android"],
    tags: ["JavaScript", "React", "跨平台"],
    popularity: 92,
    companies: ["Facebook", "Instagram", "Discord"],
    logo: "/placeholder.svg?height=40&width=40&query=react-native",
  },
  {
    id: "2",
    name: "Flutter",
    description: "Google的UI工具包，用于从单一代码库构建美观、原生的应用程序，支持多个平台。",
    url: "https://flutter.dev/",
    category: "跨平台",
    platforms: ["iOS", "Android", "Web", "桌面"],
    tags: ["Dart", "跨平台", "UI工具包"],
    popularity: 94,
    companies: ["Google", "阿里巴巴", "腾讯"],
    logo: "/placeholder.svg?height=40&width=40&query=flutter",
  },
  {
    id: "3",
    name: "Swift UI",
    description: "Apple的声明式UI框架，用于在所有Apple平台上构建用户界面。",
    url: "https://developer.apple.com/xcode/swiftui/",
    category: "原生",
    platforms: ["iOS", "macOS", "watchOS", "tvOS"],
    tags: ["Swift", "声明式UI", "Apple生态"],
    popularity: 85,
    companies: ["Apple", "Lyft", "Uber"],
    logo: "/placeholder.svg?height=40&width=40&query=swiftui",
  },
  {
    id: "4",
    name: "Kotlin for Android",
    description: "Google推荐的Android应用开发语言，提供现代语言特性和更好的安全性。",
    url: "https://developer.android.com/kotlin",
    category: "原生",
    platforms: ["Android"],
    tags: ["Kotlin", "Android", "JetPack"],
    popularity: 88,
    companies: ["Google", "Pinterest", "Netflix"],
    logo: "/placeholder.svg?height=40&width=40&query=kotlin",
  },
  {
    id: "5",
    name: "Ionic",
    description: "使用Web技术构建跨平台移动应用的框架，支持Angular、React和Vue。",
    url: "https://ionicframework.com/",
    category: "混合",
    platforms: ["iOS", "Android", "Web"],
    tags: ["JavaScript", "HTML", "CSS", "混合应用"],
    popularity: 78,
    companies: ["GE", "Amtrak", "Pacifica"],
    logo: "/placeholder.svg?height=40&width=40&query=ionic",
  },
  {
    id: "6",
    name: "Xamarin",
    description: "微软的跨平台应用开发框架，使用C#构建原生iOS和Android应用。",
    url: "https://dotnet.microsoft.com/apps/xamarin",
    category: "跨平台",
    platforms: ["iOS", "Android", "Windows"],
    tags: ["C#", ".NET", "跨平台"],
    popularity: 75,
    companies: ["Microsoft", "UPS", "Alaska Airlines"],
    logo: "/placeholder.svg?height=40&width=40&query=xamarin",
  },
  {
    id: "7",
    name: "PWA",
    description: "渐进式Web应用，结合了Web和原生应用的优点，提供类似原生应用的体验。",
    url: "https://web.dev/progressive-web-apps/",
    category: "PWA",
    platforms: ["Web", "iOS", "Android"],
    tags: ["JavaScript", "Web", "离线功能"],
    popularity: 82,
    companies: ["Twitter", "Starbucks", "Spotify"],
    logo: "/placeholder.svg?height=40&width=40&query=pwa",
  },
  {
    id: "8",
    name: "NativeScript",
    description: "使用JavaScript或TypeScript构建真正原生的iOS和Android应用的开源框架。",
    url: "https://nativescript.org/",
    category: "跨平台",
    platforms: ["iOS", "Android"],
    tags: ["JavaScript", "TypeScript", "Angular", "Vue"],
    popularity: 72,
    companies: ["SAP", "Philips", "VMware"],
    logo: "/placeholder.svg?height=40&width=40&query=nativescript",
  },
]

// 模拟工具数据
const toolsData: Tool[] = [
  {
    id: "1",
    name: "Android Studio",
    description: "Google官方的Android应用开发IDE，提供完整的工具链和模拟器。",
    url: "https://developer.android.com/studio",
    category: "IDE",
    platforms: ["Android"],
    tags: ["IDE", "模拟器", "调试工具"],
    popularity: 95,
    free: true,
    logo: "/placeholder.svg?height=40&width=40&query=android-studio",
  },
  {
    id: "2",
    name: "Xcode",
    description: "Apple官方的iOS应用开发IDE，提供完整的工具链和模拟器。",
    url: "https://developer.apple.com/xcode/",
    category: "IDE",
    platforms: ["iOS", "macOS"],
    tags: ["IDE", "模拟器", "调试工具"],
    popularity: 93,
    free: true,
    logo: "/placeholder.svg?height=40&width=40&query=xcode",
  },
  {
    id: "3",
    name: "Visual Studio Code",
    description: "微软开发的轻量级代码编辑器，支持多种编程语言和扩展。",
    url: "https://code.visualstudio.com/",
    category: "编辑器",
    platforms: ["跨平台"],
    tags: ["编辑器", "扩展", "调试"],
    popularity: 96,
    free: true,
    logo: "/placeholder.svg?key=qv20f",
  },
  {
    id: "4",
    name: "Expo",
    description: "用于React Native开发的工具链，简化了开发和部署过程。",
    url: "https://expo.dev/",
    category: "开发工具",
    platforms: ["iOS", "Android"],
    tags: ["React Native", "开发工具", "部署"],
    popularity: 88,
    free: true,
    logo: "/placeholder.svg?height=40&width=40&query=expo",
  },
  {
    id: "5",
    name: "Firebase",
    description: "Google的移动和Web应用开发平台，提供后端服务、分析和崩溃报告。",
    url: "https://firebase.google.com/",
    category: "后端服务",
    platforms: ["iOS", "Android", "Web"],
    tags: ["后端", "分析", "崩溃报告"],
    popularity: 90,
    free: true,
    logo: "/placeholder.svg?height=40&width=40&query=firebase",
  },
  {
    id: "6",
    name: "Fastlane",
    description: "自动化构建和发布iOS和Android应用的工具，简化了CI/CD流程。",
    url: "https://fastlane.tools/",
    category: "CI/CD",
    platforms: ["iOS", "Android"],
    tags: ["自动化", "部署", "测试"],
    popularity: 85,
    free: true,
    logo: "/placeholder.svg?height=40&width=40&query=fastlane",
  },
  {
    id: "7",
    name: "App Center",
    description: "微软的移动应用开发平台，提供构建、测试、分发和监控服务。",
    url: "https://appcenter.ms/",
    category: "开发平台",
    platforms: ["iOS", "Android", "Windows"],
    tags: ["构建", "测试", "分发"],
    popularity: 82,
    free: true,
    logo: "/placeholder.svg?height=40&width=40&query=appcenter",
  },
  {
    id: "8",
    name: "Figma",
    description: "基于浏览器的协作设计工具，用于UI/UX设计和原型制作。",
    url: "https://www.figma.com/",
    category: "设计工具",
    platforms: ["跨平台"],
    tags: ["设计", "原型", "协作"],
    popularity: 92,
    free: true,
    logo: "/placeholder.svg?key=1rt6y",
  },
]

// 模拟教程数据
const tutorialsData: Tutorial[] = [
  {
    id: "1",
    title: "React Native入门指南",
    description: "从零开始学习React Native，构建跨平台移动应用。",
    url: "#",
    author: "张三",
    platform: "React Native",
    level: "初级",
    duration: "8小时",
    tags: ["React Native", "JavaScript", "跨平台"],
    rating: 4.8,
    views: 15680,
    date: "2023-04-15",
  },
  {
    id: "2",
    title: "Flutter完全教程",
    description: "全面学习Flutter框架，使用Dart语言构建美观的跨平台应用。",
    url: "#",
    author: "李四",
    platform: "Flutter",
    level: "中级",
    duration: "12小时",
    tags: ["Flutter", "Dart", "UI设计"],
    rating: 4.9,
    views: 18920,
    date: "2023-04-20",
  },
  {
    id: "3",
    title: "Swift UI实战教程",
    description: "学习使用Swift UI构建现代化的iOS应用界面。",
    url: "#",
    author: "王五",
    platform: "iOS",
    level: "中级",
    duration: "10小时",
    tags: ["Swift UI", "iOS", "Apple"],
    rating: 4.7,
    views: 12450,
    date: "2023-04-10",
  },
  {
    id: "4",
    title: "Kotlin Android开发",
    description: "使用Kotlin语言进行Android应用开发的完整指南。",
    url: "#",
    author: "赵六",
    platform: "Android",
    level: "中级",
    duration: "9小时",
    tags: ["Kotlin", "Android", "JetPack"],
    rating: 4.6,
    views: 10280,
    date: "2023-04-25",
  },
  {
    id: "5",
    title: "移动应用UI/UX设计原则",
    description: "学习移动应用界面设计的核心原则和最佳实践。",
    url: "#",
    author: "钱七",
    platform: "跨平台",
    level: "初级",
    duration: "6小时",
    tags: ["UI", "UX", "设计", "用户体验"],
    rating: 4.8,
    views: 9870,
    date: "2023-05-01",
  },
  {
    id: "6",
    title: "移动应用性能优化",
    description: "提升移动应用性能的技术和策略，包括内存管理和渲染优化。",
    url: "#",
    author: "孙八",
    platform: "跨平台",
    level: "高级",
    duration: "7小时",
    tags: ["性能优化", "内存管理", "渲染"],
    rating: 4.7,
    views: 8650,
    date: "2023-05-05",
  },
  {
    id: "7",
    title: "PWA开发实战",
    description: "学习构建渐进式Web应用，提供类似原生应用的体验。",
    url: "#",
    author: "周九",
    platform: "Web",
    level: "中级",
    duration: "8小时",
    tags: ["PWA", "Web", "离线功能"],
    rating: 4.5,
    views: 7890,
    date: "2023-04-18",
  },
  {
    id: "8",
    title: "移动应用后端集成",
    description: "学习如何将移动应用与各种后端服务集成，包括认证和数据存储。",
    url: "#",
    author: "吴十",
    platform: "跨平台",
    level: "中级",
    duration: "9小时",
    tags: ["后端", "API", "认证", "数据存储"],
    rating: 4.6,
    views: 8120,
    date: "2023-04-28",
  },
]

export function MobileDevClientPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("frameworks")

  // 过滤框架
  const filteredFrameworks = frameworksData.filter(
    (framework) =>
      framework.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      framework.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      framework.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
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
          <h1 className="text-3xl font-bold mb-2">移动开发</h1>
          <p className="text-muted-foreground">探索移动应用开发的框架、工具和教程，提升您的iOS和Android开发技能</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索框架、工具和教程..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-700">
              <Android className="h-5 w-5 mr-2 text-green-500" />
              Android开发
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-700">Kotlin, Java, Android Studio和Jetpack</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-blue-700">
              <Apple className="h-5 w-5 mr-2 text-blue-500" />
              iOS开发
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-700">Swift, SwiftUI, Objective-C和Xcode</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-purple-700">
              <Smartphone className="h-5 w-5 mr-2 text-purple-500" />
              跨平台开发
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-purple-700">React Native, Flutter, Xamarin和PWA</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="frameworks" className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            开发框架
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            开发工具
          </TabsTrigger>
          <TabsTrigger value="tutorials" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            教程
          </TabsTrigger>
        </TabsList>

        <TabsContent value="frameworks" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFrameworks.length > 0 ? (
              filteredFrameworks.map((framework) => (
                <Card key={framework.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                        <img
                          src={framework.logo || "/placeholder.svg"}
                          alt={framework.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{framework.name}</CardTitle>
                        <Badge
                          variant={
                            framework.category === "原生"
                              ? "outline"
                              : framework.category === "跨平台"
                                ? "secondary"
                                : framework.category === "混合"
                                  ? "default"
                                  : "destructive"
                          }
                        >
                          {framework.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground mb-3">{framework.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {framework.platforms.map((platform, index) => (
                        <Badge key={index} variant="outline">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {framework.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-100">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">
                      <span className="font-medium">使用企业:</span> {framework.companies.join(", ")}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-between items-center border-t">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-sm">{framework.popularity}% 推荐</span>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <a href={framework.url} target="_blank" rel="noopener noreferrer">
                        官网
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">没有找到匹配的框架</p>
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
                    <div className="flex flex-wrap gap-1 mb-3">
                      {tool.platforms.map((platform, index) => (
                        <Badge key={index} variant="outline">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {tool.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-100">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-between items-center border-t">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-sm">{tool.popularity}% 推荐</span>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <a href={tool.url} target="_blank" rel="noopener noreferrer">
                        官网
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
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline">{tutorial.platform}</Badge>
                      <span className="text-xs text-muted-foreground">作者: {tutorial.author}</span>
                    </div>
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
                    <div className="text-xs text-muted-foreground">发布于: {tutorial.date}</div>
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
