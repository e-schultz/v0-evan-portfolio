import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'

interface NoResultsProps {
  title: string
  message: string
  actionText: string
  actionLink: string
}

export function NoResults({ title, message, actionText, actionLink }: NoResultsProps) {
  return (
    <div className="text-center py-12">
      <div className="bg-muted p-4 rounded-full inline-flex mb-6">
        <FileQuestion className="h-12 w-12 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-muted-foreground mb-6">{message}</p>
      <Button asChild>
        <Link href={actionLink}>{actionText}</Link>
      </Button>
    </div>
  )
}
