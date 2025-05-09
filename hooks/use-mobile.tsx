"use client"

import { useState, useEffect, useRef } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  // 使用ref存储媒体查询对象，避免在每次渲染时重新创建
  const mediaQueryRef = useRef<MediaQueryList | null>(null)

  useEffect(() => {
    // 避免在服务器端运行
    if (typeof window === "undefined") {
      return undefined
    }

    // 只在首次渲染或query变化时创建媒体查询对象
    if (!mediaQueryRef.current || mediaQueryRef.current.media !== query) {
      mediaQueryRef.current = window.matchMedia(query)
    }

    const media = mediaQueryRef.current

    // 初始化匹配状态
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    // 创建事件监听器
    const listener = (event: MediaQueryListEvent) => {
      if (matches !== event.matches) {
        setMatches(event.matches)
      }
    }

    // 添加事件监听
    media.addEventListener("change", listener)

    // 清理函数
    return () => {
      media.removeEventListener("change", listener)
    }
  }, [query, matches]) // 只在query或matches变化时重新运行

  return matches
}

export function useTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // 避免在服务器端运行
    if (typeof window === "undefined") {
      return
    }

    const touchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore
      navigator.msMaxTouchPoints > 0

    setIsTouch(touchDevice)

    // 这个effect只需要运行一次
  }, [])

  return isTouch
}

export function useOrientation(): "portrait" | "landscape" {
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait")

  useEffect(() => {
    // 避免在服务器端运行
    if (typeof window === "undefined") {
      return undefined
    }

    const handleResize = () => {
      const newOrientation = window.innerHeight > window.innerWidth ? "portrait" : "landscape"
      if (newOrientation !== orientation) {
        setOrientation(newOrientation)
      }
    }

    // 初始化
    handleResize()

    // 添加事件监听
    window.addEventListener("resize", handleResize)

    // 清理函数
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [orientation]) // 只在orientation变化时重新运行

  return orientation
}

export function useMobile(): boolean {
  return useMediaQuery("(max-width: 768px)")
}
