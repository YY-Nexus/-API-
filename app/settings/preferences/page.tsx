"use client"

import { useUserPreferences } from "@/contexts/user-preferences-context"
import { useTheme } from "next-themes"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useNotification } from "@/contexts/notification-context"
import { Moon, Sun, Monitor, RotateCcw } from "lucide-react"

const defaultPreferences = {
  theme: "system",
  language: "zh-CN",
  fontSize: "medium",
  animations: true,
  sidebarCollapsed: false,
}

export default function PreferencesPage() {
  const { preferences, updatePreference, resetPreferences } = useUserPreferences()
  const { setTheme } = useTheme()
  const { setLanguage } = useLanguage()
  const { showSuccess } = useNotification()

  // 主题变更处理
  const handleThemeChange = (theme: "light" | "dark" | "system") => {
    updatePreference("theme", theme)
    setTheme(theme)
  }

  // 语言变更处理
  const handleLanguageChange = (language: "zh-CN" | "en-US") => {
    updatePreference("language", language)
    setLanguage(language)
  }

  // 重置偏好设置
  const handleReset = () => {
    resetPreferences()
    setTheme(defaultPreferences.theme)
    setLanguage(defaultPreferences.language)
    showSuccess("重置成功", "已将所有偏好设置恢复为默认值")
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">用户偏好设置</h1>
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          重置为默认值
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>外观设置</CardTitle>
            <CardDescription>自定义界面外观和显示方式</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>主题模式</Label>
              <RadioGroup
                value={preferences.theme}
                onValueChange={(value) => handleThemeChange(value as "light" | "dark" | "system")}
                className="flex space-x-2"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="border rounded-md p-3 cursor-pointer hover:bg-accent">
                    <Sun className="h-6 w-6" />
                  </div>
                  <RadioGroupItem value="light" id="theme-light" className="sr-only" />
                  <Label htmlFor="theme-light" className="text-sm">
                    浅色
                  </Label>
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <div className="border rounded-md p-3 cursor-pointer hover:bg-accent">
                    <Moon className="h-6 w-6" />
                  </div>
                  <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
                  <Label htmlFor="theme-dark" className="text-sm">
                    深色
                  </Label>
                </div>

                <div className="flex flex-col items-center space-y-2">
                  <div className="border rounded-md p-3 cursor-pointer hover:bg-accent">
                    <Monitor className="h-6 w-6" />
                  </div>
                  <RadioGroupItem value="system" id="theme-system" className="sr-only" />
                  <Label htmlFor="theme-system" className="text-sm">
                    跟随系统
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>字体大小</Label>
              <RadioGroup
                value={preferences.fontSize}
                onValueChange={(value) => updatePreference("fontSize", value as "small" | "medium" | "large")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="small" id="font-small" />
                  <Label htmlFor="font-small">小</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="font-medium" />
                  <Label htmlFor="font-medium">中</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="large" id="font-large" />
                  <Label htmlFor="font-large">大</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="animations">启用动画效果</Label>
              <Switch
                id="animations"
                checked={preferences.animations}
                onCheckedChange={(checked) => updatePreference("animations", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>界面设置</CardTitle>
            <CardDescription>自定义界面布局和交互方式</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>界面语言</Label>
              <RadioGroup
                value={preferences.language}
                onValueChange={(value) => handleLanguageChange(value as "zh-CN" | "en-US")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="zh-CN" id="lang-zh" />
                  <Label htmlFor="lang-zh">简体中文</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="en-US" id="lang-en" />
                  <Label htmlFor="lang-en">English</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="sidebar-collapsed">默认折叠侧边栏</Label>
              <Switch
                id="sidebar-collapsed"
                checked={preferences.sidebarCollapsed}
                onCheckedChange={(checked) => updatePreference("sidebarCollapsed", checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
