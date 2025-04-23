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
├── app/                      # Next.js App Router
│   ├── blog/                 # Blog routes
│   │   ├── [slug]/           # Dynamic blog post route
│   │   ├── category/         # Blog category routes
│   │   ├── tag/              # Blog tag routes
│   │   └── search/           # Blog search functionality
│   ├── projects/             # Projects routes
│   │   └── [slug]/           # Dynamic project route
│   ├── about/                # About page
│   ├── contact/              # Contact page
│   ├── resume/               # Resume page
│   ├── layout.tsx            # Root layout with header/footer
│   ├── page.tsx              # Homepage
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── blog/                 # Blog-specific components
│   ├── cards/                # Card components (blog, project)
│   ├── layouts/              # Layout components
│   ├── ui/                   # Shadcn UI components
│   ├── site-header.tsx       # Site navigation header
│   └── site-footer.tsx       # Site footer
├── content/                  # Content files
│   ├── blog/                 # Blog post content
│   ├── home/                 # Homepage section content
│   ├── pages/                # Static page content
│   └── projects/             # Project content
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
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Deployment

The site is deployed on Vercel with automatic deployments from the main branch.

## License

MIT




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
