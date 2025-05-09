"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Cloud, Search, Server, Database, ArrowUpRight, Filter, BookOpen, AlertTriangle } from "lucide-react"

// 云服务提供商数据
const cloudProviders = [
  {
    id: 1,
    name: "Amazon Web Services",
    shortName: "AWS",
    description: "全球最全面和广泛采用的云平台",
    category: "公有云",
    services: ["计算", "存储", "数据库", "网络", "AI/ML", "IoT", "安全"],
    regions: 25,
    website: "https://aws.amazon.com/",
    logo: "/placeholder.svg?height=40&width=40&query=AWS",
  },
  {
    id: 2,
    name: "Microsoft Azure",
    shortName: "Azure",
    description: "微软的企业级云计算平台",
    category: "公有云",
    services: ["计算", "存储", "数据库", "网络", "AI/ML", "IoT", "安全"],
    regions: 60,
    website: "https://azure.microsoft.com/",
    logo: "/placeholder.svg?height=40&width=40&query=Azure",
  },
  {
    id: 3,
    name: "Google Cloud Platform",
    shortName: "GCP",
    description: "谷歌的云计算服务套件",
    category: "公有云",
    services: ["计算", "存储", "数据库", "网络", "AI/ML", "大数据", "安全"],
    regions: 24,
    website: "https://cloud.google.com/",
    logo: "/placeholder.svg?height=40&width=40&query=GCP",
  },
  {
    id: 4,
    name: "阿里云",
    shortName: "Alibaba Cloud",
    description: "阿里巴巴集团的云计算服务",
    category: "公有云",
    services: ["计算", "存储", "数据库", "网络", "AI/ML", "IoT", "安全"],
    regions: 24,
    website: "https://www.alibabacloud.com/",
    logo: "/placeholder.svg?height=40&width=40&query=Alibaba Cloud",
  },
  {
    id: 5,
    name: "腾讯云",
    shortName: "Tencent Cloud",
    description: "腾讯的云计算服务平台",
    category: "公有云",
    services: ["计算", "存储", "数据库", "网络", "AI/ML", "安全", "游戏"],
    regions: 26,
    website: "https://intl.cloud.tencent.com/",
    logo: "/placeholder.svg?height=40&width=40&query=Tencent Cloud",
  },
  {
    id: 6,
    name: "IBM Cloud",
    shortName: "IBM Cloud",
    description: "IBM的云计算服务平台",
    category: "混合云",
    services: ["计算", "存储", "数据库", "网络", "AI/ML", "区块链", "安全"],
    regions: 18,
    website: "https://www.ibm.com/cloud",
    logo: "/placeholder.svg?height=40&width=40&query=IBM Cloud",
  },
  {
    id: 7,
    name: "Oracle Cloud",
    shortName: "OCI",
    description: "Oracle的企业级云计算平台",
    category: "公有云",
    services: ["计算", "存储", "数据库", "网络", "分析", "安全"],
    regions: 29,
    website: "https://www.oracle.com/cloud/",
    logo: "/placeholder.svg?height=40&width=40&query=Oracle Cloud",
  },
  {
    id: 8,
    name: "DigitalOcean",
    shortName: "DigitalOcean",
    description: "面向开发者的简单云计算平台",
    category: "公有云",
    services: ["计算", "存储", "数据库", "网络", "Kubernetes"],
    regions: 8,
    website: "https://www.digitalocean.com/",
    logo: "/placeholder.svg?height=40&width=40&query=DigitalOcean",
  },
]

