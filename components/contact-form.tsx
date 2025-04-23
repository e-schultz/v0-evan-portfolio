'use client'

import type React from 'react'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { submitContactFormAction } from '@/lib/server-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Send } from 'lucide-react'
import type { ContactFormContent } from '@/lib/content-types'
import { EnhancedErrorBoundary } from '@/components/enhanced-error-boundary'
import { FormErrorFallback } from '@/components/error-fallbacks/form-error-fallback'

// Submit button with loading state
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>Sending...</>
      ) : (
        <>
          Send Message <Send className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  )
}

interface ContactFormProps {
  formContent?: ContactFormContent
}

export function ContactForm({ formContent }: ContactFormProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  // Default content if none is provided
  const content = formContent || {
    title: 'Send Me a Message',
    description: "Fill out the form below and I'll get back to you as soon as possible.",
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Your name',
        required: true,
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Your email address',
        required: true,
      },
      {
        name: 'subject',
        label: 'Subject',
        type: 'text',
        placeholder: 'What is this regarding?',
        required: true,
      },
      {
        name: 'message',
        label: 'Message',
        type: 'textarea',
        placeholder: 'Your message',
        required: true,
        rows: 5,
      },
    ],
    submitButton: {
      text: 'Send Message',
      icon: 'send',
    },
  }

  return (
    <Card className="border-primary/10">
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
            <FormErrorFallback
              title="Form Error"
              message="We encountered an error with the contact form. Please try again later or contact me directly via email."
            />
          }
          resetKeys={[submitSuccess, submitError]}
        >
          <form
            action={async (formData) => {
              try {
                const result = await submitContactFormAction(formData)
                if (result.success) {
                  setSubmitSuccess(true)
                  setSubmitError('')
                  setFormState({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                  })
                } else {
                  setSubmitSuccess(false)
                  setSubmitError(
                    result.message ||
                      'There was an error submitting your message. Please try again.',
                  )
                }
              } catch (error) {
                setSubmitSuccess(false)
                setSubmitError('There was an error submitting your message. Please try again.')
              }
            }}
            className="space-y-4 md:space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.fields.slice(0, 2).map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formState[field.name as keyof typeof formState] || ''}
                    onChange={handleChange}
                    required={field.required}
                  />
                </div>
              ))}
            </div>

            {content.fields.slice(2).map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>{field.label}</Label>
                {field.type === 'textarea' ? (
                  <Textarea
                    id={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    rows={field.rows || 5}
                    value={formState[field.name as keyof typeof formState] || ''}
                    onChange={handleChange}
                    required={field.required}
                    className="resize-none"
                  />
                ) : (
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formState[field.name as keyof typeof formState] || ''}
                    onChange={handleChange}
                    required={field.required}
                  />
                )}
              </div>
            ))}

            <SubmitButton />
          </form>
        </EnhancedErrorBoundary>
      </CardContent>
    </Card>
  )
}
