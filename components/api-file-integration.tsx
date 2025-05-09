"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { FileIcon, FolderIcon, LinkIcon, PlusIcon, SearchIcon, FileTextIcon, CodeIcon } from "lucide-react"

// 文件类型
type FileType = "image" | "document" | "code" | "archive" | "other"

// 文件接口
interface FileItem {
  id: string
  name: string
  type: FileType
  size: number
  uploadedAt: Date
  uploadedBy: string
  status: "active" | "archived" | "deleted"
  description?: string
  tags: string[]
  url: string
  thumbnailUrl?: string
  category?: string
  content?: string
}

// API端点接口
interface ApiEndpoint {
  id: string
  name: string
  method: string
  path: string
  description: string
  category: string
}

// 文件关联接口
interface FileAssociation {
  fileId: string
  endpointId: string
  associationType: "documentation" | "example" | "schema" | "test" | "other"
  description?: string
  createdAt: Date
}

// 格式化文件大小
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

// 获取文件类型图标
const getFileTypeIcon = (type: FileType) => {
  switch (type) {
    case "image":
      return <FileIcon className="h-5 w-5 text-blue-500" />
    case "document":
      return <FileTextIcon className="h-5 w-5 text-green-500" />
    case "code":
      return <CodeIcon className="h-5 w-5 text-purple-500" />
    case "archive":
      return <FileIcon className="h-5 w-5 text-yellow-500" />
    default:
      return <FileIcon className="h-5 w-5 text-gray-500" />
  }
}

// 模拟API端点数据
const mockEndpoints: ApiEndpoint[] = [
  {
    id: "endpoint_1",
    name: "获取用户列表",
    method: "GET",
    path: "/api/users",
    description: "获取系统用户列表",
    category: "用户管理",
  },
  {
    id: "endpoint_2",
    name: "创建新用户",
    method: "POST",
    path: "/api/users",
    description: "创建新的系统用户",
    category: "用户管理",
  },
  {
    id: "endpoint_3",
    name: "获取系统概览数据",
    method: "GET",
    path: "/api/stats/overview",
    description: "获取系统概览统计数据",
    category: "数据统计",
  },
  {
    id: "endpoint_4",
    name: "登录获取令牌",
    method: "POST",
    path: "/api/auth/login",
    description: "通过用户名和密码获取访问令牌",
    category: "认证",
  },
]

// 模拟文件数据
const mockFiles: FileItem[] = [
  {
    id: "file_1",
    name: "api-documentation.pdf",
    type: "document",
    size: 2456789,
    uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    uploadedBy: "admin@example.com",
    status: "active",
    description: "API完整文档，包含所有端点和参数说明",
    tags: ["文档", "API", "参考"],
    url: "#",
    category: "文档",
  },
  {
    id: "file_2",
    name: "api-schema.json",
    type: "code",
    size: 45678,
    uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    uploadedBy: "developer@example.com",
    status: "active",
    description: "API的JSON Schema定义",
    tags: ["Schema", "JSON", "定义"],
    url: "#",
    category: "技术",
  },
  {
    id: "file_3",
    name: "api-flow-diagram.png",
    type: "image",
    size: 1234567,
    uploadedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    uploadedBy: "designer@example.com",
    status: "active",
    description: "API调用流程图",
    tags: ["图表", "流程", "设计"],
    url: "#",
    thumbnailUrl: "#",
    category: "设计",
  },
]

