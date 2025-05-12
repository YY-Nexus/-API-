import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
// 导入NotificationProvider
import { NotificationProvider } from "@/contexts/notification-context"
// 导入UserPreferencesProvider
import { UserPreferencesProvider } from "@/contexts/user-preferences-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "启智云枢³ - IntelliCloudHub³",
  description: "智联万物丨枢启未来 - Connect Intelligence, Hub the Future",
    generator: 'v0.dev'
}

// 在RootLayout组件中添加NotificationProvider
// 在RootLayout组件中添加UserPreferencesProvider
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LanguageProvider>
            <NotificationProvider>
              <UserPreferencesProvider>{children}</UserPreferencesProvider>
            </NotificationProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
