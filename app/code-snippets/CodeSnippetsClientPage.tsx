"use client"

import AppLayout from "@/app/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Copy, ThumbsUp, Filter, Plus, Globe, Database, Server, Smartphone, Terminal } from "lucide-react"

export default function CodeSnippetsClientPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">代码片段库</h1>
            <p className="text-muted-foreground">浏览和使用常用的代码片段，提高开发效率</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              筛选
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              添加片段
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4 space-y-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="搜索代码片段..." className="pl-8" />
            </div>

            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-lg">分类</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start">
                    <Globe className="h-4 w-4 mr-2" />
                    前端开发
                    <Badge className="ml-auto">24</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Server className="h-4 w-4 mr-2" />
                    后端开发
                    <Badge className="ml-auto">18</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Database className="h-4 w-4 mr-2" />
                    数据库
                    <Badge className="ml-auto">12</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Smartphone className="h-4 w-4 mr-2" />
                    移动开发
                    <Badge className="ml-auto">8</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Terminal className="h-4 w-4 mr-2" />
                    命令行
                    <Badge className="ml-auto">15</Badge>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-lg">热门标签</CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">JavaScript</Badge>
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">Node.js</Badge>
                  <Badge variant="outline">SQL</Badge>
                  <Badge variant="outline">Python</Badge>
                  <Badge variant="outline">API</Badge>
                  <Badge variant="outline">Docker</Badge>
                  <Badge variant="outline">Git</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-3/4">
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="popular">热门</TabsTrigger>
                <TabsTrigger value="recent">最新</TabsTrigger>
                <TabsTrigger value="my">我的</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">React Hooks 基础用法</CardTitle>
                        <CardDescription>常用的React Hooks示例和最佳实践</CardDescription>
                      </div>
                      <Badge>React</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                      {`// useState Hook 示例
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`}
                    </pre>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4 mr-2" />
                          复制
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          点赞 (42)
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground">更新于 2023-12-15</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Node.js 文件操作</CardTitle>
                        <CardDescription>常用的Node.js文件读写操作示例</CardDescription>
                      </div>
                      <Badge>Node.js</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                      {`// 文件读写操作
const fs = require('fs');
const path = require('path');

// 读取文件
fs.readFile(path.join(__dirname, 'example.txt'), 'utf8', (err, data) => {
  if (err) {
    console.error('读取文件出错:', err);
    return;
  }
  console.log('文件内容:', data);
});

// 写入文件
const content = '这是要写入的内容';
fs.writeFile(path.join(__dirname, 'output.txt'), content, (err) => {
  if (err) {
    console.error('写入文件出错:', err);
    return;
  }
  console.log('文件写入成功');
});`}
                    </pre>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4 mr-2" />
                          复制
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          点赞 (38)
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground">更新于 2023-11-28</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">SQL 常用查询</CardTitle>
                        <CardDescription>常见的SQL查询语句和优化技巧</CardDescription>
                      </div>
                      <Badge>SQL</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                      {`-- 基本查询示例
-- 连接查询
SELECT 
  u.id, 
  u.username, 
  p.profile_name, 
  p.avatar_url
FROM 
  users u
JOIN 
  profiles p ON u.id = p.user_id
WHERE 
  u.status = 'active'
ORDER BY 
  u.created_at DESC
LIMIT 10;

-- 分组统计
SELECT 
  category_id, 
  COUNT(*) as total_products,
  AVG(price) as avg_price
FROM 
  products
GROUP BY 
  category_id
HAVING 
  COUNT(*) > 5;`}
                    </pre>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4 mr-2" />
                          复制
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          点赞 (56)
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground">更新于 2023-10-05</div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="popular">
                <div className="space-y-4">
                  <p className="text-muted-foreground">热门代码片段将显示在这里</p>
                </div>
              </TabsContent>

              <TabsContent value="recent">
                <div className="space-y-4">
                  <p className="text-muted-foreground">最新代码片段将显示在这里</p>
                </div>
              </TabsContent>

              <TabsContent value="my">
                <div className="space-y-4">
                  <p className="text-muted-foreground">您的代码片段将显示在这里</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
