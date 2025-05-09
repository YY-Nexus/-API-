import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/components/brand-logo"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-md text-center space-y-8">
        <BrandLogo variant="full" size="lg" className="mx-auto" />

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-blue-950">页面未找到</h1>
          <p className="text-muted-foreground">抱歉，您请求的页面不存在或已被移动到其他位置。</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索内容..."
              className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                返回首页
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回控制面板
              </Link>
            </Button>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>
            如需帮助，请联系{" "}
            <a href="mailto:support@intellicloudhub.com" className="text-blue-600 hover:underline">
              技术支持
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
