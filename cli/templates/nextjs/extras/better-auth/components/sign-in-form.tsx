"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { authClient } from "@/lib/auth-client"

export function SignInForm(): React.JSX.Element {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(formData: FormData): void {
    const email = formData.get("email")?.toString().trim() ?? ""
    const password = formData.get("password")?.toString() ?? ""

    startTransition(async () => {
      setErrorMessage(null)

      const result = await authClient.signIn.email({ email, password })

      if (result.error) {
        setErrorMessage(result.error.message ?? "Authentication failed.")
        return
      }

      router.push("/dashboard")
      router.refresh()
    })
  }

  function handleGoogleSignIn(): void {
    startTransition(async () => {
      setErrorMessage(null)

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      })
    })
  }

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-md flex-col justify-center gap-8 px-6 py-12">
      <div className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Better Auth starter
        </p>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm leading-6 text-muted-foreground">
            Sign in with your credentials or Google account.
          </p>
        </div>
      </div>

      <Card className="rounded-3xl">
        <CardContent className="flex flex-col gap-4">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={isPending}
            onClick={handleGoogleSignIn}
          >
            <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </Button>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

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

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                  autoComplete="current-password"
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
            </div>

            {errorMessage ? (
              <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {errorMessage}
              </p>
            ) : null}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing in\u2026" : "Sign in"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-between gap-4 text-sm text-muted-foreground">
          <Link className="underline underline-offset-4 hover:text-foreground" href="/">
            Back to overview
          </Link>
          <Link className="underline underline-offset-4 hover:text-foreground" href="/sign-up">
            Need an account? Sign up.
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
