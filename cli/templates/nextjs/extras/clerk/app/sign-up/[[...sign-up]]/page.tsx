import { SignUp } from "@clerk/nextjs"

export default function SignUpPage(): React.ReactNode {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background">
      <SignUp />
    </main>
  )
}
