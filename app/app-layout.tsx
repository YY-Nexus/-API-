"use client"

import type React from "react"
import { useState } from "react"
import { SideNavigation } from "@/components/side-navigation"
import { BrandFooter } from "@/components/brand-footer"
import { useMobile } from "@/hooks/use-mobile"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const isMobile = useMobile()

  return (
    <div className="flex h-screen overflow-hidden">
      <SideNavigation collapsed={isMobile || collapsed} onToggleCollapse={() => setCollapsed(!collapsed)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">{children}</main>
        <BrandFooter />
      </div>
    </div>
  )
}
