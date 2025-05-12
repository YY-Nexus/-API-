"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"

interface BeijingTimeProps {
  showSeconds?: boolean
  showDate?: boolean
  showTime?: boolean
  className?: string
  dateFormat?: string
  timeFormat?: string
}

export function BeijingTime({
  showSeconds = true,
  showDate = true,
  showTime = true,
  className = "",
  dateFormat = "yyyy年MM月dd日",
  timeFormat = "HH:mm:ss",
}: BeijingTimeProps) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  useEffect(() => {
    // 更新时间的间隔（秒）
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // 格式化日期时间
  const formattedDate = showDate ? format(currentTime, dateFormat, { locale: zhCN }) : ""
  const formattedTime = showTime ? format(currentTime, showSeconds ? timeFormat : "HH:mm", { locale: zhCN }) : ""

  return (
    <span className={className}>
      {showDate && formattedDate}
      {showDate && showTime && " "}
      {showTime && formattedTime}
    </span>
  )
}
