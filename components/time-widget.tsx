"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate, formatTime, formatWeekday } from "@/utils/date-utils"
import { Clock } from "lucide-react"

export function TimeWidget() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="w-full max-w-xs">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="h-5 w-5 text-blue-500" />
          <span className="font-medium">北京时间</span>
        </div>
        <div className="text-2xl font-bold tracking-wide text-center">{formatTime(currentTime)}</div>
        <div className="text-sm text-center text-muted-foreground mt-1">
          {formatDate(currentTime)} {formatWeekday(currentTime)}
        </div>
      </CardContent>
    </Card>
  )
}
