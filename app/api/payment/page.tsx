import AppLayout from "@/app/app-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "支付服务API | 启智云枢³",
  description: "启智云枢³ 支付服务API文档和使用说明",
}

export default function PaymentApiPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">支付服务API</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">概述</h2>
              <p className="text-gray-700 mb-4">
                支付服务API提供了创建订单、处理支付、查询交易记录等功能。支持多种支付方式，包括信用卡、支付宝、微信支付等。
              </p>
              <div className="bg-blue-50 p-4 rounded-md">
                <h3 className="font-medium text-blue-800 mb-2">基本信息</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <span className="font-medium">基础URL:</span>{" "}
                    <code className="bg-blue-100 px-2 py-1 rounded">/api/payment</code>
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
                    <h3 className="font-medium">/api/payment/create-order</h3>
                  </div>
                  <p className="text-gray-700 mb-2">创建新的支付订单</p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">请求参数</h4>
                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                      {`{
  "amount": 100.00,
  "currency": "CNY",
  "description": "订单描述",
  "metadata": {
    "productId": "prod_123",
    "customerId": "cust_456"
  }
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium mr-2">GET</span>
                    <h3 className="font-medium">/api/payment/orders/{"{orderId}"}</h3>
                  </div>
                  <p className="text-gray-700 mb-2">获取订单详情</p>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium mr-2">POST</span>
                    <h3 className="font-medium">/api/payment/process</h3>
                  </div>
                  <p className="text-gray-700 mb-2">处理支付</p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">请求参数</h4>
                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                      {`{
  "orderId": "order_123456",
  "paymentMethod": "credit_card",
  "paymentDetails": {
    "cardNumber": "4242424242424242",
    "expiryMonth": 12,
    "expiryYear": 2025,
    "cvc": "123"
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">支付方式</h2>
              <div className="space-y-3">
                <div className="flex items-center p-3 border rounded-md">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path
                        fillRule="evenodd"
                        d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">信用卡</h3>
                    <p className="text-sm text-gray-600">支持Visa、Mastercard、JCB等</p>
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
                        d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                        clipRule="evenodd"
                      />
                      <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">支付宝</h3>
                    <p className="text-sm text-gray-600">中国领先的移动支付方式</p>
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
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">微信支付</h3>
                    <p className="text-sm text-gray-600">便捷的移动社交支付方式</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">使用示例</h2>
              <div>
                <h3 className="font-medium text-sm mb-2">JavaScript</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {`// 创建订单
async function createOrder(amount, description) {
  const response = await fetch('/api/payment/create-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${localStorage.getItem('accessToken')}\`
    },
    body: JSON.stringify({
      amount,
      currency: 'CNY',
      description
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
