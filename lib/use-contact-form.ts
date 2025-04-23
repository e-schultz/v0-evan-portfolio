"use client"

import type React from "react"
import { useState } from "react"

export function useContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // This is a placeholder for the actual form submission
      // In a real app, you would send the form data to your server or a form service
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubmitStatus({
        success: true,
        message: "Thank you for your message! I'll get back to you soon.",
      })

      // Reset the form
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "There was an error submitting your message. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formState,
    handleChange,
    handleSubmit,
    submitStatus,
    isSubmitting,
  }
}
