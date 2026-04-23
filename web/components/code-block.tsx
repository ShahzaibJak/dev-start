"use client"

import { CheckIcon, CopyIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function CodeBlock({
  children,
  copyable = true,
}: {
  children: string
  copyable?: boolean
}): React.ReactNode {
  const [copied, setCopied] = useState(false)

  function handleCopy(): void {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="group relative rounded-lg border bg-muted/50">
      <pre className="overflow-x-auto p-3 font-mono text-xs leading-relaxed sm:p-4 sm:text-sm">
        <code>{children}</code>
      </pre>
      {copyable && (
        <Button
          variant="ghost"
          size="icon-xs"
          className="absolute top-2 right-2 opacity-100 sm:opacity-0 transition-opacity sm:group-hover:opacity-100"
          onClick={handleCopy}
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <CheckIcon className="size-3" />
          ) : (
            <CopyIcon className="size-3" />
          )}
        </Button>
      )}
    </div>
  )
}
