"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Calendar, Download, RefreshCw, Share2, Zap } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ResponsiveLineChart, ResponsiveBarChart, ResponsivePieChart } from "@/components/responsive-charts"
import { ResponsiveStatCard } from "@/components/responsive-stat-card"
import { ResponsiveDataTable } from "@/components/responsive-data-table"

// 时间范围类型
type TimeRange = "24h" | "7d" | "30d" | "90d" | "custom"

// 图表类型
type ChartType = "requests" | "latency" | "errors" | "users" | "endpoints"

// 端点使用数据接口
interface EndpointUsage {
  endpoint: string
  category: string
  requests: number
  avgLatency: number
  errorRate: number
  cachingRate: number
}

// 用户使用数据接口
interface UserUsage {
  userId: string
  username: string
  organization: string
  requests: number
  lastActive: Date
  topEndpoints: string[]
}

// 时间序列数据点接口
interface TimeSeriesDataPoint {
  timestamp: Date
  requests: number
  uniqueUsers: number
  avgLatency: number
  errorRate: number
  cacheHitRate: number
}

// 错误分布数据接口
interface ErrorDistribution {
  errorCode: string
  errorMessage: string
  count: number
  percentage: number
}

// 地理分布数据接口
interface GeoDistribution {
  country: string
  requests: number
  percentage: number
}

// 生成模拟的端点使用数据
const generateMockEndpointUsage = (): EndpointUsage[] => {
  const endpoints = [
    { endpoint: "/api/auth/login", category: "认证" },
    { endpoint: "/api/auth/refresh", category: "认证" },
    { endpoint: "/api/users", category: "用户管理" },
    { endpoint: "/api/users/{id}", category: "用户管理" },
    { endpoint: "/api/export/batch", category: "批量导出" },
    { endpoint: "/api/export/batches", category: "批量导出" },
    { endpoint: "/api/stats/overview", category: "数据统计" },
    { endpoint: "/api/stats/usage", category: "数据统计" },
  ]

  return endpoints.map((endpoint) => ({
    ...endpoint,
    requests: Math.floor(Math.random() * 10000) + 1000,
    avgLatency: Math.floor(Math.random() * 200) + 50,
    errorRate: Math.random() * 0.05,
    cachingRate: Math.random() * 0.8,
  }))
}

// 生成模拟的用户使用数据
const generateMockUserUsage = (): UserUsage[] => {
  const users = [
    { userId: "user_1", username: "admin@example.com", organization: "总部" },
    { userId: "user_2", username: "developer1@example.com", organization: "研发部" },
    { userId: "user_3", username: "developer2@example.com", organization: "研发部" },
    { userId: "user_4", username: "analyst@example.com", organization: "数据分析部" },
    { userId: "user_5", username: "manager@example.com", organization: "管理部" },
  ]

  const endpoints = ["/api/auth/login", "/api/users", "/api/export/batch", "/api/stats/overview", "/api/stats/usage"]

  return users.map((user) => {
    // 随机选择2-3个常用端点
    const numEndpoints = Math.floor(Math.random() * 2) + 2
    const shuffled = [...endpoints].sort(() => 0.5 - Math.random())
    const topEndpoints = shuffled.slice(0, numEndpoints)

    return {
      ...user,
      requests: Math.floor(Math.random() * 5000) + 100,
      lastActive: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
      topEndpoints,
    }
  })
}

// 生成模拟的时间序列数据
const generateMockTimeSeriesData = (days: number): TimeSeriesDataPoint[] => {
  const data: TimeSeriesDataPoint[] = []
  const now = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    date.setHours(0, 0, 0, 0)

    // 工作日请求量更高
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    const baseRequests = isWeekend ? 5000 : 12000

    // 添加一些随机波动
    const requests = Math.max(100, baseRequests + Math.floor(Math.random() * 3000 - 1500))
    const uniqueUsers = Math.max(10, Math.floor(requests / (10 + Math.random() * 5)))
    const avgLatency = Math.max(50, 120 + Math.floor(Math.random() * 60 - 30))
    const errorRate = Math.max(0.001, 0.02 + Math.random() * 0.02 - 0.01)
    const cacheHitRate = Math.max(0.1, 0.6 + Math.random() * 0.2 - 0.1)

    data.push({
      timestamp: date,
      requests,
      uniqueUsers,
      avgLatency,
      errorRate,
      cacheHitRate,
    })
  }

  return data
}

