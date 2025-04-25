"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, Send } from "lucide-react"
import { submitContactForm } from "@/lib/server-actions"

interface ContactFormProps {
  formContent: {
    title?: string
    description?: string
    fields?: {
      name: string
      label: string
      type: string
      placeholder: string
      required: boolean
      rows?: number
    }[]
    submitButton?: {
      text: string
      icon: string
    }
  }
}

export function ContactForm({ formContent }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null)

  // Default form fields if none are provided
  const defaultFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Your name",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Your email address",
      required: true,
    },
    {
      name: "subject",
      label: "Subject",
      type: "text",
      placeholder: "What is this regarding?",
      required: true,
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      placeholder: "Your message",
      required: true,
      rows: 5,
    },
  ]

  const fields = formContent?.fields || defaultFields
  const title = formContent?.title || "Send Me a Message"
  const submitButtonText = formContent?.submitButton?.text || "Send Message"

  async function handleSubmit(formData: FormData) {
    try {
      setIsSubmitting(true)
      const result = await submitContactForm(formData)
      setSubmitStatus(result)
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "There was an error submitting your message. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-card p-6 md:p-8 rounded-lg border transition-all duration-300 hover:shadow-lg">
      <h3 className="text-xl font-bold mb-6">{title}</h3>

      {submitStatus && (
        <div
          className={`${
            submitStatus.success
              ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
              : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300"
          } p-4 rounded-lg mb-6`}
        >
          {submitStatus.message}
        </div>
      )}

      <form action={handleSubmit} className="space-y-6">
        {fields.map((field, index) => (
          <div key={index} className="space-y-2">
            <Label htmlFor={field.name}>{field.label}</Label>
            {field.type === "textarea" ? (
              <Textarea
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                rows={field.rows || 5}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
              />
            ) : (
              <Input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
              />
            )}
          </div>
        ))}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              {submitButtonText}
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
