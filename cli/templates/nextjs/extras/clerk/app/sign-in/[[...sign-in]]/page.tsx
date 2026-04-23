import { SignIn } from "@clerk/nextjs"

export default function SignInPage(): React.ReactNode {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background">
      <SignIn />
    </main>
  )
}
