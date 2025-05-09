import AppLayout from "@/app/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Code, Terminal, BookOpen, Copy, ArrowRight, Info, AlertCircle, Zap } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "API快速开始 | 启智云枢³",
  description: "快速上手启智云枢³API的使用指南",
}

export default function ApiQuickstartPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">API快速开始</h1>
            <p className="text-muted-foreground">快速上手启智云枢³API的使用指南</p>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>开始之前</AlertTitle>
            <AlertDescription>
              确保您已经注册了启智云枢³账户并获取了API密钥。如果您还没有API密钥，请前往
              <Button variant="link" className="px-1 h-auto">
                设置 &gt; API密钥
              </Button>
              页面创建。
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>第一步：获取API密钥</CardTitle>
              <CardDescription>您需要API密钥来进行身份验证</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>所有API请求都需要使用API密钥进行身份验证。您可以在设置页面中创建和管理您的API密钥。</p>

              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">API密钥示例</span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <pre className="text-sm font-mono overflow-x-auto">qz_sk_12345678abcdefghijklmnopqrstuvwxyz</pre>
              </div>

              <Alert variant="warning">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>安全提示</AlertTitle>
                <AlertDescription>请妥善保管您的API密钥，不要将其暴露在客户端代码或公共仓库中。</AlertDescription>
              </Alert>

              <Button className="bg-blue-600 hover:bg-blue-700">
                创建API密钥
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>第二步：发送您的第一个API请求</CardTitle>
              <CardDescription>学习如何构建和发送API请求</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="curl">
                <TabsList className="mb-4">
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                  <TabsTrigger value="nodejs">Node.js</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="java">Java</TabsTrigger>
                </TabsList>

                <TabsContent value="curl" className="space-y-4">
                  <p>使用cURL发送一个简单的GET请求来获取API状态：</p>

                  <div className="bg-muted p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">cURL示例</span>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                      curl -X GET "https://api.qizhi.com/v3/status" \ -H "Authorization: Bearer
                      qz_sk_12345678abcdefghijklmnopqrstuvwxyz" \ -H "Content-Type: application/json"
                    </pre>
                  </div>

                  <p>响应示例：</p>

                  <div className="bg-muted p-4 rounded-md">
                    <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                      {`{
  "success": true,
  "data": {
    "status": "operational",
    "version": "3.2.1",
    "serverTime": "2023-05-09T08:30:00Z"
  }
}`}
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="nodejs" className="space-y-4">
                  <p>使用Node.js发送一个简单的GET请求来获取API状态：</p>

                  <div className="bg-muted p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Node.js示例</span>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                      {`const fetch = require('node-fetch');

async function getApiStatus() {
  const response = await fetch('https://api.qizhi.com/v3/status', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer qz_sk_12345678abcdefghijklmnopqrstuvwxyz',
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  console.log(data);
}

getApiStatus();`}
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="python" className="space-y-4">
                  <p>使用Python发送一个简单的GET请求来获取API状态：</p>

                  <div className="bg-muted p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Python示例</span>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                      {`import requests

def get_api_status():
    headers = {
        'Authorization': 'Bearer qz_sk_12345678abcdefghijklmnopqrstuvwxyz',
        'Content-Type': 'application/json'
    }
    
    response = requests.get('https://api.qizhi.com/v3/status', headers=headers)
    data = response.json()
    print(data)

get_api_status()`}
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="java" className="space-y-4">
                  <p>使用Java发送一个简单的GET请求来获取API状态：</p>

                  <div className="bg-muted p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Java示例</span>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                      {`import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class ApiExample {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.qizhi.com/v3/status"))
                .header("Authorization", "Bearer qz_sk_12345678abcdefghijklmnopqrstuvwxyz")
                .header("Content-Type", "application/json")
                .GET()
                .build();
                
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`}
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>第三步：探索API端点</CardTitle>
              <CardDescription>了解可用的API端点和功能</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                启智云枢³提供了丰富的API端点，涵盖了认证、用户管理、数据存储、消息通知等多个方面。
                以下是一些常用的API端点：
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-center mb-2">
                    <Badge className="bg-blue-100 text-blue-800 mr-2">GET</Badge>
                    <span className="font-mono text-sm">/api/auth/status</span>
                  </div>
                  <p className="text-sm text-muted-foreground">检查当前认证状态和用户信息</p>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center mb-2">
                    <Badge className="bg-green-100 text-green-800 mr-2">POST</Badge>
                    <span className="font-mono text-sm">/api/auth/login</span>
                  </div>
                  <p className="text-sm text-muted-foreground">用户登录并获取访问令牌</p>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center mb-2">
                    <Badge className="bg-blue-100 text-blue-800 mr-2">GET</Badge>
                    <span className="font-mono text-sm">/api/users</span>
                  </div>
                  <p className="text-sm text-muted-foreground">获取用户列表</p>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center mb-2">
                    <Badge className="bg-green-100 text-green-800 mr-2">POST</Badge>
                    <span className="font-mono text-sm">/api/storage/upload</span>
                  </div>
                  <p className="text-sm text-muted-foreground">上传文件到存储服务</p>
                </div>
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/api-docs">
                  查看完整API文档
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>下一步</CardTitle>
              <CardDescription>继续探索和学习</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Terminal className="h-5 w-5 mr-2 text-blue-500" />
                      API沙盒
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">在安全环境中测试API调用</p>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/api-sandbox">打开沙盒</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Code className="h-5 w-5 mr-2 text-blue-500" />
                      代码示例
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">浏览各种语言的代码示例</p>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/code-snippets">查看示例</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                      教程中心
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">学习如何有效使用API</p>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/tutorials">浏览教程</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Alert className="bg-blue-50 border-blue-200">
            <Zap className="h-4 w-4 text-blue-500" />
            <AlertTitle className="text-blue-700">需要帮助？</AlertTitle>
            <AlertDescription className="text-blue-600">
              如果您在使用API过程中遇到任何问题，可以查阅我们的
              <Button variant="link" className="px-1 h-auto text-blue-700">
                常见问题
              </Button>
              或
              <Button variant="link" className="px-1 h-auto text-blue-700">
                联系技术支持
              </Button>
              。
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </AppLayout>
  )
}
