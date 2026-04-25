"use client";

import { useState } from "react";
import { FormRenderer } from "@/components/forms/form-renderer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FormSchema } from "@/lib/forms/types";

const contactFormSchema: FormSchema = {
  fields: [
    {
      id: "name",
      type: "text",
      label: "Name",
      required: true,
      config: { placeholder: "Your full name" },
    },
    {
      id: "email",
      type: "email",
      label: "Email",
      required: true,
      config: { placeholder: "you@example.com" },
    },
    {
      id: "message",
      type: "textarea",
      label: "Message",
      required: true,
      config: { placeholder: "How can we help?", rows: 4 },
    },
    {
      id: "contactMethod",
      type: "radio",
      label: "Preferred contact method",
      config: {
        options: [
          { label: "Email", value: "email" },
          { label: "Phone", value: "phone" },
        ],
      },
    },
    {
      id: "subscribe",
      type: "checkbox",
      label: "Newsletter",
      helperText: "We'll only send you relevant updates.",
      config: { checkboxLabel: "Subscribe to our newsletter" },
    },
  ],
};

export default function FormsExamplePage(): React.ReactElement {
  const [submittedValues, setSubmittedValues] = useState<Record<
    string,
    unknown
  > | null>(null);

  return (
    <div className="mx-auto max-w-lg py-10">
      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <FormRenderer
            schema={contactFormSchema}
            onSubmit={(values) => setSubmittedValues(values)}
          />
        </CardContent>
      </Card>

      {submittedValues ? (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Submitted Values</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="overflow-auto rounded-lg bg-muted p-4 text-sm">
              {JSON.stringify(submittedValues, null, 2)}
            </pre>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
