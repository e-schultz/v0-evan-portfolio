import type React from 'react'
import type { ContentBlock } from './content-types'
import { CodeBlock } from '@/components/ui/code-block'

// Function to parse and render formatted text (basic markdown-like syntax)
export function formatText(text: string): React.ReactNode {
  if (!text) return null

  // Replace **bold** with <strong>bold</strong>
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

  // Replace *italic* with <em>italic</em>
  formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>')

  // Replace [link text](url) with <a href="url">link text</a>
  formattedText = formattedText.replace(
    /\[(.*?)\]$$(.*?)$$/g,
    '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>',
  )

  // Split by line breaks and wrap each in a span
  const lines = formattedText.split('\n')

  if (lines.length === 1) {
    return <span dangerouslySetInnerHTML={{ __html: formattedText }} />
  }

  return (
    <>
      {lines.map((line, index) => (
        <span key={index} dangerouslySetInnerHTML={{ __html: line }} />
      ))}
    </>
  )
}

// Function to render content blocks from JSON
export function renderContentBlocks(content: ContentBlock[]): React.ReactNode {
  if (!content || !Array.isArray(content)) return null

  return content.map((block, index) => {
    switch (block.type) {
      case 'heading':
        return block.level === 2 ? (
          <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
            {formatText(block.content || '')}
          </h2>
        ) : (
          <h3 key={index} className="text-xl font-bold mt-6 mb-3">
            {formatText(block.content || '')}
          </h3>
        )
      case 'paragraph':
        return (
          <p key={index} className="my-4">
            {formatText(block.content || '')}
          </p>
        )
      case 'list':
        return (
          <ul key={index} className="my-4 space-y-2 list-disc pl-5">
            {block.items?.map((item: any, itemIndex: number) => {
              if (typeof item === 'string') {
                return (
                  <li key={itemIndex} className="text-muted-foreground">
                    {formatText(item)}
                  </li>
                )
              } else if (item.type === 'listItem') {
                return (
                  <li key={itemIndex} className="text-muted-foreground">
                    {item.title && <strong>{item.title}</strong>}
                    {item.title && item.content && ' - '}
                    {item.content && formatText(item.content)}
                  </li>
                )
              }
              return null
            })}
          </ul>
        )
      case 'code':
        return (
          <CodeBlock
            key={index}
            code={block.content || ''}
            language={block.language || 'typescript'}
            filename={block.filename}
          />
        )
      case 'blockquote':
        return (
          <blockquote key={index} className="italic border-l-4 pl-4 my-4 border-primary/30">
            {formatText(block.content || '')}
          </blockquote>
        )
      default:
        return null
    }
  })
}

// Add the missing formatContent export
export function formatContent(content: string | ContentBlock[]): React.ReactNode {
  if (!content) return null

  if (typeof content === 'string') {
    return formatText(content)
  }

  if (Array.isArray(content)) {
    return renderContentBlocks(content)
  }

  return null
}
