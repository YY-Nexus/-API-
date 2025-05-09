"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface StatCardProps {
  title: string
  value: string | number
  badge?: {
    text: string
    variant: "default" | "outline" | "secondary" | "destructive"
    icon?: "up" | "down" | "none"
    color?: string
  }
  progress?: {
    value: number
    max: number
    color: string
  }
  trend?: number
  footer?: string
  onClick?: () => void
}

export function ResponsiveStatCard({ title, value, badge, progress, trend, footer, onClick }: StatCardProps) {
  const [expanded, setExpanded] = useState(false)
  const isMobile = useMediaQuery("(max-width: 640px)")

  const handleClick = () => {
    if (isMobile) {
      setExpanded(!expanded)
    }
    if (onClick) {
      onClick()
    }
  }

  return (
    <Card
      className={`${isMobile ? "cursor-pointer transition-all duration-200" : ""} ${expanded ? "ring-2 ring-primary/20" : ""}`}
      onClick={handleClick}
    >
      <CardHeader className={`pb-2 ${isMobile ? "pt-3 px-3" : ""}`}>
        <div className="flex justify-between items-center">
          <CardTitle className={`${isMobile ? "text-xs" : "text-sm"} font-medium text-muted-foreground`}>
            {title}
          </CardTitle>
          {isMobile && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setExpanded(!expanded)
              }}
              className="text-muted-foreground"
            >
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className={isMobile ? "pt-0 pb-3 px-3" : ""}>
        <div className="flex flex-col">
          <div className="flex items-baseline">
            <span className={`${isMobile ? "text-2xl" : "text-3xl"} font-bold`}>{value}</span>
            {badge && (
              <Badge variant={badge.variant} className={`ml-2 ${badge.color || ""}`}>
                {badge.icon === "up" && <ArrowUp className="h-3 w-3 mr-1" />}
                {badge.icon === "down" && <ArrowDown className="h-3 w-3 mr-1" />}
                {badge.text}
              </Badge>
            )}
          </div>

          {(progress || expanded || !isMobile) && (
            <>
              {progress && (
                <Progress
                  value={progress.value}
                  max={progress.max}
                  className="h-1 mt-2"
                  style={
                    {
                      backgroundColor: "#e2e8f0",
                      "--progress-color": progress.color,
                    } as any
                  }
                />
              )}

              {footer && (
                <span className={`${isMobile ? "text-[10px]" : "text-xs"} text-muted-foreground mt-1`}>{footer}</span>
              )}

              {trend !== undefined && (
                <div className="flex items-center mt-1">
                  {trend > 0 ? (
                    <ArrowUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-red-500" />
                  )}
                  <span
                    className={`${isMobile ? "text-[10px]" : "text-xs"} ml-1 ${trend > 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {Math.abs(trend)}% 较上期
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
