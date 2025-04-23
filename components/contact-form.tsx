"use client"

import { Button } from "@/components/ui/button"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

export function ContactForm({ formContent }: { formContent: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <form
      action="https://api.web3forms.com/submit"
      method="POST"
      onSubmit={() => setIsSubmitting(true)}
      className="space-y-6"
    >
      <input type="hidden" name="access_key" value="6f45f241-8399-4323-a018-25938f3427f3" />
      <input type="hidden" name="_next" value={`${BASE_URL}/thank-you`} />
      <input type="hidden" name="_subject" value="New Contact Form Submission" />
      <input type="hidden" name="_captcha" value="false" />

      {formContent?.fields?.map((field: any, index: number) => (
        <div key={index}>
          <label htmlFor={field.name} className="block text-sm font-medium text-white">
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <Textarea
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              rows={field.rows || 4}
              className="mt-1 bg-gray-800 text-white border-gray-700 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              className="mt-1 bg-gray-800 text-white border-gray-700 focus:ring-blue-500 focus:border-blue-500"
            />
          )}
        </div>
      ))}
      <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white hover:bg-blue-700">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            {formContent?.submitButton?.text || "Send Message"}
            {formContent?.submitButton?.icon && <span className="ml-2">{formContent.submitButton.icon}</span>}
          </>
        )}
      </Button>
    </form>
  )
}
