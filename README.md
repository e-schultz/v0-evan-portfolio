# Evan Schultz Portfolio

A modern, content-driven portfolio website built with Next.js, featuring projects, blog posts, and resume information.

## Architecture Overview

This portfolio site uses a content-driven architecture where all content is stored as JSON files separate from the codebase. This approach offers several benefits:

- **Content separation**: All content is decoupled from the presentation layer
- **Easy updates**: Content can be modified without changing code
- **CMS-ready**: The structure is designed for easy migration to a headless CMS
- **Version control**: Content changes can be tracked in git alongside code

## Directory Structure

```
├── app/                      # Next.js App Router
│   ├── blog/                 # Blog routes
│   │   ├── [slug]/           # Dynamic blog post route
│   │   ├── category/         # Blog category routes
│   │   ├── tag/              # Blog tag routes
│   │   └── search/           # Blog search functionality
│   ├── projects/             # Projects routes
│   │   └── [slug]/           # Dynamic project route
│   └── ...                   # Other app routes
├── components/               # React components
│   ├── blog/                 # Blog-specific components
│   ├── cards/                # Card components (blog, project)
│   ├── layouts/              # Layout components
│   ├── ui/                   # UI components (buttons, inputs, etc.)
│   └── ...                   # Other components
├── content/                  # Content files (JSON)
│   ├── blog/                 # Blog post content
│   ├── home/                 # Homepage section content
│   ├── pages/                # Static page content
│   └── projects/             # Project content
├── docs/                     # Documentation
├── lib/                      # Utility functions
│   ├── content-api.ts        # Server-side content API
│   ├── content-client-api.ts # Client-side content API
│   ├── content-types.ts      # TypeScript types for content
│   ├── content-validation.ts # Content validation utilities
│   ├── format-content.tsx    # Content formatting utilities
│   ├── server-actions.ts     # Server actions for client components
│   └── utils.ts              # General utility functions
└── public/                   # Static assets
```

## Component Organization

The components are organized into several directories:

- **blog/**: Blog-specific components like BlogSearch, BlogPostGrid, etc.
- **cards/**: Reusable card components for displaying blog posts and projects
- **layouts/**: Layout components like MainLayout, LoadingLayout, etc.
- **ui/**: Basic UI components like buttons, inputs, cards, etc.

This organization helps maintain a clear separation of concerns and makes it easier to find and reuse components.

## Content Architecture

### Content API

The content API is organized into three layers:

1. **Server-side API** (`lib/content-api.ts`): Reads content from JSON files, validates it, and provides caching
2. **Server Actions** (`lib/server-actions.ts`): Provides a bridge between client components and server-only content API
3. **Client-side API** (`lib/content-client-api.ts`): Provides a client-side interface to server actions

This layered approach allows for efficient data fetching while maintaining type safety and security.

### Content Validation

Content validation is handled by `lib/content-validation.ts`, which provides:

- Type-safe validation for blog posts, projects, and content blocks
- Detailed error reporting for invalid content
- Integration with the content API for automatic validation

## Content Format

### Project Files

Project content files follow this structure:

```json
{
  "title": "Project Title",
  "slug": "project-slug",
  "description": "A brief description of the project.",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "github": "https://github.com/username/project",
  "link": "https://project-demo.com",
  "image": "/path/to/image.jpg",
  "featured": true,
  "fullDescription": [
    {
      "type": "paragraph",
      "content": "A longer description of the project."
    },
    {
      "type": "heading",
      "level": 2,
      "content": "Features"
    },
    {
      "type": "list",
      "items": [
        "Feature 1",
        "Feature 2",
        "Feature 3"
      ]
    }
  ],
  "screenshots": [
    {
      "image": "/path/to/screenshot1.jpg",
      "alt": "Description of screenshot 1"
    }
  ]
}
```

### Blog Post Files

Blog post content files follow this structure:

```json
{
  "title": "Blog Post Title",
  "slug": "blog-post-slug",
  "date": "2023-01-01",
  "author": "Author Name",
  "excerpt": "A brief summary of the blog post content.",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "category": "Category",
  "image": "/path/to/image.jpg",
  "content": [
    {
      "type": "heading",
      "level": 2,
      "content": "Introduction"
    },
    {
      "type": "paragraph",
      "content": "Your paragraph text goes here."
    },
    {
      "type": "list",
      "items": [
        "List item 1",
        "List item 2",
        "List item 3"
      ]
    },
    {
      "type": "code",
      "language": "javascript",
      "content": "function example() {\n  return 'Hello, world!';\n}"
    }
  ]
}
```

## Adding New Content

### Adding a Project

1. Create a new JSON file in the `content/projects` directory with the project's slug as the filename (e.g., `my-new-project.json`)
2. Fill in all the required fields following the structure above
3. The project will automatically appear in the projects list and a page will be generated for it

### Adding a Blog Post

1. Create a new JSON file in the `content/blog` directory with the post's slug as the filename (e.g., `my-new-post.json`)
2. Fill in all the required fields following the structure above
3. The post will automatically appear in the blog list and a page will be generated for it

## Content Formatting

The application supports a rich content format with various block types:

- **Paragraphs**: Simple text blocks
- **Headings**: Section headers with different levels
- **Lists**: Bulleted or numbered lists
- **Code blocks**: Syntax-highlighted code snippets
- **Blockquotes**: Quoted text blocks

Within text content, you can use a limited set of Markdown-style formatting:

- `**bold text**` - For bold text
- `*italic text*` - For italic text
- `[link text](https://example.com)` - For links

## Theming System

The portfolio includes a flexible theming system with:

- Light and dark mode support with system preference detection
- Multiple color variants (Default Blue, Purple, Green, High Contrast)
- Smooth transitions between themes
- Theme persistence using localStorage

Theme settings can be managed through the ThemeSelector component or the dedicated theme settings page.

## Error Handling

The application includes several error handling mechanisms:

- **ErrorBoundary**: A React error boundary component for catching and displaying errors
- **ErrorBoundaryWrapper**: A client component for wrapping content that might throw errors
- **ContentError**: A component for displaying content-specific errors

## Development

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## License

MIT
```

## 2. Update the API Architecture Documentation

Let's update the API architecture documentation to reflect the current structure:
