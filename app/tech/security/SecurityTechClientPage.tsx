"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Shield, Search, AlertTriangle, CheckCircle, ArrowUpRight, Filter, BookOpen } from "lucide-react"

// 安全工具数据
const securityTools = [
  {
    id: 1,
    name: "OWASP ZAP",
    description: "开源的Web应用安全扫描器",
    category: "Web安全",
    tags: ["渗透测试", "漏洞扫描", "开源"],
    website: "https://www.zaproxy.org/",
    logo: "/placeholder.svg?height=40&width=40&query=OWASP ZAP",
  },
  {
    id: 2,
    name: "Nmap",
    description: "网络发现和安全审计工具",
    category: "网络安全",
    tags: ["端口扫描", "网络映射", "开源"],
    website: "https://nmap.org/",
    logo: "/placeholder.svg?height=40&width=40&query=Nmap",
  },
  {
    id: 3,
    name: "Wireshark",
    description: "网络协议分析器",
    category: "网络安全",
    tags: ["数据包分析", "网络监控", "开源"],
    website: "https://www.wireshark.org/",
    logo: "/placeholder.svg?height=40&width=40&query=Wireshark",
  },
  {
    id: 4,
    name: "Metasploit",
    description: "渗透测试框架",
    category: "渗透测试",
    tags: ["漏洞利用", "安全测试", "开源"],
    website: "https://www.metasploit.com/",
    logo: "/placeholder.svg?height=40&width=40&query=Metasploit",
  },
  {
    id: 5,
    name: "Burp Suite",
    description: "Web应用安全测试平台",
    category: "Web安全",
    tags: ["代理", "扫描", "商业/社区"],
    website: "https://portswigger.net/burp",
    logo: "/placeholder.svg?height=40&width=40&query=Burp Suite",
  },
  {
    id: 6,
    name: "Snort",
    description: "开源入侵检测系统",
    category: "网络安全",
    tags: ["IDS", "IPS", "开源"],
    website: "https://www.snort.org/",
    logo: "/placeholder.svg?height=40&width=40&query=Snort",
  },
  {
    id: 7,
    name: "OpenVAS",
    description: "开源漏洞评估系统",
    category: "漏洞管理",
    tags: ["漏洞扫描", "风险评估", "开源"],
    website: "https://www.openvas.org/",
    logo: "/placeholder.svg?height=40&width=40&query=OpenVAS",
  },
  {
    id: 8,
    name: "Hashcat",
    description: "高级密码恢复工具",
    category: "密码安全",
    tags: ["密码破解", "哈希", "开源"],
    website: "https://hashcat.net/hashcat/",
    logo: "/placeholder.svg?height=40&width=40&query=Hashcat",
  },
]

// 安全最佳实践数据
const securityPractices = [
  {
    id: 1,
    title: "实施强密码策略",
    category: "身份认证",
    description: "要求使用复杂密码，定期更换，并实施多因素认证",
    importance: "高",
    implementation: "简单",
    tips: [
      "密码长度至少12个字符",
      "包含大小写字母、数字和特殊字符",
      "启用双因素认证",
      "定期更换密码（90天）",
      "使用密码管理器",
    ],
  },
  {
    id: 2,
    title: "保持软件更新",
    category: "漏洞管理",
    description: "定期更新操作系统和应用程序以修补已知安全漏洞",
    importance: "高",
    implementation: "中等",
    tips: ["启用自动更新", "建立补丁管理流程", "定期审查更新状态", "测试补丁后再部署到生产环境", "关注安全公告"],
  },
  {
    id: 3,
    title: "实施最小权限原则",
    category: "访问控制",
    description: "仅授予用户完成工作所需的最小权限",
    importance: "高",
    implementation: "中等",
    tips: [
      "定期审查用户权限",
      "实施基于角色的访问控制",
      "遵循职责分离原则",
      "及时撤销离职员工的访问权限",
      "使用特权访问管理系统",
    ],
  },
  {
    id: 4,
    title: "数据加密",
    category: "数据保护",
    description: "加密敏感数据，无论是静态存储还是传输中",
    importance: "高",
    implementation: "中等",
    tips: ["使用TLS/SSL保护数据传输", "实施全盘加密", "使用强加密算法", "安全管理加密密钥", "加密备份数据"],
  },
  {
    id: 5,
    title: "定期备份数据",
    category: "数据保护",
    description: "定期备份关键数据并测试恢复流程",
    importance: "高",
    implementation: "中等",
    tips: ["遵循3-2-1备份策略", "加密备份数据", "定期测试恢复过程", "存储离线备份", "自动化备份流程"],
  },
  {
    id: 6,
    title: "安全意识培训",
    category: "人员安全",
    description: "定期对员工进行安全意识培训",
    importance: "高",
    implementation: "简单",
    tips: [
      "定期进行网络钓鱼模拟演练",
      "提供安全最佳实践培训",
      "建立安全事件报告流程",
      "奖励安全意识高的员工",
      "分享真实安全事件案例",
    ],
  },
]

