"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  CalendarIcon,
  Download,
  RefreshCw,
  Share2,
  BarChart,
  LineChart,
  PieChart,
  Activity,
  Users,
  Clock,
  Zap,
  Server,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

// 模拟API调用数据
const apiCallsData = [
  { date: "2023-05-01", calls: 1250, errors: 25, latency: 120, users: 320 },
  { date: "2023-05-02", calls: 1340, errors: 18, latency: 115, users: 345 },
  { date: "2023-05-03", calls: 1120, errors: 22, latency: 125, users: 310 },
  { date: "2023-05-04", calls: 1450, errors: 30, latency: 118, users: 360 },
  { date: "2023-05-05", calls: 1380, errors: 15, latency: 110, users: 350 },
  { date: "2023-05-06", calls: 980, errors: 12, latency: 105, users: 280 },
  { date: "2023-05-07", calls: 890, errors: 10, latency: 100, users: 260 },
  { date: "2023-05-08", calls: 1520, errors: 28, latency: 130, users: 380 },
  { date: "2023-05-09", calls: 1620, errors: 32, latency: 135, users: 410 },
  { date: "2023-05-10", calls: 1580, errors: 26, latency: 125, users: 390 },
  { date: "2023-05-11", calls: 1490, errors: 24, latency: 120, users: 370 },
  { date: "2023-05-12", calls: 1420, errors: 20, latency: 118, users: 355 },
  { date: "2023-05-13", calls: 1050, errors: 15, latency: 110, users: 300 },
  { date: "2023-05-14", calls: 980, errors: 12, latency: 105, users: 285 },
  { date: "2023-05-15", calls: 1680, errors: 35, latency: 140, users: 420 },
  { date: "2023-05-16", calls: 1720, errors: 38, latency: 145, users: 430 },
  { date: "2023-05-17", calls: 1650, errors: 30, latency: 135, users: 415 },
  { date: "2023-05-18", calls: 1580, errors: 28, latency: 130, users: 400 },
  { date: "2023-05-19", calls: 1520, errors: 25, latency: 125, users: 385 },
  { date: "2023-05-20", calls: 1180, errors: 18, latency: 115, users: 320 },
  { date: "2023-05-21", calls: 1050, errors: 15, latency: 110, users: 290 },
  { date: "2023-05-22", calls: 1780, errors: 40, latency: 150, users: 450 },
  { date: "2023-05-23", calls: 1850, errors: 42, latency: 155, users: 470 },
  { date: "2023-05-24", calls: 1780, errors: 38, latency: 145, users: 455 },
  { date: "2023-05-25", calls: 1720, errors: 35, latency: 140, users: 440 },
  { date: "2023-05-26", calls: 1650, errors: 32, latency: 135, users: 425 },
  { date: "2023-05-27", calls: 1280, errors: 22, latency: 120, users: 350 },
  { date: "2023-05-28", calls: 1150, errors: 18, latency: 115, users: 320 },
  { date: "2023-05-29", calls: 1920, errors: 45, latency: 160, users: 490 },
  { date: "2023-05-30", calls: 2050, errors: 50, latency: 165, users: 520 },
]

// 模拟API端点数据
const endpointData = [
  { name: "/api/users", calls: 12500, errors: 250, latency: 125, growth: 15 },
  { name: "/api/products", calls: 9800, errors: 180, latency: 110, growth: 8 },
  { name: "/api/orders", calls: 7500, errors: 150, latency: 135, growth: 12 },
  { name: "/api/auth", calls: 15200, errors: 320, latency: 95, growth: 20 },
  { name: "/api/payments", calls: 5600, errors: 110, latency: 140, growth: 5 },
  { name: "/api/search", calls: 18900, errors: 380, latency: 150, growth: 25 },
  { name: "/api/notifications", calls: 4200, errors: 85, latency: 100, growth: -3 },
  { name: "/api/files", calls: 6800, errors: 135, latency: 180, growth: 10 },
]

// 模拟地区分布数据
const regionData = [
  { region: "亚太地区", percentage: 35, calls: 15680, growth: 18 },
  { region: "北美", percentage: 28, calls: 12540, growth: 12 },
  { region: "欧洲", percentage: 22, calls: 9850, growth: 8 },
  { region: "南美", percentage: 8, calls: 3580, growth: 15 },
  { region: "非洲", percentage: 4, calls: 1790, growth: 20 },
  { region: "中东", percentage: 3, calls: 1340, growth: 10 },
]

