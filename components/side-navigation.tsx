"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo } from "react"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  FileText,
  Terminal,
  Database,
  Code,
  Globe,
  Smartphone,
  Shield,
  Cloud,
  Cpu,
  Key,
  CreditCard,
  HardDrive,
  Bell,
  Map,
  Search,
  Home,
  Settings,
  Users,
  BarChart,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { TimeWidget } from "@/components/time-widget"

// 导航项类型定义
interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  href?: string
  children?: NavItem[]
  badge?: string
}

// 导航分组类型定义
interface NavGroup {
  title: string
  items: NavItem[]
}

// 导航组件属性
interface SideNavigationProps {
  className?: string
  collapsed?: boolean
  onToggleCollapse?: () => void
}

export function SideNavigation({ className, collapsed = false, onToggleCollapse }: SideNavigationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [search, setSearch] = useState("")
  const [activeGroup, setActiveGroup] = useState<string | null>(null)
  const [filteredNavigation, setFilteredNavigation] = useState<NavGroup[]>([])

  // 处理品牌名称点击，导航到首页
  const handleBrandClick = useCallback(() => {
    router.push("/")
  }, [router])

  // 使用useMemo缓存导航数据，避免在每次渲染时重新创建
  const navigationGroups = useMemo<NavGroup[]>(
    () => [
      {
        title: "主要功能",
        items: [
          {
            id: "dashboard",
            label: "控制面板",
            icon: <Home className="h-5 w-5" />,
            href: "/dashboard",
          },
          {
            id: "api-docs",
            label: "API文档",
            icon: <FileText className="h-5 w-5" />,
            href: "/api-docs",
            badge: "核心",
          },
          {
            id: "code-snippets",
            label: "代码片段",
            icon: <Code className="h-5 w-5" />,
            href: "/code-snippets",
          },
          {
            id: "terminal-commands",
            label: "终端命令",
            icon: <Terminal className="h-5 w-5" />,
            href: "/terminal-commands",
          },
          {
            id: "analytics",
            label: "数据分析",
            icon: <BarChart className="h-5 w-5" />,
            href: "/analytics",
          },
        ],
      },
      {
        title: "技术领域",
        items: [
          {
            id: "web-dev",
            label: "网页开发",
            icon: <Globe className="h-5 w-5" />,
            href: "/tech/web-dev",
          },
          {
            id: "mobile-dev",
            label: "移动开发",
            icon: <Smartphone className="h-5 w-5" />,
            href: "/tech/mobile-dev",
          },
          {
            id: "database",
            label: "数据存储",
            icon: <Database className="h-5 w-5" />,
            href: "/tech/database",
          },
          {
            id: "security",
            label: "安全防护",
            icon: <Shield className="h-5 w-5" />,
            href: "/tech/security",
          },
          {
            id: "cloud-computing",
            label: "云端计算",
            icon: <Cloud className="h-5 w-5" />,
            href: "/tech/cloud-computing",
          },
          {
            id: "ai",
            label: "智能技术",
            icon: <Cpu className="h-5 w-5" />,
            href: "/tech/ai",
            badge: "热门",
          },
        ],
      },
      {
        title: "API分类",
        items: [
          {
            id: "auth-api",
            label: "身份验证",
            icon: <Key className="h-5 w-5" />,
            href: "/api/auth",
          },
          {
            id: "payment-api",
            label: "支付服务",
            icon: <CreditCard className="h-5 w-5" />,
            href: "/api/payment",
          },
          {
            id: "storage-api",
            label: "数据存储",
            icon: <HardDrive className="h-5 w-5" />,
            href: "/api/storage",
          },
          {
            id: "notification-api",
            label: "消息通知",
            icon: <Bell className="h-5 w-5" />,
            href: "/api/notification",
          },
          {
            id: "maps-api",
            label: "地图定位",
            icon: <Map className="h-5 w-5" />,
            href: "/api/maps",
          },
        ],
      },
      {
        title: "系统设置",
        items: [
          {
            id: "user-management",
            label: "用户管理",
            icon: <Users className="h-5 w-5" />,
            href: "/settings/users",
          },
          {
            id: "system-settings",
            label: "系统设置",
            icon: <Settings className="h-5 w-5" />,
            href: "/settings/system",
          },
        ],
      },
    ],
    [],
  )

  // 处理搜索过滤 - 使用useCallback避免不必要的重新创建
  const filterNavigation = useCallback(() => {
    if (!search.trim()) {
      setFilteredNavigation(navigationGroups)
      return
    }

    const searchLower = search.toLowerCase()
    const filtered = navigationGroups
      .map((group) => {
        const filteredItems = group.items.filter((item) => item.label.toLowerCase().includes(searchLower))
        return {
          ...group,
          items: filteredItems,
        }
      })
      .filter((group) => group.items.length > 0)

    setFilteredNavigation(filtered)
  }, [search, navigationGroups])

  // 初始化过滤后的导航和搜索变化时更新
  useEffect(() => {
    filterNavigation()
  }, [filterNavigation])

  // 初始化时设置过滤后的导航 - 只运行一次
  useEffect(() => {
    setFilteredNavigation(navigationGroups)
  }, [navigationGroups])

  // 处理导航项点击
  const handleNavItemClick = useCallback(
    (href: string) => {
      router.push(href)
    },
    [router],
  )

  // 判断导航项是否激活
  const isActive = useCallback(
    (href: string) => {
      return pathname === href || pathname?.startsWith(`${href}/`)
    },
    [pathname],
  )

  // 切换分组展开/折叠
  const toggleGroup = useCallback((title: string) => {
    setActiveGroup((prev) => (prev === title ? null : title))
  }, [])

  // 处理搜索输入变化
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-blue-600 border-r border-blue-700 transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[280px]",
        className,
      )}
    >
      {/* 品牌标识 - 添加点击功能和视觉反馈 */}
      <div
        className="p-4 border-b border-blue-700 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:bg-blue-500"
        onClick={handleBrandClick}
        title="返回首页"
        aria-label="返回首页"
      >
        {collapsed ? (
          <div className="text-white font-bold text-xl">
            <span>言</span>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="mb-2">
              <span className="text-white font-bold text-2xl">言语云³</span>
            </div>
            <div className="text-sm text-blue-100">YanYu Cloud³</div>
          </div>
        )}
      </div>

      {/* 搜索框 */}
      <div className="p-3">
        {!collapsed ? (
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white" />
            <Input
              type="search"
              placeholder="搜索..."
              className="pl-9 bg-blue-700 border-blue-500 text-white placeholder:text-blue-200 focus:border-white"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="w-full h-10 flex items-center justify-center text-blue-500 hover:bg-blue-100"
            onClick={onToggleCollapse}
          >
            <Search className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* 导航内容 */}
      <ScrollArea className="flex-1 py-2">
        <div className="space-y-4 px-3">
          {filteredNavigation.map((group) => (
            <div key={group.title} className="space-y-2">
              {!collapsed && (
                <h3
                  className="text-xs uppercase font-medium text-blue-200 px-2 py-1.5 cursor-pointer hover:bg-blue-700/30 rounded flex items-center justify-between"
                  onClick={() => toggleGroup(group.title)}
                >
                  <span>{group.title}</span>
                  {activeGroup === group.title ? (
                    <ChevronDown className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5" />
                  )}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <TooltipProvider key={item.id} delayDuration={collapsed ? 100 : 1000}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start gap-3 transition-all",
                            collapsed ? "px-2" : "px-3",
                            isActive(item.href || "")
                              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-sm"
                              : "hover:bg-blue-700/20 text-white",
                          )}
                          onClick={() => item.href && handleNavItemClick(item.href)}
                        >
                          <div className={cn("flex items-center justify-center", collapsed ? "w-full" : "w-5")}>
                            {item.icon}
                          </div>
                          {!collapsed && <span className="truncate flex-1 text-left">{item.label}</span>}
                          {!collapsed && item.badge && (
                            <Badge variant="outline" className="ml-auto bg-blue-700/30 text-white border-blue-500/30">
                              {item.badge}
                            </Badge>
                          )}
                        </Button>
                      </TooltipTrigger>
                      {collapsed && (
                        <TooltipContent side="right" className="bg-blue-800 text-white border-blue-700">
                          <div className="flex items-center gap-2">
                            <span>{item.label}</span>
                            {item.badge && (
                              <Badge variant="outline" className="bg-blue-700 text-white border-blue-600">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* 底部折叠按钮 */}
      <div className="p-3 border-t border-blue-700">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center text-white hover:bg-blue-700"
          onClick={onToggleCollapse}
        >
          {collapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          )}
        </Button>
      </div>
      {/* 在侧边导航栏底部添加时间小部件 */}
      <div className="mt-auto p-4">
        <TimeWidget />
      </div>
    </div>
  )
}
