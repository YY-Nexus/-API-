"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Database, Search, BookOpen, Server, BarChart, ArrowUpRight, Filter } from "lucide-react"

// 数据库技术数据
const databaseTechnologies = [
  {
    id: 1,
    name: "MySQL",
    description: "最流行的开源关系型数据库管理系统",
    category: "关系型",
    tags: ["SQL", "ACID", "开源"],
    popularity: 92,
    documentation: "https://dev.mysql.com/doc/",
    logo: "/placeholder.svg?key=qukc0",
  },
  {
    id: 2,
    name: "PostgreSQL",
    description: "功能强大的开源对象关系型数据库系统",
    category: "关系型",
    tags: ["SQL", "ACID", "开源", "地理数据"],
    popularity: 88,
    documentation: "https://www.postgresql.org/docs/",
    logo: "/placeholder.svg?key=xlnjn",
  },
  {
    id: 3,
    name: "MongoDB",
    description: "流行的文档型NoSQL数据库",
    category: "NoSQL",
    tags: ["文档型", "JSON", "分布式"],
    popularity: 85,
    documentation: "https://docs.mongodb.com/",
    logo: "/placeholder.svg?key=urmzj",
  },
  {
    id: 4,
    name: "Redis",
    description: "高性能的内存键值数据库",
    category: "NoSQL",
    tags: ["键值", "缓存", "内存数据库"],
    popularity: 87,
    documentation: "https://redis.io/documentation",
    logo: "/placeholder.svg?key=ljnfa",
  },
  {
    id: 5,
    name: "Elasticsearch",
    description: "分布式搜索和分析引擎",
    category: "搜索引擎",
    tags: ["全文搜索", "分析", "分布式"],
    popularity: 82,
    documentation: "https://www.elastic.co/guide/index.html",
    logo: "/placeholder.svg?key=7t9gc",
  },
  {
    id: 6,
    name: "Cassandra",
    description: "高度可扩展的分布式NoSQL数据库",
    category: "NoSQL",
    tags: ["列族", "分布式", "高可用"],
    popularity: 75,
    documentation: "https://cassandra.apache.org/doc/latest/",
    logo: "/placeholder.svg?key=c2u8c",
  },
  {
    id: 7,
    name: "SQLite",
    description: "轻量级的嵌入式SQL数据库引擎",
    category: "关系型",
    tags: ["嵌入式", "轻量级", "零配置"],
    popularity: 80,
    documentation: "https://www.sqlite.org/docs.html",
    logo: "/placeholder.svg?key=uyc2j",
  },
  {
    id: 8,
    name: "Neo4j",
    description: "高性能的图形数据库",
    category: "图形数据库",
    tags: ["图形", "关系", "Cypher查询语言"],
    popularity: 72,
    documentation: "https://neo4j.com/docs/",
    logo: "/placeholder.svg?height=40&width=40&query=Neo4j",
  },
]

// 存储解决方案数据
const storageServices = [
  {
    id: 1,
    name: "Amazon S3",
    description: "可扩展的对象存储服务",
    category: "对象存储",
    provider: "AWS",
    features: ["高可用", "无限扩展", "版本控制", "生命周期管理"],
    documentation: "https://docs.aws.amazon.com/s3/",
    logo: "/placeholder.svg?height=40&width=40&query=Amazon S3",
  },
  {
    id: 2,
    name: "Google Cloud Storage",
    description: "统一的对象存储服务",
    category: "对象存储",
    provider: "Google Cloud",
    features: ["全球分布", "强一致性", "加密", "访问控制"],
    documentation: "https://cloud.google.com/storage/docs",
    logo: "/placeholder.svg?height=40&width=40&query=Google Cloud Storage",
  },
  {
    id: 3,
    name: "Azure Blob Storage",
    description: "大规模云对象存储解决方案",
    category: "对象存储",
    provider: "Microsoft Azure",
    features: ["分层存储", "数据保护", "灾难恢复", "CDN集成"],
    documentation: "https://docs.microsoft.com/azure/storage/blobs/",
    logo: "/placeholder.svg?height=40&width=40&query=Azure Blob Storage",
  },
  {
    id: 4,
    name: "Amazon RDS",
    description: "关系型数据库托管服务",
    category: "数据库服务",
    provider: "AWS",
    features: ["自动备份", "高可用", "多引擎支持", "扩展性"],
    documentation: "https://docs.aws.amazon.com/rds/",
    logo: "/placeholder.svg?height=40&width=40&query=Amazon RDS",
  },
  {
    id: 5,
    name: "Firebase Realtime Database",
    description: "实时同步的云数据库",
    category: "NoSQL服务",
    provider: "Google",
    features: ["实时同步", "离线支持", "安全规则", "JSON存储"],
    documentation: "https://firebase.google.com/docs/database",
    logo: "/placeholder.svg?height=40&width=40&query=Firebase",
  },
  {
    id: 6,
    name: "MongoDB Atlas",
    description: "全托管的MongoDB云数据库服务",
    category: "NoSQL服务",
    provider: "MongoDB",
    features: ["自动扩展", "全球分布", "备份恢复", "监控"],
    documentation: "https://docs.atlas.mongodb.com/",
    logo: "/placeholder.svg?height=40&width=40&query=MongoDB Atlas",
  },
]

