import AppLayout from "@/app/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, RefreshCw, Settings, Bell, Shield, Database, Cloud, Moon, Sun, Globe } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "系统设置 | 启智云枢³",
  description: "配置系统参数和偏好设置 - 启智云枢³",
}

export default function SystemSettingsPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">系统设置</h1>
            <p className="text-muted-foreground">配置系统参数和偏好设置</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              重置
            </Button>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              保存设置
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">
              <Settings className="h-4 w-4 mr-2" />
              常规设置
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Moon className="h-4 w-4 mr-2" />
              外观
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              通知
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              安全
            </TabsTrigger>
            <TabsTrigger value="integrations">
              <Cloud className="h-4 w-4 mr-2" />
              集成
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>基本设置</CardTitle>
                  <CardDescription>配置系统的基本参数</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="system-name">系统名称</Label>
                    <Input id="system-name" defaultValue="启智云枢³" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="system-url">系统URL</Label>
                    <Input id="system-url" defaultValue="https://intellicloudhub.example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">管理员邮箱</Label>
                    <Input id="admin-email" defaultValue="admin@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="support-email">支持邮箱</Label>
                    <Input id="support-email" defaultValue="support@example.com" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="debug-mode">调试模式</Label>
                      <p className="text-sm text-muted-foreground">启用系统调试功能</p>
                    </div>
                    <Switch id="debug-mode" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>语言和区域</CardTitle>
                  <CardDescription>配置系统的语言和区域设置</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-language">默认语言</Label>
                    <select id="default-language" className="w-full p-2 border rounded-md">
                      <option value="zh-CN">简体中文</option>
                      <option value="en-US">English (US)</option>
                      <option value="ja-JP">日本語</option>
                      <option value="ko-KR">한국어</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">时区</Label>
                    <select id="timezone" className="w-full p-2 border rounded-md">
                      <option value="Asia/Shanghai">亚洲/上海 (GMT+8)</option>
                      <option value="America/New_York">美国/纽约 (GMT-5)</option>
                      <option value="Europe/London">欧洲/伦敦 (GMT+0)</option>
                      <option value="Asia/Tokyo">亚洲/东京 (GMT+9)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-format">日期格式</Label>
                    <select id="date-format" className="w-full p-2 border rounded-md">
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-language">自动检测语言</Label>
                      <p className="text-sm text-muted-foreground">根据用户浏览器设置自动选择语言</p>
                    </div>
                    <Switch id="auto-language" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>外观设置</CardTitle>
                <CardDescription>自定义系统的外观和主题</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">主题模式</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-md p-4 flex flex-col items-center space-y-2 cursor-pointer hover:border-blue-500">
                      <Sun className="h-6 w-6 text-amber-500" />
                      <span>浅色模式</span>
                    </div>
                    <div className="border rounded-md p-4 flex flex-col items-center space-y-2 cursor-pointer hover:border-blue-500">
                      <Moon className="h-6 w-6 text-blue-500" />
                      <span>深色模式</span>
                    </div>
                    <div className="border rounded-md p-4 flex flex-col items-center space-y-2 cursor-pointer hover:border-blue-500 border-blue-500">
                      <div className="flex">
                        <Sun className="h-6 w-6 text-amber-500" />
                        <Moon className="h-6 w-6 text-blue-500" />
                      </div>
                      <span>跟随系统</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">主题颜色</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="border rounded-md p-4 flex flex-col items-center space-y-2 cursor-pointer hover:border-blue-500 border-blue-500">
                      <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                      <span>科技蓝</span>
                    </div>
                    <div className="border rounded-md p-4 flex flex-col items-center space-y-2 cursor-pointer hover:border-blue-500">
                      <div className="w-8 h-8 rounded-full bg-purple-500"></div>
                      <span>优雅紫</span>
                    </div>
                    <div className="border rounded-md p-4 flex flex-col items-center space-y-2 cursor-pointer hover:border-blue-500">
                      <div className="w-8 h-8 rounded-full bg-green-500"></div>
                      <span>自然绿</span>
                    </div>
                    <div className="border rounded-md p-4 flex flex-col items-center space-y-2 cursor-pointer hover:border-blue-500">
                      <div className="w-8 h-8 rounded-full bg-amber-500"></div>
                      <span>活力橙</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">字体设置</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="font-family">字体家族</Label>
                      <select id="font-family" className="w-full p-2 border rounded-md">
                        <option value="inter">Inter</option>
                        <option value="roboto">Roboto</option>
                        <option value="opensans">Open Sans</option>
                        <option value="noto-sans-sc">Noto Sans SC</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="font-size">基础字号</Label>
                      <select id="font-size" className="w-full p-2 border rounded-md">
                        <option value="sm">小</option>
                        <option value="md" selected>
                          中
                        </option>
                        <option value="lg">大</option>
                        <option value="xl">特大</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animations">界面动画</Label>
                    <p className="text-sm text-muted-foreground">启用界面过渡动画效果</p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>通知设置</CardTitle>
                <CardDescription>配置系统通知和提醒</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">电子邮件通知</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>系统更新通知</Label>
                        <p className="text-sm text-muted-foreground">接收系统更新和维护通知</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>安全警报</Label>
                        <p className="text-sm text-muted-foreground">接收安全相关的警报和通知</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>API使用报告</Label>
                        <p className="text-sm text-muted-foreground">接收每周API使用情况报告</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>营销信息</Label>
                        <p className="text-sm text-muted-foreground">接收产品更新和促销信息</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">系统内通知</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>任务完成通知</Label>
                        <p className="text-sm text-muted-foreground">当长时间运行的任务完成时通知</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>评论和回复</Label>
                        <p className="text-sm text-muted-foreground">当有人回复您的评论时通知</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>API错误警报</Label>
                        <p className="text-sm text-muted-foreground">当API调用出现错误时通知</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notification-frequency">通知频率</Label>
                  <select id="notification-frequency" className="w-full p-2 border rounded-md">
                    <option value="immediate">立即</option>
                    <option value="hourly">每小时汇总</option>
                    <option value="daily">每日汇总</option>
                    <option value="weekly">每周汇总</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>安全设置</CardTitle>
                <CardDescription>配置系统安全和访问控制</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">密码策略</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>强制密码复杂度</Label>
                        <p className="text-sm text-muted-foreground">要求密码包含大小写字母、数字和特殊字符</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>定期密码更新</Label>
                        <p className="text-sm text-muted-foreground">要求用户每90天更新密码</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="min-password-length">最小密码长度</Label>
                      <select id="min-password-length" className="w-full p-2 border rounded-md">
                        <option value="8">8个字符</option>
                        <option value="10">10个字符</option>
                        <option value="12" selected>
                          12个字符
                        </option>
                        <option value="16">16个字符</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">登录安全</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>双因素认证</Label>
                        <p className="text-sm text-muted-foreground">要求用户启用双因素认证</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>登录尝试限制</Label>
                        <p className="text-sm text-muted-foreground">连续5次失败后锁定账户</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>IP地址限制</Label>
                        <p className="text-sm text-muted-foreground">限制只能从特定IP地址登录</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">会话设置</h3>
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">会话超时时间</Label>
                    <select id="session-timeout" className="w-full p-2 border rounded-md">
                      <option value="15">15分钟</option>
                      <option value="30" selected>
                        30分钟
                      </option>
                      <option value="60">1小时</option>
                      <option value="120">2小时</option>
                      <option value="240">4小时</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>强制单一会话</Label>
                      <p className="text-sm text-muted-foreground">限制用户只能在一个设备上登录</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>集成设置</CardTitle>
                <CardDescription>配置第三方服务和API集成</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">API集成</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Globe className="h-6 w-6 text-blue-500" />
                          <div>
                            <h4 className="font-medium">外部API服务</h4>
                            <p className="text-sm text-muted-foreground">连接到第三方API服务</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="api-key">API密钥</Label>
                        <Input id="api-key" type="password" value="••••••••••••••••" />
                      </div>
                      <div className="space-y-2 mt-2">
                        <Label htmlFor="api-endpoint">API端点</Label>
                        <Input id="api-endpoint" defaultValue="https://api.example.com/v1" />
                      </div>
                    </div>

                    <div className="p-4 border rounded-md">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Database className="h-6 w-6 text-green-500" />
                          <div>
                            <h4 className="font-medium">数据库连接</h4>
                            <p className="text-sm text-muted-foreground">连接到外部数据库服务</p>
                          </div>
                        </div>
                        <Switch />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="db-connection-string">连接字符串</Label>
                        <Input
                          id="db-connection-string"
                          placeholder="例如：postgresql://user:password@localhost:5432/db"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">身份验证集成</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium">OAuth 2.0</h4>
                          <p className="text-sm text-muted-foreground">启用OAuth 2.0身份验证</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="oauth-client-id">客户端ID</Label>
                        <Input id="oauth-client-id" value="client_id_example" />
                      </div>
                      <div className="space-y-2 mt-2">
                        <Label htmlFor="oauth-client-secret">客户端密钥</Label>
                        <Input id="oauth-client-secret" type="password" value="••••••••••••••••" />
                      </div>
                    </div>

                    <div className="p-4 border rounded-md">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium">LDAP</h4>
                          <p className="text-sm text-muted-foreground">启用LDAP身份验证</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ldap-server">LDAP服务器</Label>
                        <Input id="ldap-server" placeholder="例如：ldap://ldap.example.com:389" />
                      </div>
                      <div className="space-y-2 mt-2">
                        <Label htmlFor="ldap-base-dn">基础DN</Label>
                        <Input id="ldap-base-dn" placeholder="例如：dc=example,dc=com" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