// 生成模拟的错误分布数据
const generateMockErrorDistribution = (): ErrorDistribution[] => {
  const errors = [
    { errorCode: "401", errorMessage: "未授权访问" },
    { errorCode: "403", errorMessage: "权限不足" },
    { errorCode: "404", errorMessage: "资源不存在" },
    { errorCode: "429", errorMessage: "请求频率超限" },
    { errorCode: "500", errorMessage: "服务器内部错误" },
    { errorCode: "503", errorMessage: "服务不可用" },
  ]

  // 总错误数
  const totalErrors = 1000

  // 分配错误比例
  const errorCounts = [350, 250, 150, 120, 100, 30]

  return errors.map((error, index) => ({
    ...error,
    count: errorCounts[index],
    percentage: (errorCounts[index] / totalErrors) * 100,
  }))
}

// 生成模拟的地理分布数据
const generateMockGeoDistribution = (): GeoDistribution[] => {
  const countries = [
    { country: "中国", requests: 8500 },
    { country: "美国", requests: 3200 },
    { country: "日本", requests: 1800 },
    { country: "韩国", requests: 1200 },
    { country: "德国", requests: 950 },
    { country: "英国", requests: 850 },
    { country: "法国", requests: 750 },
    { country: "其他", requests: 1750 },
  ]

  const totalRequests = countries.reduce((sum, country) => sum + country.requests, 0)

  return countries.map((country) => ({
    ...country,
    percentage: (country.requests / totalRequests) * 100,
  }))
}

// 格式化数字
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}

// 颜色配置
const COLORS = {
  primary: "#3b82f6",
  secondary: "#10b981",
  accent: "#8b5cf6",
  error: "#ef4444",
  warning: "#f59e0b",
  info: "#06b6d4",
  success: "#22c55e",
  background: "#f8fafc",
  pieColors: ["#3b82f6", "#10b981", "#8b5cf6", "#ef4444", "#f59e0b", "#06b6d4", "#22c55e", "#94a3b8"],
}

