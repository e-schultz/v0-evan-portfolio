# Content Management

This directory contains all the content for the portfolio website, organized in a way that makes it easy to update without needing to modify the codebase.

## Directory Structure

- `/content/blog` - Blog posts in JSON format
- `/content/projects` - Project details in JSON format
- `/content/home` - Content for homepage sections in JSON format
- `/content/pages` - Content for static pages in JSON format

## Content Format

All content is stored in JSON format for consistency and ease of management. Each content type follows a specific structure to ensure it can be properly rendered by the application.

### Blog Posts

Blog posts are stored as JSON files in the `/content/blog` directory. Each file should follow this structure:

\`\`\`json
{
  "title": "Your Blog Post Title",
  "slug": "your-blog-post-slug",
  "date": "2023-01-01",
  "author": "Your Name",
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
        {
          "type": "listItem",
          "content": "List item with **formatting**"
        }
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

### Projects

Project details are stored as JSON files in the `/content/projects` directory. Each file should follow this structure:

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
    },
    {
      "image": "/path/to/screenshot2.jpg",
      "alt": "Description of screenshot 2"
    }
  ]
}
\`\`\`

### Home Page Sections

Home page sections are stored as JSON files in the `/content/home` directory. Each section has its own file with a structure specific to that section.

Example for the hero section:

\`\`\`json
{
  "title": "Your Name",
  "subtitle": "Your Title",
  "description": "A brief description about yourself.",
  "primaryButton": {
    "text": "View Projects",
    "url": "/projects"
  },
  "secondaryButton": {
    "text": "Contact Me",
    "url": "/contact"
  },
  "socialLinks": [
    {
      "platform": "github",
      "url": "https://github.com/yourusername",
      "label": "GitHub"
    },
    {
      "platform": "linkedin",
      "url": "https://linkedin.com/in/yourusername",
      "label": "LinkedIn"
    }
  ],
  "image": "/path/to/hero-image.jpg"
}
\`\`\`

## Adding New Content

### Adding a Blog Post

1. Create a new JSON file in the `/content/blog` directory named with the post's slug (e.g., `my-new-post.json`)
2. Fill in all the required fields following the structure above
3. The post will automatically appear in the blog list and a page will be generated for it

### Adding a Project

1. Create a new JSON file in the `/content/projects` directory named with the project's slug (e.g., `my-new-project.json`)
2. Fill in all the required fields following the structure above
3. The project will automatically appear in the projects list and a page will be generated for it

### Updating Home Page Content

1. Open the appropriate JSON file in the `/content/home` directory
2. Modify the content as needed
3. The changes will be reflected on the homepage

## Content Formatting

For text content that requires formatting (like bold, italic, etc.), you can use a limited set of Markdown-style formatting within your JSON strings:

- `**bold text**` - For bold text
- `*italic text*` - For italic text
- `[link text](https://example.com)` - For links

The application will parse these formatting markers and render them appropriately.

## Migrating to a CMS

This content structure is designed to make it easy to migrate to a headless CMS like Sanity in the future. When migrating:

1. Create a schema in Sanity that matches the structure of your content files
2. Import your content from these files to Sanity
3. Update the content fetching functions in `lib/content.ts` to fetch from Sanity instead of local files

The components that consume the content will continue to work without changes as long as the data structure remains consistent.
\`\`\`

Let's update the HeroSection component to use our JSON content:
