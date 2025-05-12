"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import "../styles/animations.css"

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  animationType?: "pulse" | "bounce" | "shake" | "none"
  successMessage?: string
  showSuccessMessage?: boolean
}

export function AnimatedButton({
  children,
  className,
  variant = "default",
  size = "default",
  animationType = "pulse",
  successMessage,
  showSuccessMessage = false,
  onClick,
  ...props
}: AnimatedButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (animationType !== "none") {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 500)
    }

    if (successMessage) {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    }

    onClick?.(e)
  }

  const getAnimationClass = () => {
    if (!isAnimating) return ""

    switch (animationType) {
      case "pulse":
        return "btn-pulse"
      case "bounce":
        return "animate-bounce"
      case "shake":
        return "animate-shake"
      default:
        return ""
    }
  }

  return (
    <div className="relative">
      <Button
        variant={variant}
        size={size}
        className={cn(getAnimationClass(), className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Button>

      {showSuccess && showSuccessMessage && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-green-100 text-green-800 rounded text-sm success-fade">
          {successMessage}
        </div>
      )}
    </div>
  )
}
