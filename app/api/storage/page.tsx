import AppLayout from "@/app/app-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "数据存储API | 启智云枢³",
  description: "启智云枢³ 数据存储API文档和使用说明",
}

export default function StorageApiPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">数据存储API</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">概述</h2>
              <p className="text-gray-700 mb-4">
                数据存储API提供了文件上传、下载、管理和共享的功能。支持多种存储类型，包括对象存储、文件存储和块存储。
              </p>
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-medium text-blue-800 mb-2">基本信息</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <span className="font-medium">基础URL:</span>{" "}
                    <code className="bg-blue-100 px-2 py-1 rounded">/api/storage</code>
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
                    <h3 className="font-medium">/api/storage/upload</h3>
                  </div>
                  <p className="text-gray-700 mb-2">上传文件</p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">请求参数</h4>
                    <p className="text-sm text-gray-600 mb-2">使用multipart/form-data格式</p>
                    <ul className="list-disc pl-5 text-sm">
                      <li>file: 要上传的文件</li>
                      <li>path: (可选) 存储路径</li>
                      <li>isPublic: (可选) 是否公开访问</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium mr-2">GET</span>
                    <h3 className="font-medium">/api/storage/files</h3>
                  </div>
                  <p className="text-gray-700 mb-2">获取文件列表</p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">查询参数</h4>
                    <ul className="list-disc pl-5 text-sm">
                      <li>path: (可选) 文件路径</li>
                      <li>page: (可选) 页码</li>
                      <li>limit: (可选) 每页数量</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium mr-2">GET</span>
                    <h3 className="font-medium">/api/storage/download/{"{fileId}"}</h3>
                  </div>
                  <p className="text-gray-700 mb-2">下载指定文件</p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">路径参数</h4>
                    <ul className="list-disc pl-5 text-sm">
                      <li>fileId: 文件ID</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium mr-2">DELETE</span>
                    <h3 className="font-medium">/api/storage/files/{"{fileId}"}</h3>
                  </div>
                  <p className="text-gray-700 mb-2">删除文件</p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">路径参数</h4>
                    <ul className="list-disc pl-5 text-sm">
                      <li>fileId: 文件ID</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">存储类型</h2>
              <div className="space-y-3">
                <div className="flex items-center p-3 border rounded-md">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">对象存储</h3>
                    <p className="text-sm text-gray-600">适用于非结构化数据，如图片、视频等</p>
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
                        d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">文件存储</h3>
                    <p className="text-sm text-gray-600">适用于需要文件系统接口的应用</p>
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
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">块存储</h3>
                    <p className="text-sm text-gray-600">适用于需要低延迟的数据库等应用</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">使用示例</h2>
              <div>
                <h3 className="font-medium text-sm mb-2">JavaScript</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {`// 上传文件
async function uploadFile(file, path = '') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('path', path);
  
  const response = await fetch('/api/storage/upload', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${localStorage.getItem('accessToken')}\`
    },
    body: formData
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
