import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

interface ContentErrorProps {
  title?: string
  message?: string
  backLink?: string
  backText?: string
}

export function ContentError({
  title = "Content Not Found",
  message = "The content you're looking for couldn't be loaded.",
  backLink = "/",
  backText = "Go back home",
}: ContentErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-6 text-center">
      <div className="bg-amber-100 dark:bg-amber-900/20 p-4 rounded-full mb-4">
        <AlertCircle className="h-8 w-8 text-amber-600 dark:text-amber-400" />
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{message}</p>
      <Button asChild>
        <Link href={backLink}>{backText}</Link>
      </Button>
    </div>
  )
}
