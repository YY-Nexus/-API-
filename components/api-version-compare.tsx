"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, ArrowRight, CheckCircle, Plus, Minus, RefreshCw } from "lucide-react"

// API版本接口
interface ApiVersion {
  version: string
  releaseDate: string
}

// API端点接口
interface ApiEndpoint {
  name: string
  method: string
  path: string
  description: string
  params: ApiParam[]
  deprecated?: boolean
  added?: string
  removed?: string
  changed?: string
}

// API参数接口
interface ApiParam {
  name: string
  type: string
  required: boolean
  description: string
  deprecated?: boolean
  added?: string
  removed?: string
}

// 变更类型
type ChangeType = "added" | "removed" | "modified" | "deprecated" | "unchanged"

// 变更接口
interface EndpointChange {
  type: ChangeType
  endpoint: ApiEndpoint
  changes?: {
    field: string
    oldValue?: any
    newValue?: any
    type: ChangeType
  }[]
}

interface ApiVersionCompareProps {
  versions: ApiVersion[]
}

export function ApiVersionCompare({ versions }: ApiVersionCompareProps) {
  const [version1, setVersion1] = useState<string>("")
  const [version2, setVersion2] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [changes, setChanges] = useState<EndpointChange[]>([])
  const [activeTab, setActiveTab] = useState<string>("all")

  // 当选择版本时获取差异
  useEffect(() => {
    if (version1 && version2) {
      fetchVersionDifferences()
    }
  }, [version1, version2])

  // 获取版本差异
  const fetchVersionDifferences = async () => {
    if (!version1 || !version2) return

    setLoading(true)

    try {
      // 在实际应用中，这里应该是API调用
      // 为了演示，我们使用模拟数据
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 模拟变更数据
      const mockChanges: EndpointChange[] = [
        {
          type: "added",
          endpoint: {
            name: "创建用户令牌",
            method: "POST",
            path: "/api/auth/token",
            description: "创建新的用户访问令牌",
            params: [
              { name: "userId", type: "string", required: true, description: "用户ID" },
              { name: "expiresIn", type: "number", required: false, description: "过期时间（秒）" },
            ],
            added: version2,
          },
        },
        {
          type: "removed",
          endpoint: {
            name: "获取旧版统计",
            method: "GET",
            path: "/api/stats/legacy",
            description: "获取旧版统计数据",
            params: [{ name: "period", type: "string", required: true, description: "时间段" }],
            removed: version2,
          },
        },
        {
          type: "modified",
          endpoint: {
            name: "获取用户列表",
            method: "GET",
            path: "/api/users",
            description: "获取系统用户列表，支持分页和筛选",
            params: [
              { name: "page", type: "number", required: false, description: "页码" },
              { name: "limit", type: "number", required: false, description: "每页数量" },
              { name: "role", type: "string", required: false, description: "角色过滤" },
              { name: "search", type: "string", required: false, description: "搜索关键词" },
              { name: "status", type: "string", required: false, description: "状态过滤", added: version2 },
            ],
            changed: version2,
          },
          changes: [
            {
              field: "description",
              oldValue: "获取系统用户列表",
              newValue: "获取系统用户列表，支持分页和筛选",
              type: "modified",
            },
            {
              field: "参数",
              oldValue: "4个参数",
              newValue: "5个参数",
              type: "modified",
            },
          ],
        },
        {
          type: "deprecated",
          endpoint: {
            name: "旧版登录",
            method: "POST",
            path: "/api/auth/login/v1",
            description: "使用旧版方式登录（已废弃）",
            params: [
              { name: "username", type: "string", required: true, description: "用户名" },
              { name: "password", type: "string", required: true, description: "密码" },
            ],
            deprecated: true,
          },
        },
      ]

      setChanges(mockChanges)
    } catch (error) {
      console.error("获取版本差异失败:", error)
    } finally {
      setLoading(false)
    }
  }

  // 过滤变更
  const filteredChanges = changes.filter((change) => {
    if (activeTab === "all") return true
    return change.type === activeTab
  })

  // 获取变更类型的标签
  const getChangeTypeBadge = (type: ChangeType) => {
    switch (type) {
      case "added":
        return (
          <Badge className="bg-green-100 text-green-800">
            <Plus className="h-3 w-3 mr-1" />
            新增
          </Badge>
        )
      case "removed":
        return (
          <Badge className="bg-red-100 text-red-800">
            <Minus className="h-3 w-3 mr-1" />
            移除
          </Badge>
        )
      case "modified":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <RefreshCw className="h-3 w-3 mr-1" />
            修改
          </Badge>
        )
      case "deprecated":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            废弃
          </Badge>
        )
      default:
        return <Badge className="bg-gray-100 text-gray-800">无变化</Badge>
    }
  }

  // 获取HTTP方法的标签
  const getMethodBadge = (method: string) => {
    switch (method) {
      case "GET":
        return <Badge className="bg-blue-100 text-blue-800">{method}</Badge>
      case "POST":
        return <Badge className="bg-green-100 text-green-800">{method}</Badge>
      case "PUT":
        return <Badge className="bg-yellow-100 text-yellow-800">{method}</Badge>
      case "DELETE":
        return <Badge className="bg-red-100 text-red-800">{method}</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{method}</Badge>
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>API版本比较</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* 版本选择 */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full md:w-1/3">
              <Select value={version1} onValueChange={setVersion1}>
                <SelectTrigger>
                  <SelectValue placeholder="选择基准版本" />
                </SelectTrigger>
                <SelectContent>
                  {versions.map((v) => (
                    <SelectItem key={v.version} value={v.version}>
                      {v.version} ({v.releaseDate})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <ArrowRight className="hidden md:block" />

            <div className="w-full md:w-1/3">
              <Select value={version2} onValueChange={setVersion2}>
                <SelectTrigger>
                  <SelectValue placeholder="选择比较版本" />
                </SelectTrigger>
                <SelectContent>
                  {versions.map((v) => (
                    <SelectItem key={v.version} value={v.version} disabled={v.version === version1}>
                      {v.version} ({v.releaseDate})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={fetchVersionDifferences}
              disabled={!version1 || !version2 || loading}
              className="w-full md:w-auto"
            >
              {loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : null}
              比较版本
            </Button>
          </div>

          {/* 没有选择版本时的提示 */}
          {(!version1 || !version2) && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>请选择要比较的版本</AlertTitle>
              <AlertDescription>选择两个不同的API版本进行比较，查看它们之间的差异。</AlertDescription>
            </Alert>
          )}

          {/* 加载中 */}
          {loading && (
            <div className="flex justify-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {/* 比较结果 */}
          {!loading && version1 && version2 && changes.length > 0 && (
            <div className="space-y-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">全部变更</TabsTrigger>
                  <TabsTrigger value="added">新增</TabsTrigger>
                  <TabsTrigger value="removed">移除</TabsTrigger>
                  <TabsTrigger value="modified">修改</TabsTrigger>
                  <TabsTrigger value="deprecated">废弃</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    从 {version1} 到 {version2} 的变更
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Badge className="bg-green-100 text-green-800">
                        <Plus className="h-3 w-3 mr-1" />
                        新增
                      </Badge>
                      <span className="text-sm">{changes.filter((c) => c.type === "added").length}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Badge className="bg-red-100 text-red-800">
                        <Minus className="h-3 w-3 mr-1" />
                        移除
                      </Badge>
                      <span className="text-sm">{changes.filter((c) => c.type === "removed").length}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Badge className="bg-blue-100 text-blue-800">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        修改
                      </Badge>
                      <span className="text-sm">{changes.filter((c) => c.type === "modified").length}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Badge className="bg-yellow-100 text-yellow-800">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        废弃
                      </Badge>
                      <span className="text-sm">{changes.filter((c) => c.type === "deprecated").length}</span>
                    </div>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">变更类型</TableHead>
                      <TableHead className="w-[100px]">方法</TableHead>
                      <TableHead className="w-[200px]">端点</TableHead>
                      <TableHead>描述</TableHead>
                      <TableHead className="w-[150px]">详细变更</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredChanges.map((change, index) => (
                      <TableRow key={index}>
                        <TableCell>{getChangeTypeBadge(change.type)}</TableCell>
                        <TableCell>{getMethodBadge(change.endpoint.method)}</TableCell>
                        <TableCell className="font-mono text-sm">{change.endpoint.path}</TableCell>
                        <TableCell>{change.endpoint.description}</TableCell>
                        <TableCell>
                          {change.changes && change.changes.length > 0 ? (
                            <Button variant="outline" size="sm">
                              查看详情
                            </Button>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              {change.type === "added"
                                ? "新增端点"
                                : change.type === "removed"
                                  ? "移除端点"
                                  : change.type === "deprecated"
                                    ? "标记为废弃"
                                    : ""}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* 没有变更时的提示 */}
          {!loading && version1 && version2 && changes.length === 0 && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>没有发现变更</AlertTitle>
              <AlertDescription>这两个版本之间没有API变更。</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
