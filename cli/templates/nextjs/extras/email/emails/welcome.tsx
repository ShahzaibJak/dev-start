import { Heading, Text } from "@react-email/components"

import { EmailLayout } from "./layout"

interface WelcomeEmailProps {
  userName: string
}

export function WelcomeEmail({ userName }: WelcomeEmailProps) {
  return (
    <EmailLayout preview={`Welcome to Dev-Start, ${userName}!`}>
      <Heading style={heading}>Welcome, {userName}!</Heading>
      <Text style={paragraph}>
        Thanks for signing up. You&apos;re all set to start building.
      </Text>
      <Text style={paragraph}>
        If you have any questions, just reply to this email.
      </Text>
    </EmailLayout>
  )
}

const heading = {
  fontSize: "24px",
  fontWeight: "bold" as const,
  color: "#1a1a1a",
  marginBottom: "16px",
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#484848",
}

export default WelcomeEmail
