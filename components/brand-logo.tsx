"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"
import "../styles/logo-animations.css"

interface BrandLogoProps {
  variant?: "full" | "icon" | "text"
  size?: "sm" | "md" | "lg"
  className?: string
  animation?: "pulse" | "float" | "shimmer" | "none"
}

export function BrandLogo({ variant = "full", size = "md", className, animation = "none" }: BrandLogoProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
  }

  const sizePixels = {
    sm: { width: 24, height: 24 },
    md: { width: 32, height: 32 },
    lg: { width: 40, height: 40 },
  }

  const animationClass = animation !== "none" ? `logo-${animation}` : ""

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  if (variant === "icon") {
    return (
      <div
        className={cn("flex items-center logo-container", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src="/yanyu-cloud-shield-logo.png"
          alt="言语云³"
          width={sizePixels[size].width * 1.2}
          height={sizePixels[size].height * 1.2}
          className={cn(
            "object-contain logo-hover-effect",
            animationClass,
            isHovered && animation === "none" ? "logo-pulse" : "",
          )}
        />
      </div>
    )
  }

  if (variant === "text") {
    return (
      <div className={cn("font-bold", className)}>
        <span className={cn(sizeClasses[size])}>言语云³</span>
      </div>
    )
  }

  return (
    <div
      className={cn("font-bold flex items-center gap-3", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="logo-container">
        <Image
          src="/yanyu-cloud-shield-logo.png"
          alt="言语云³"
          width={sizePixels[size].width * 1.5}
          height={sizePixels[size].height * 1.5}
          className={cn(
            "object-contain logo-hover-effect",
            animationClass,
            isHovered && animation === "none" ? "logo-pulse" : "",
          )}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center">
          <span
            className={cn(
              size === "sm" ? "text-lg" : size === "md" ? "text-xl" : "text-2xl",
              "font-bold text-blue-600",
            )}
          >
            言语云³
          </span>
          <span className={cn("ml-2 text-cyan-500", size === "sm" ? "text-xs" : "text-sm")}>YanYu Cloud³</span>
        </div>
        {size !== "sm" && <span className="text-xs text-blue-400 mt-1">连接智慧丨云启未来</span>}
      </div>
    </div>
  )
}
