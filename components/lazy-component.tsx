"use client"

import type React from "react"

import { Suspense, lazy, type ComponentType } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface LazyComponentProps {
  importFn: () => Promise<{ default: ComponentType<any> }>
  props?: Record<string, any>
  fallback?: React.ReactNode
}

export function LazyComponent({ importFn, props = {}, fallback }: LazyComponentProps) {
  const LazyLoadedComponent = lazy(importFn)

  return (
    <Suspense fallback={fallback || <Skeleton className="w-full h-40" />}>
      <LazyLoadedComponent {...props} />
    </Suspense>
  )
}
