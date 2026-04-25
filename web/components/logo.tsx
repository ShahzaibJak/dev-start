import { cn } from "@/lib/utils"

export function Logo({
  className,
  size = "md",
  variant = "mark",
}: {
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "mark" | "lockup"
}): React.ReactNode {
  if (variant === "lockup") {
    return <LogoLockup className={className} size={size} />
  }

  return <LogoMark className={className} size={size} />
}

function LogoMark({
  className,
  size,
}: {
  className?: string
  size: "sm" | "md" | "lg"
}): React.ReactNode {
  const sizeClasses = {
    sm: "size-6",
    md: "size-8",
    lg: "size-10",
  } satisfies Record<string, string>

  return (
    <svg
      viewBox="0 0 64 64"
      className={cn(
        "shrink-0 text-foreground",
        sizeClasses[size],
        className
      )}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="6" y="6" width="52" height="52" rx="18" fill="currentColor" />
      <rect
        x="6"
        y="6"
        width="52"
        height="52"
        rx="18"
        stroke="currentColor"
        strokeOpacity="0.12"
      />
      <path
        d="M19 18H15V46H19M45 18H49V46H45"
        stroke="var(--background)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27 42L39 22"
        stroke="var(--background)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M22 42L34 22"
        stroke="var(--background)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeOpacity="0.55"
      />
      <circle cx="45.5" cy="21.5" r="2.5" fill="var(--background)" />
    </svg>
  )
}

function LogoLockup({
  className,
  size,
}: {
  className?: string
  size: "sm" | "md" | "lg"
}): React.ReactNode {
  const sizeClasses = {
    sm: "h-5",
    md: "h-6",
    lg: "h-7",
  } satisfies Record<string, string>

  return (
    <svg
      viewBox="0 0 320 64"
      className={cn(
        "w-auto shrink-0 text-foreground",
        sizeClasses[size],
        className
      )}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="40"
        fill="currentColor"
        fontFamily="Geist, Inter, ui-sans-serif, system-ui, sans-serif"
        fontSize="32"
        fontWeight="700"
        letterSpacing="-0.04em"
      >
        [ dev ]
      </text>
      <text
        x="96"
        y="40"
        fill="currentColor"
        fontFamily="Geist Mono, IBM Plex Mono, ui-monospace, monospace"
        fontSize="29"
        fontWeight="700"
        letterSpacing="-0.08em"
      >
        /
      </text>
      <text
        x="142"
        y="43"
        className="fill-[#22D3EE] opacity-25 dark:fill-[#7DD3FC] dark:opacity-35"
        fontFamily="Geist Mono, IBM Plex Mono, ui-monospace, monospace"
        fontSize="36"
        fontWeight="700"
        letterSpacing="-0.16em"
      >
        {"//"}
      </text>
      <text
        x="118"
        y="40"
        fill="currentColor"
        fontFamily="Geist, Inter, ui-sans-serif, system-ui, sans-serif"
        fontSize="32"
        fontWeight="700"
        letterSpacing="-0.04em"
      >
        start
      </text>
      <path
        d="M0 50H242"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />
    </svg>
  )
}
