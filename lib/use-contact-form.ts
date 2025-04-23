"use client"

import type React from "react"

import { useState } from "react"
import { submitContactForm } from "@/lib/server-actions"

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

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      const result = await submitContactForm(formData)
      setSubmitStatus(result)
      if (result.success) {
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      }
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
