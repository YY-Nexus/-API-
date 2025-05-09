import AppLayout from "@/app/app-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "地图定位API | 启智云枢³",
  description: "启智云枢³ 地图定位API文档和使用说明",
}

export default function MapsApiPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">地图定位API</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">概述</h2>
              <p className="text-gray-700 mb-4">
                地图定位API提供了地理编码、反向地理编码、路线规划、距离计算等功能。支持多种地图服务提供商，包括高德地图、百度地图和Google
                Maps。
              </p>
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-medium text-blue-800 mb-2">基本信息</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <span className="font-medium">基础URL:</span>{" "}
                    <code className="bg-blue-100 px-2 py-1 rounded">/api/maps</code>
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
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium mr-2">GET</span>
                    <h3 className="font-medium">/api/maps/geocode</h3>
                  </div>
                  <p className="text-gray-700 mb-2">地理编码（地址转坐标）</p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">查询参数</h4>
                    <ul className="list-disc pl-5 text-sm">
                      <li>address: 地址</li>
                      <li>city: (可选) 城市</li>
                      <li>provider: (可选) 地图提供商，默认为amap</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium mr-2">GET</span>
                    <h3 className="font-medium">/api/maps/reverse-geocode</h3>
                  </div>
                  <p className="text-gray-700 mb-2">反向地理编码（坐标转地址）</p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">查询参数</h4>
                    <ul className="list-disc pl-5 text-sm">
                      <li>latitude: 纬度</li>
                      <li>longitude: 经度</li>
                      <li>provider: (可选) 地图提供商，默认为amap</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium mr-2">GET</span>
                    <h3 className="font-medium">/api/maps/route</h3>
                  </div>
                  <p className="text-gray-700 mb-2">路线规划</p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">查询参数</h4>
                    <ul className="list-disc pl-5 text-sm">
                      <li>origin: 起点坐标（纬度,经度）</li>
                      <li>destination: 终点坐标（纬度,经度）</li>
                      <li>mode: 出行方式（driving, walking, transit, cycling）</li>
                      <li>provider: (可选) 地图提供商，默认为amap</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium mr-2">GET</span>
                    <h3 className="font-medium">/api/maps/distance</h3>
                  </div>
                  <p className="text-gray-700 mb-2">距离计算</p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">查询参数</h4>
                    <ul className="list-disc pl-5 text-sm">
                      <li>origins: 起点坐标，多个坐标用分号分隔（纬度,经度;纬度,经度）</li>
                      <li>destinations: 终点坐标，多个坐标用分号分隔（纬度,经度;纬度,经度）</li>
                      <li>mode: 出行方式（driving, walking, transit, cycling）</li>
                      <li>provider: (可选) 地图提供商，默认为amap</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">地图提供商</h2>
              <div className="space-y-3">
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
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">高德地图</h3>
                    <p className="text-sm text-gray-600">中国领先的地图服务提供商</p>
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
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">百度地图</h3>
                    <p className="text-sm text-gray-600">提供全面的地图数据和服务</p>
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
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Google Maps</h3>
                    <p className="text-sm text-gray-600">全球领先的地图服务</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">使用示例</h2>
              <div>
                <h3 className="font-medium text-sm mb-2">JavaScript</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {`// 地理编码
async function geocodeAddress(address, city = '') {
  const params = new URLSearchParams({
    address,
    city
  });
  
  const response = await fetch(
    \`/api/maps/geocode?\${params.toString()}\`,
    {
      headers: {
        'Authorization': \`Bearer \${localStorage.getItem('accessToken')}\`
      }
    }
  );
  
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
