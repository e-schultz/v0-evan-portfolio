# Client-Server Boundaries in Next.js App Router

This document outlines the approach to client-server boundaries in this Next.js application.

## Core Principles

1. **Clear Separation**: Maintain a clear separation between client and server code
2. **Explicit Directives**: Always use explicit `'use client'` and `'use server'` directives
3. **Centralized Server Actions**: Keep server actions in dedicated files
4. **Minimal Client-Side JavaScript**: Prefer server components where possible
5. **Type Safety**: Use TypeScript for better type safety across the client-server boundary

## File Organization

### Server-Side Code

- `lib/content-api.ts`: Core content fetching logic (server-only)
- `lib/server-actions.ts`: Exported server actions for client components
- `lib/content-validation.ts`: Content validation utilities (server-only)

### Client-Side Code

- `lib/content-client-api.ts`: Client-side wrappers around server actions
- Components with `'use client'` directive: Interactive UI components
- `lib/theme-persistence.ts`: Client-side theme persistence utilities

## Guidelines

### When to Use Server Components

- Static content rendering
- Data fetching directly from the database or file system
- SEO-critical pages
- Pages that don't require client-side interactivity

### When to Use Client Components

- Interactive UI elements (forms, search, etc.)
- Components that use browser APIs
- Components that use React hooks
- Components that need to maintain client-side state

### Server Actions

- Use server actions for form submissions
- Use server actions for data mutations
- Use server actions for client-initiated data fetching
- Always validate input data on the server
- Return structured responses with success/error information

## Content API Architecture

The content API is organized into three layers:

1. **Server-side API** (`lib/content-api.ts`): Reads content from JSON files, validates it, and provides caching
2. **Server Actions** (`lib/server-actions.ts`): Provides a bridge between client components and server-only content API
3. **Client-side API** (`lib/content-client-api.ts`): Provides a client-side interface to server actions

This layered approach allows for efficient data fetching while maintaining type safety and security.

## Example: Form Submission Flow

1. Client component renders a form with `action={handleSubmit}`
2. The `handleSubmit` function calls a server action from `lib/server-actions.ts`
3. The server action processes the form data and returns a result
4. The client component updates its state based on the result

\`\`\`tsx
// Client component
"use client"
import { submitContactFormAction } from "@/lib/server-actions"

export function ContactForm() {
  const [success, setSuccess] = useState(false)
  
  async function handleSubmit(formData: FormData) {
    const result = await submitContactFormAction(formData)
    setSuccess(result.success)
  }
  
  return (
    <form action={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Submit</button>
      {success && <p>Thank you for your message!</p>}
    </form>
  )
}

// Server action
// In lib/server-actions.ts
"use server"

export async function submitContactFormAction(formData: FormData) {
  // Process form data
  return { success: true }
}
\`\`\`

## Example: Data Fetching Flow

1. Server component directly uses functions from `lib/content-api.ts`
2. Client component uses functions from `lib/content-client-api.ts`
3. The client-side functions call server actions from `lib/server-actions.ts`
4. The server actions fetch data using the content API and return it to the client

\`\`\`tsx
// Server component
import { getAllBlogPosts } from "@/lib/content-api"

export default async function BlogPage() {
  const posts = await getAllBlogPosts()
  return <BlogList posts={posts} />
}

// Client component
"use client"
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

## Best Practices

- Always add `'use client'` at the top of client component files
- Always add `'use server'` at the top of server action files
- Use React Server Components by default
- Only opt into client components when necessary
- Keep server-only code in separate files from client code
- Use TypeScript for better type safety across the client-server boundary
- Validate all data on the server before processing
- Handle errors gracefully and provide meaningful error messages
