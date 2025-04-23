# API Architecture

This document explains the API architecture of the portfolio site.

## Overview

The portfolio site uses a modern approach to data fetching that leverages Next.js App Router features:

1. **Server Components** - Fetch data directly on the server
2. **Server Actions** - Handle mutations and client-initiated data fetching
3. **Client Components** - Use server actions to fetch data when needed

This approach replaces the traditional API routes approach with a more direct and type-safe method.

## Architecture Layers

### 1. Content API (Server-Only)

Located in `lib/content-api.ts`, this layer:
- Reads content from JSON files
- Validates content structure using the validation utilities
- Provides caching for performance
- Is only accessible on the server

### 2. Server Actions

Located in `lib/server-actions.ts`, this layer:
- Provides a bridge between client components and server-only content API
- Handles error handling and data transformation
- Is accessible from client components
- Replaces traditional API routes

### 3. Client API

Located in `lib/content-client-api.ts`, this layer:
- Provides a client-side interface to server actions
- Handles client-side caching
- Is used by client components to fetch data

## Content Validation

Located in `lib/content-validation.ts`, this layer:
- Provides type-safe validation for content structures
- Validates blog posts, projects, and content blocks
- Reports detailed validation errors
- Integrates with the content API for automatic validation

## Data Flow

1. **Server Components** directly use functions from `lib/content-api.ts`
2. **Client Components** use functions from `lib/content-client-api.ts`
3. The client-side functions call server actions from `lib/server-actions.ts`
4. The server actions fetch data using the content API and return it to the client

## Benefits

This architecture provides several benefits:

1. **Type Safety** - Full TypeScript support across the client-server boundary
2. **Performance** - Server components fetch data without client-side JavaScript
3. **Simplicity** - No need for separate API routes and handlers
4. **Security** - Server-only code is never exposed to the client
5. **Maintainability** - Clear separation of concerns and predictable data flow
6. **Validation** - Consistent content validation across the application

## Example

### Server Component Data Fetching

\`\`\`tsx
// In a server component (no 'use client' directive)
import { getAllBlogPosts } from "@/lib/content-api"

export default async function BlogPage() {
  const posts = await getAllBlogPosts()
  return <BlogList posts={posts} />
}
\`\`\`

### Client Component Data Fetching

\`\`\`tsx
// In a client component
"use client"
import { useState, useEffect } from "react"
import { searchClientPosts } from "@/lib/content-client-api"

export function SearchResults({ query }) {
  const [results, setResults] = useState([])
  
  useEffect(() => {
    async function fetchResults() {
      const data = await searchClientPosts(query)
      setResults(data)
    }
    fetchResults()
  }, [query])
  
  return <ResultsList results={results} />
}
\`\`\`

### Server Action Implementation

\`\`\`tsx
// In lib/server-actions.ts
"use server"
import { searchPosts } from "./content-api"

export async function searchPostsAction(query: string) {
  if (!query.trim()) {
    return []
  }
  
  try {
    return await searchPosts(query)
  } catch (error) {
    console.error("Error searching posts:", error)
    return []
  }
}
\`\`\`

### Content Validation

\`\`\`tsx
// In lib/content-validation.ts
import type { BlogPost } from "./content-types"

export function validateBlogPost(post: BlogPost) {
  const errors = []
  
  if (!post.title) {
    errors.push({ field: "title", message: "Blog post must have a title" })
  }
  
  // More validation rules...
  
  return errors
}

// In lib/content-api.ts
import { validateBlogPost } from "./content-validation"

export const getBlogPost = cache(async (slug: string) => {
  const post = await getContent<BlogPost>("blog", slug)
  
  if (post) {
    const errors = validateBlogPost(post)
    if (errors.length > 0) {
      console.warn(`Validation issues in blog post ${slug}:`, errors)
    }
  }
  
  return post
})
