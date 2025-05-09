import { type NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

// 需要权限的路径
const PROTECTED_PATHS = ["/api/admin", "/api/file-operations"]

// 需要管理员权限的路径
const ADMIN_PATHS = ["/api/admin"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 检查是否需要保护
  const needsProtection = PROTECTED_PATHS.some((path) => pathname.startsWith(path))
  const needsAdmin = ADMIN_PATHS.some((path) => pathname.startsWith(path))

  if (!needsProtection) {
    return NextResponse.next()
  }

  // 获取令牌
  const token = await getToken({ req: request })

  // 未认证
  if (!token) {
    return new NextResponse(JSON.stringify({ error: "未授权访问" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }

  // 检查管理员权限
  if (needsAdmin && token.role !== "admin") {
    return new NextResponse(JSON.stringify({ error: "权限不足" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/:path*"],
}
