"use server"

import { getPostsByTag, getPostsByCategory, searchPosts as contentSearchPosts } from "./content-api"

// Re-export searchPosts from content-api
export const searchPosts = contentSearchPosts

// Server action for getting posts by tag
export async function getPostsByTagAction(tag: string) {
  try {
    return await getPostsByTag(tag)
  } catch (error) {
    console.error(`Error in getPostsByTagAction for tag ${tag}:`, error)
    return []
  }
}

// Server action for getting posts by category
export async function getPostsByCategoryAction(category: string) {
  try {
    return await getPostsByCategory(category)
  } catch (error) {
    console.error(`Error in getPostsByCategoryAction for category ${category}:`, error)
    return []
  }
}

// Server action for searching posts
export async function searchPostsAction(query: string) {
  try {
    return await searchPosts(query)
  } catch (error) {
    console.error(`Error in searchPostsAction for query ${query}:`, error)
    return []
  }
}

// Contact form submission handler
export async function submitContactForm(formData: FormData) {
  try {
    // Simulate a delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Extract form data
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Validate form data
    if (!name || !email || !subject || !message) {
      return {
        success: false,
        message: "All fields are required.",
      }
    }

    // In a real application, you would send this data to an email service
    // or store it in a database
    console.log("Contact form submission:", { name, email, subject, message })

    // Return success response
    return {
      success: true,
      message: "Your message has been sent successfully! I'll get back to you soon.",
    }
  } catch (error: any) {
    console.error("Error submitting contact form:", error)
    return {
      success: false,
      message: error.message || "There was an error sending your message. Please try again.",
    }
  }
}