export function ApiUsageStats() {
  const { t } = useLanguage()
  const [timeRange, setTimeRange] = useState<TimeRange>("7d")
  const [chartType, setChartType] = useState<ChartType>("requests")
  const [loading, setLoading] = useState(false)
  const [customDateRange, setCustomDateRange] = useState<{ start: string; end: string }>({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    end: new Date().toISOString().split("T")[0],
  })

  // 模拟数据
  const [endpointUsage, setEndpointUsage] = useState<EndpointUsage[]>([])
  const [userUsage, setUserUsage] = useState<UserUsage[]>([])
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesDataPoint[]>([])
  const [errorDistribution, setErrorDistribution] = useState<ErrorDistribution[]>([])
  const [geoDistribution, setGeoDistribution] = useState<GeoDistribution[]>([])

  // 检测是否为移动设备
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)")

  // 加载数据
  useEffect(() => {
    loadData()
  }, [timeRange])

  // 加载数据函数
  const loadData = () => {
    setLoading(true)

    // 模拟API调用延迟
    setTimeout(() => {
      // 根据时间范围生成不同的数据
      let days = 7
      switch (timeRange) {
        case "24h":
          days = 1
          break
        case "7d":
          days = 7
          break
        case "30d":
          days = 30
          break
        case "90d":
          days = 90
          break
        case "custom":
          // 计算自定义日期范围的天数
          const start = new Date(customDateRange.start)
          const end = new Date(customDateRange.end)
          days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
          break
      }

      setEndpointUsage(generateMockEndpointUsage())
      setUserUsage(generateMockUserUsage())
      setTimeSeriesData(generateMockTimeSeriesData(days))
      setErrorDistribution(generateMockErrorDistribution())
      setGeoDistribution(generateMockGeoDistribution())

      setLoading(false)
    }, 800)
  }

  // 刷新数据
  const refreshData = () => {
    loadData()
  }

  // 计算总请求数
  const totalRequests = timeSeriesData.reduce((sum, dataPoint) => sum + dataPoint.requests, 0)

  // 计算平均延迟
  const avgLatency =
    timeSeriesData.reduce((sum, dataPoint) => sum + dataPoint.avgLatency, 0) / timeSeriesData.length || 0

  // 计算平均错误率
  const avgErrorRate =
    timeSeriesData.reduce((sum, dataPoint) => sum + dataPoint.errorRate, 0) / timeSeriesData.length || 0

  // 计算平均缓存命中率
  const avgCacheHitRate =
    timeSeriesData.reduce((sum, dataPoint) => sum + dataPoint.cacheHitRate, 0) / timeSeriesData.length || 0

  // 计算同比增长率（假设与上一个相同时间段相比）
  const growthRate = 0.23 // 模拟23%的增长率

  // 获取请求量最高的端点
  const topEndpoint = endpointUsage.length > 0 ? endpointUsage.sort((a, b) => b.requests - a.requests)[0] : null

  // 获取错误率最高的端点
  const highestErrorEndpoint =
    endpointUsage.length > 0 ? endpointUsage.sort((a, b) => b.errorRate - a.errorRate)[0] : null

  // 端点表格列定义
  const endpointColumns = [
    {
      header: "端点",
      accessorKey: "endpoint" as keyof EndpointUsage,
      cell: (item: EndpointUsage) => <span className="font-mono text-sm">{item.endpoint}</span>,
    },
    {
      header: "请求数",
      accessorKey: "requests" as keyof EndpointUsage,
      cell: (item: EndpointUsage) => formatNumber(item.requests),
      sortable: true,
      mobileHidden: false,
    },
    {
      header: "响应时间",
      accessorKey: "avgLatency" as keyof EndpointUsage,
      cell: (item: EndpointUsage) => (
        <div className="flex items-center">
          <span className="font-medium">{item.avgLatency.toFixed(0)} ms</span>
          <Badge
            variant="outline"
            className={`ml-2 ${
              item.avgLatency < 100 ? "text-green-600" : item.avgLatency < 200 ? "text-yellow-600" : "text-red-600"
            }`}
          >
            {item.avgLatency < 100 ? "快" : item.avgLatency < 200 ? "中" : "慢"}
          </Badge>
        </div>
      ),
      sortable: true,
      mobileHidden: true,
    },
    {
      header: "错误率",
      accessorKey: "errorRate" as keyof EndpointUsage,
      cell: (item: EndpointUsage) => (
        <div className="flex items-center">
          <span className="font-medium">{(item.errorRate * 100).toFixed(2)}%</span>
          <Badge
            variant="outline"
            className={`ml-2 ${
              item.errorRate < 0.01 ? "text-green-600" : item.errorRate < 0.05 ? "text-yellow-600" : "text-red-600"
            }`}
          >
            {item.errorRate < 0.01 ? "低" : item.errorRate < 0.05 ? "中" : "高"}
          </Badge>
        </div>
      ),
      sortable: true,
      mobileHidden: true,
    },
  ]

  // 用户表格列定义
  const userColumns = [
    {
      header: "用户",
      accessorKey: "username" as keyof UserUsage,
      mobileHidden: false,
    },
    {
      header: "组织",
      accessorKey: "organization" as keyof UserUsage,
      mobileHidden: true,
    },
    {
      header: "请求数",
      accessorKey: "requests" as keyof UserUsage,
      cell: (item: UserUsage) => formatNumber(item.requests),
      sortable: true,
      mobileHidden: false,
    },
    {
      header: "最近活动",
      accessorKey: "lastActive" as keyof UserUsage,
      cell: (item: UserUsage) => (
        <span>
          {item.lastActive.toLocaleDateString("zh-CN", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      ),
      mobileHidden: true,
    },
  ]

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">API使用统计</h2>
          <p className="text-sm text-muted-foreground">详细的API使用数据和分析</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
            <SelectTrigger className={`${isMobile ? "w-full" : "w-[180px]"}`}>
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">过去24小时</SelectItem>
              <SelectItem value="7d">过去7天</SelectItem>
              <SelectItem value="30d">过去30天</SelectItem>
              <SelectItem value="90d">过去90天</SelectItem>
              <SelectItem value="custom">自定义范围</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" onClick={refreshData} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {timeRange === "custom" && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
            <div className="space-y-1">
              <label htmlFor="start-date" className="text-sm font-medium">
                开始日期
              </label>
              <input
                id="start-date"
                type="date"
                value={customDateRange.start}
                onChange={(e) => setCustomDateRange({ ...customDateRange, start: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="end-date" className="text-sm font-medium">
                结束日期
              </label>
              <input
                id="end-date"
                type="date"
                value={customDateRange.end}
                onChange={(e) => setCustomDateRange({ ...customDateRange, end: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
              />
            </div>
          </div>
          <Button onClick={loadData} disabled={loading} className="w-full sm:w-auto mt-2 sm:mt-0">
            应用
          </Button>
        </div>
      )}

      {/* 概览卡片 - 使用响应式卡片组件 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        <ResponsiveStatCard
          title="总请求数"
          value={formatNumber(totalRequests)}
          badge={{
            text: `${Math.abs(growthRate * 100).toFixed(1)}%`,
            variant: "outline",
            icon: growthRate > 0 ? "up" : "down",
            color: growthRate > 0 ? "text-green-600" : "text-red-600",
          }}
          footer="与上一时段相比"
        />

        <ResponsiveStatCard
          title="平均响应时间"
          value={`${avgLatency.toFixed(0)} ms`}
          badge={{
            text: avgLatency < 150 ? "良好" : "一般",
            variant: "outline",
            color: avgLatency < 150 ? "text-green-600" : "text-yellow-600",
          }}
          progress={{
            value: Math.min(100, (avgLatency / 300) * 100),
            max: 100,
            color: avgLatency < 100 ? COLORS.success : avgLatency < 200 ? COLORS.warning : COLORS.error,
          }}
        />

        <ResponsiveStatCard
          title="平均错误率"
          value={`${(avgErrorRate * 100).toFixed(2)}%`}
          badge={{
            text: avgErrorRate < 0.01 ? "极低" : avgErrorRate < 0.05 ? "正常" : "偏高",
            variant: "outline",
            color: avgErrorRate < 0.01 ? "text-green-600" : avgErrorRate < 0.05 ? "text-yellow-600" : "text-red-600",
          }}
          progress={{
            value: Math.min(100, avgErrorRate * 1000),
            max: 100,
            color: avgErrorRate < 0.01 ? COLORS.success : avgErrorRate < 0.05 ? COLORS.warning : COLORS.error,
          }}
        />

        <ResponsiveStatCard
          title="缓存命中率"
          value={`${(avgCacheHitRate * 100).toFixed(1)}%`}
          badge={{
            text: avgCacheHitRate > 0.7 ? "优秀" : avgCacheHitRate > 0.4 ? "一般" : "较低",
            variant: "outline",
            color:
              avgCacheHitRate > 0.7 ? "text-green-600" : avgCacheHitRate > 0.4 ? "text-yellow-600" : "text-red-600",
          }}
          progress={{
            value: avgCacheHitRate * 100,
            max: 100,
            color: avgCacheHitRate > 0.7 ? COLORS.success : avgCacheHitRate > 0.4 ? COLORS.warning : COLORS.error,
          }}
        />
      </div>

      {/* 主要图表 - 使用响应式图表组件 */}
      <Card>
        <CardHeader className={isMobile ? "px-3 py-3" : ""}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <CardTitle className={isMobile ? "text-lg" : ""}>API使用趋势</CardTitle>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
              <Tabs
                value={chartType}
                onValueChange={(value) => setChartType(value as ChartType)}
                className="w-full sm:w-auto"
              >
                <TabsList className={`grid w-full grid-cols-2 sm:grid-cols-4 ${isMobile ? "h-8" : ""}`}>
                  <TabsTrigger value="requests" className={isMobile ? "text-xs py-1" : ""}>
                    请求量
                  </TabsTrigger>
                  <TabsTrigger value="latency" className={isMobile ? "text-xs py-1" : ""}>
                    响应时间
                  </TabsTrigger>
                  <TabsTrigger value="errors" className={isMobile ? "text-xs py-1" : ""}>
                    错误率
                  </TabsTrigger>
                  <TabsTrigger value="users" className={isMobile ? "text-xs py-1" : ""}>
                    用户数
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              {!isMobile && (
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  导出
                </Button>
              )}
            </div>
          </div>
          <CardDescription className={isMobile ? "text-xs" : ""}>
            {chartType === "requests"
              ? "API请求量随时间变化趋势"
              : chartType === "latency"
                ? "API响应时间随时间变化趋势"
                : chartType === "errors"
                  ? "API错误率随时间变化趋势"
                  : "API活跃用户数随时间变化趋势"}
          </CardDescription>
        </CardHeader>
        <CardContent className={isMobile ? "px-2 py-0" : ""}>
          <div>
            {chartType === "requests" && (
              <ResponsiveBarChart
                data={timeSeriesData}
                dataKey="requests"
                name="请求数"
                fill={COLORS.primary}
                tooltipFormatter={(value: number) => [formatNumber(value), "请求数"]}
              />
            )}

            {chartType === "latency" && (
              <ResponsiveLineChart
                data={timeSeriesData}
                dataKey="avgLatency"
                name="平均响应时间"
                stroke={COLORS.warning}
                tooltipFormatter={(value: number) => [`${value.toFixed(0)} ms`, "响应时间"]}
              />
            )}

            {chartType === "errors" && (
              <ResponsiveLineChart
                data={timeSeriesData}
                dataKey="errorRate"
                name="错误率"
                stroke={COLORS.error}
                yAxisFormatter={(value) => `${(value * 100).toFixed(1)}%`}
                tooltipFormatter={(value: number) => [`${(value * 100).toFixed(2)}%`, "错误率"]}
              />
            )}

            {chartType === "users" && (
              <ResponsiveBarChart
                data={timeSeriesData}
                dataKey="uniqueUsers"
                name="活跃用户数"
                fill={COLORS.accent}
                tooltipFormatter={(value: number) => [formatNumber(value), "用户数"]}
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* 端点使用情况和错误分布 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader className={isMobile ? "px-3 py-3" : ""}>
            <CardTitle className={isMobile ? "text-lg" : ""}>端点使用情况</CardTitle>
            <CardDescription className={isMobile ? "text-xs" : ""}>各API端点的使用频率和性能指标</CardDescription>
          </CardHeader>
          <CardContent className={isMobile ? "px-2 py-0" : ""}>
            <ResponsiveDataTable
              data={endpointUsage}
              columns={endpointColumns}
              searchable
              searchPlaceholder="搜索端点..."
              filterable
              expandable
              renderExpandedRow={(item: EndpointUsage) => (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-xs text-muted-foreground">分类</span>
                      <div className="font-medium">{item.category}</div>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">缓存命中率</span>
                      <div className="font-medium">{(item.cachingRate * 100).toFixed(1)}%</div>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">性能分析</span>
                    <div className="text-sm mt-1">
                      {item.avgLatency > 150 ? (
                        <span className="text-yellow-600">此端点响应时间较长，建议优化查询或添加缓存</span>
                      ) : item.errorRate > 0.03 ? (
                        <span className="text-red-600">此端点错误率较高，建议检查错误日志并修复问题</span>
                      ) : (
                        <span className="text-green-600">此端点性能良好，无需优化</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
              pageSize={5}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className={isMobile ? "px-3 py-3" : ""}>
            <CardTitle className={isMobile ? "text-lg" : ""}>错误分布</CardTitle>
            <CardDescription className={isMobile ? "text-xs" : ""}>API错误类型分布情况</CardDescription>
          </CardHeader>
          <CardContent className={isMobile ? "px-2 py-0" : ""}>
            <ResponsivePieChart
              data={errorDistribution}
              dataKey="count"
              nameKey="errorCode"
              colors={COLORS.pieColors}
              labelFormatter={(name, percent) => (isMobile ? false : `${name}: ${(percent * 100).toFixed(0)}%`)}
            />

            <div className="mt-4 space-y-2">
              <Alert variant="warning" className={isMobile ? "text-xs p-2" : ""}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className={isMobile ? "text-sm" : ""}>主要错误类型</AlertTitle>
                <AlertDescription className={isMobile ? "text-xs" : ""}>
                  401 (未授权访问) 和 403 (权限不足) 错误占比较高，建议检查认证机制和权限设置。
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 用户使用情况和地理分布 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader className={isMobile ? "px-3 py-3" : ""}>
            <CardTitle className={isMobile ? "text-lg" : ""}>用户使用情况</CardTitle>
            <CardDescription className={isMobile ? "text-xs" : ""}>API用户活跃度和使用模式</CardDescription>
          </CardHeader>
          <CardContent className={isMobile ? "px-2 py-0" : ""}>
            <ResponsiveDataTable
              data={userUsage}
              columns={userColumns}
              expandable
              renderExpandedRow={(item: UserUsage) => (
                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-muted-foreground">常用端点</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.topEndpoints.map((endpoint, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {endpoint}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              pageSize={5}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className={isMobile ? "px-3 py-3" : ""}>
            <CardTitle className={isMobile ? "text-lg" : ""}>地理分布</CardTitle>
            <CardDescription className={isMobile ? "text-xs" : ""}>API请求的地理来源分布</CardDescription>
          </CardHeader>
          <CardContent className={isMobile ? "px-2 py-0" : ""}>
            <ResponsivePieChart
              data={geoDistribution}
              dataKey="requests"
              nameKey="country"
              colors={COLORS.pieColors}
              labelFormatter={(name, percent) => (isMobile ? false : `${name}: ${(percent * 100).toFixed(0)}%`)}
            />

            <div className="mt-4">
              <Alert className={isMobile ? "text-xs p-2" : ""}>
                <Zap className="h-4 w-4" />
                <AlertTitle className={isMobile ? "text-sm" : ""}>地区洞察</AlertTitle>
                <AlertDescription className={isMobile ? "text-xs" : ""}>
                  中国和美国是主要的API使用区域，建议优化这些地区的API访问速度和稳定性。
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 洞察和建议 */}
      <Card>
        <CardHeader className={isMobile ? "px-3 py-3" : ""}>
          <CardTitle className={isMobile ? "text-lg" : ""}>API使用洞察</CardTitle>
          <CardDescription className={isMobile ? "text-xs" : ""}>基于使用数据的分析和优化建议</CardDescription>
        </CardHeader>
        <CardContent className={isMobile ? "px-3 py-3" : ""}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className={`${isMobile ? "text-base" : "text-lg"} font-medium`}>性能洞察</h3>
                <ul className="space-y-1">
                  <li className="flex items-start">
                    <span className="bg-yellow-100 text-yellow-800 rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5">
                      !
                    </span>
                    <span className={isMobile ? "text-sm" : ""}>
                      <strong>{topEndpoint?.endpoint}</strong> 是请求量最高的端点，平均响应时间为{" "}
                      <strong>{topEndpoint?.avgLatency.toFixed(0)} ms</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-red-100 text-red-800 rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5">
                      !
                    </span>
                    <span className={isMobile ? "text-sm" : ""}>
                      <strong>{highestErrorEndpoint?.endpoint}</strong> 的错误率最高，达到{" "}
                      <strong>{(highestErrorEndpoint?.errorRate || 0 * 100).toFixed(2)}%</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5">
                      i
                    </span>
                    <span className={isMobile ? "text-sm" : ""}>
                      工作日的API请求量比周末高出约 <strong>140%</strong>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className={`${isMobile ? "text-base" : "text-lg"} font-medium`}>优化建议</h3>
                <ul className="space-y-1">
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5">
                      ✓
                    </span>
                    <span className={isMobile ? "text-sm" : ""}>
                      为 <strong>{topEndpoint?.endpoint}</strong> 添加更多缓存策略，提高响应速度
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5">
                      ✓
                    </span>
                    <span className={isMobile ? "text-sm" : ""}>
                      调查 <strong>{highestErrorEndpoint?.endpoint}</strong> 的错误原因，优先修复
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-100 text-green-800 rounded-full h-5 w-5 flex items-center justify-center mr-2 mt-0.5">
                      ✓
                    </span>
                    <span className={isMobile ? "text-sm" : ""}>在工作日高峰期增加服务器资源，优化性能</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
              {!isMobile && (
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  分享报告
                </Button>
              )}
              <Button className="w-full sm:w-auto">
                <Download className="h-4 w-4 mr-2" />
                导出完整报告
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
