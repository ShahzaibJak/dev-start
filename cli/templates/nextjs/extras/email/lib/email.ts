import type { JSX } from "react"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailOptions<TProps extends Record<string, unknown>> {
  to: string
  subject: string
  template: (props: TProps) => JSX.Element
  props: TProps
}

interface SendEmailResult {
  id: string
}

export async function sendEmail<TProps extends Record<string, unknown>>(
  options: SendEmailOptions<TProps>,
): Promise<SendEmailResult> {
  const { to, subject, template, props } = options
  const emailComponent = template(props)

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "onboarding@resend.dev",
    to,
    subject,
    react: emailComponent,
  })

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`)
  }

  return { id: data?.id ?? "" }
}
