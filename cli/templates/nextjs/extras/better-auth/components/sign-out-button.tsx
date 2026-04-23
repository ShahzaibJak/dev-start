"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

export function SignOutButton(): React.JSX.Element {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSignOut() {
    startTransition(async () => {
      setErrorMessage(null)

      const result = await authClient.signOut()
      if (result.error) {
        setErrorMessage(result.error.message ?? "Unable to sign out.")
        return
      }

      router.push("/sign-in")
      router.refresh()
    })
  }

  return (
    <div className="flex flex-col items-start gap-3">
      <Button type="button" variant="outline" onClick={handleSignOut} disabled={isPending}>
        {isPending ? "Signing out..." : "Sign out"}
      </Button>
      {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
    </div>
  )
}
