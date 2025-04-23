# Content Guidelines for FLOAT Portfolio

This document provides guidelines for managing content in the FLOAT portfolio site, ensuring consistency and maintainability.

## Blog Posts

### Structure

Blog posts are stored as JSON files in the `content/blog/` directory with the following structure:

\`\`\`json
{
  "title": "Post Title",
  "slug": "post-slug",
  "date": "YYYY-MM-DD",
  "author": "Evan Schultz",
  "excerpt": "Brief summary of the post",
  "category": "Category",
  "tags": ["tag1", "tag2"],
  "image": "/images/blog/image-name.png",
  "content": [
    {
      "type": "paragraph",
      "content": "Paragraph text"
    },
    {
      "type": "heading",
      "level": 2,
      "content": "Heading text"
    }
    // Other content blocks
  ]
}
\`\`\`

### Image Guidelines

For consistency and optimal performance:

1. **Preferred Approach**: Store images in an external blob storage and reference them with full URLs
2. **Alternative**: Store images in the `/public/images/blog/` directory and reference them with relative paths
3. **Image Dimensions**: 
   - Card thumbnails: 600x400px
   - Hero images: 1200x630px
   - Inline images: Width of 800px maximum

### Content Freshness

When updating older blog posts:

1. **Add a note**: For posts about older technologies, add an "Editor's Note" at the top
2. **Update code examples**: Ensure code examples follow current best practices
3. **Consider archiving**: If content is no longer relevant, consider moving it to an "archive" category

## Projects

Projects follow a similar structure in the `content/projects/` directory:

\`\`\`json
{
  "title": "Project Title",
  "slug": "project-slug",
  "description": "Brief project description",
  "tags": ["tag1", "tag2"],
  "image": "/images/projects/image-name.png",
  "featured": true,
  "content": [
    // Content blocks
  ]
}
\`\`\`

## Content Management Workflow

1. **Create content**: Add new JSON files to the appropriate directory
2. **Validate content**: Run validation scripts to ensure content follows the expected schema
3. **Preview locally**: Test how content appears before deploying
4. **Deploy**: Push changes to the main branch to trigger deployment

## Best Practices

1. **Consistent formatting**: Use the same structure for all content files
2. **Image optimization**: Compress images before adding them to the site
3. **Regular audits**: Periodically review content for relevance and accuracy
4. **Incremental updates**: Make small, focused content updates rather than large overhauls
