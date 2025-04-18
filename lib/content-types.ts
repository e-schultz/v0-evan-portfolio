// Shared type definitions for content structures
// This file can be imported by both client and server components

export interface BlogPost {
  title: string
  slug: string
  date: string
  author: string
  excerpt: string
  content: ContentBlock[]
  image: string
  tags: string[]
  category: string
}

export interface Project {
  title: string
  slug: string
  description: string
  tags: string[]
  github?: string
  link?: string
  v0Link?: string
  image?: string
  featured: boolean
  fullDescription?: ContentBlock[]
  screenshots?: { image: string; alt: string }[]
}

// Update the ContentBlock type to include language and filename for code blocks
export type ContentBlock = {
  type: "heading" | "paragraph" | "list" | "code" | "blockquote" | "image"
  level?: number
  content?: string
  items?: string[] | ListItem[]
  language?: string // Add this for code blocks
  filename?: string // Add this for code blocks
  alt?: string
  src?: string
  caption?: string
}

export type ListItem = {
  type: "listItem"
  title?: string
  content?: string
}

export interface HeroContent {
  title: string
  subtitle: string
  description: string
  primaryButton: {
    text: string
    url: string
  }
  secondaryButton: {
    text: string
    url: string
  }
  socialLinks: {
    platform: string
    url: string
    label: string
  }[]
  image: string
}

export interface AboutContent {
  title: string
  description: string
  sections: {
    title: string
    content?: string[]
    items?: string[]
  }[]
  resumeButton: {
    text: string
    url: string
  }
  experience: {
    title: string
    company: string
    period: string
  }[]
}

export interface ContactFormContent {
  title: string
  description: string
  fields: {
    name: string
    label: string
    type: string
    placeholder: string
    required: boolean
    rows?: number
  }[]
  submitButton: {
    text: string
    icon: string
  }
}
