"use client"

import { Input } from "@/components/ui/input"

import { useState, useEffect } from "react"
import { ApiSearch } from "@/components/api-search"
import { ApiVersionSelector } from "@/components/api-version-selector"
import { ApiTester } from "@/components/api-tester"
import { TokenGenerator } from "@/components/token-generator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronDown,
  ChevronRight,
  Code,
  FileDown,
  FileText,
  History,
  Info,
  Settings,
  Terminal,
  Activity,
  BookOpen,
  FolderOpen,
  GitCompare,
  Users,
  Lock,
  BrainCircuit,
} from "lucide-react"
import { CodeExamples } from "@/components/code-examples"
import { Changelog } from "@/components/changelog"
import { ApiExporter } from "@/components/api-exporter"
import { ApiSandbox } from "@/components/api-sandbox"
import { ApiStatusMonitor } from "@/components/api-status-monitor"
import { ApiTutorials } from "@/components/api-tutorials"
import { ApiAutomatedTests } from "@/components/api-automated-tests"
import { ApiFileManager } from "@/components/api-file-manager"
import { ApiVersionCompare } from "@/components/api-version-compare"
import { ApiFileIntegration } from "@/components/api-file-integration"
import { LanguageProvider, useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { MobileNavigation } from "@/components/mobile-navigation"
import { MobileSearch } from "@/components/mobile-search"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ApiUsageStats } from "@/components/api-usage-stats"

// API版本数据
const API_VERSIONS = [
  { version: "v2.0", releaseDate: "2023-05-01" },
  { version: "v1.5", releaseDate: "2022-12-15" },
  { version: "v1.0", releaseDate: "2022-06-30" },
]

// API分类和端点数据
const API_ENDPOINTS = [
  {
    category: "认证",
    endpoints: [
      {
        name: "登录获取令牌",
        method: "POST",
        path: "/api/auth/login",
        description: "通过用户名和密码获取访问令牌",
        params: [
          { name: "email", type: "string", required: true, description: "用户邮箱" },
          { name: "password", type: "string", required: true, description: "用户密码" },
        ],
      },
      {
        name: "刷新令牌",
        method: "POST",
        path: "/api/auth/refresh",
        description: "使用刷新令牌获取新的访问令牌",
        params: [{ name: "refreshToken", type: "string", required: true, description: "刷新令牌" }],
      },
    ],
  },
  {
    category: "批量导出",
    endpoints: [
      {
        name: "创建导出批次",
        method: "POST",
        path: "/api/export/batch",
        description: "创建新的数据导出批次",
        params: [
          { name: "name", type: "string", required: true, description: "批次名称" },
          { name: "description", type: "string", required: false, description: "批次描述" },
          { name: "filters", type: "object", required: false, description: "数据过滤条件" },
          { name: "format", type: "string", required: false, description: "导出格式 (csv, xlsx, json)" },
        ],
      },
      {
        name: "获取导出批次状态",
        method: "GET",
        path: "/api/export/batch/{batchId}",
        description: "获取指定批次的状态和进度",
        params: [{ name: "batchId", type: "string", required: true, description: "批次ID" }],
      },
      {
        name: "获取所有导出批次",
        method: "GET",
        path: "/api/export/batches",
        description: "获取所有导出批次的列表",
        params: [
          { name: "page", type: "number", required: false, description: "页码" },
          { name: "limit", type: "number", required: false, description: "每页数量" },
          { name: "status", type: "string", required: false, description: "状态过滤" },
        ],
      },
    ],
  },
  {
    category: "用户管理",
    endpoints: [
      {
        name: "获取用户列表",
        method: "GET",
        path: "/api/users",
        description: "获取系统用户列表",
        params: [
          { name: "page", type: "number", required: false, description: "页码" },
          { name: "limit", type: "number", required: false, description: "每页数量" },
          { name: "role", type: "string", required: false, description: "角色过滤" },
          { name: "search", type: "string", required: false, description: "搜索关键词" },
        ],
      },
      {
        name: "创建新用户",
        method: "POST",
        path: "/api/users",
        description: "创建新的系统用户",
        params: [
          { name: "name", type: "string", required: true, description: "用户名" },
          { name: "email", type: "string", required: true, description: "用户邮箱" },
          { name: "password", type: "string", required: true, description: "用户密码" },
          { name: "role", type: "string", required: true, description: "用户角色" },
        ],
      },
    ],
  },
  {
    category: "数据统计",
    endpoints: [
      {
        name: "获取系统概览数据",
        method: "GET",
        path: "/api/stats/overview",
        description: "获取系统概览统计数据",
        params: [{ name: "period", type: "string", required: false, description: "时间段 (today, week, month, year)" }],
      },
      {
        name: "获取详细使用统计",
        method: "GET",
        path: "/api/stats/usage",
        description: "获取系统详细使用统计数据",
        params: [
          { name: "startDate", type: "string", required: true, description: "开始日期 (ISO格式)" },
          { name: "endDate", type: "string", required: true, description: "结束日期 (ISO格式)" },
          { name: "interval", type: "string", required: false, description: "统计间隔 (hour, day, week, month)" },
        ],
      },
    ],
  },
]

