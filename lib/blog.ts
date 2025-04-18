// lib/blog.ts

interface BlogPost {
  slug: string
  title: string
  date: string
  content: string
  [key: string]: any // Allow for other properties
}

async function getBlogPosts(): Promise<BlogPost[]> {
  // Placeholder for fetching blog posts.  Replace with actual data fetching logic.
  const posts: BlogPost[] = [
    { slug: "my-first-post", title: "My First Post", date: "2023-01-01", content: "This is my first blog post." },
    { slug: "my-second-post", title: "My Second Post", date: "2023-01-05", content: "This is my second blog post." },
    {
      slug: "my-first-post",
      title: "My First Post (Duplicate)",
      date: "2023-01-01",
      content: "This is a duplicate blog post.",
    }, // Simulate a duplicate
  ]

  // Ensure no duplicate posts by slug
  const uniquePosts = Array.from(new Map(posts.map((post) => [post.slug, post])).values())

  return uniquePosts
}

export { getBlogPosts, type BlogPost }
