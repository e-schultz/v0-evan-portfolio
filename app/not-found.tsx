import Link from 'next/link'
import { MainLayout } from '@/components/layouts/main-layout'
import { ContentContainer } from '@/components/ui/content-container'
import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex-1 flex items-center justify-center">
        <ContentContainer maxWidth="md" className="text-center py-20">
          <div className="bg-muted p-4 rounded-full inline-flex mb-6">
            <FileQuestion className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </ContentContainer>
      </div>
    </MainLayout>
  )
}