// 主内容组件
function ApiDocsContent() {
  const { t } = useLanguage()
  const [currentVersion, setCurrentVersion] = useState(API_VERSIONS[0].version)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [filteredEndpoints, setFilteredEndpoints] = useState(API_ENDPOINTS)
  const [selectedEndpoint, setSelectedEndpoint] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("endpoints") // 主标签页状态
  const isMobile = useMediaQuery("(max-width: 768px)")

  // 处理搜索
  useEffect(() => {
    if (!searchQuery) {
      setFilteredEndpoints(API_ENDPOINTS)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = API_ENDPOINTS.map((category) => {
      const matchedEndpoints = category.endpoints.filter(
        (endpoint) =>
          endpoint.name.toLowerCase().includes(query) ||
          endpoint.path.toLowerCase().includes(query) ||
          endpoint.description.toLowerCase().includes(query),
      )

      return {
        ...category,
        endpoints: matchedEndpoints,
      }
    }).filter((category) => category.endpoints.length > 0)

    setFilteredEndpoints(filtered)

    // 如果有搜索结果，自动展开所有分类
    if (filtered.length > 0) {
      setExpandedCategories(filtered.map((c) => c.category))
    }
  }, [searchQuery])

  // 切换分类展开/折叠
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  // 选择端点
  const selectEndpoint = (endpoint: any) => {
    setSelectedEndpoint(endpoint)
    setActiveTab("endpoints") // 切换到端点标签页
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* 移动导航 */}
      <MobileNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <MobileSearch onSearch={setSearchQuery} onSelectEndpoint={selectEndpoint} endpoints={API_ENDPOINTS} />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">启智云枢³ API文档</h1>
          <p className="text-muted-foreground">智联万物丨枢启未来 - API接口文档和使用说明</p>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />
          <ApiVersionSelector
            versions={API_VERSIONS}
            currentVersion={currentVersion}
            onVersionChange={setCurrentVersion}
          />
          <Button variant="outline" size="sm" onClick={() => setActiveTab("export")}>
            <FileDown className="h-4 w-4 mr-2" />
            {t("nav.export")}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 flex-wrap hidden md:flex bg-gradient-to-r from-blue-600 to-blue-500 p-1 rounded-lg">
          <TabsTrigger
            value="endpoints"
            className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600"
          >
            <FileText className="h-4 w-4 mr-2" />
            {t("nav.endpoints")}
          </TabsTrigger>
          <TabsTrigger value="sandbox">
            <Terminal className="h-4 w-4 mr-2" />
            {t("nav.sandbox")}
          </TabsTrigger>
          <TabsTrigger value="status">
            <Activity className="h-4 w-4 mr-2" />
            {t("nav.status")}
          </TabsTrigger>
          <TabsTrigger value="tutorials">
            <BookOpen className="h-4 w-4 mr-2" />
            {t("nav.tutorials")}
          </TabsTrigger>
          <TabsTrigger value="files">
            <FolderOpen className="h-4 w-4 mr-2" />
            文件管理
          </TabsTrigger>
          <TabsTrigger value="file-integration">
            <Code className="h-4 w-4 mr-2" />
            文档集成
          </TabsTrigger>
          <TabsTrigger value="usage">
            <Activity className="h-4 w-4 mr-2" />
            使用统计
          </TabsTrigger>
          <TabsTrigger value="tests">
            <Code className="h-4 w-4 mr-2" />
            自动化测试
          </TabsTrigger>
          <TabsTrigger value="version-compare">
            <GitCompare className="h-4 w-4 mr-2" />
            版本比较
          </TabsTrigger>
          <TabsTrigger value="permissions">
            <Lock className="h-4 w-4 mr-2" />
            权限管理
          </TabsTrigger>
          <TabsTrigger value="ai-assistant">
            <BrainCircuit className="h-4 w-4 mr-2" />
            AI助手
          </TabsTrigger>
          <TabsTrigger value="changelog">
            <History className="h-4 w-4 mr-2" />
            {t("nav.changelog")}
          </TabsTrigger>
          <TabsTrigger value="export">
            <FileDown className="h-4 w-4 mr-2" />
            {t("nav.export")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* 侧边栏 */}
            <div className="md:col-span-1 space-y-4 hidden md:block">
              <ApiSearch onSearch={setSearchQuery} />

              <Card className="shadow-blue shadow-blue-hover">
                <CardHeader className="py-3">
                  <CardTitle className="text-lg">{t("endpoints.title")}</CardTitle>
                </CardHeader>
                <CardContent className="py-0">
                  <div className="space-y-1">
                    {filteredEndpoints.map((category) => (
                      <div key={category.category}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start font-medium"
                          onClick={() => toggleCategory(category.category)}
                        >
                          {expandedCategories.includes(category.category) ? (
                            <ChevronDown className="h-4 w-4 mr-2" />
                          ) : (
                            <ChevronRight className="h-4 w-4 mr-2" />
                          )}
                          {category.category}
                        </Button>

                        {expandedCategories.includes(category.category) && (
                          <div className="ml-6 space-y-1 mb-2">
                            {category.endpoints.map((endpoint) => (
                              <Button
                                key={endpoint.path}
                                variant="ghost"
                                size="sm"
                                className={`w-full justify-start text-sm ${
                                  selectedEndpoint?.path === endpoint.path ? "bg-muted" : ""
                                }`}
                                onClick={() => selectEndpoint(endpoint)}
                              >
                                <Badge
                                  variant="outline"
                                  className={`mr-2 ${
                                    endpoint.method === "GET"
                                      ? "bg-blue-100"
                                      : endpoint.method === "POST"
                                        ? "bg-green-100"
                                        : endpoint.method === "PUT"
                                          ? "bg-yellow-100"
                                          : endpoint.method === "DELETE"
                                            ? "bg-red-100"
                                            : ""
                                  }`}
                                >
                                  {endpoint.method}
                                </Badge>
                                <span className="truncate">{endpoint.name}</span>
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    {filteredEndpoints.length === 0 && (
                      <div className="py-4 text-center text-muted-foreground">没有找到匹配的API端点</div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <TokenGenerator />
            </div>

            {/* 移动端分类列表 */}
            {isMobile && (
              <div className="mb-4">
                <div className="flex overflow-x-auto pb-2 space-x-2 hide-scrollbar">
                  {API_ENDPOINTS.map((category) => (
                    <Button
                      key={category.category}
                      variant={expandedCategories.includes(category.category) ? "default" : "outline"}
                      size="sm"
                      className="whitespace-nowrap"
                      onClick={() => toggleCategory(category.category)}
                    >
                      {category.category}
                    </Button>
                  ))}
                </div>

                {expandedCategories.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {expandedCategories.map((categoryName) => {
                      const category = API_ENDPOINTS.find((c) => c.category === categoryName)
                      if (!category) return null

                      return (
                        <div key={categoryName} className="space-y-1">
                          <h3 className="font-medium text-sm px-2">{categoryName}</h3>
                          <div className="flex overflow-x-auto pb-2 space-x-2 hide-scrollbar">
                            {category.endpoints.map((endpoint) => (
                              <Button
                                key={endpoint.path}
                                variant={selectedEndpoint?.path === endpoint.path ? "default" : "outline"}
                                size="sm"
                                className="whitespace-nowrap"
                                onClick={() => selectEndpoint(endpoint)}
                              >
                                <Badge
                                  variant="outline"
                                  className={`mr-1 ${
                                    endpoint.method === "GET"
                                      ? "bg-blue-100"
                                      : endpoint.method === "POST"
                                        ? "bg-green-100"
                                        : endpoint.method === "PUT"
                                          ? "bg-yellow-100"
                                          : endpoint.method === "DELETE"
                                            ? "bg-red-100"
                                            : ""
                                  }`}
                                >
                                  {endpoint.method}
                                </Badge>
                                {endpoint.name}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* 主内容区 */}
            <div className="md:col-span-3">
              {selectedEndpoint ? (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        selectedEndpoint.method === "GET"
                          ? "default"
                          : selectedEndpoint.method === "POST"
                            ? "destructive"
                            : selectedEndpoint.method === "PUT"
                              ? "warning"
                              : selectedEndpoint.method === "DELETE"
                                ? "outline"
                                : "secondary"
                      }
                      className={
                        selectedEndpoint.method === "GET"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : selectedEndpoint.method === "POST"
                            ? "bg-green-500 hover:bg-green-600"
                            : selectedEndpoint.method === "PUT"
                              ? "bg-amber-500 hover:bg-amber-600"
                              : selectedEndpoint.method === "DELETE"
                                ? "bg-red-500 hover:bg-red-600"
                                : ""
                      }
                    >
                      {selectedEndpoint.method}
                    </Badge>
                    <h2 className="text-2xl font-bold">{selectedEndpoint.name}</h2>
                  </div>

                  <div className="bg-muted p-4 rounded-md">
                    <code className="text-sm font-mono break-all">{selectedEndpoint.path}</code>
                  </div>

                  <p>{selectedEndpoint.description}</p>

                  <Tabs defaultValue="docs">
                    <TabsList className="mb-4 flex-wrap">
                      <TabsTrigger value="docs">
                        <FileText className="h-4 w-4 mr-2" />
                        {t("tabs.docs")}
                      </TabsTrigger>
                      <TabsTrigger value="examples">
                        <Code className="h-4 w-4 mr-2" />
                        {t("tabs.examples")}
                      </TabsTrigger>
                      <TabsTrigger value="test">
                        <Settings className="h-4 w-4 mr-2" />
                        {t("tabs.test")}
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="docs">
                      <div className="space-y-6">
                        {selectedEndpoint.params.length > 0 && (
                          <div>
                            <h3 className="text-lg font-bold mb-2">{t("endpoints.params")}</h3>
                            <div className="overflow-x-auto">
                              <table className="min-w-full border-collapse">
                                <thead>
                                  <tr>
                                    <th className="border px-4 py-2 text-left">{t("params.name")}</th>
                                    <th className="border px-4 py-2 text-left">{t("params.type")}</th>
                                    <th className="border px-4 py-2 text-left">{t("params.required")}</th>
                                    <th className="border px-4 py-2 text-left">{t("params.description")}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {selectedEndpoint.params.map((param: any, index: number) => (
                                    <tr key={index}>
                                      <td className="border px-4 py-2">{param.name}</td>
                                      <td className="border px-4 py-2">{param.type}</td>
                                      <td className="border px-4 py-2">
                                        {param.required ? t("params.yes") : t("params.no")}
                                      </td>
                                      <td className="border px-4 py-2">{param.description}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        <div>
                          <h3 className="text-lg font-bold mb-2">{t("endpoints.response")}</h3>
                          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                            {JSON.stringify(
                              {
                                success: true,
                                data:
                                  selectedEndpoint.method === "GET"
                                    ? [
                                        { id: "item_1", name: "示例数据1" },
                                        { id: "item_2", name: "示例数据2" },
                                      ]
                                    : { id: "item_1", name: "示例数据" },
                                pagination:
                                  selectedEndpoint.method === "GET"
                                    ? {
                                        total: 100,
                                        page: 1,
                                        limit: 20,
                                        pages: 5,
                                      }
                                    : undefined,
                              },
                              null,
                              2,
                            )}
                          </pre>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="examples">
                      <CodeExamples endpoint={selectedEndpoint} />
                    </TabsContent>

                    <TabsContent value="test">
                      <ApiTester
                        endpoint={selectedEndpoint.path}
                        method={selectedEndpoint.method}
                        params={selectedEndpoint.params}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              ) : (
                <div className="bg-muted rounded-lg p-8 text-center">
                  <Info className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-bold mb-2">{t("endpoints.select")}</h3>
                  <p className="text-muted-foreground">{t("endpoints.select.description")}</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sandbox">
          <ApiSandbox />
        </TabsContent>

        <TabsContent value="status">
          <ApiStatusMonitor />
        </TabsContent>

        <TabsContent value="tutorials">
          <ApiTutorials />
        </TabsContent>

        <TabsContent value="files">
          <ApiFileManager />
        </TabsContent>

        <TabsContent value="file-integration">
          <ApiFileIntegration />
        </TabsContent>

        <TabsContent value="usage">
          <ApiUsageStats />
        </TabsContent>

        <TabsContent value="tests">
          <ApiAutomatedTests />
        </TabsContent>

        <TabsContent value="version-compare">
          <ApiVersionCompare versions={API_VERSIONS} />
        </TabsContent>

        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>API权限管理</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">用户角色</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <h4 className="font-medium">管理员</h4>
                          <p className="text-sm text-muted-foreground">完全访问所有API和管理功能</p>
                        </div>
                        <Badge>5个用户</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <h4 className="font-medium">开发者</h4>
                          <p className="text-sm text-muted-foreground">访问所有API，但无管理权限</p>
                        </div>
                        <Badge>12个用户</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <h4 className="font-medium">测试人员</h4>
                          <p className="text-sm text-muted-foreground">仅访问测试环境API</p>
                        </div>
                        <Badge>8个用户</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <h4 className="font-medium">只读用户</h4>
                          <p className="text-sm text-muted-foreground">仅查看API文档，无调用权限</p>
                        </div>
                        <Badge>20个用户</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">API访问控制</h3>
                    <div className="space-y-4">
                      <div className="p-3 border rounded-md">
                        <h4 className="font-medium mb-2">认证API</h4>
                        <div className="space-y-2">
                          {["管理员", "开发者", "测试人员"].map((role) => (
                            <div key={role} className="flex items-center space-x-2">
                              <Badge variant="outline">{role}</Badge>
                              <span className="text-sm text-green-600">允许访问</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-3 border rounded-md">
                        <h4 className="font-medium mb-2">用户管理API</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">管理员</Badge>
                            <span className="text-sm text-green-600">完全访问</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">开发者</Badge>
                            <span className="text-sm text-yellow-600">只读访问</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">测试人员</Badge>
                            <span className="text-sm text-red-600">禁止访问</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">用户管理</h3>
                  <div className="border rounded-md overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-muted">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                          >
                            用户
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                          >
                            角色
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                          >
                            API密钥
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                          >
                            状态
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                          >
                            操作
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-card divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <Users className="h-5 w-5 text-gray-500" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium">管理员用户</div>
                                <div className="text-sm text-muted-foreground">admin@example.com</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge>管理员</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">api_key_*****</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className="bg-green-100 text-green-800">活跃</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <Button variant="ghost" size="sm">
                              编辑
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <Users className="h-5 w-5 text-gray-500" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium">开发者用户</div>
                                <div className="text-sm text-muted-foreground">dev@example.com</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge>开发者</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">api_key_*****</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className="bg-green-100 text-green-800">活跃</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <Button variant="ghost" size="sm">
                              编辑
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-assistant">
          <Card>
            <CardHeader>
              <CardTitle>API AI助手</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div className="border rounded-lg p-4 h-[400px] overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex justify-start">
                        <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                          <p className="text-sm">
                            您好！我是API智库AI助手。我可以帮助您了解API的使用方法、解答问题，以及提供示例代码。请问有什么可以帮助您的？
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-[80%]">
                          <p className="text-sm">如何使用用户认证API？</p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                          <p className="text-sm">
                            用户认证API用于获取访问令牌，以便调用其他需要认证的API。以下是使用步骤：
                          </p>
                          <ol className="list-decimal pl-5 mt-2 text-sm space-y-1">
                            <li>
                              向 <code>/api/auth/login</code> 发送POST请求
                            </li>
                            <li>
                              请求体中包含 <code>email</code> 和 <code>password</code> 字段
                            </li>
                            <li>
                              服务器将返回 <code>accessToken</code> 和 <code>refreshToken</code>
                            </li>
                            <li>
                              在后续请求中，在Authorization头中使用 <code>Bearer {"{accessToken}"}</code>
                            </li>
                          </ol>
                          <p className="text-sm mt-2">这是一个示例代码：</p>
                          <pre className="bg-gray-800 text-gray-100 p-2 rounded text-xs mt-2 overflow-x-auto">
                            {`fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
})
.then(response => response.json())
.then(data => {
  // 保存令牌
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
})`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Input placeholder="输入您的问题..." className="flex-1" />
                    <Button>发送</Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">常见问题</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0">
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start text-sm h-auto py-2">
                          如何获取API密钥？
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-sm h-auto py-2">
                          API请求限制是多少？
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-sm h-auto py-2">
                          如何处理API错误？
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-sm h-auto py-2">
                          如何使用批量导出API？
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-sm h-auto py-2">
                          API支持哪些编程语言？
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">相关资源</CardTitle>
                    </CardHeader>
                    <CardContent className="py-0">
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start text-sm h-auto py-2 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          API完整文档
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-sm h-auto py-2 flex items-center">
                          <Code className="h-4 w-4 mr-2" />
                          代码示例库
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-sm h-auto py-2 flex items-center">
                          <BookOpen className="h-4 w-4 mr-2" />
                          API教程
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="changelog">
          <Changelog />
        </TabsContent>

        <TabsContent value="export">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ApiExporter apiVersions={API_VERSIONS} />
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("export.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>{t("export.description")}</p>
                    <div className="space-y-2">
                      <h3 className="font-medium">{t("export.pdfFormat")}</h3>
                      <p className="text-sm text-muted-foreground">{t("export.pdfDescription")}</p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">{t("export.markdownFormat")}</h3>
                      <p className="text-sm text-muted-foreground">{t("export.markdownDescription")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("export.batchExport")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{t("export.batchDescription")}</p>
                  <Button variant="outline" className="w-full">
                    {t("export.contactAdmin")}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{t("app.overview")}</h2>
          <p>{t("app.overviewDescription")}</p>

          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-bold mb-2">{t("app.basicInfo")}</h3>
            <ul className="space-y-2">
              <li>
                <strong>{t("info.baseUrl")}</strong> <code>/api</code>
              </li>
              <li>
                <strong>{t("info.auth")}</strong> Bearer Token
              </li>
              <li>
                <strong>{t("info.response")}</strong> JSON
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{t("app.errorCodes")}</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border px-4 py-2 text-left">{t("errorCodes.status")}</th>
                  <th className="border px-4 py-2 text-left">{t("errorCodes.code")}</th>
                  <th className="border px-4 py-2 text-left">{t("errorCodes.description")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">400</td>
                  <td className="border px-4 py-2">INVALID_REQUEST</td>
                  <td className="border px-4 py-2">{t("errorCodes.invalidRequest")}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">401</td>
                  <td className="border px-4 py-2">UNAUTHORIZED</td>
                  <td className="border px-4 py-2">{t("errorCodes.unauthorized")}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">403</td>
                  <td className="border px-4 py-2">FORBIDDEN</td>
                  <td className="border px-4 py-2">{t("errorCodes.forbidden")}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">404</td>
                  <td className="border px-4 py-2">NOT_FOUND</td>
                  <td className="border px-4 py-2">{t("errorCodes.notFound")}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">429</td>
                  <td className="border px-4 py-2">RATE_LIMIT</td>
                  <td className="border px-4 py-2">{t("errorCodes.rateLimit")}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">500</td>
                  <td className="border px-4 py-2">SERVER_ERROR</td>
                  <td className="border px-4 py-2">{t("errorCodes.serverError")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}

// 包装主组件，提供语言上下文
export function ApiDocsClientPage() {
  return (
    <LanguageProvider>
      <ApiDocsContent />
    </LanguageProvider>
  )
}
