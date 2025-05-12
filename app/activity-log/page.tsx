"use client"

import AppLayout from "@/app/app-layout"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, Filter, RefreshCw, Search } from "lucide-react"
import { formatDateTime } from "@/utils/date-utils"

export default function ActivityLogPage() {
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activityType, setActivityType] = useState("all")
  const [dateRange, setDateRange] = useState("7d")

  // 模拟活动日志数据
  const now = new Date()
  const activityLogs = [
    {
      id: "log_1",
      timestamp: formatDateTime(now),
      type: "api",
      description: "调用用户认证API",
      status: "success",
      user: "admin@example.com",
      details: {
        endpoint: "/api/auth/login",
        method: "POST",
        responseTime: 120,
        responseCode: 200,
      },
    },
    {
      id: "log_2",
      timestamp: "2023-05-09 08:15:00",
      type: "file",
      description: "上传文件 data.json",
      status: "success",
      user: "admin@example.com",
      details: {
        fileSize: "1.2 MB",
        fileType: "application/json",
        storagePath: "/uploads/data.json",
      },
    },
    {
      id: "log_3",
      timestamp: "2023-05-09 08:00:00",
      type: "system",
      description: "用户登录",
      status: "success",
      user: "admin@example.com",
      details: {
        ipAddress: "192.168.1.1",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        location: "北京",
      },
    },
    {
      id: "log_4",
      timestamp: "2023-05-08 17:45:00",
      type: "api",
      description: "调用数据统计API",
      status: "success",
      user: "admin@example.com",
      details: {
        endpoint: "/api/stats/overview",
        method: "GET",
        responseTime: 150,
        responseCode: 200,
      },
    },
    {
      id: "log_5",
      timestamp: "2023-05-08 16:30:00",
      type: "api",
      description: "调用批量导出API",
      status: "error",
      user: "admin@example.com",
      details: {
        endpoint: "/api/export/batch",
        method: "POST",
        responseTime: 350,
        responseCode: 400,
        errorMessage: "参数验证失败",
      },
    },
    {
      id: "log_6",
      timestamp: "2023-05-08 15:20:00",
      type: "system",
      description: "更新用户设置",
      status: "success",
      user: "admin@example.com",
      details: {
        settingsType: "通知设置",
        changes: "启用邮件通知",
      },
    },
    {
      id: "log_7",
      timestamp: "2023-05-08 14:10:00",
      type: "file",
      description: "下载文件 report.pdf",
      status: "success",
      user: "admin@example.com",
      details: {
        fileSize: "2.5 MB",
        fileType: "application/pdf",
        storagePath: "/reports/report.pdf",
      },
    },
    {
      id: "log_8",
      timestamp: "2023-05-08 13:05:00",
      type: "api",
      description: "调用用户管理API",
      status: "success",
      user: "admin@example.com",
      details: {
        endpoint: "/api/users",
        method: "GET",
        responseTime: 180,
        responseCode: 200,
      },
    },
    {
      id: "log_9",
      timestamp: "2023-05-08 11:30:00",
      type: "system",
      description: "生成API密钥",
      status: "success",
      user: "admin@example.com",
      details: {
        keyType: "读取权限",
        expiresIn: "30天",
      },
    },
    {
      id: "log_10",
      timestamp: "2023-05-08 10:15:00",
      type: "api",
      description: "调用文件存储API",
      status: "success",
      user: "admin@example.com",
      details: {
        endpoint: "/api/storage/list",
        method: "GET",
        responseTime: 210,
        responseCode: 200,
      },
    },
  ]

  // 刷新活动日志
  const refreshActivityLog = () => {
    setLoading(true)
    // 模拟API调用
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  // 获取活动类型徽章
  const getActivityTypeBadge = (type) => {
    switch (type) {
      case "api":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            API调用
          </Badge>
        )
      case "file":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
            文件
          </Badge>
        )
      case "system":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            系统
          </Badge>
        )
      default:
        return <Badge variant="outline">其他</Badge>
    }
  }

  // 获取状态徽章
  const getStatusBadge = (status) => {
    switch (status) {
      case "success":
        return <span className="text-green-600">成功</span>
      case "error":
        return <span className="text-red-600">失败</span>
      case "warning":
        return <span className="text-amber-600">警告</span>
      default:
        return <span className="text-gray-600">未知</span>
    }
  }

  // 过滤活动日志
  const filteredLogs = activityLogs.filter((log) => {
    const matchesSearch = searchQuery
      ? log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.user.toLowerCase().includes(searchQuery.toLowerCase())
      : true

    const matchesType = activityType !== "all" ? log.type === activityType : true

    return matchesSearch && matchesType
  })

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle className="text-2xl">活动日志</CardTitle>
                <CardDescription>查看系统活动和操作历史</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={refreshActivityLog} disabled={loading}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  刷新
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  导出
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 过滤器 */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索活动..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={activityType} onValueChange={setActivityType}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="活动类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有类型</SelectItem>
                    <SelectItem value="api">API调用</SelectItem>
                    <SelectItem value="file">文件操作</SelectItem>
                    <SelectItem value="system">系统事件</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[180px]">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="时间范围" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">过去24小时</SelectItem>
                    <SelectItem value="7d">过去7天</SelectItem>
                    <SelectItem value="30d">过去30天</SelectItem>
                    <SelectItem value="custom">自定义范围</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 活动日志表格 */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted px-4 py-2 border-b">
                  <div className="grid grid-cols-12 gap-4 text-sm font-medium">
                    <div className="col-span-3">时间</div>
                    <div className="col-span-2">类型</div>
                    <div className="col-span-4">描述</div>
                    <div className="col-span-2">用户</div>
                    <div className="col-span-1">状态</div>
                  </div>
                </div>
                <div className="divide-y">
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log) => (
                      <div key={log.id} className="px-4 py-3 hover:bg-muted/50 transition-colors">
                        <div className="grid grid-cols-12 gap-4 text-sm">
                          <div className="col-span-3 text-muted-foreground">{log.timestamp}</div>
                          <div className="col-span-2">{getActivityTypeBadge(log.type)}</div>
                          <div className="col-span-4">{log.description}</div>
                          <div className="col-span-2 truncate">{log.user}</div>
                          <div className="col-span-1">{getStatusBadge(log.status)}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-muted-foreground">没有找到匹配的活动记录</div>
                  )}
                </div>
              </div>

              {/* 分页 */}
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  显示 {filteredLogs.length} 条记录（共 {activityLogs.length} 条）
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    上一页
                  </Button>
                  <Button variant="outline" size="sm" className="bg-muted">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    下一页
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
