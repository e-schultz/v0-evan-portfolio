import { cache } from "react"
import fs from "fs/promises"
import path from "path"

// Helper function to read JSON content files
async function readJsonFile(filePath: string) {
  try {
    const fullPath = path.join(process.cwd(), "content", `${filePath}.json`)
    const fileContents = await fs.readFile(fullPath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return null
  }
}

// Get generic content (for pages like about, contact, etc.)
export const getGenericContent = cache(async (contentPath: string) => {
  try {
    return await readJsonFile(contentPath)
  } catch (error) {
    console.error(`Error fetching generic content for ${contentPath}:`, error)
    return null
  }
})

// Get hero content for the homepage
export const getHeroContent = cache(async () => {
  try {
    return await readJsonFile("home/hero")
  } catch (error) {
    console.error("Error fetching hero content:", error)
    return null
  }
})

// Get about content for the homepage
export const getAboutContent = cache(async () => {
  try {
    return await readJsonFile("home/about")
  } catch (error) {
    console.error("Error fetching about content:", error)
    return null
  }
})

// Get all projects
export const getAllProjects = cache(async () => {
  try {
    const projectsDir = path.join(process.cwd(), "content/projects")
    const files = await fs.readdir(projectsDir)

    const projects = await Promise.all(
      files
        .filter((file) => file.endsWith(".json"))
        .map(async (file) => {
          const content = await fs.readFile(path.join(projectsDir, file), "utf8")
          return JSON.parse(content)
        }),
    )

    return projects
  } catch (error) {
    console.error("Error fetching all projects:", error)
    return []
  }
})

// Get featured projects
export const getFeaturedProjects = cache(async () => {
  try {
    const allProjects = await getAllProjects()
    return allProjects.filter((project) => project.featured)
  } catch (error) {
    console.error("Error fetching featured projects:", error)
    return []
  }
})

// Get a specific project by slug
export const getProject = cache(async (slug: string) => {
  try {
    const projectPath = `projects/${slug}`
    return await readJsonFile(projectPath)
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error)
    return null
  }
})

// Get all blog posts
export const getAllBlogPosts = cache(async () => {
  try {
    const blogDir = path.join(process.cwd(), "content/blog")
    const files = await fs.readdir(blogDir)

    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith(".json"))
        .map(async (file) => {
          const content = await fs.readFile(path.join(blogDir, file), "utf8")
          return JSON.parse(content)
        }),
    )

    // Sort by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("Error fetching all blog posts:", error)
    return []
  }
})

// Get latest blog posts
export const getLatestBlogPosts = cache(async (count = 3) => {
  try {
    const allPosts = await getAllBlogPosts()
    return allPosts.slice(0, count)
  } catch (error) {
    console.error("Error fetching latest blog posts:", error)
    return []
  }
})

// Get a specific blog post by slug
export const getBlogPost = cache(async (slug: string) => {
  try {
    const postPath = `blog/${slug}`
    return await readJsonFile(postPath)
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error)
    return null
  }
})

// Get all blog post slugs (for static generation)
export const getAllBlogSlugs = cache(async () => {
  try {
    const blogDir = path.join(process.cwd(), "content/blog")
    const files = await fs.readdir(blogDir)

    return files.filter((file) => file.endsWith(".json")).map((file) => file.replace(/\.json$/, ""))
  } catch (error) {
    console.error("Error fetching all blog slugs:", error)
    return []
  }
})

// Get all tags from blog posts
export const getAllTags = cache(async () => {
  try {
    const allPosts = await getAllBlogPosts()
    const tagsSet = new Set<string>()

    allPosts.forEach((post) => {
      if (Array.isArray(post.tags)) {
        post.tags.forEach((tag) => tagsSet.add(tag))
      }
    })

    return Array.from(tagsSet).sort()
  } catch (error) {
    console.error("Error fetching all tags:", error)
    return []
  }
})

// Search blog posts
export const searchPosts = cache(async (query: string) => {
  const startTime = Date.now()
  try {
    const allPosts = await getAllBlogPosts()
    const lowercaseQuery = query.toLowerCase()

    const results = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.excerpt.toLowerCase().includes(lowercaseQuery) ||
        (Array.isArray(post.tags) && post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))),
    )
    const endTime = Date.now()
    console.log(`searchPosts for "${query}" took ${endTime - startTime}ms and returned ${results.length} results`)
    return results
  } catch (error) {
    console.error(`Error searching posts for "${query}":`, error)
    return []
  }
})

// Get posts by tag
export const getPostsByTag = cache(async (tag: string) => {
  try {
    const allPosts = await getAllBlogPosts()
    const lowercaseTag = tag.toLowerCase()
    return allPosts.filter(
      (post) => Array.isArray(post.tags) && post.tags.some((t) => t.toLowerCase() === lowercaseTag),
    )
  } catch (error) {
    console.error(`Error fetching posts by tag ${tag}:`, error)
    return []
  }
})

// Get posts by category
export const getPostsByCategory = cache(async (category: string) => {
  try {
    const allPosts = await getAllBlogPosts()
    const lowercaseCategory = category.toLowerCase()
    return allPosts.filter((post) => post.category && post.category.toLowerCase() === lowercaseCategory)
  } catch (error) {
    console.error(`Error fetching posts by category ${category}:`, error)
    return []
  }
})
