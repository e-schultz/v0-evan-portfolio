"use server"

/**
 * Server Actions
 *
 * These functions are server actions that can be called from client components.
 * They handle mutations and client-triggered operations.
 */

// Contact form submission action
export async function submitContactFormAction(formData: FormData) {
  // Extract form data
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  // Validate form data
  if (!name || !email || !subject || !message) {
    return {
      success: false,
      message: "All fields are required",
    }
  }

  // Simulate form submission with a delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In a real application, you would send the data to your backend or email service
  console.log("Form submission:", { name, email, subject, message })

  return {
    success: true,
    message: "Thank you for your message! I'll get back to you as soon as possible.",
  }
}

// Search posts action for client-side search
export async function searchPostsAction(query: string) {
  "use server"

  if (!query.trim()) {
    return []
  }

  try {
    // Import directly from content-api to avoid circular dependencies
    const { searchPosts } = await import("./content-api")
    return await searchPosts(query)
  } catch (error) {
    console.error("Error searching posts:", error)
    return []
  }
}
