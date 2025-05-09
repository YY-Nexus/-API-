import { cn } from "@/lib/utils"

interface BrandLogoProps {
  variant?: "full" | "icon" | "text"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function BrandLogo({ variant = "full", size = "md", className }: BrandLogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  if (variant === "icon") {
    return (
      <div className={cn("font-bold text-primary flex items-center", className)}>
        <span className={cn(sizeClasses[size], "font-bold")}>CH³</span>
      </div>
    )
  }

  if (variant === "text") {
    return (
      <div className={cn("font-bold", className)}>
        <span className={cn(sizeClasses[size])}>启智云枢³</span>
      </div>
    )
  }

  return (
    <div className={cn("font-bold flex flex-col", className)}>
      <div className="flex items-center">
        <span className={cn(sizeClasses[size])}>启智云枢³</span>
        <span className={cn("ml-2 text-muted-foreground", size === "sm" ? "text-xs" : "text-sm")}>
          IntelliCloudHub³
        </span>
      </div>
      {size !== "sm" && <span className="text-xs text-muted-foreground mt-1">智联万物丨枢启未来</span>}
    </div>
  )
}
