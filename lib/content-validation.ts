import type { BlogPost, Project, ContentBlock } from "./content-types"

// Validation error type
export type ValidationError = {
  field: string
  message: string
}

// Base validator function type
type Validator<T> = (data: T) => ValidationError[]

// Validate content blocks
export const validateContentBlock: Validator<ContentBlock> = (block) => {
  const errors: ValidationError[] = []

  if (!block.type) {
    errors.push({ field: "type", message: "Content block must have a type" })
  }

  if (block.type === "heading" && !block.level) {
    errors.push({ field: "level", message: "Heading block must have a level" })
  }

  if ((block.type === "heading" || block.type === "paragraph" || block.type === "blockquote") && !block.content) {
    errors.push({ field: `content (${block.type})`, message: `${block.type} block must have content` })
  }

  if (block.type === "list" && (!block.items || !Array.isArray(block.items) || block.items.length === 0)) {
    errors.push({ field: "items", message: "List block must have items array" })
  }

  if (block.type === "code" && !block.content) {
    errors.push({ field: "content (code)", message: "Code block must have content" })
  }

  return errors
}

// Validate blog post
export const validateBlogPost: Validator<BlogPost> = (post) => {
  const errors: ValidationError[] = []

  if (!post.title) {
    errors.push({ field: "title", message: "Blog post must have a title" })
  }

  if (!post.slug) {
    errors.push({ field: "slug", message: "Blog post must have a slug" })
  }

  if (!post.date) {
    errors.push({ field: "date", message: "Blog post date is missing" })
  } else {
    // Check if date is valid
    const dateObj = new Date(post.date)
    if (isNaN(dateObj.getTime())) {
      errors.push({ field: "date", message: "Blog post date is invalid" })
    }
  }

  if (!post.author) {
    errors.push({ field: "author", message: "Blog post must have an author" })
  }

  if (!post.excerpt) {
    errors.push({ field: "excerpt", message: "Blog post must have an excerpt" })
  }

  if (!post.tags || !Array.isArray(post.tags) || post.tags.length === 0) {
    errors.push({ field: "tags", message: "Blog post must have tags array" })
  }

  if (!post.category) {
    errors.push({ field: "category", message: "Blog post must have a category" })
  }

  if (!post.content || !Array.isArray(post.content) || post.content.length === 0) {
    errors.push({ field: "content", message: "Blog post must have content array" })
  } else {
    // Validate each content block
    post.content.forEach((block, index) => {
      const blockErrors = validateContentBlock(block)
      blockErrors.forEach((error) => {
        errors.push({ field: `content[${index}].${error.field}`, message: error.message })
      })
    })
  }

  return errors
}

// Validate project
export const validateProject: Validator<Project> = (project) => {
  const errors: ValidationError[] = []

  if (!project.title) {
    errors.push({ field: "title", message: "Project must have a title" })
  }

  if (!project.slug) {
    errors.push({ field: "slug", message: "Project must have a slug" })
  }

  if (!project.description) {
    errors.push({ field: "description", message: "Project must have a description" })
  }

  if (!project.tags || !Array.isArray(project.tags) || project.tags.length === 0) {
    errors.push({ field: "tags", message: "Project must have tags array" })
  }

  if (project.fullDescription) {
    if (!Array.isArray(project.fullDescription)) {
      errors.push({ field: "fullDescription", message: "Project fullDescription must be an array" })
    } else {
      // Validate each content block
      project.fullDescription.forEach((block, index) => {
        const blockErrors = validateContentBlock(block)
        blockErrors.forEach((error) => {
          errors.push({ field: `fullDescription[${index}].${error.field}`, message: error.message })
        })
      })
    }
  }

  if (project.screenshots) {
    if (!Array.isArray(project.screenshots)) {
      errors.push({ field: "screenshots", message: "Project screenshots must be an array" })
    } else {
      project.screenshots.forEach((screenshot, index) => {
        if (!screenshot.image) {
          errors.push({ field: `screenshots[${index}].image`, message: "Screenshot must have an image URL" })
        }
        if (!screenshot.alt) {
          errors.push({ field: `screenshots[${index}].alt`, message: "Screenshot must have alt text" })
        }
      })
    }
  }

  return errors
}

// Simple validation function for content
export function validateContent<T>(data: T, validator: Validator<T>, contentType: string): boolean {
  const errors = validator(data)

  if (errors.length > 0) {
    console.error(`Validation errors in ${contentType}:`)
    errors.forEach((error) => {
      console.error(`- ${error.field}: ${error.message}`)
    })
    return false
  }

  return true
}
