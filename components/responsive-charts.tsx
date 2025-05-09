"use client"

import { useState, useEffect } from "react"
// import { useMediaQuery } from "@/hooks/use-media-query" // Remove this line
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

// 图表尺寸配置接口
interface ChartDimensions {
  height: number
  legendPosition?: "top" | "bottom" | "right" | "left"
  margin?: { top: number; right: number; bottom: number; left: number }
}

// 移动端和桌面端的图表尺寸配置
const chartConfig = {
  mobile: {
    height: 200,
    legendPosition: "bottom" as const,
    margin: { top: 5, right: 10, bottom: 40, left: 10 },
  },
  tablet: {
    height: 250,
    legendPosition: "bottom" as const,
    margin: { top: 5, right: 20, bottom: 30, left: 20 },
  },
  desktop: {
    height: 300,
    legendPosition: "right" as const,
    margin: { top: 5, right: 30, left: 20, bottom: 5 },
  },
}

// 格式化日期
const formatDate = (date: Date, isMobile: boolean): string => {
  if (isMobile) {
    return date.toLocaleDateString("zh-CN", {
      day: "numeric",
    })
  }
  return date.toLocaleDateString("zh-CN", {
    month: "short",
    day: "numeric",
  })
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

// 响应式折线图组件
export function ResponsiveLineChart({
  data,
  dataKey,
  stroke = "#3b82f6",
  name,
  yAxisFormatter,
  tooltipFormatter,
}: {
  data: any[]
  dataKey: string
  stroke?: string
  name: string
  yAxisFormatter?: (value: number) => string
  tooltipFormatter?: (value: number) => [string, string]
}) {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)")

  // 根据屏幕尺寸选择配置
  const dimensions: ChartDimensions = isMobile
    ? chartConfig.mobile
    : isTablet
      ? chartConfig.tablet
      : chartConfig.desktop

  // 移动端减少数据点
  const optimizedData = isMobile && data.length > 15 ? data.filter((_, i) => i % 2 === 0) : data

  return (
    <ResponsiveContainer width="100%" height={dimensions.height}>
      <LineChart data={optimizedData} margin={dimensions.margin}>
        <CartesianGrid strokeDasharray="3 3" vertical={!isMobile} />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(timestamp) => formatDate(new Date(timestamp), isMobile)}
          tick={{ fontSize: isMobile ? 10 : 12 }}
          interval={isMobile ? 2 : 0}
          angle={isMobile ? -45 : 0}
          textAnchor={isMobile ? "end" : "middle"}
          height={isMobile ? 50 : 30}
        />
        <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} tickFormatter={yAxisFormatter} width={isMobile ? 30 : 40} />
        <Tooltip
          formatter={tooltipFormatter}
          labelFormatter={(label) => new Date(label).toLocaleDateString()}
          contentStyle={{ fontSize: isMobile ? "12px" : "14px" }}
        />
        <Legend
          layout={isMobile ? "horizontal" : "vertical"}
          verticalAlign={isMobile ? "bottom" : "middle"}
          align={isMobile ? "center" : "right"}
          wrapperStyle={isMobile ? { fontSize: "12px" } : { fontSize: "14px", right: 0 }}
        />
        <Line
          type="monotone"
          dataKey={dataKey}
          name={name}
          stroke={stroke}
          strokeWidth={isMobile ? 1.5 : 2}
          dot={isMobile ? false : { r: 3 }}
          activeDot={{ r: isMobile ? 5 : 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

// 响应式柱状图组件
export function ResponsiveBarChart({
  data,
  dataKey,
  fill = "#3b82f6",
  name,
  tooltipFormatter,
}: {
  data: any[]
  dataKey: string
  fill?: string
  name: string
  tooltipFormatter?: (value: number) => [string, string]
}) {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)")

  const dimensions: ChartDimensions = isMobile
    ? chartConfig.mobile
    : isTablet
      ? chartConfig.tablet
      : chartConfig.desktop

  // 移动端减少数据点
  const optimizedData = isMobile && data.length > 15 ? data.filter((_, i) => i % 2 === 0) : data

  return (
    <ResponsiveContainer width="100%" height={dimensions.height}>
      <BarChart data={optimizedData} margin={dimensions.margin}>
        <CartesianGrid strokeDasharray="3 3" vertical={!isMobile} />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(timestamp) => formatDate(new Date(timestamp), isMobile)}
          tick={{ fontSize: isMobile ? 10 : 12 }}
          interval={isMobile ? 2 : 0}
          angle={isMobile ? -45 : 0}
          textAnchor={isMobile ? "end" : "middle"}
          height={isMobile ? 50 : 30}
        />
        <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} width={isMobile ? 30 : 40} />
        <Tooltip
          formatter={tooltipFormatter || ((value: number) => [formatNumber(value), name])}
          labelFormatter={(label) => new Date(label).toLocaleDateString()}
          contentStyle={{ fontSize: isMobile ? "12px" : "14px" }}
        />
        <Legend
          layout={isMobile ? "horizontal" : "vertical"}
          verticalAlign={isMobile ? "bottom" : "middle"}
          align={isMobile ? "center" : "right"}
          wrapperStyle={isMobile ? { fontSize: "12px" } : { fontSize: "14px", right: 0 }}
        />
        <Bar dataKey={dataKey} name={name} fill={fill} radius={isMobile ? [2, 2, 0, 0] : [4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

// 响应式面积图组件
export function ResponsiveAreaChart({
  data,
  dataKey,
  fill = "#3b82f6",
  stroke = "#2563eb",
  name,
  tooltipFormatter,
}: {
  data: any[]
  dataKey: string
  fill?: string
  stroke?: string
  name: string
  tooltipFormatter?: (value: number) => [string, string]
}) {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)")

  const dimensions: ChartDimensions = isMobile
    ? chartConfig.mobile
    : isTablet
      ? chartConfig.tablet
      : chartConfig.desktop

  // 移动端减少数据点
  const optimizedData = isMobile && data.length > 15 ? data.filter((_, i) => i % 2 === 0) : data

  return (
    <ResponsiveContainer width="100%" height={dimensions.height}>
      <AreaChart data={optimizedData} margin={dimensions.margin}>
        <CartesianGrid strokeDasharray="3 3" vertical={!isMobile} />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(timestamp) => formatDate(new Date(timestamp), isMobile)}
          tick={{ fontSize: isMobile ? 10 : 12 }}
          interval={isMobile ? 2 : 0}
          angle={isMobile ? -45 : 0}
          textAnchor={isMobile ? "end" : "middle"}
          height={isMobile ? 50 : 30}
        />
        <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} width={isMobile ? 30 : 40} />
        <Tooltip
          formatter={tooltipFormatter || ((value: number) => [formatNumber(value), name])}
          labelFormatter={(label) => new Date(label).toLocaleDateString()}
          contentStyle={{ fontSize: isMobile ? "12px" : "14px" }}
        />
        <Legend
          layout={isMobile ? "horizontal" : "vertical"}
          verticalAlign={isMobile ? "bottom" : "middle"}
          align={isMobile ? "center" : "right"}
          wrapperStyle={isMobile ? { fontSize: "12px" } : { fontSize: "14px", right: 0 }}
        />
        <Area
          type="monotone"
          dataKey={dataKey}
          name={name}
          fill={fill}
          stroke={stroke}
          strokeWidth={isMobile ? 1.5 : 2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// 响应式饼图组件
export function ResponsivePieChart({
  data,
  dataKey,
  nameKey,
  colors,
  labelFormatter,
}: {
  data: any[]
  dataKey: string
  nameKey: string
  colors: string[]
  labelFormatter?: (name: string, percent: number) => string
}) {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)")

  const dimensions: ChartDimensions = isMobile
    ? { ...chartConfig.mobile, height: 180 }
    : isTablet
      ? { ...chartConfig.tablet, height: 220 }
      : { ...chartConfig.desktop, height: 260 }

  // 移动端简化数据
  const optimizedData =
    isMobile && data.length > 5
      ? [
          ...data.slice(0, 4),
          {
            [nameKey]: "其他",
            [dataKey]: data.slice(4).reduce((sum, item) => sum + item[dataKey], 0),
          },
        ]
      : data

  return (
    <ResponsiveContainer width="100%" height={dimensions.height}>
      <PieChart margin={dimensions.margin}>
        <Pie
          data={optimizedData}
          cx="50%"
          cy="50%"
          labelLine={!isMobile}
          outerRadius={isMobile ? 60 : isTablet ? 70 : 80}
          fill="#8884d8"
          dataKey={dataKey}
          nameKey={nameKey}
          label={
            labelFormatter || (isMobile ? false : ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`)
          }
        >
          {optimizedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => [formatNumber(value), ""]}
          contentStyle={{ fontSize: isMobile ? "12px" : "14px" }}
        />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{ fontSize: isMobile ? "10px" : "12px", paddingTop: isMobile ? "10px" : "20px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

// 创建一个自定义的媒体查询钩子
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // 服务器端渲染时，默认为false
    if (typeof window === "undefined") return

    const media = window.matchMedia(query)
    setMatches(media.matches)

    // 监听媒体查询变化
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}