export function AnalyticsClientPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [timeRange, setTimeRange] = useState("30d")

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">数据分析</h1>
          <p className="text-muted-foreground">全面的API使用数据分析和可视化，帮助您了解系统性能和用户行为</p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>选择日期</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7天</SelectItem>
              <SelectItem value="30d">30天</SelectItem>
              <SelectItem value="90d">90天</SelectItem>
              <SelectItem value="1y">1年</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">API调用总数</CardTitle>
            <CardDescription>过去30天</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">45,231</div>
                <div className="text-xs text-green-500 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  12.5% 较上期
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
            <CardDescription>过去30天</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">1,893</div>
                <div className="text-xs text-green-500 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  8.2% 较上期
                </div>
              </div>
              <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">平均响应时间</CardTitle>
            <CardDescription>过去30天</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">128ms</div>
                <div className="text-xs text-red-500 flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  3.5% 较上期
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">错误率</CardTitle>
            <CardDescription>过去30天</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">1.8%</div>
                <div className="text-xs text-green-500 flex items-center mt-1">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  0.5% 较上期
                </div>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            概览
          </TabsTrigger>
          <TabsTrigger value="endpoints" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            端点分析
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            用户分析
          </TabsTrigger>
          <TabsTrigger value="geography" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            地区分布
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>API调用趋势</CardTitle>
                <CardDescription>过去30天的API调用数量变化</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-b from-blue-500 to-blue-600 opacity-20 rounded-md flex items-center justify-center">
                  <LineChart className="h-16 w-16 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>错误率与响应时间</CardTitle>
                <CardDescription>错误率与平均响应时间的关系</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-b from-red-500 to-red-600 opacity-20 rounded-md flex items-center justify-center">
                  <LineChart className="h-16 w-16 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>每日活跃用户</CardTitle>
                <CardDescription>过去30天的日活跃用户数量</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-b from-green-500 to-green-600 opacity-20 rounded-md flex items-center justify-center">
                  <BarChart className="h-16 w-16 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API调用分布</CardTitle>
                <CardDescription>按端点类型的API调用分布</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-b from-purple-500 to-purple-600 opacity-20 rounded-md flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="endpoints">
          <Card>
            <CardHeader>
              <CardTitle>端点性能分析</CardTitle>
              <CardDescription>各API端点的调用量、错误率和响应时间</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-muted p-3 rounded-t-md">
                  <div className="font-medium">端点</div>
                  <div className="font-medium text-right">调用量</div>
                  <div className="font-medium text-right">错误数</div>
                  <div className="font-medium text-right">平均响应时间</div>
                  <div className="font-medium text-right">增长率</div>
                </div>
                <div className="divide-y">
                  {endpointData.map((endpoint, index) => (
                    <div key={index} className="grid grid-cols-5 p-3 hover:bg-muted/50">
                      <div className="font-mono text-sm">{endpoint.name}</div>
                      <div className="text-right">{endpoint.calls.toLocaleString()}</div>
                      <div className="text-right">{endpoint.errors.toLocaleString()}</div>
                      <div className="text-right">{endpoint.latency}ms</div>
                      <div className={`text-right ${endpoint.growth >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {endpoint.growth >= 0 ? "+" : ""}
                        {endpoint.growth}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>用户活跃度分析</CardTitle>
                <CardDescription>用户活跃度与API调用量的关系</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-b from-blue-500 to-blue-600 opacity-20 rounded-md flex items-center justify-center">
                  <BarChart className="h-16 w-16 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>用户类型分布</CardTitle>
                <CardDescription>按用户类型的分布情况</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-b from-green-500 to-green-600 opacity-20 rounded-md flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>新增用户趋势</CardTitle>
                <CardDescription>过去30天的新增用户数量</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-b from-purple-500 to-purple-600 opacity-20 rounded-md flex items-center justify-center">
                  <LineChart className="h-16 w-16 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>用户留存率</CardTitle>
                <CardDescription>不同时间段的用户留存情况</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-b from-orange-500 to-orange-600 opacity-20 rounded-md flex items-center justify-center">
                  <BarChart className="h-16 w-16 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geography">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>全球API调用分布</CardTitle>
                <CardDescription>按地区的API调用分布情况</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-b from-blue-500 to-blue-600 opacity-20 rounded-md flex items-center justify-center">
                  <Globe className="h-16 w-16 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>地区分布详情</CardTitle>
                <CardDescription>各地区的API调用详细数据</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionData.map((region, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{region.region}</span>
                        <span className="text-sm text-muted-foreground">{region.percentage}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${region.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>调用量: {region.calls.toLocaleString()}</span>
                        <span className={region.growth >= 0 ? "text-green-500" : "text-red-500"}>
                          {region.growth >= 0 ? "+" : ""}
                          {region.growth}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>地区性能对比</CardTitle>
                <CardDescription>不同地区的API响应时间和错误率对比</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-b from-purple-500 to-purple-600 opacity-20 rounded-md flex items-center justify-center">
                  <BarChart className="h-16 w-16 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