// 云服务类型数据
const cloudServices = [
  {
    id: 1,
    name: "基础设施即服务 (IaaS)",
    description: "提供虚拟化计算资源",
    examples: ["AWS EC2", "Azure Virtual Machines", "Google Compute Engine"],
    benefits: ["灵活性高", "按需付费", "可扩展性", "减少硬件投资"],
    useCases: ["托管网站和应用", "开发和测试环境", "高性能计算", "数据存储和备份"],
  },
  {
    id: 2,
    name: "平台即服务 (PaaS)",
    description: "提供应用开发和部署平台",
    examples: ["Heroku", "Google App Engine", "Azure App Service"],
    benefits: ["简化开发", "减少管理开销", "自动扩展", "内置开发工具"],
    useCases: ["Web应用开发", "API开发", "业务分析", "物联网应用"],
  },
  {
    id: 3,
    name: "软件即服务 (SaaS)",
    description: "通过互联网提供的软件应用",
    examples: ["Salesforce", "Google Workspace", "Microsoft 365"],
    benefits: ["无需安装", "自动更新", "随处访问", "订阅模式"],
    useCases: ["客户关系管理", "协作工具", "电子邮件服务", "人力资源管理"],
  },
  {
    id: 4,
    name: "函数即服务 (FaaS)",
    description: "无服务器计算模型",
    examples: ["AWS Lambda", "Azure Functions", "Google Cloud Functions"],
    benefits: ["按使用付费", "自动扩展", "无需管理服务器", "事件驱动"],
    useCases: ["API后端", "数据处理", "实时文件处理", "IoT后端"],
  },
  {
    id: 5,
    name: "容器即服务 (CaaS)",
    description: "容器部署和管理平台",
    examples: ["Kubernetes", "Docker Swarm", "Amazon ECS"],
    benefits: ["简化部署", "资源优化", "可移植性", "隔离性"],
    useCases: ["微服务架构", "DevOps流程", "应用现代化", "混合云部署"],
  },
  {
    id: 6,
    name: "数据库即服务 (DBaaS)",
    description: "云端托管的数据库服务",
    examples: ["Amazon RDS", "Azure SQL Database", "Google Cloud SQL"],
    benefits: ["自动备份", "高可用性", "按需扩展", "减少管理开销"],
    useCases: ["Web应用后端", "移动应用后端", "数据分析", "内容管理系统"],
  },
]

// 云计算架构模式
const cloudArchitectures = [
  {
    id: 1,
    name: "微服务架构",
    description: "将应用拆分为小型、松散耦合的服务",
    benefits: ["独立部署", "技术多样性", "故障隔离", "团队自治"],
    challenges: ["分布式系统复杂性", "服务间通信", "数据一致性", "监控与追踪"],
    bestPractices: ["API网关模式", "服务发现机制", "断路器模式", "容器化部署", "自动化CI/CD"],
  },
  {
    id: 2,
    name: "无服务器架构",
    description: "构建不需要管理服务器的应用",
    benefits: ["按需扩展", "降低运维成本", "专注业务逻辑", "快速部署"],
    challenges: ["冷启动延迟", "供应商锁定", "调试复杂", "执行时间限制"],
    bestPractices: ["函数粒度设计", "状态管理策略", "异步处理模式", "事件驱动架构", "本地测试环境"],
  },
  {
    id: 3,
    name: "容器编排架构",
    description: "自动化容器的部署、扩展和管理",
    benefits: ["资源优化", "自动扩展", "服务发现", "负载均衡"],
    challenges: ["学习曲线", "网络复杂性", "存储管理", "安全配置"],
    bestPractices: ["不可变基础设施", "健康检查机制", "资源限制设置", "网络策略定义", "持续部署流水线"],
  },
  {
    id: 4,
    name: "多云架构",
    description: "跨多个云服务提供商部署应用",
    benefits: ["避免供应商锁定", "优化成本", "地理冗余", "服务选择灵活性"],
    challenges: ["管理复杂性", "一致性维护", "数据传输成本", "技能要求高"],
    bestPractices: ["抽象化云服务API", "统一监控策略", "数据同步机制", "灾难恢复计划", "自动化部署工具"],
  },
  {
    id: 5,
    name: "事件驱动架构",
    description: "基于事件的生产、检测和消费构建系统",
    benefits: ["松耦合", "实时响应", "可扩展性", "灵活性"],
    challenges: ["事件顺序保证", "幂等性处理", "事件溯源", "调试困难"],
    bestPractices: ["消息队列使用", "事件存储模式", "命令查询责任分离(CQRS)", "异步通信", "事件标准化"],
  },
]

