"use server"

import { revalidatePath } from "next/cache"
import { searchPosts as searchPostsContent } from "./content-api"

export async function submitContactFormAction(formData: FormData) {
  try {
    // Simulate an API call or database operation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    if (!name || !email || !subject || !message) {
      return { success: false, message: "All fields are required." }
    }

    // In a real application, you would send this data to an email service or store it in a database
    console.log("Form Data:", { name, email, subject, message })

    // Revalidate the homepage to clear the cache
    revalidatePath("/")

    return { success: true, message: "Message sent successfully!" }
  } catch (error: any) {
    console.error("Error submitting contact form:", error)
    return { success: false, message: error.message || "Failed to send message. Please try again." }
  }
}

export async function searchPosts(query: string) {
  if (!query.trim()) {
    return []
  }

  try {
    return await searchPostsContent(query)
  } catch (error) {
    console.error("Error searching posts:", error)
    return []
  }
}
