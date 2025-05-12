"use client"

import type React from "react"

import { useState, useEffect } from "react"

export function useLazyLoad<T>(
  importFn: () => Promise<{ default: T }>,
  fallback: React.ReactNode = null,
): [T | null, boolean, React.ReactNode] {
  const [Component, setComponent] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadComponent = async () => {
      try {
        const { default: LoadedComponent } = await importFn()
        if (isMounted) {
          setComponent(LoadedComponent)
          setLoading(false)
        }
      } catch (error) {
        console.error("Failed to lazy load component:", error)
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadComponent()

    return () => {
      isMounted = false
    }
  }, [importFn])

  return [Component, loading, fallback]
}
