"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface UserPreferences {
  theme: "light" | "dark" | "system"
  fontSize: "small" | "medium" | "large"
  language: "zh-CN" | "en-US"
  sidebarCollapsed: boolean
  animations: boolean
}

interface UserPreferencesContextType {
  preferences: UserPreferences
  updatePreference: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => void
  resetPreferences: () => void
}

const defaultPreferences: UserPreferences = {
  theme: "system",
  fontSize: "medium",
  language: "zh-CN",
  sidebarCollapsed: false,
  animations: true,
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined)

export function UserPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences)
  const [loaded, setLoaded] = useState(false)

  // 从localStorage加载偏好设置
  useEffect(() => {
    try {
      const savedPreferences = localStorage.getItem("userPreferences")
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences))
      }
    } catch (error) {
      console.error("Failed to load preferences from localStorage:", error)
    } finally {
      setLoaded(true)
    }
  }, [])

  // 保存偏好设置到localStorage
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("userPreferences", JSON.stringify(preferences))
    }
  }, [preferences, loaded])

  // 更新单个偏好设置
  const updatePreference = <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }

  // 重置所有偏好设置
  const resetPreferences = () => {
    setPreferences(defaultPreferences)
  }

  return (
    <UserPreferencesContext.Provider value={{ preferences, updatePreference, resetPreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  )
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext)
  if (context === undefined) {
    throw new Error("useUserPreferences must be used within a UserPreferencesProvider")
  }
  return context
}
