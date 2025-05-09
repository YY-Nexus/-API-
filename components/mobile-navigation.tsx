"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMediaQuery } from "@/hooks/use-mobile"
import {
  Menu,
  FileText,
  Terminal,
  Activity,
  BookOpen,
  FolderOpen,
  Code,
  GitCompare,
  Lock,
  BrainCircuit,
  History,
  FileDown,
  Home,
  BarChart,
  Settings,
  Users,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"

interface MobileNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function MobileNavigation({ activeTab, onTabChange }: MobileNavigationProps) {
  const [open, setOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const router = useRouter()

  // 导航项配置
  const navigationItems = [
    { id: "dashboard", label: "控制面板", icon: <Home className="h-5 w-5" />, href: "/dashboard" },
    { id: "endpoints", label: "API端点", icon: <FileText className="h-5 w-5" />, href: "/api-docs" },
    { id: "sandbox", label: "沙盒", icon: <Terminal className="h-5 w-5" />, href: "/api-docs?tab=sandbox" },
    { id: "status", label: "状态监控", icon: <Activity className="h-5 w-5" />, href: "/api-docs?tab=status" },
    { id: "tutorials", label: "教程", icon: <BookOpen className="h-5 w-5" />, href: "/api-docs?tab=tutorials" },
    { id: "files", label: "文件管理", icon: <FolderOpen className="h-5 w-5" />, href: "/api-docs?tab=files" },
    { id: "code-snippets", label: "代码片段", icon: <Code className="h-5 w-5" />, href: "/code-snippets" },
    { id: "analytics", label: "数据分析", icon: <BarChart className="h-5 w-5" />, href: "/analytics" },
    {
      id: "version-compare",
      label: "版本比较",
      icon: <GitCompare className="h-5 w-5" />,
      href: "/api-docs?tab=version-compare",
    },
    { id: "permissions", label: "权限管理", icon: <Lock className="h-5 w-5" />, href: "/api-docs?tab=permissions" },
    {
      id: "ai-assistant",
      label: "AI助手",
      icon: <BrainCircuit className="h-5 w-5" />,
      href: "/api-docs?tab=ai-assistant",
    },
    { id: "changelog", label: "更新日志", icon: <History className="h-5 w-5" />, href: "/api-docs?tab=changelog" },
    { id: "export", label: "导出", icon: <FileDown className="h-5 w-5" />, href: "/api-docs?tab=export" },
    { id: "user-management", label: "用户管理", icon: <Users className="h-5 w-5" />, href: "/settings/users" },
    { id: "system-settings", label: "系统设置", icon: <Settings className="h-5 w-5" />, href: "/settings/system" },
  ]

  // 底部导航栏项目（仅显示最重要的几个）
  const bottomNavItems = [
    { id: "dashboard", label: "首页", icon: <Home className="h-5 w-5" />, href: "/dashboard" },
    { id: "endpoints", label: "API", icon: <FileText className="h-5 w-5" />, href: "/api-docs" },
    { id: "code-snippets", label: "代码", icon: <Code className="h-5 w-5" />, href: "/code-snippets" },
    {
      id: "ai-assistant",
      label: "AI助手",
      icon: <BrainCircuit className="h-5 w-5" />,
      href: "/api-docs?tab=ai-assistant",
    },
  ]

  // 处理导航项点击
  const handleNavItemClick = (item: any) => {
    if (item.href) {
      router.push(item.href)
    } else {
      onTabChange(item.id)
    }
    setOpen(false)
  }

  if (!isMobile) return null

  return (
    <>
      {/* 侧边导航菜单 */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-sm dark:bg-gray-950/80 shadow-sm border"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">打开菜单</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[80%] sm:w-[350px] p-0">
          <SheetHeader className="p-4 border-b bg-gradient-to-r from-blue-600 to-blue-500">
            <SheetTitle className="text-white">启智云枢³</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-60px)]">
            <div className="p-4 space-y-1">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    activeTab === item.id ? "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400" : ""
                  }`}
                  onClick={() => handleNavItemClick(item)}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                  {item.badge && (
                    <Badge variant="outline" className="ml-auto bg-blue-50 text-blue-600 border-blue-200">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* 底部导航栏 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t z-50 flex justify-around items-center h-16 safe-bottom">
        {bottomNavItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={`flex flex-col h-full py-2 px-1 rounded-none relative ${
              activeTab === item.id
                ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
                : "text-muted-foreground"
            }`}
            onClick={() => handleNavItemClick(item)}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Button>
        ))}
      </div>

      {/* 为底部导航栏添加底部间距 */}
      <div className="md:hidden h-16"></div>
    </>
  )
}
