"use client"

import Link from "next/link"
import { useState, useTransition } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"

export function ForgotPasswordForm(): React.JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(formData: FormData): void {
    const email = formData.get("email")?.toString().trim() ?? ""

    startTransition(async () => {
      setErrorMessage(null)

      const result = await authClient.requestPasswordReset({
        email,
        redirectTo: "/reset-password",
      })

      if (result.error) {
        setErrorMessage(result.error.message ?? "Something went wrong.")
        return
      }

      setSubmitted(true)
    })
  }

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-md flex-col justify-center gap-8 px-6 py-12">
      <div className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Better Auth starter
        </p>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Reset your password</h1>
          <p className="text-sm leading-6 text-muted-foreground">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>
        </div>
      </div>

      <Card className="rounded-3xl">
        <CardContent className="flex flex-col gap-4">
          {submitted ? (
            <div className="flex flex-col gap-3 py-2">
              <p className="text-sm leading-6">
                If an account with that email exists, we sent a password reset link. Check your inbox
                and follow the instructions.
              </p>
              <p className="text-xs text-muted-foreground">
                Didn&apos;t receive the email? Check your spam folder or try again.
              </p>
            </div>
          ) : (
            <form className="flex flex-col gap-4" action={handleSubmit}>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  required
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              {errorMessage ? (
                <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {errorMessage}
                </p>
              ) : null}

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Sending\u2026" : "Send reset link"}
              </Button>
            </form>
          )}
        </CardContent>

        <CardFooter className="justify-center text-sm text-muted-foreground">
          <Link className="underline underline-offset-4 hover:text-foreground" href="/sign-in">
            Back to sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
