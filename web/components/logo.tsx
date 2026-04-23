import { cn } from "@/lib/utils"

export function Logo({
  className,
  size = "md",
}: {
  className?: string
  size?: "sm" | "md" | "lg"
}): React.ReactNode {
  const sizeClasses = {
    sm: "size-6 text-[9px]",
    md: "size-8 text-[11px]",
    lg: "size-10 text-sm",
  } satisfies Record<string, string>

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg bg-foreground font-bold text-background",
        sizeClasses[size],
        className
      )}
      aria-hidden="true"
    >
      DS
    </div>
  )
}
