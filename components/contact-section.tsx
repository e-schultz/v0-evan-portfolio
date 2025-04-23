"use client"

import type React from "react"
import { useState } from "react"
import { useFormStatus } from "react-dom"
import { submitContactFormAction } from "@/lib/server-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MessageSquare, Send } from "lucide-react"
import { EnhancedErrorBoundary } from "@/components/enhanced-error-boundary"

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

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section className="py-16 md:py-24 bg-muted/50" id="contact">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mb-8"></div>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-muted-foreground">
                  <a href="mailto:evan@schultz.codes" className="hover:text-primary">
                    evan@schultz.codes
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Social Media</h3>
                <p className="text-muted-foreground">
                  Connect with me on{" "}
                  <a
                    href="https://www.linkedin.com/in/evanschultz1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    LinkedIn
                  </a>{" "}
                  or{" "}
                  <a
                    href="http://twitter.com/e_p82"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Twitter
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-bold mb-4">Let's Work Together</h3>
              <p className="text-muted-foreground mb-4">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Technical consulting</li>
                <li>• Team leadership and mentoring</li>
                <li>• Workshop facilitation</li>
                <li>• Speaking engagements</li>
                <li>• Open source collaboration</li>
              </ul>
            </div>
          </div>

          <div className="bg-card p-6 md:p-8 rounded-lg border">
            <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>

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

            <EnhancedErrorBoundary>
              <form
                action={async (formData) => {
                  try {
                    const result = await submitContactFormAction(formData)
                    if (result.success) {
                      setSubmitSuccess(true)
                      setSubmitError("")
                      setFormState({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                      })
                    } else {
                      setSubmitSuccess(false)
                      setSubmitError(result.message || "There was an error submitting your message. Please try again.")
                    }
                  } catch (error) {
                    setSubmitSuccess(false)
                    setSubmitError("There was an error submitting your message. Please try again.")
                  }
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email address"
                      value={formState.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What is this regarding?"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <SubmitButton />
              </form>
            </EnhancedErrorBoundary>
          </div>
        </div>
      </div>
    </section>
  )
}
