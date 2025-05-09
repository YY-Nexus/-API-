import AppLayout from "@/app/app-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "身份验证API | 启智云枢³",
  description: "启智云枢³ 身份验证API文档和使用说明",
}

export default function AuthApiPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">身份验证API</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">概述</h2>
              <p className="text-gray-700 mb-4">
                身份验证API提供了用户认证、授权和会话管理的功能。通过这些API，您可以实现用户登录、注册、令牌刷新等功能。
              </p>
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-medium text-blue-800 mb-2">基本信息</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <span className="font-medium">基础URL:</span>{" "}
                    <code className="bg-blue-100 px-2 py-1 rounded">/api/auth</code>
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
                    <h3 className="font-medium">/api/auth/login</h3>
                  </div>
                  <p className="text-gray-700 mb-2">用户登录并获取访问令牌</p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">请求参数</h4>
                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                      {`{
  "email": "user@example.com",
  "password": "your_password"
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium mr-2">POST</span>
                    <h3 className="font-medium">/api/auth/refresh</h3>
                  </div>
                  <p className="text-gray-700 mb-2">使用刷新令牌获取新的访问令牌</p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">请求参数</h4>
                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                      {`{
  "refreshToken": "your_refresh_token"
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium mr-2">POST</span>
                    <h3 className="font-medium">/api/auth/register</h3>
                  </div>
                  <p className="text-gray-700 mb-2">注册新用户</p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">请求参数</h4>
                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                      {`{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "your_password"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">使用示例</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm mb-2">JavaScript</h3>
                  <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                    {`// 用户登录
async function login(email, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  
  if (response.ok) {
    // 保存令牌
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  } else {
    throw new Error(data.message || '登录失败');
  }
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">相关资源</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="bg-blue-100 p-1 rounded-full mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <a href="#" className="text-blue-600 hover:underline">
                    认证最佳实践
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 p-1 rounded-full mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <a href="#" className="text-blue-600 hover:underline">
                    JWT令牌说明
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 p-1 rounded-full mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <a href="#" className="text-blue-600 hover:underline">
                    安全认证指南
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
