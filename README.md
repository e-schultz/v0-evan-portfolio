<<<<<<< HEAD
# FLOAT Portfolio Site

A personal portfolio, blog, and PKM (Personal Knowledge Management) site built with Next.js 14, following the "Shacks Not Cathedrals" philosophy: prioritizing flexibility, resilience, and iteration over polish or speculative features.

## About Me

I'm Evan Schultz, a Technical Director and Software Engineer focused on building high-performing teams and the environments that enable them. My work explores the intersection of technology, creativity, and knowledge management through recursive patterns, transformative processes, and narrative exploration. This site serves as both a portfolio of my work and a living digital garden of ideas.

## Project Overview

This site functions as three interconnected spaces:

1. **Portfolio** - Showcasing projects and professional work
2. **Blog** - Sharing structured thoughts and technical insights
3. **Digital Garden** - Evolving ideas and interconnected notes

The FLOAT (Flexibility, Lightweight, Organic, Adaptable, Transformative) approach guides both the content and the technical implementation, allowing the site to evolve organically over time rather than being constrained by rigid architecture.

## Tech Stack

- **Next.js 14 (App Router)** - React framework with file-based routing
- **Shadcn UI** - Accessible, customizable component library
- **Tailwind CSS** - Utility-first CSS framework
- **Contentlayer** - Content SDK for MDX parsing and type-safe content
- **Vercel** - Hosting platform with CI/CD integration

## Key Features

- **Responsive Design** - Mobile-first approach using Tailwind CSS
- **SEO Optimization** - Metadata, structured data, and sitemaps
- **Performance** - Server-side rendering, static generation, and image optimization
- **Theme Support** - Light/dark mode with system preference detection
- **Content Management** - Type-safe content using Contentlayer

## Directory Structure

```
evan.schultz-portfolio/
=======
# Evan Schultz Portfolio

A modern, content-driven portfolio website built with Next.js, featuring projects, blog posts, and resume information.

## Architecture Overview

This portfolio site uses a content-driven architecture where all content is stored as JSON files separate from the codebase. This approach offers several benefits:

- **Content separation**: All content is decoupled from the presentation layer
- **Easy updates**: Content can be modified without changing code
- **CMS-ready**: The structure is designed for easy migration to a headless CMS
- **Version control**: Content changes can be tracked in git alongside code

## Directory Structure

\`\`\`
>>>>>>> 52c8bb5 (image migration)
├── app/                      # Next.js App Router
│   ├── blog/                 # Blog routes
│   │   ├── [slug]/           # Dynamic blog post route
│   │   ├── category/         # Blog category routes
│   │   ├── tag/              # Blog tag routes
│   │   └── search/           # Blog search functionality
│   ├── projects/             # Projects routes
│   │   └── [slug]/           # Dynamic project route
<<<<<<< HEAD
│   ├── about/                # About page
│   ├── contact/              # Contact page
│   ├── resume/               # Resume page
│   ├── layout.tsx            # Root layout with header/footer
│   ├── page.tsx              # Homepage
│   └── globals.css           # Global styles
=======
│   └── ...                   # Other app routes
>>>>>>> 52c8bb5 (image migration)
├── components/               # React components
│   ├── blog/                 # Blog-specific components
│   ├── cards/                # Card components (blog, project)
│   ├── layouts/              # Layout components
<<<<<<< HEAD
│   ├── ui/                   # Shadcn UI components
│   ├── site-header.tsx       # Site navigation header
│   └── site-footer.tsx       # Site footer
├── content/                  # Content files
=======
│   ├── ui/                   # UI components (buttons, inputs, etc.)
│   └── ...                   # Other components
├── content/                  # Content files (JSON)
>>>>>>> 52c8bb5 (image migration)
│   ├── blog/                 # Blog post content
│   ├── home/                 # Homepage section content
│   ├── pages/                # Static page content
│   └── projects/             # Project content
<<<<<<< HEAD
├── lib/                      # Utility functions
│   ├── content-api.ts        # Content fetching and processing
│   ├── content-types.ts      # TypeScript types for content
│   └── utils.ts              # General utility functions
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
└── next.config.mjs           # Next.js configuration

```

## Development Guidelines

### Philosophy

