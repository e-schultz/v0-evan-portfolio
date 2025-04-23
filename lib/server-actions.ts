"use server"

import { revalidatePath } from "next/cache"
import { getAllBlogPosts } from "./content-api"

export async function submitContactForm(formData: FormData) {
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

export async function submitContactFormAction(formData: FormData) {
  return await submitContactForm(formData)
}

export async function searchPosts(query: string): Promise<any[]> {
  const allPosts = await getAllBlogPosts()
  const lowercaseQuery = query.toLowerCase()

  return allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      post.category.toLowerCase().includes(lowercaseQuery),
  )
}
