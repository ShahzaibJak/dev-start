"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"

export function ResetPasswordForm(): React.JSX.Element {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(formData: FormData): void {
    const password = formData.get("password")?.toString() ?? ""
    const confirmPassword = formData.get("confirm-password")?.toString() ?? ""

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.")
      return
    }

    if (!token) {
      setErrorMessage("Missing reset token. Please request a new password reset link.")
      return
    }

    startTransition(async () => {
      setErrorMessage(null)

      const result = await authClient.resetPassword({
        newPassword: password,
        token,
      })

      if (result.error) {
        setErrorMessage(result.error.message ?? "Failed to reset password.")
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/sign-in")
      }, 2000)
    })
  }

  if (!token) {
    return (
      <div className="mx-auto flex min-h-svh w-full max-w-md flex-col justify-center gap-8 px-6 py-12">
        <Card className="rounded-3xl">
          <CardContent className="flex flex-col gap-3 py-2">
            <p className="text-sm">
              Invalid or missing reset token. Please request a new password reset link.
            </p>
          </CardContent>
          <CardFooter className="justify-center text-sm text-muted-foreground">
            <Link
              className="underline underline-offset-4 hover:text-foreground"
              href="/forgot-password"
            >
              Request new reset link
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-md flex-col justify-center gap-8 px-6 py-12">
      <div className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Better Auth starter
        </p>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Set a new password</h1>
          <p className="text-sm leading-6 text-muted-foreground">
            Enter your new password below.
          </p>
        </div>
      </div>

      <Card className="rounded-3xl">
        <CardContent className="flex flex-col gap-4">
          {success ? (
            <div className="flex flex-col gap-3 py-2">
              <p className="text-sm leading-6">
                Your password has been reset. Redirecting to sign in&hellip;
              </p>
            </div>
          ) : (
            <form className="flex flex-col gap-4" action={handleSubmit}>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">New password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                    autoComplete="new-password"
                    minLength={8}
                    className="pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">Minimum 8 characters.</p>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    required
                    type={showConfirm ? "text" : "password"}
                    name="confirm-password"
                    placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                    autoComplete="new-password"
                    minLength={8}
                    className="pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-muted-foreground hover:text-foreground"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {errorMessage ? (
                <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {errorMessage}
                </p>
              ) : null}

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Resetting\u2026" : "Reset password"}
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
