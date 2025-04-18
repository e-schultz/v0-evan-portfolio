// Content block types
export type ContentBlockType = "paragraph" | "heading" | "list" | "code" | "image" | "blockquote" | "divider"

export type ContentBlock = {
  type: ContentBlockType
  content?: string
  level?: number
  language?: string
  items?: Array<{
    type: "listItem"
    title?: string
    content: string
  }>
  src?: string
  alt?: string
  caption?: string
}

// Blog post type
export type BlogPost = {
  title: string
  slug: string
  date: string
  author: string
  excerpt: string
  content: ContentBlock[]
  tags: string[]
  category: string
  image?: string
  readingTime?: number
}

// Project type
export type Project = {
  title: string
  slug: string
  description: string
  image?: string
  tags: string[]
  github?: string
  link?: string
  featured?: boolean
  status?: "active" | "completed" | "archived"
  date?: string
  fullDescription?: ContentBlock[]
  screenshots?: Array<{
    image: string
    alt: string
    caption?: string
  }>
  technologies?: string[]
}

// Hero content type
export type HeroContent = {
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
  socialLinks: Array<{
    platform: string
    url: string
    label: string
  }>
  image?: string
}

// About content type
export type AboutContent = {
  title: string
  description: string
  sections: Array<{
    title: string
    content?: string[]
    items?: string[]
  }>
  resumeButton: {
    text: string
    url: string
  }
  experience: Array<{
    title: string
    company: string
    period: string
  }>
}

// Contact content type
export type ContactContent = {
  title: string
  description: string
  email: {
    title: string
    address: string
  }
  social: {
    title: string
    platforms: Array<{
      name: string
      url: string
      icon: string
    }>
  }
  image: {
    src: string
    alt: string
    caption: string
    description: string
  }
  form: ContactFormContent
}

export type ContactFormContent = {
  title: string
  description: string
  fields: Array<{
    name: string
    label: string
    type: string
    placeholder: string
    required: boolean
    rows?: number
  }>
  submitButton: {
    text: string
    icon: string
  }
}

// Resume content type
export type ResumeContent = {
  title: string
  subtitle?: string
  description?: string
  experience: Array<{
    company: string
    position: string
    startDate: string
    endDate?: string
    description: string
    highlights?: string[]
  }>
  education: Array<{
    institution: string
    degree: string
    field?: string
    startDate: string
    endDate?: string
    description?: string
  }>
  skills: Array<{
    category: string
    items: string[]
  }>
  certifications?: Array<{
    name: string
    issuer: string
    date: string
    url?: string
  }>
}
