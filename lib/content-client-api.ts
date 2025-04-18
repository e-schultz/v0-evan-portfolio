"use client"

import { searchPostsAction } from "./server-actions"
import type { BlogPost } from "./content-types"

/**
 * Client-side content API
 *
 * Simplified to only handle client-triggered operations
 */

// Client-side search function
export async function searchClientPosts(query: string): Promise<BlogPost[]> {
  if (!query.trim()) {
    return []
  }

  try {
    return await searchPostsAction(query)
  } catch (error) {
    console.error("Error searching posts:", error)
    return []
  }
}
