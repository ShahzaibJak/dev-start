"use client"

import { useRouter } from "next/navigation"
import { SignOutButton as ClerkSignOutButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"

export function SignOutButton(): React.ReactNode {
  const router = useRouter()

  return (
    <ClerkSignOutButton signOutOptions={{ redirectUrl: "/sign-in" }}>
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          router.refresh()
        }}
      >
        Sign out
      </Button>
    </ClerkSignOutButton>
  )
}
