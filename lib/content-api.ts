'use server'

import { cache } from 'react'
import fs from 'fs'
import path from 'path'
import { validateContent, validateBlogPost, validateProject } from './content-validation'
import type { BlogPost, Project } from './content-types'

// Base directory for content
const contentDirectory = path.join(process.cwd(), 'content')

// Content types
export type ContentType = 'blog' | 'project' | 'home' | 'page'

// Content cache
const contentCache = new Map<string, any>()
const cacheTTL = 5 * 60 * 1000 // 5 minutes in milliseconds

// Cache entry type
type CacheEntry = {
  data: any
  timestamp: number
}

// Initialize content directories
async function ensureContentDirectories() {
  const directories = ['blog', 'projects', 'home', 'pages']

  try {
    await fs.promises.access(contentDirectory)
  } catch {
    await fs.promises.mkdir(contentDirectory, { recursive: true })
  }

  for (const dir of directories) {
    const dirPath = path.join(contentDirectory, dir)
    try {
      await fs.promises.access(dirPath)
    } catch {
      await fs.promises.mkdir(dirPath, { recursive: true })
    }
  }
}

// Initialize directories in development mode
if (process.env.NODE_ENV === 'development') {
  ensureContentDirectories().catch((error) => {
    console.error('Error creating content directories:', error)
  })
}

// Get content file path
function getContentFilePath(contentType: ContentType, slug: string): string {
  const directory =
    contentType === 'blog'
      ? 'blog'
      : contentType === 'project'
        ? 'projects'
        : contentType === 'home'
          ? 'home'
          : 'pages'

  return path.join(contentDirectory, directory, `${slug}.json`)
}

// Read JSON content with validation - wrapped with cache
export const getContent = cache(async function getContent<T>(
  contentType: ContentType,
  slug: string,
  validator?: (data: T) => any[],
): Promise<T | null> {
  const cacheKey = `${contentType}:${slug}`

  // Check cache first
  const cachedEntry = contentCache.get(cacheKey) as CacheEntry | undefined
  if (cachedEntry && Date.now() - cachedEntry.timestamp < cacheTTL) {
    return cachedEntry.data as T
  }

  const filePath = getContentFilePath(contentType, slug)

  try {
    const fileContents = await fs.promises.readFile(filePath, 'utf8')
    const data = JSON.parse(fileContents) as T

    // Validate content if validator is provided
    if (validator && !validateContent(data, validator, `${contentType}:${slug}`)) {
      console.warn(`Content validation failed for ${contentType}:${slug}`)
    }

    // Cache the content
    contentCache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    })

    return data
  } catch (error) {
    console.error(`Error reading content file: ${filePath}`, error)
    return null
  }
})

// Get all content slugs of a specific type - wrapped with cache
export const getAllContentSlugs = cache(async function getAllContentSlugs(
  contentType: ContentType,
): Promise<string[]> {
  const directory =
    contentType === 'blog'
      ? 'blog'
      : contentType === 'project'
        ? 'projects'
        : contentType === 'home'
          ? 'home'
          : 'pages'

  const dirPath = path.join(contentDirectory, directory)

  try {
    const files = await fs.promises.readdir(dirPath)
    return files.filter((file) => file.endsWith('.json')).map((file) => file.replace(/\.json$/, ''))
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

// Find the getBlogPost function and add validation:
export const getBlogPost = cache(async (slug: string): Promise<BlogPost | null> => {
  const post = await getContent<BlogPost>('blog', slug)

  if (post) {
    // Validate the post and log any errors
    const errors = validateBlogPost(post)
    if (errors.length > 0) {
      console.warn(`Validation issues in blog post ${slug}:`, errors)
    }
  }

  return post
})

// Add the missing getAllBlogSlugs function
export const getAllBlogSlugs = cache(async (): Promise<string[]> => {
  return await getAllContentSlugs('blog')
})

// Add this function to filter out duplicate blog posts by slug
export const getUniqueBlogPosts = cache(async function getUniqueBlogPosts(
  posts: BlogPost[],
): Promise<BlogPost[]> {
  return Array.from(new Map(posts.map((post) => [post.slug, post])).values())
})

// Update the getAllBlogPosts function to use the new filter
async function readBlogPosts(): Promise<BlogPost[]> {
  return await getAllContent<BlogPost>('blog', validateBlogPost)
}

export const getAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const posts = await readBlogPosts()
  const uniquePosts = await getUniqueBlogPosts(posts)

  // Sort by date, newest first
  return uniquePosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

export const getLatestBlogPosts = cache(async (count: number): Promise<BlogPost[]> => {
  const allPosts = await getAllBlogPosts()
  return allPosts.slice(0, count)
})

export const getPostsByCategory = cache(async (category: string): Promise<BlogPost[]> => {
  const allPosts = await getAllBlogPosts()
  return allPosts.filter((post) => post.category.toLowerCase() === category.toLowerCase())
})

export const getPostsByTag = cache(async (tag: string): Promise<BlogPost[]> => {
  const allPosts = await getAllBlogPosts()
  return allPosts.filter((post) => post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
})

export const getAllCategories = cache(async (): Promise<string[]> => {
  const allPosts = await getAllBlogPosts()
  const categoriesSet = new Set(allPosts.map((post) => post.category))
  return Array.from(categoriesSet)
})

export const getAllTags = cache(async (): Promise<string[]> => {
  const allPosts = await getAllBlogPosts()
  const tagsSet = new Set(allPosts.flatMap((post) => post.tags))
  return Array.from(tagsSet)
})

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

// Find the getProject function and add validation:
export const getProject = cache(async (slug: string): Promise<Project | null> => {
  const project = await getContent<Project>('project', slug)

  if (project) {
    // Validate the project and log any errors
    const errors = validateProject(project)
    if (errors.length > 0) {
      console.warn(`Validation issues in project ${slug}:`, errors)
    }
  }

  return project
})

export const getAllProjects = cache(async (): Promise<Project[]> => {
  return await getAllContent<Project>('project', validateProject)
})

export const getFeaturedProjects = cache(async (): Promise<Project[]> => {
  const allProjects = await getAllProjects()
  return allProjects.filter((project) => project.featured)
})

// Generic content function with caching
export const getGenericContent = cache(async (contentPath: string): Promise<any | null> => {
  const [directory, ...slugParts] = contentPath.split('/')
  const slug = slugParts.join('/')

  let contentType: ContentType

  if (directory === 'blog') {
    contentType = 'blog'
  } else if (directory === 'projects') {
    contentType = 'project'
  } else if (directory === 'home') {
    contentType = 'home'
  } else {
    contentType = 'page'
  }

  return await getContent(contentType, slug)
})
