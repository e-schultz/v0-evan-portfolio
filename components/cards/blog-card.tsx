import Image from 'next/image'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar } from 'lucide-react'
import type { BlogPost } from '@/lib/content-types'

interface BlogCardProps {
  post: BlogPost
  showCategory?: boolean
}

export function BlogCard({ post, showCategory = false }: BlogCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <div className="h-48 overflow-hidden relative">
        <Image
          src={post.image || '/placeholder.svg'}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform hover:scale-105"
          priority={false}
        />
      </div>
      <CardHeader>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Calendar className="mr-2 h-4 w-4" />
          {post.date}
        </div>
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
        <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {showCategory && (
          <Badge variant="outline" className="mb-2">
            <Link href={`/blog/category/${encodeURIComponent(post.category.toLowerCase())}`}>
              {post.category}
            </Link>
          </Badge>
        )}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, tagIndex) => (
            <Badge key={tagIndex} variant="secondary">
              <Link href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}>{tag}</Link>
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" asChild className="w-full">
          <Link href={`/blog/${post.slug}`}>
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
