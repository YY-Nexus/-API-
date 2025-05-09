import AppLayout from "@/app/app-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "消息通知API | 启智云枢³",
  description: "启智云枢³ 消息通知API文档和使用说明",
}

export default function NotificationApiPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">消息通知API</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">概述</h2>
              <p className="text-gray-700 mb-4">
                消息通知API提供了发送各种类型通知的功能，包括电子邮件、短信、推送通知和应用内消息。支持模板、批量发送和定时发送。
              </p>
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-medium text-blue-800 mb-2">基本信息</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <span className="font-medium">基础URL:</span>{" "}
                    <code className="bg-blue-100 px-2 py-1 rounded">/api/notification</code>
                  </li>
                  <li>
                    <span className="font-medium">认证方式:</span> Bearer Token
                  </li>
                  <li>
                    <span className="font-medium">响应格式:</span> JSON
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">API端点</h2>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium mr-2">POST</span>
                    <h3 className="font-medium">/api/notification/send</h3>
                  </div>
                  <p className="text-gray-700 mb-2">发送通知</p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">请求参数</h4>
                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                      {`{
  "type": "email", // email, sms, push, in_app
  "recipients": ["user@example.com"],
  "subject": "通知主题",
  "content": "通知内容",
  "templateId": "template_123", // 可选
  "data": {}, // 模板数据，可选
  "scheduledAt": "2023-12-31T12:00:00Z" // 定时发送，可选
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium mr-2">POST</span>
                    <h3 className="font-medium">/api/notification/templates</h3>
                  </div>
                  <p className="text-gray-700 mb-2">创建通知模板</p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">请求参数</h4>
                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                      {`{
  "name": "欢迎邮件",
  "type": "email",
  "subject": "欢迎加入{{company}}",
  "content": "亲爱的{{name}}，欢迎加入{{company}}！",
  "description": "新用户注册后的欢迎邮件"
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium mr-2">GET</span>
                    <h3 className="font-medium">/api/notification/history</h3>
                  </div>
                  <p className="text-gray-700 mb-2">获取通知历史记录</p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">查询参数</h4>
                    <ul className="list-disc pl-5 text-sm">
                      <li>type: (可选) 通知类型</li>
                      <li>status: (可选) 通知状态</li>
                      <li>startDate: (可选) 开始日期</li>
                      <li>endDate: (可选) 结束日期</li>
                      <li>page: (可选) 页码</li>
                      <li>limit: (可选) 每页数量</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">通知类型</h2>
              <div className="space-y-3">
                <div className="flex items-center p-3 border rounded-md">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">电子邮件</h3>
                    <p className="text-sm text-gray-600">支持HTML内容和附件</p>
                  </div>
                </div>

                <div className="flex items-center p-3 border rounded-md">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">短信</h3>
                    <p className="text-sm text-gray-600">支持国内外多家短信服务商</p>
                  </div>
                </div>

                <div className="flex items-center p-3 border rounded-md">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">推送通知</h3>
                    <p className="text-sm text-gray-600">支持iOS、Android和Web推送</p>
                  </div>
                </div>

                <div className="flex items-center p-3 border rounded-md">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">应用内消息</h3>
                    <p className="text-sm text-gray-600">在应用界面内显示的通知</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">使用示例</h2>
              <div>
                <h3 className="font-medium text-sm mb-2">JavaScript</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {`// 发送电子邮件通知
async function sendEmailNotification(recipient, subject, content) {
  const response = await fetch('/api/notification/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${localStorage.getItem('accessToken')}\`
    },
    body: JSON.stringify({
      type: 'email',
      recipients: [recipient],
      subject,
      content
    })
  });
  
  return await response.json();
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
