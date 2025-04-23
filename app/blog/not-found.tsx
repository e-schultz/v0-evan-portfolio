import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Button } from '@/components/ui/button'

export default function BlogNotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center">
        <div className="container max-w-md text-center py-20">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, the blog post you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link href="/blog">Browse All Blog Posts</Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
// This is a blog-specific not-found page, we should keep it
