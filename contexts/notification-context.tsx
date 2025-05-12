"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

type NotificationType = "success" | "error" | "warning" | "info"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  duration?: number
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id">) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
  showSuccess: (title: string, message: string, duration?: number) => void
  showError: (title: string, message: string, duration?: number) => void
  showWarning: (title: string, message: string, duration?: number) => void
  showInfo: (title: string, message: string, duration?: number) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { toast } = useToast()

  const addNotification = useCallback(
    (notification: Omit<Notification, "id">) => {
      const id = Math.random().toString(36).substring(2, 9)
      const newNotification = { ...notification, id }

      setNotifications((prev) => [...prev, newNotification])

      // 使用toast组件显示通知
      toast({
        title: notification.title,
        description: notification.message,
        variant: notification.type === "error" ? "destructive" : "default",
        duration: notification.duration || 5000,
      })

      // 自动移除通知
      if (notification.duration !== Number.POSITIVE_INFINITY) {
        setTimeout(() => {
          removeNotification(id)
        }, notification.duration || 5000)
      }

      return id
    },
    [toast],
  )

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [])

  const clearNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  const showSuccess = useCallback(
    (title: string, message: string, duration?: number) => {
      addNotification({ type: "success", title, message, duration })
    },
    [addNotification],
  )

  const showError = useCallback(
    (title: string, message: string, duration?: number) => {
      addNotification({ type: "error", title, message, duration })
    },
    [addNotification],
  )

  const showWarning = useCallback(
    (title: string, message: string, duration?: number) => {
      addNotification({ type: "warning", title, message, duration })
    },
    [addNotification],
  )

  const showInfo = useCallback(
    (title: string, message: string, duration?: number) => {
      addNotification({ type: "info", title, message, duration })
    },
    [addNotification],
  )

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearNotifications,
        showSuccess,
        showError,
        showWarning,
        showInfo,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}