// 教程数据
const tutorials = [
  {
    id: 1,
    title: "SQL基础入门",
    description: "学习SQL语言基础和关系型数据库概念",
    level: "初级",
    duration: "2小时",
    topics: ["SELECT语句", "WHERE条件", "JOIN操作", "索引基础"],
    link: "#sql-basics",
  },
  {
    id: 2,
    title: "NoSQL数据库设计",
    description: "了解NoSQL数据库设计原则和最佳实践",
    level: "中级",
    duration: "3小时",
    topics: ["文档模型", "分片策略", "一致性模型", "查询优化"],
    link: "#nosql-design",
  },
  {
    id: 3,
    title: "数据库性能优化",
    description: "学习数据库性能调优和监控技术",
    level: "高级",
    duration: "4小时",
    topics: ["查询优化", "索引策略", "缓存机制", "执行计划分析"],
    link: "#performance-tuning",
  },
  {
    id: 4,
    title: "分布式数据存储",
    description: "探索分布式数据库架构和设计模式",
    level: "高级",
    duration: "5小时",
    topics: ["CAP定理", "分片技术", "复制策略", "一致性协议"],
    link: "#distributed-storage",
  },
]

export function DatabaseTechClientPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // 过滤数据库技术
  const filteredDatabases = databaseTechnologies.filter((db) => {
    const matchesSearch =
      db.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      db.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      db.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || db.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // 获取所有唯一的数据库类别
  const categories = ["all", ...new Set(databaseTechnologies.map((db) => db.category))]

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">数据存储技术</h1>
          <p className="text-muted-foreground">探索数据库技术、存储解决方案和最佳实践</p>
        </div>
      </div>

      <Tabs defaultValue="databases" className="space-y-4">
        <TabsList>
          <TabsTrigger value="databases">
            <Database className="h-4 w-4 mr-2" />
            数据库技术
          </TabsTrigger>
          <TabsTrigger value="storage">
            <Server className="h-4 w-4 mr-2" />
            存储解决方案
          </TabsTrigger>
          <TabsTrigger value="tutorials">
            <BookOpen className="h-4 w-4 mr-2" />
            教程资源
          </TabsTrigger>
          <TabsTrigger value="comparison">
            <BarChart className="h-4 w-4 mr-2" />
            技术对比
          </TabsTrigger>
        </TabsList>

        <TabsContent value="databases" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索数据库..."
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
            {filteredDatabases.map((db) => (
              <Card key={db.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={db.logo || "/placeholder.svg"} alt={db.name} className="w-10 h-10 rounded" />
                      <CardTitle className="text-lg">{db.name}</CardTitle>
                    </div>
                    <Badge>{db.category}</Badge>
                  </div>
                  <CardDescription>{db.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {db.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-2">
                    <div className="text-sm text-muted-foreground mb-1">流行度</div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${db.popularity}%` }}></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={db.documentation} target="_blank" rel="noopener noreferrer">
                      查看文档
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="storage" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {storageServices.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={service.logo || "/placeholder.svg"} alt={service.name} className="w-10 h-10 rounded" />
                      <div>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <CardDescription>{service.provider}</CardDescription>
                      </div>
                    </div>
                    <Badge>{service.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{service.description}</p>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">主要特性</h4>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {service.features.map((feature) => (
                        <li key={feature} className="text-sm flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={service.documentation} target="_blank" rel="noopener noreferrer">
                      查看文档
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tutorials.map((tutorial) => (
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

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>数据库技术对比</CardTitle>
              <CardDescription>各类数据库技术特性和适用场景对比</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">数据库类型</th>
                      <th className="text-left py-3 px-4">代表产品</th>
                      <th className="text-left py-3 px-4">数据模型</th>
                      <th className="text-left py-3 px-4">查询语言</th>
                      <th className="text-left py-3 px-4">事务支持</th>
                      <th className="text-left py-3 px-4">适用场景</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">关系型</td>
                      <td className="py-3 px-4">MySQL, PostgreSQL</td>
                      <td className="py-3 px-4">表格/关系</td>
                      <td className="py-3 px-4">SQL</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800">完全支持</Badge>
                      </td>
                      <td className="py-3 px-4">结构化数据、复杂查询、事务处理</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">文档型</td>
                      <td className="py-3 px-4">MongoDB, CouchDB</td>
                      <td className="py-3 px-4">文档/JSON</td>
                      <td className="py-3 px-4">特定API</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-yellow-100 text-yellow-800">部分支持</Badge>
                      </td>
                      <td className="py-3 px-4">半结构化数据、快速开发、灵活模式</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">键值型</td>
                      <td className="py-3 px-4">Redis, DynamoDB</td>
                      <td className="py-3 px-4">键值对</td>
                      <td className="py-3 px-4">简单API</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-red-100 text-red-800">有限支持</Badge>
                      </td>
                      <td className="py-3 px-4">缓存、会话存储、高性能读写</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">列族型</td>
                      <td className="py-3 px-4">Cassandra, HBase</td>
                      <td className="py-3 px-4">列族</td>
                      <td className="py-3 px-4">CQL/API</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-yellow-100 text-yellow-800">部分支持</Badge>
                      </td>
                      <td className="py-3 px-4">时序数据、大规模写入、分布式系统</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">图形型</td>
                      <td className="py-3 px-4">Neo4j, JanusGraph</td>
                      <td className="py-3 px-4">节点和边</td>
                      <td className="py-3 px-4">Cypher/Gremlin</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800">完全支持</Badge>
                      </td>
                      <td className="py-3 px-4">关系数据、网络分析、推荐系统</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
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
