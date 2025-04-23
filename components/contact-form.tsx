"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Loader2 } from "lucide-react"
import { EnhancedErrorBoundary } from "@/components/enhanced-error-boundary"
import { Button } from "@/components/ui/button"

interface ContactFormProps {
  formContent?: any
}

export function ContactForm({ formContent }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  // Default content if none is provided
  const content = formContent || {
    title: "Send Me a Message",
    description: "Fill out the form below and I'll get back to you as soon as possible.",
    fields: [
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
    ],
    submitButton: {
      text: "Send Message",
      icon: "send",
    },
  }

  return (
    <Card className="border-primary/10 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl md:text-2xl">{content.title}</CardTitle>
        <CardDescription>{content.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {submitSuccess ? (
          <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-4 rounded-lg mb-6">
            Thank you for your message! I'll get back to you as soon as possible.
          </div>
        ) : null}

        {submitError ? (
          <div className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-4 rounded-lg mb-6">
            {submitError}
          </div>
        ) : null}

        <EnhancedErrorBoundary
          fallback={
            <div className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-4 rounded-lg mb-6">
              We encountered an error with the contact form. Please try again later or contact me directly via email.
            </div>
          }
          resetKeys={[submitSuccess, submitError]}
        >
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="space-y-4 md:space-y-6"
            onSubmit={() => setIsSubmitting(true)}
          >
            {/* Web3Forms required fields */}
            <input type="hidden" name="access_key" value="6f45f241-8399-4323-a018-25938f3427f3" />
            <input type="hidden" name="_subject" value="New Contact Form Submission" />
            <input type="hidden" name="_next" value="https://evanschultz.dev/thank-you" />
            <input type="hidden" name="_captcha" value="false" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.fields.slice(0, 2).map((field: any) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              ))}
            </div>

            {content.fields.slice(2).map((field: any) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea
                    id={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    rows={field.rows || 5}
                    required={field.required}
                    className="resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/50"
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

            <Button
              type="submit"
              disabled={isSubmitting}
              className="hero-button inline-flex items-center justify-center px-8 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> {content.submitButton.text || "Send Message"}
                </>
              )}
            </Button>
          </form>
        </EnhancedErrorBoundary>
      </CardContent>
    </Card>
  )
}
