"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // 服务器端渲染时，默认为false
    if (typeof window === "undefined") return

    const media = window.matchMedia(query)
    setMatches(media.matches)

    // 监听媒体查询变化
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}
