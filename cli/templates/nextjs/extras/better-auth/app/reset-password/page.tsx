import { Suspense } from "react"

import { ResetPasswordForm } from "@/components/reset-password-form"

export default function ResetPasswordPage(): React.JSX.Element {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  )
}
