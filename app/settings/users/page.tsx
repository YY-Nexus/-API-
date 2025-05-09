import AppLayout from "@/app/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Users, Edit, Mail } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "用户管理 | 启智云枢³",
  description: "管理系统用户和权限 - 启智云枢³",
}

export default function UserManagementPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">用户管理</h1>
            <p className="text-muted-foreground">管理系统用户、角色和权限</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              添加用户
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle>系统用户</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="搜索用户..." className="pl-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">用户</th>
                    <th className="text-left py-3 px-4">邮箱</th>
                    <th className="text-left py-3 px-4">角色</th>
                    <th className="text-left py-3 px-4">状态</th>
                    <th className="text-left py-3 px-4">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <span>管理员用户</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">admin@example.com</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">管理员</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">活跃</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">编辑</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">发送邮件</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <span>开发者用户</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">dev@example.com</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">开发者</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">活跃</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">编辑</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">发送邮件</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <span>测试用户</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">test@example.com</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">测试人员</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">未激活</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">编辑</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">发送邮件</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>角色管理</CardTitle>
              <CardDescription>管理系统角色和权限</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h4 className="font-medium">管理员</h4>
                    <p className="text-sm text-muted-foreground">完全访问所有功能</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    编辑
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h4 className="font-medium">开发者</h4>
                    <p className="text-sm text-muted-foreground">访问API和开发工具</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    编辑
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h4 className="font-medium">测试人员</h4>
                    <p className="text-sm text-muted-foreground">访问测试工具和环境</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    编辑
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h4 className="font-medium">只读用户</h4>
                    <p className="text-sm text-muted-foreground">只能查看文档和资源</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    编辑
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>访问控制</CardTitle>
              <CardDescription>管理功能和资源的访问权限</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-md">
                  <h4 className="font-medium mb-2">API文档</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">管理员</Badge>
                        <span className="text-sm text-green-600">完全访问</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">开发者</Badge>
                        <span className="text-sm text-green-600">完全访问</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">测试人员</Badge>
                        <span className="text-sm text-yellow-600">只读访问</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-3 border rounded-md">
                  <h4 className="font-medium mb-2">用户管理</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">管理员</Badge>
                        <span className="text-sm text-green-600">完全访问</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">开发者</Badge>
                        <span className="text-sm text-red-600">禁止访问</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">测试人员</Badge>
                        <span className="text-sm text-red-600">禁止访问</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