// 云计算教程数据
const cloudTutorials = [
  {
    id: 1,
    title: "云计算基础入门",
    description: "了解云计算的基本概念、服务模型和部署模型",
    level: "初级",
    duration: "2小时",
    topics: ["云计算概述", "服务模型", "部署模型", "主要云提供商"],
    link: "#cloud-basics",
  },
  {
    id: 2,
    title: "AWS服务实战",
    description: "学习使用Amazon Web Services的核心服务",
    level: "中级",
    duration: "5小时",
    topics: ["EC2", "S3", "RDS", "Lambda", "CloudFormation"],
    link: "#aws-services",
  },
  {
    id: 3,
    title: "容器和Kubernetes",
    description: "掌握容器技术和Kubernetes编排平台",
    level: "中级",
    duration: "6小时",
    topics: ["Docker基础", "Kubernetes架构", "Pod管理", "服务和网络", "持久化存储"],
    link: "#containers-kubernetes",
  },
  {
    id: 4,
    title: "云原生应用开发",
    description: "学习设计和构建云原生应用",
    level: "高级",
    duration: "8小时",
    topics: ["微服务设计", "API网关", "服务网格", "可观测性", "CI/CD流水线"],
    link: "#cloud-native",
  },
]

export function CloudComputingClientPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // 过滤云服务提供商
  const filteredProviders = cloudProviders.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || provider.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // 获取所有唯一的提供商类别
  const categories = ["all", ...new Set(cloudProviders.map((provider) => provider.category))]

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">云端计算</h1>
          <p className="text-muted-foreground">云计算服务、架构和最佳实践</p>
        </div>
      </div>

      <Tabs defaultValue="providers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="providers">
            <Cloud className="h-4 w-4 mr-2" />
            云服务提供商
          </TabsTrigger>
          <TabsTrigger value="services">
            <Server className="h-4 w-4 mr-2" />
            云服务类型
          </TabsTrigger>
          <TabsTrigger value="architectures">
            <Database className="h-4 w-4 mr-2" />
            云架构模式
          </TabsTrigger>
          <TabsTrigger value="tutorials">
            <BookOpen className="h-4 w-4 mr-2" />
            云计算教程
          </TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索云服务提供商..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === "all" ? "全部" : category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProviders.map((provider) => (
              <Card key={provider.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={provider.logo || "/placeholder.svg"}
                        alt={provider.name}
                        className="w-10 h-10 rounded"
                      />
                      <div>
                        <CardTitle className="text-lg">{provider.name}</CardTitle>
                        <CardDescription>{provider.shortName}</CardDescription>
                      </div>
                    </div>
                    <Badge>{provider.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{provider.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">区域数量:</span>
                      <span className="font-medium">{provider.regions}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">提供服务:</span>
                      <div className="flex flex-wrap gap-2">
                        {provider.services.map((service) => (
                          <Badge key={service} variant="outline">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={provider.website} target="_blank" rel="noopener noreferrer">
                      访问官网
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cloudServices.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">代表性服务</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.examples.map((example) => (
                        <Badge key={example} variant="outline">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">主要优势</h4>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="text-sm flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">适用场景</h4>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {service.useCases.map((useCase) => (
                        <li key={useCase} className="text-sm flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="architectures" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {cloudArchitectures.map((arch) => (
              <Card key={arch.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{arch.name}</CardTitle>
                  <CardDescription>{arch.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">优势</h4>
                      <ul className="space-y-1">
                        {arch.benefits.map((benefit) => (
                          <li key={benefit} className="text-sm flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">挑战</h4>
                      <ul className="space-y-1">
                        {arch.challenges.map((challenge) => (
                          <li key={challenge} className="text-sm flex items-center">
                            <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">最佳实践</h4>
                    <div className="flex flex-wrap gap-2">
                      {arch.bestPractices.map((practice) => (
                        <Badge key={practice} variant="outline">
                          {practice}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cloudTutorials.map((tutorial) => (
              <Card key={tutorial.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        tutorial.level === "初级"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : tutorial.level === "中级"
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : "bg-purple-100 text-purple-800 border-purple-200"
                      }
                    >
                      {tutorial.level}
                    </Badge>
                  </div>
                  <CardDescription>{tutorial.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Clock className="mr-1 h-4 w-4" />
                    {tutorial.duration}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">涵盖主题</h4>
                    <div className="flex flex-wrap gap-2">
                      {tutorial.topics.map((topic) => (
                        <Badge key={topic} variant="outline">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <a href={tutorial.link}>
                      开始学习
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CheckCircle(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function Clock(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