// 常见漏洞数据
const commonVulnerabilities = [
  {
    id: 1,
    name: "SQL注入",
    category: "注入攻击",
    risk: "高",
    description: "攻击者能够将SQL命令插入应用程序的输入字段中执行",
    prevention: ["使用参数化查询", "实施输入验证", "最小权限数据库账户", "使用ORM框架", "定期安全测试"],
  },
  {
    id: 2,
    name: "跨站脚本(XSS)",
    category: "注入攻击",
    risk: "高",
    description: "攻击者能够在网页中注入客户端脚本",
    prevention: ["输出编码", "内容安全策略(CSP)", "使用现代框架", "输入验证", "X-XSS-Protection头"],
  },
  {
    id: 3,
    name: "跨站请求伪造(CSRF)",
    category: "会话攻击",
    risk: "中",
    description: "强制用户在已认证的Web应用程序上执行不需要的操作",
    prevention: ["使用CSRF令牌", "验证Referer头", "使用SameSite Cookie", "实施双重认证", "添加自定义请求头"],
  },
  {
    id: 4,
    name: "不安全的直接对象引用",
    category: "访问控制",
    risk: "高",
    description: "攻击者可以通过修改引用来访问未授权的资源",
    prevention: ["实施访问控制检查", "使用间接引用映射", "验证用户权限", "不在URL中暴露敏感标识符", "记录访问尝试"],
  },
  {
    id: 5,
    name: "安全配置错误",
    category: "配置问题",
    risk: "高",
    description: "系统、框架、应用程序或服务器配置不当导致的安全漏洞",
    prevention: ["使用安全配置基线", "移除默认账户和密码", "禁用不必要的服务", "定期安全扫描", "自动化配置管理"],
  },
  {
    id: 6,
    name: "敏感数据泄露",
    category: "数据保护",
    risk: "高",
    description: "应用程序未能充分保护敏感信息",
    prevention: ["加密敏感数据", "安全传输数据", "实施适当的密钥管理", "禁用缓存敏感信息", "最小化数据收集"],
  },
]

// 安全教程数据
const securityTutorials = [
  {
    id: 1,
    title: "Web应用安全基础",
    description: "学习保护Web应用程序的基本安全原则和实践",
    level: "初级",
    duration: "3小时",
    topics: ["OWASP Top 10", "安全编码实践", "常见漏洞防护", "安全测试基础"],
    link: "#web-security-basics",
  },
  {
    id: 2,
    title: "网络安全防御策略",
    description: "了解如何设计和实施全面的网络安全防御策略",
    level: "中级",
    duration: "4小时",
    topics: ["防火墙配置", "入侵检测系统", "网络分段", "安全监控"],
    link: "#network-defense",
  },
  {
    id: 3,
    title: "安全编码实践",
    description: "学习如何编写安全的代码并避免常见的安全漏洞",
    level: "中级",
    duration: "5小时",
    topics: ["输入验证", "安全认证", "会话管理", "安全API设计"],
    link: "#secure-coding",
  },
  {
    id: 4,
    title: "安全事件响应",
    description: "学习如何准备、识别和应对安全事件",
    level: "高级",
    duration: "6小时",
    topics: ["事件响应计划", "取证分析", "威胁狩猎", "事后分析"],
    link: "#incident-response",
  },
]

export function SecurityTechClientPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // 过滤安全工具
  const filteredTools = securityTools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // 获取所有唯一的工具类别
  const categories = ["all", ...new Set(securityTools.map((tool) => tool.category))]

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">安全防护</h1>
          <p className="text-muted-foreground">网络安全、数据保护和安全最佳实践</p>
        </div>
      </div>

      <Tabs defaultValue="tools" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tools">
            <Shield className="h-4 w-4 mr-2" />
            安全工具
          </TabsTrigger>
          <TabsTrigger value="practices">
            <CheckCircle className="h-4 w-4 mr-2" />
            最佳实践
          </TabsTrigger>
          <TabsTrigger value="vulnerabilities">
            <AlertTriangle className="h-4 w-4 mr-2" />
            常见漏洞
          </TabsTrigger>
          <TabsTrigger value="tutorials">
            <BookOpen className="h-4 w-4 mr-2" />
            安全教程
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索安全工具..."
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
            {filteredTools.map((tool) => (
              <Card key={tool.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={tool.logo || "/placeholder.svg"} alt={tool.name} className="w-10 h-10 rounded" />
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                    </div>
                    <Badge>{tool.category}</Badge>
                  </div>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={tool.website} target="_blank" rel="noopener noreferrer">
                      访问官网
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="practices" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {securityPractices.map((practice) => (
              <Card key={practice.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{practice.title}</CardTitle>
                      <CardDescription>{practice.category}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                        重要性: {practice.importance}
                      </Badge>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        实施: {practice.implementation}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{practice.description}</p>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">实施建议</h4>
                    <ul className="space-y-1">
                      {practice.tips.map((tip, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vulnerabilities" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commonVulnerabilities.map((vuln) => (
              <Card key={vuln.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{vuln.name}</CardTitle>
                      <CardDescription>{vuln.category}</CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        vuln.risk === "高"
                          ? "bg-red-100 text-red-800 border-red-200"
                          : vuln.risk === "中"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : "bg-blue-100 text-blue-800 border-blue-200"
                      }
                    >
                      风险: {vuln.risk}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{vuln.description}</p>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">防护措施</h4>
                    <ul className="space-y-1">
                      {vuln.prevention.map((item, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <Shield className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {securityTutorials.map((tutorial) => (
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
