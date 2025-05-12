"use client"

import { BrandLogo } from "./brand-logo"

export function LogoShowcase() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">言语云³ Logo 展示</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col items-center p-4 border border-blue-100 rounded-lg">
          <BrandLogo variant="icon" size="lg" animation="pulse" />
          <p className="mt-4 text-center text-sm text-gray-600">脉动效果</p>
        </div>

        <div className="flex flex-col items-center p-4 border border-blue-100 rounded-lg">
          <BrandLogo variant="icon" size="lg" animation="float" />
          <p className="mt-4 text-center text-sm text-gray-600">漂浮效果</p>
        </div>

        <div className="flex flex-col items-center p-4 border border-blue-100 rounded-lg">
          <BrandLogo variant="icon" size="lg" animation="shimmer" />
          <p className="mt-4 text-center text-sm text-gray-600">闪光效果</p>
        </div>

        <div className="flex flex-col items-center p-4 border border-blue-100 rounded-lg">
          <BrandLogo variant="icon" size="lg" animation="none" />
          <p className="mt-4 text-center text-sm text-gray-600">悬停效果</p>
        </div>
      </div>

      <div className="mt-8 p-4 border border-blue-100 rounded-lg">
        <div className="flex justify-center">
          <BrandLogo variant="full" size="lg" animation="none" />
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">完整标识（悬停查看效果）</p>
      </div>
    </div>
  )
}
