"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clipboard, Search, Terminal, Copy, BookOpen, Star, Filter, ArrowUpDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

// 终端命令类型定义
interface TerminalCommand {
  id: string
  command: string
  description: string
  example: string
  category: string
  platform: string[]
  tags: string[]
  popularity: number
}

// 模拟终端命令数据
const commandsData: TerminalCommand[] = [
  {
    id: "1",
    command: "ls",
    description: "列出目录内容",
    example: "ls -la",
    category: "文件操作",
    platform: ["Linux", "macOS"],
    tags: ["基础", "文件系统"],
    popularity: 98,
  },
  {
    id: "2",
    command: "cd",
    description: "切换目录",
    example: "cd /path/to/directory",
    category: "文件操作",
    platform: ["Linux", "macOS", "Windows"],
    tags: ["基础", "文件系统"],
    popularity: 99,
  },
  {
    id: "3",
    command: "mkdir",
    description: "创建新目录",
    example: "mkdir new_directory",
    category: "文件操作",
    platform: ["Linux", "macOS", "Windows"],
    tags: ["基础", "文件系统"],
    popularity: 90,
  },
  {
    id: "4",
    command: "rm",
    description: "删除文件或目录",
    example: "rm file.txt 或 rm -rf directory",
    category: "文件操作",
    platform: ["Linux", "macOS"],
    tags: ["基础", "文件系统", "危险操作"],
    popularity: 92,
  },
  {
    id: "5",
    command: "cp",
    description: "复制文件或目录",
    example: "cp source.txt destination.txt",
    category: "文件操作",
    platform: ["Linux", "macOS"],
    tags: ["基础", "文件系统"],
    popularity: 85,
  },
  {
    id: "6",
    command: "mv",
    description: "移动或重命名文件",
    example: "mv old_name.txt new_name.txt",
    category: "文件操作",
    platform: ["Linux", "macOS"],
    tags: ["基础", "文件系统"],
    popularity: 87,
  },
  {
    id: "7",
    command: "grep",
    description: "搜索文件内容",
    example: "grep 'pattern' file.txt",
    category: "文本处理",
    platform: ["Linux", "macOS"],
    tags: ["文本", "搜索", "正则表达式"],
    popularity: 88,
  },
  {
    id: "8",
    command: "find",
    description: "查找文件",
    example: "find /path -name '*.txt'",
    category: "文件操作",
    platform: ["Linux", "macOS"],
    tags: ["搜索", "文件系统"],
    popularity: 82,
  },
  {
    id: "9",
    command: "chmod",
    description: "修改文件权限",
    example: "chmod 755 file.sh",
    category: "权限管理",
    platform: ["Linux", "macOS"],
    tags: ["权限", "安全"],
    popularity: 80,
  },
  {
    id: "10",
    command: "chown",
    description: "修改文件所有者",
    example: "chown user:group file.txt",
    category: "权限管理",
    platform: ["Linux", "macOS"],
    tags: ["权限", "安全"],
    popularity: 75,
  },
  {
    id: "11",
    command: "ps",
    description: "显示进程状态",
    example: "ps aux",
    category: "进程管理",
    platform: ["Linux", "macOS"],
    tags: ["进程", "监控"],
    popularity: 85,
  },
  {
    id: "12",
    command: "kill",
    description: "终止进程",
    example: "kill -9 1234",
    category: "进程管理",
    platform: ["Linux", "macOS"],
    tags: ["进程", "危险操作"],
    popularity: 78,
  },
  {
    id: "13",
    command: "top",
    description: "显示系统资源使用情况",
    example: "top",
    category: "系统监控",
    platform: ["Linux", "macOS"],
    tags: ["监控", "性能"],
    popularity: 83,
  },
  {
    id: "14",
    command: "df",
    description: "显示磁盘空间使用情况",
    example: "df -h",
    category: "系统监控",
    platform: ["Linux", "macOS"],
    tags: ["存储", "监控"],
    popularity: 77,
  },
  {
    id: "15",
    command: "du",
    description: "显示目录空间使用情况",
    example: "du -sh *",
    category: "系统监控",
    platform: ["Linux", "macOS"],
    tags: ["存储", "监控"],
    popularity: 75,
  },
  {
    id: "16",
    command: "tar",
    description: "打包和解压文件",
    example: "tar -czvf archive.tar.gz directory/",
    category: "文件操作",
    platform: ["Linux", "macOS"],
    tags: ["压缩", "归档"],
    popularity: 80,
  },
  {
    id: "17",
    command: "ssh",
    description: "安全远程登录",
    example: "ssh user@hostname",
    category: "网络",
    platform: ["Linux", "macOS"],
    tags: ["远程", "安全"],
    popularity: 90,
  },
  {
    id: "18",
    command: "scp",
    description: "安全复制文件",
    example: "scp file.txt user@hostname:/path",
    category: "网络",
    platform: ["Linux", "macOS"],
    tags: ["远程", "文件传输"],
    popularity: 85,
  },
  {
    id: "19",
    command: "wget",
    description: "下载文件",
    example: "wget https://example.com/file.zip",
    category: "网络",
    platform: ["Linux", "macOS"],
    tags: ["下载", "网络"],
    popularity: 82,
  },
  {
    id: "20",
    command: "curl",
    description: "传输数据",
    example: "curl -X GET https://api.example.com",
    category: "网络",
    platform: ["Linux", "macOS"],
    tags: ["API", "网络", "HTTP"],
    popularity: 88,
  },
  {
    id: "21",
    command: "git clone",
    description: "克隆Git仓库",
    example: "git clone https://github.com/user/repo.git",
    category: "开发工具",
    platform: ["Linux", "macOS", "Windows"],
    tags: ["Git", "版本控制"],
    popularity: 95,
  },
  {
    id: "22",
    command: "npm install",
    description: "安装Node.js包",
    example: "npm install package-name",
    category: "开发工具",
    platform: ["Linux", "macOS", "Windows"],
    tags: ["Node.js", "包管理"],
    popularity: 93,
  },
  {
    id: "23",
    command: "docker run",
    description: "运行Docker容器",
    example: "docker run -d -p 80:80 nginx",
    category: "容器",
    platform: ["Linux", "macOS", "Windows"],
    tags: ["Docker", "容器化"],
    popularity: 89,
  },
  {
    id: "24",
    command: "kubectl",
    description: "Kubernetes命令行工具",
    example: "kubectl get pods",
    category: "容器",
    platform: ["Linux", "macOS", "Windows"],
    tags: ["Kubernetes", "容器编排"],
    popularity: 86,
  },
  {
    id: "25",
    command: "ping",
    description: "测试网络连接",
    example: "ping example.com",
    category: "网络",
    platform: ["Linux", "macOS", "Windows"],
    tags: ["网络", "诊断"],
    popularity: 85,
  },
  {
    id: "26",
    command: "netstat",
    description: "显示网络连接",
    example: "netstat -tuln",
    category: "网络",
    platform: ["Linux", "macOS", "Windows"],
    tags: ["网络", "监控"],
    popularity: 78,
  },
  {
    id: "27",
    command: "ifconfig",
    description: "配置网络接口",
    example: "ifconfig eth0",
    category: "网络",
    platform: ["Linux", "macOS"],
    tags: ["网络", "配置"],
    popularity: 80,
  },
  {
    id: "28",
    command: "awk",
    description: "文本处理工具",
    example: "awk '{print $1}' file.txt",
    category: "文本处理",
    platform: ["Linux", "macOS"],
    tags: ["文本", "处理"],
    popularity: 75,
  },
  {
    id: "29",
    command: "sed",
    description: "流编辑器",
    example: "sed 's/old/new/g' file.txt",
    category: "文本处理",
    platform: ["Linux", "macOS"],
    tags: ["文本", "替换"],
    popularity: 77,
  },
  {
    id: "30",
    command: "crontab",
    description: "定时任务",
    example: "crontab -e",
    category: "系统管理",
    platform: ["Linux", "macOS"],
    tags: ["定时", "自动化"],
    popularity: 82,
  },
]

// 分类数据
const categories = [
  "全部",
  "文件操作",
  "文本处理",
  "权限管理",
  "进程管理",
  "系统监控",
  "网络",
  "开发工具",
  "容器",
  "系统管理",
]

// 平台数据
const platforms = ["全部", "Linux", "macOS", "Windows"]

export function TerminalCommandsClientPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [selectedPlatform, setSelectedPlatform] = useState("全部")
  const [sortBy, setSortBy] = useState<"popularity" | "command">("popularity")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [filteredCommands, setFilteredCommands] = useState<TerminalCommand[]>(commandsData)
  const [activeTab, setActiveTab] = useState("commands")

  // 处理搜索和过滤
  useEffect(() => {
    let result = [...commandsData]

    // 搜索过滤
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (cmd) =>
          cmd.command.toLowerCase().includes(term) ||
          cmd.description.toLowerCase().includes(term) ||
          cmd.example.toLowerCase().includes(term) ||
          cmd.tags.some((tag) => tag.toLowerCase().includes(term)),
      )
    }

    // 分类过滤
    if (selectedCategory !== "全部") {
      result = result.filter((cmd) => cmd.category === selectedCategory)
    }

    // 平台过滤
    if (selectedPlatform !== "全部") {
      result = result.filter((cmd) => cmd.platform.includes(selectedPlatform))
    }

    // 排序
    result.sort((a, b) => {
      if (sortBy === "popularity") {
        return sortOrder === "asc" ? a.popularity - b.popularity : b.popularity - a.popularity
      } else {
        return sortOrder === "asc" ? a.command.localeCompare(b.command) : b.command.localeCompare(a.command)
      }
    })

    setFilteredCommands(result)
  }, [searchTerm, selectedCategory, selectedPlatform, sortBy, sortOrder])

  // 复制命令到剪贴板
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "已复制到剪贴板",
      description: `命令 "${text}" 已复制到剪贴板`,
    })
  }

  // 切换排序方式
  const toggleSort = (field: "popularity" | "command") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("desc")
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">终端命令库</h1>
          <p className="text-muted-foreground">收集整理常用终端命令，提供详细说明和使用示例，助力开发效率提升</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <TabsList>
            <TabsTrigger value="commands" className="flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              命令列表
            </TabsTrigger>
            <TabsTrigger value="cheatsheet" className="flex items-center gap-2">
              <Clipboard className="h-4 w-4" />
              速查表
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              教程
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索命令..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <div className="p-2">
                  <p className="text-sm font-medium mb-2">分类</p>
                  <div className="grid grid-cols-2 gap-1">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        className="justify-start text-xs h-7"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="p-2 border-t">
                  <p className="text-sm font-medium mb-2">平台</p>
                  <div className="flex flex-wrap gap-1">
                    {platforms.map((platform) => (
                      <Button
                        key={platform}
                        variant={selectedPlatform === platform ? "default" : "outline"}
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => setSelectedPlatform(platform)}
                      >
                        {platform}
                      </Button>
                    ))}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="icon" onClick={() => toggleSort("command")} className="hidden md:flex">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="commands" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((command) => (
                <Card key={command.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-mono">{command.command}</CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => copyToClipboard(command.command)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>{command.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="bg-muted p-2 rounded-md font-mono text-sm mb-2 overflow-x-auto">
                      {command.example}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {command.platform.map((platform) => (
                        <Badge key={platform} variant="outline">
                          {platform}
                        </Badge>
                      ))}
                      {command.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-blue-100">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between">
                    <span className="text-xs text-muted-foreground">{command.category}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{command.popularity}%</span>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">没有找到匹配的命令</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="cheatsheet">
          <Card>
            <CardHeader>
              <CardTitle>终端命令速查表</CardTitle>
              <CardDescription>按类别整理的常用命令速查表，方便快速查阅</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                {categories
                  .filter((category) => category !== "全部")
                  .map((category) => {
                    const categoryCommands = commandsData.filter((cmd) => cmd.category === category)
                    return (
                      <div key={category} className="mb-8">
                        <h3 className="text-lg font-semibold mb-4">{category}</h3>
                        <div className="space-y-4">
                          {categoryCommands.map((cmd) => (
                            <div key={cmd.id} className="border-b pb-3">
                              <div className="flex justify-between items-center mb-1">
                                <code className="font-mono font-bold">{cmd.command}</code>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => copyToClipboard(cmd.command)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">{cmd.description}</p>
                              <code className="text-xs bg-muted p-1 rounded">{cmd.example}</code>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutorials">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Linux基础命令教程</CardTitle>
                <CardDescription>适合初学者的Linux命令入门教程</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  本教程将带您了解Linux系统中最常用的基础命令，包括文件操作、目录管理、权限设置等内容。通过学习这些命令，您将能够熟练地在Linux终端中进行操作。
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <span>文件系统导航 (cd, ls, pwd)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <span>文件操作 (touch, mkdir, rm, cp, mv)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <span>文件权限 (chmod, chown)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <span>文本处理 (cat, grep, head, tail)</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">查看教程</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shell脚本编程</CardTitle>
                <CardDescription>学习如何编写和执行Shell脚本</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Shell脚本是自动化Linux/Unix操作的强大工具。本教程将教您如何编写Shell脚本，包括变量、条件语句、循环和函数等基本概念，以及如何使用这些知识来自动化日常任务。
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <span>Shell脚本基础语法</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <span>变量和参数</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <span>条件语句和循环</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <span>函数和模块化</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">查看教程</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Git命令详解</CardTitle>
                <CardDescription>深入了解Git版本控制系统的命令</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Git是当今最流行的版本控制系统。本教程将详细介绍Git的核心命令，帮助您理解Git的工作流程，以及如何有效地使用Git进行团队协作和代码管理。
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <span>基本操作 (init, add, commit, push, pull)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <span>分支管理 (branch, checkout, merge)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <span>远程仓库操作</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <span>高级技巧 (rebase, cherry-pick, stash)</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">查看教程</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Docker命令指南</CardTitle>
                <CardDescription>容器化技术必备命令</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Docker已成为现代应用开发和部署的标准工具。本教程将介绍Docker的基本命令，包括容器管理、镜像操作、网络配置等，帮助您快速掌握Docker的使用方法。
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <span>容器生命周期 (run, start, stop, rm)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <span>镜像管理 (pull, build, push)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <span>网络和存储配置</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <span>Docker Compose使用</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">查看教程</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