// 模拟文件关联数据
const mockAssociations: FileAssociation[] = [
  {
    fileId: "file_1",
    endpointId: "endpoint_1",
    associationType: "documentation",
    description: "用户API文档",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    fileId: "file_2",
    endpointId: "endpoint_1",
    associationType: "schema",
    description: "用户API Schema",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    fileId: "file_3",
    endpointId: "endpoint_1",
    associationType: "documentation",
    description: "用户API流程图",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
]

export function ApiFileIntegration() {
  const [activeTab, setActiveTab] = useState<string>("browse")
  const [files, setFiles] = useState<FileItem[]>(mockFiles)
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>(mockEndpoints)
  const [associations, setAssociations] = useState<FileAssociation[]>(mockAssociations)
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("")
  const [selectedFile, setSelectedFile] = useState<string>("")
  const [associationType, setAssociationType] = useState<string>("documentation")
  const [associationDescription, setAssociationDescription] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [categoryFilter, setCategoryFilter] = useState<string>("")

  // 过滤文件
  const filteredFiles = files.filter((file) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        file.name.toLowerCase().includes(query) ||
        file.description?.toLowerCase().includes(query) ||
        file.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }
    return true
  })

  // 过滤端点
  const filteredEndpoints = endpoints.filter((endpoint) => {
    let matches = true

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      matches =
        matches &&
        (endpoint.name.toLowerCase().includes(query) ||
          endpoint.path.toLowerCase().includes(query) ||
          endpoint.description.toLowerCase().includes(query))
    }

    if (categoryFilter) {
      matches = matches && endpoint.category === categoryFilter
    }

    return matches
  })

  // 获取端点的关联文件
  const getEndpointFiles = (endpointId: string) => {
    const endpointAssociations = associations.filter((assoc) => assoc.endpointId === endpointId)
    return endpointAssociations
      .map((assoc) => {
        const file = files.find((f) => f.id === assoc.fileId)
        return {
          ...file,
          associationType: assoc.associationType,
          associationDescription: assoc.description,
        }
      })
      .filter(Boolean) as (FileItem & { associationType: string; associationDescription?: string })[]
  }

  // 获取文件的关联端点
  const getFileEndpoints = (fileId: string) => {
    const fileAssociations = associations.filter((assoc) => assoc.fileId === fileId)
    return fileAssociations
      .map((assoc) => {
        const endpoint = endpoints.find((e) => e.id === assoc.endpointId)
        return {
          ...endpoint,
          associationType: assoc.associationType,
          associationDescription: assoc.description,
        }
      })
      .filter(Boolean) as (ApiEndpoint & { associationType: string; associationDescription?: string })[]
  }

  // 创建新关联
  const createAssociation = () => {
    if (!selectedEndpoint || !selectedFile) {
      toast({
        title: "错误",
        description: "请选择端点和文件",
        variant: "destructive",
      })
      return
    }

    // 检查是否已存在相同关联
    const existingAssociation = associations.find(
      (assoc) => assoc.endpointId === selectedEndpoint && assoc.fileId === selectedFile,
    )

    if (existingAssociation) {
      toast({
        title: "错误",
        description: "此关联已存在",
        variant: "destructive",
      })
      return
    }

    // 创建新关联
    const newAssociation: FileAssociation = {
      fileId: selectedFile,
      endpointId: selectedEndpoint,
      associationType: associationType as "documentation" | "example" | "schema" | "test" | "other",
      description: associationDescription,
      createdAt: new Date(),
    }

    setAssociations([...associations, newAssociation])

    toast({
      title: "成功",
      description: "文件关联创建成功",
    })

    // 重置表单
    setSelectedEndpoint("")
    setSelectedFile("")
    setAssociationType("documentation")
    setAssociationDescription("")
  }

  // 删除关联
  const deleteAssociation = (fileId: string, endpointId: string) => {
    setAssociations(associations.filter((assoc) => !(assoc.fileId === fileId && assoc.endpointId === endpointId)))

    toast({
      title: "成功",
      description: "文件关联已删除",
    })
  }

  // 获取所有端点分类
  const endpointCategories = Array.from(new Set(endpoints.map((endpoint) => endpoint.category)))

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>API文档与文件集成</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="browse">浏览关联</TabsTrigger>
            <TabsTrigger value="create">创建关联</TabsTrigger>
            <TabsTrigger value="manage">管理关联</TabsTrigger>
          </TabsList>

          {/* 浏览关联 */}
          <TabsContent value="browse" className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索端点或文件..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="所有分类" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有分类</SelectItem>
                  {endpointCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 端点列表 */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">API端点</h3>
                {filteredEndpoints.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FolderIcon className="h-12 w-12 mx-auto mb-2 opacity-20" />
                    <p>没有找到匹配的端点</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredEndpoints.map((endpoint) => {
                      const endpointFiles = getEndpointFiles(endpoint.id)
                      return (
                        <Card key={endpoint.id} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center space-x-2">
                                  <Badge
                                    className={
                                      endpoint.method === "GET"
                                        ? "bg-blue-100 text-blue-800"
                                        : endpoint.method === "POST"
                                          ? "bg-green-100 text-green-800"
                                          : endpoint.method === "PUT"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-800"
                                    }
                                  >
                                    {endpoint.method}
                                  </Badge>
                                  <h4 className="font-medium">{endpoint.name}</h4>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{endpoint.path}</p>
                                <p className="text-sm mt-2">{endpoint.description}</p>
                              </div>
                              <Badge variant="outline">{endpoint.category}</Badge>
                            </div>

                            {endpointFiles.length > 0 && (
                              <div className="mt-4">
                                <h5 className="text-sm font-medium mb-2">关联文件</h5>
                                <div className="space-y-2">
                                  {endpointFiles.map((file) => (
                                    <div
                                      key={file.id}
                                      className="flex items-center justify-between bg-muted p-2 rounded-md"
                                    >
                                      <div className="flex items-center space-x-2">
                                        {getFileTypeIcon(file.type)}
                                        <span className="text-sm">{file.name}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Badge variant="outline" className="text-xs">
                                          {file.associationType}
                                        </Badge>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-6 w-6"
                                          onClick={() => deleteAssociation(file.id, endpoint.id)}
                                        >
                                          <LinkIcon className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* 文件列表 */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">文件</h3>
                {filteredFiles.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileIcon className="h-12 w-12 mx-auto mb-2 opacity-20" />
                    <p>没有找到匹配的文件</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredFiles.map((file) => {
                      const fileEndpoints = getFileEndpoints(file.id)
                      return (
                        <Card key={file.id} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                <div className="mt-1">{getFileTypeIcon(file.type)}</div>
                                <div>
                                  <h4 className="font-medium">{file.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {formatFileSize(file.size)} • {file.uploadedAt.toLocaleDateString()}
                                  </p>
                                  {file.description && <p className="text-sm mt-1">{file.description}</p>}
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {file.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {fileEndpoints.length > 0 && (
                              <div className="mt-4">
                                <h5 className="text-sm font-medium mb-2">关联端点</h5>
                                <div className="space-y-2">
                                  {fileEndpoints.map((endpoint) => (
                                    <div
                                      key={endpoint.id}
                                      className="flex items-center justify-between bg-muted p-2 rounded-md"
                                    >
                                      <div className="flex items-center space-x-2">
                                        <Badge
                                          className={
                                            endpoint.method === "GET"
                                              ? "bg-blue-100 text-blue-800"
                                              : endpoint.method === "POST"
                                                ? "bg-green-100 text-green-800"
                                                : endpoint.method === "PUT"
                                                  ? "bg-yellow-100 text-yellow-800"
                                                  : "bg-red-100 text-red-800"
                                          }
                                        >
                                          {endpoint.method}
                                        </Badge>
                                        <span className="text-sm">{endpoint.name}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Badge variant="outline" className="text-xs">
                                          {endpoint.associationType}
                                        </Badge>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-6 w-6"
                                          onClick={() => deleteAssociation(file.id, endpoint.id)}
                                        >
                                          <LinkIcon className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* 创建关联 */}
          <TabsContent value="create" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 选择端点 */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">选择API端点</h3>
                <div className="relative">
                  <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="搜索端点..." className="pl-8" onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className="border rounded-md h-[300px] overflow-y-auto">
                  {filteredEndpoints.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>没有找到匹配的端点</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {filteredEndpoints.map((endpoint) => (
                        <div
                          key={endpoint.id}
                          className={`p-3 cursor-pointer hover:bg-muted ${
                            selectedEndpoint === endpoint.id ? "bg-muted" : ""
                          }`}
                          onClick={() => setSelectedEndpoint(endpoint.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={selectedEndpoint === endpoint.id}
                                onCheckedChange={() => setSelectedEndpoint(endpoint.id)}
                              />
                              <Badge
                                className={
                                  endpoint.method === "GET"
                                    ? "bg-blue-100 text-blue-800"
                                    : endpoint.method === "POST"
                                      ? "bg-green-100 text-green-800"
                                      : endpoint.method === "PUT"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                }
                              >
                                {endpoint.method}
                              </Badge>
                              <span className="font-medium">{endpoint.name}</span>
                            </div>
                            <Badge variant="outline">{endpoint.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{endpoint.path}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 选择文件 */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">选择文件</h3>
                <div className="relative">
                  <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="搜索文件..." className="pl-8" onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className="border rounded-md h-[300px] overflow-y-auto">
                  {filteredFiles.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>没有找到匹配的文件</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {filteredFiles.map((file) => (
                        <div
                          key={file.id}
                          className={`p-3 cursor-pointer hover:bg-muted ${selectedFile === file.id ? "bg-muted" : ""}`}
                          onClick={() => setSelectedFile(file.id)}
                        >
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={selectedFile === file.id}
                              onCheckedChange={() => setSelectedFile(file.id)}
                            />
                            {getFileTypeIcon(file.type)}
                            <div>
                              <div className="font-medium">{file.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)} • {file.uploadedAt.toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          {file.description && (
                            <p className="text-sm text-muted-foreground mt-1 ml-6">{file.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 关联设置 */}
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-lg font-medium">关联设置</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="association-type">关联类型</Label>
                  <Select value={associationType} onValueChange={setAssociationType}>
                    <SelectTrigger id="association-type">
                      <SelectValue placeholder="选择关联类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="documentation">文档</SelectItem>
                      <SelectItem value="example">示例</SelectItem>
                      <SelectItem value="schema">Schema</SelectItem>
                      <SelectItem value="test">测试</SelectItem>
                      <SelectItem value="other">其他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="association-description">关联描述</Label>
                  <Input
                    id="association-description"
                    placeholder="描述此关联的用途"
                    value={associationDescription}
                    onChange={(e) => setAssociationDescription(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={createAssociation} disabled={!selectedEndpoint || !selectedFile}>
                <PlusIcon className="h-4 w-4 mr-2" />
                创建关联
              </Button>
            </div>
          </TabsContent>

          {/* 管理关联 */}
          <TabsContent value="manage" className="space-y-4">
            <h3 className="text-lg font-medium">所有文件关联</h3>
            {associations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <LinkIcon className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>暂无文件关联</p>
                <Button variant="outline" className="mt-4" onClick={() => setActiveTab("create")}>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  创建新关联
                </Button>
              </div>
            ) : (
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-muted">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                      >
                        文件
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                      >
                        API端点
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                      >
                        关联类型
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                      >
                        创建时间
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
                    {associations.map((association, index) => {
                      const file = files.find((f) => f.id === association.fileId)
                      const endpoint = endpoints.find((e) => e.id === association.endpointId)

                      if (!file || !endpoint) return null

                      return (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {getFileTypeIcon(file.type)}
                              <span className="text-sm font-medium">{file.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <Badge
                                className={
                                  endpoint.method === "GET"
                                    ? "bg-blue-100 text-blue-800"
                                    : endpoint.method === "POST"
                                      ? "bg-green-100 text-green-800"
                                      : endpoint.method === "PUT"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                }
                              >
                                {endpoint.method}
                              </Badge>
                              <span className="text-sm">{endpoint.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline">{association.associationType}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                            {association.createdAt.toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteAssociation(association.fileId, association.endpointId)}
                            >
                              删除
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
