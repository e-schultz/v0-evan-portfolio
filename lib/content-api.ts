"use server"

import { cache } from "react"
import fs from "fs/promises"
import path from "path"
import { validateContent, validateBlogPost, validateProject } from "./content-validation"
import type { BlogPost, Project } from "./content-types"

// Base directory for content
const contentDirectory = path.join(process.cwd(), "content")

// Content types
export type ContentType = "blog" | "project" | "home" | "page"

// Get content file path
function getContentFilePath(contentType: ContentType, slug: string): string {
  const directory =
    contentType === "blog" ? "blog" : contentType === "project" ? "projects" : contentType === "home" ? "home" : "pages"

  return path.join(contentDirectory, directory, `${slug}.json`)
}

// Read JSON content with validation - wrapped with cache
export const getContent = cache(async function getContent<T>(
  contentType: ContentType,
  slug: string,
  validator?: (data: T) => any[],
): Promise<T | null> {
  const filePath = getContentFilePath(contentType, slug)

  try {
    const fileContents = await fs.readFile(filePath, "utf8")
    const data = JSON.parse(fileContents) as T

    // Validate content if validator is provided
    if (validator && !validateContent(data, validator, `${contentType}:${slug}`)) {
      console.warn(`Content validation failed for ${contentType}:${slug}`)
    }

    return data
  } catch (error) {
    console.error(`Error reading content file: ${filePath}`, error)
    return null
  }
})

// Generic content function with caching
export const getGenericContent = cache(async (contentPath: string): Promise<any | null> => {
  try {
    const [directory, ...slugParts] = contentPath.split("/")
    const slug = slugParts.join("/")

    let contentType: ContentType

    if (directory === "blog") {
      contentType = "blog"
    } else if (directory === "projects") {
      contentType = "project"
    } else if (directory === "home") {
      contentType = "home"
    } else {
      contentType = "page"
    }

    return await getContent(contentType, slug)
  } catch (error) {
    console.error(`Error in getGenericContent for path ${contentPath}:`, error)
    return null
  }
})

// Get all content slugs of a specific type - wrapped with cache
export const getAllContentSlugs = cache(async function getAllContentSlugs(contentType: ContentType): Promise<string[]> {
  const directory =
    contentType === "blog" ? "blog" : contentType === "project" ? "projects" : contentType === "home" ? "home" : "pages"

  const dirPath = path.join(contentDirectory, directory)

  try {
    const files = await fs.readdir(dirPath)
    return files.filter((file) => file.endsWith(".json")).map((file) => file.replace(/\.json$/, ""))
  } catch (error) {
    console.error(`Error reading directory: ${dirPath}`, error)
    return []
  }
})

// Get all content items of a specific type - wrapped with cache
export const getAllContent = cache(async function getAllContent<T>(
  contentType: ContentType,
  validator?: (data: T) => any[],
): Promise<T[]> {
  const slugs = await getAllContentSlugs(contentType)

  const contentItems = await Promise.all(
    slugs.map(async (slug) => {
      return await getContent<T>(contentType, slug, validator)
    }),
  )

  return contentItems.filter(Boolean) as T[]
})

// Get hero content
export const getHeroContent = cache(async () => {
  return await getContent("home", "hero")
})

// Get about content
export const getAboutContent = cache(async () => {
  return await getContent("home", "about")
})

// Get blog post by slug with better caching
export const getBlogPost = cache(async (slug: string): Promise<BlogPost | null> => {
  try {
    const post = await getContent<BlogPost>("blog", slug)

    if (post) {
      // Validate the post and log any errors
      const errors = validateBlogPost(post)
      if (errors.length > 0) {
        console.warn(`Validation issues in blog post ${slug}:`, errors)
      }
    }

    return post
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error)
    return null
  }
})

// Get all blog slugs with better caching
export const getAllBlogSlugs = cache(async (): Promise<string[]> => {
  try {
    return await getAllContentSlugs("blog")
  } catch (error) {
    console.error("Error fetching blog slugs:", error)
    return []
  }
})

// Get all blog posts with better caching
export const getAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
  try {
    const posts = await getAllContent<BlogPost>("blog", validateBlogPost)

    // Sort by date, newest first
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("Error fetching all blog posts:", error)
    return []
  }
})

// Get latest blog posts
export const getLatestBlogPosts = cache(async (count: number): Promise<BlogPost[]> => {
  try {
    const allPosts = await getAllBlogPosts()
    return allPosts.slice(0, count)
  } catch (error) {
    console.error(`Error fetching latest ${count} blog posts:`, error)
    return []
  }
})

// Get posts by category
export const getPostsByCategory = cache(async (category: string): Promise<BlogPost[]> => {
  try {
    const allPosts = await getAllBlogPosts()
    return allPosts.filter((post) => post.category.toLowerCase() === category.toLowerCase())
  } catch (error) {
    console.error(`Error fetching posts by category ${category}:`, error)
    return []
  }
})

// Get posts by tag
export const getPostsByTag = cache(async (tag: string): Promise<BlogPost[]> => {
  try {
    const allPosts = await getAllBlogPosts()
    return allPosts.filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
  } catch (error) {
    console.error(`Error fetching posts by tag ${tag}:`, error)
    return []
  }
})

// Get all categories
export const getAllCategories = cache(async (): Promise<string[]> => {
  try {
    const allPosts = await getAllBlogPosts()
    const categoriesSet = new Set(allPosts.map((post) => post.category))
    return Array.from(categoriesSet)
  } catch (error) {
    console.error("Error fetching all categories:", error)
    return []
  }
})

// Get all tags
export const getAllTags = cache(async (): Promise<string[]> => {
  try {
    const allPosts = await getAllBlogPosts()
    const tagsSet = new Set(allPosts.flatMap((post) => post.tags))
    return Array.from(tagsSet)
  } catch (error) {
    console.error("Error fetching all tags:", error)
    return []
  }
})

// Search posts
export const searchPosts = cache(async (query: string): Promise<BlogPost[]> => {
  try {
    const allPosts = await getAllBlogPosts()
    const lowercaseQuery = query.toLowerCase()

    return allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.excerpt.toLowerCase().includes(lowercaseQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
        post.category.toLowerCase().includes(lowercaseQuery),
    )
  } catch (error) {
    console.error(`Error searching posts for query "${query}":`, error)
    return []
  }
})

// Get project by slug with better caching
export const getProject = cache(async (slug: string): Promise<Project | null> => {
  try {
    const project = await getContent<Project>("project", slug)

    if (project) {
      // Validate the project and log any errors
      const errors = validateProject(project)
      if (errors.length > 0) {
        console.warn(`Validation issues in project ${slug}:`, errors)
      }
    }

    return project
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error)
    return null
  }
})

// Get all projects with better caching
export const getAllProjects = cache(async (): Promise<Project[]> => {
  try {
    return await getAllContent<Project>("project", validateProject)
  } catch (error) {
    console.error("Error fetching all projects:", error)
    return []
  }
})

// Get featured projects
export const getFeaturedProjects = cache(async (): Promise<Project[]> => {
  try {
    const allProjects = await getAllProjects()
    return allProjects.filter((project) => project.featured)
  } catch (error) {
    console.error("Error fetching featured projects:", error)
    return []
  }
})

// Get contact content
export const getContactContent = cache(async () => {
  return await getContent("page", "contact")
})

// Get about page content
export const getAboutPageContent = cache(async () => {
  return await getContent("page", "about")
})
