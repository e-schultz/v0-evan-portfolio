# Component Organization

This document explains the organization of components in the portfolio site.

## Overview

The components are organized into several directories to maintain a clear separation of concerns and make it easier to find and reuse components.

## Directory Structure

\`\`\`
components/
├── blog/                 # Blog-specific components
├── cards/                # Card components (blog, project)
├── layouts/              # Layout components
├── ui/                   # UI components (buttons, inputs, etc.)
└── ...                   # Other components
\`\`\`

## Component Categories

### Blog Components

Located in `components/blog/`, these components are specific to the blog functionality:

- `BlogPostGrid.tsx` - Grid layout for displaying blog posts
- `BlogSearch.tsx` - Search input for blog posts
- `BlogSidebar.tsx` - Sidebar for blog pages with tags, categories, etc.

### Card Components

Located in `components/cards/`, these components are used to display content in card format:

- `BlogCard.tsx` - Card component for displaying blog post previews
- `ProjectCard.tsx` - Card component for displaying project previews

### Layout Components

Located in `components/layouts/`, these components provide layout structures:

- `MainLayout.tsx` - Main layout with header and footer
- `LoadingLayout.tsx` - Layout for loading states

### UI Components

Located in `components/ui/`, these components are basic UI elements:

- `Button.tsx`, `Input.tsx`, etc. - Basic UI components
- `Card.tsx`, `Badge.tsx`, etc. - UI components for displaying content
- `PageHeader.tsx`, `SectionHeader.tsx` - Header components for pages and sections
- `ContentContainer.tsx` - Container component for content

## Component Naming Conventions

- Components are named using PascalCase
- Component files are named using kebab-case
- Component files are named after the component they export

## Component Organization Principles

1. **Separation of Concerns**: Components are organized by their purpose and functionality
2. **Reusability**: Components are designed to be reusable across the application
3. **Consistency**: Components follow consistent naming and organization patterns
4. **Discoverability**: Components are organized in a way that makes them easy to find

## Component Usage Guidelines

### When to Create a New Component

Create a new component when:

- The UI element is used in multiple places
- The UI element is complex and would benefit from being isolated
- The UI element has its own state or behavior

### Where to Place a New Component

- If the component is specific to a feature (e.g., blog), place it in the feature directory
- If the component is a card or list item, place it in the cards directory
- If the component is a layout, place it in the layouts directory
- If the component is a basic UI element, place it in the ui directory

### Component Props

- Use TypeScript interfaces to define component props
- Provide sensible defaults for optional props
- Use destructuring to access props in the component

Example:

\`\`\`tsx
interface ButtonProps {
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

export function Button({ variant = "default", size = "md", children }: ButtonProps) {
  // Component implementation
}
\`\`\`

## Error Handling Components

The application includes several error handling components:

- `ErrorBoundary.tsx` - React error boundary component for catching and displaying errors
- `ErrorBoundaryWrapper.tsx` - Client component for wrapping content that might throw errors
- `ContentError.tsx` - Component for displaying content-specific errors

Use these components to provide a consistent error handling experience throughout the application.

## Loading Components

The application includes several loading components:

- `LoadingLayout.tsx` - Layout component for loading states
- `LoadingSpinner.tsx` - Spinner component for indicating loading

Use these components to provide a consistent loading experience throughout the application.
\`\`\`

## 4. Update the Client-Server Boundaries Documentation

Let's update the client-server boundaries documentation:
