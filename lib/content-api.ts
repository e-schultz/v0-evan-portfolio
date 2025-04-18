"use server"

import { cache } from "react"
import fs from "fs"
import path from "path"
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

// Read JSON content
export async function getContent<T>(contentType: ContentType, slug: string): Promise<T | null> {
  const filePath = getContentFilePath(contentType, slug)

  try {
    const fileContents = await fs.promises.readFile(filePath, "utf8")
    return JSON.parse(fileContents) as T
  } catch (error) {
    console.error(`Error reading content file: ${filePath}`, error)
    return null
  }
}

// Get all content slugs of a specific type
export async function getAllContentSlugs(contentType: ContentType): Promise<string[]> {
  const directory =
    contentType === "blog" ? "blog" : contentType === "project" ? "projects" : contentType === "home" ? "home" : "pages"

  const dirPath = path.join(contentDirectory, directory)

  try {
    const files = await fs.promises.readdir(dirPath)
    return files.filter((file) => file.endsWith(".json")).map((file) => file.replace(/\.json$/, ""))
  } catch (error) {
    console.error(`Error reading directory: ${dirPath}`, error)
    return []
  }
}

// Get all content items of a specific type
export async function getAllContent<T>(contentType: ContentType): Promise<T[]> {
  const slugs = await getAllContentSlugs(contentType)

  const contentItems = await Promise.all(
    slugs.map(async (slug) => {
      return await getContent<T>(contentType, slug)
    }),
  )

  return contentItems.filter(Boolean) as T[]
}

// Get blog post
export const getBlogPost = cache(async (slug: string): Promise<BlogPost | null> => {
  return await getContent<BlogPost>("blog", slug)
})

// Get all blog slugs
export const getAllBlogSlugs = cache(async (): Promise<string[]> => {
  return await getAllContentSlugs("blog")
})

// Get all blog posts
export const getAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const posts = await getAllContent<BlogPost>("blog")
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

// Get latest blog posts
export const getLatestBlogPosts = cache(async (count: number): Promise<BlogPost[]> => {
  const allPosts = await getAllBlogPosts()
  return allPosts.slice(0, count)
})

// Get posts by category
export const getPostsByCategory = cache(async (category: string): Promise<BlogPost[]> => {
  const allPosts = await getAllBlogPosts()
  return allPosts.filter((post) => post.category.toLowerCase() === category.toLowerCase())
})

// Get posts by tag
export const getPostsByTag = cache(async (tag: string): Promise<BlogPost[]> => {
  const allPosts = await getAllBlogPosts()
  return allPosts.filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
})

// Get all categories
export const getAllCategories = cache(async (): Promise<string[]> => {
  const allPosts = await getAllBlogPosts()
  const categoriesSet = new Set(allPosts.map((post) => post.category))
  return Array.from(categoriesSet)
})

// Get all tags
export const getAllTags = cache(async (): Promise<string[]> => {
  const allPosts = await getAllBlogPosts()
  const tagsSet = new Set(allPosts.flatMap((post) => post.tags))
  return Array.from(tagsSet)
})

// Search posts
export const searchPosts = cache(async (query: string): Promise<BlogPost[]> => {
  const allPosts = await getAllBlogPosts()
  const lowercaseQuery = query.toLowerCase()

  return allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      post.category.toLowerCase().includes(lowercaseQuery),
  )
})

// Get project
export const getProject = cache(async (slug: string): Promise<Project | null> => {
  return await getContent<Project>("project", slug)
})

// Get all projects
export const getAllProjects = cache(async (): Promise<Project[]> => {
  return await getAllContent<Project>("project")
})

// Get featured projects
export const getFeaturedProjects = cache(async (): Promise<Project[]> => {
  const allProjects = await getAllProjects()
  return allProjects.filter((project) => project.featured)
})

// Generic content function with caching
export const getGenericContent = cache(async (contentPath: string): Promise<any | null> => {
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
})
