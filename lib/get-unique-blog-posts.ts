import type { BlogPost } from "@/types"

/**
 * Filters an array of blog posts to ensure there are no duplicates by slug
 */
export function getUniqueBlogPosts(posts: BlogPost[]): BlogPost[] {
  // Use Map to keep only one post per slug
  return Array.from(new Map(posts.map((post) => [post.slug, post])).values())
}
