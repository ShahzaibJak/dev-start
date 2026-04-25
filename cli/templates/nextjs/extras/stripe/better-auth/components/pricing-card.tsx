"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PricingCardProps {
  name: string
  description: string
  features: string[]
  isCurrent: boolean
  onSelect: () => void
}

export function PricingCard({
  name,
  description,
  features,
  isCurrent,
  onSelect,
}: PricingCardProps): React.ReactNode {
  return (
    <Card className={isCurrent ? "ring-2 ring-primary" : ""}>
      <CardHeader>
        <CardTitle className="capitalize">{name}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <span className="text-primary">&#10003;</span>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant={isCurrent ? "outline" : "default"}
          disabled={isCurrent}
          onClick={onSelect}
        >
          {isCurrent ? "Current plan" : `Upgrade to ${name}`}
        </Button>
      </CardFooter>
    </Card>
  )
}