This project follows the "Shacks Not Cathedrals" approach:

- **Build for now, not later** - Avoid speculative abstractions
- **Embrace imperfection** - Ship early, iterate often
- **Prioritize flexibility** - Design for change, not permanence
- **Keep it simple** - Resist the urge to over-engineer

### Maintenance Principles

1. **Content-First** - Prioritize content updates and improvements
2. **Performance Matters** - Monitor and maintain fast load times
3. **Incremental Changes** - Make small, focused improvements
4. **Avoid Complexity** - Don't add dependencies without clear benefits

### Adding Content

1. Add new blog posts as JSON files in `content/blog/`
2. Add new projects as JSON files in `content/projects/`
3. Update homepage content in `content/home/`

### Making Changes

When modifying the codebase:

1. Focus on specific, measurable improvements
2. Test on mobile and desktop viewports
3. Verify performance hasn't regressed
4. Commit small, focused changes

## Getting Started

```bash
=======
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
\`\`\`

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

\`\`\`json
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
\`\`\`

### Blog Post Files

Blog post content files follow this structure:

\`\`\`json
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
\`\`\`

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

\`\`\`bash
>>>>>>> 52c8bb5 (image migration)
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
<<<<<<< HEAD
```

## Deployment

The site is deployed on Vercel with automatic deployments from the main branch.
=======
\`\`\`

### Building for Production

\`\`\`bash
# Build the application
npm run build

# Start the production server
npm start
\`\`\`
>>>>>>> 52c8bb5 (image migration)

## License

MIT
<<<<<<< HEAD




# Site Overview

Welcome to my personal site - a space where technology, creativity, and knowledge intersect. This site serves as a portfolio of my work, a blog for sharing insights, and a digital garden where ideas grow and connect.

## Site Sections

### Portfolio

The portfolio section showcases my projects and professional work. Each project includes:

- Overview and key features
- Technologies used
- Visual examples
- Links to live demos or repositories (when available)

Browse the projects to see my work in web development, interactive experiences, and creative coding.

### Blog

The blog contains structured articles on topics including:

- Web development and engineering
- Team building and leadership
- Creative technology
- Knowledge management

Articles are categorized and tagged for easy navigation. You can browse by:
- Recent posts on the blog homepage
- Categories for topic-based exploration
- Tags for more specific interests

### Digital Garden

Unlike the more polished blog posts, the digital garden contains evolving ideas, notes, and explorations. This section:

- Embraces work-in-progress thinking
- Shows connections between ideas
- Evolves over time as concepts mature

Think of it as a peek into my thinking process rather than finished work.

## Navigating the Site

### Header Navigation

The main navigation in the header provides quick access to primary sections:
- **Home** - Overview and featured content
- **About** - Information about me and my work
- **Projects** - Portfolio of work
- **Blog** - Articles and insights
- **Resume** - Professional experience
- **Contact** - Ways to reach me

### Theme Toggle

The site supports both light and dark modes. Use the theme toggle in the header to switch between them, or the site will follow your system preferences by default.

### Mobile Navigation

On smaller screens, the navigation collapses into a menu accessible via the hamburger icon in the top right corner.

## Technical Notes

This site is built with modern web technologies to ensure a fast, accessible experience:

- **Fast Loading** - Server-side rendering and static generation for quick page loads
- **Responsive Design** - Optimized for all devices from mobile to desktop
- **Accessibility** - Semantic HTML and keyboard navigation support
- **Content Management** - Structured content with rich formatting capabilities

The site is continuously improved with a focus on performance and user experience.

## Contact

I'm always interested in connecting with fellow developers, potential collaborators, or anyone with shared interests.

- **Email**: [evan@schultz.codes](mailto:evan@schultz.codes)
- **GitHub**: [e-schultz](https://github.com/e-schultz)
- **LinkedIn**: [evanschultz1](https://www.linkedin.com/in/evanschultz1/)
- **Twitter**: [@e_p82](http://twitter.com/e_p82)

Feel free to reach out with questions, opportunities, or just to say hello!
=======
\`\`\`

## 2. Update the API Architecture Documentation

Let's update the API architecture documentation to reflect the current structure:
>>>>>>> 52c8bb5 (image migration)
