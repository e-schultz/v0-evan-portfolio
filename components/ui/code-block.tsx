"use client"

import { useTheme } from "next-themes"
import { Highlight, themes } from "prism-react-renderer"
import { useEffect, useState } from "react"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

export function CodeBlock({ code, language = "typescript", filename }: CodeBlockProps) {
  const { theme: currentTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine which theme to use based on the current site theme
  const prismTheme = currentTheme === "dark" ? themes.vsDark : themes.vsLight

  if (!mounted) {
    return (
      <div className="bg-muted p-4 rounded-md my-6 overflow-x-auto">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    )
  }

  return (
    <div className="my-6 overflow-hidden rounded-md border">
      {filename && (
        <div className="bg-muted px-4 py-2 border-b text-sm font-mono text-muted-foreground">{filename}</div>
      )}
      <Highlight theme={prismTheme} code={code.trim()} language={language as any}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} p-4 overflow-x-auto`} style={style}>
            {tokens.map((line, i) => {
              // Extract the key from getLineProps and the rest of the props
              const lineProps = getLineProps({ line, key: i })
              const { key: lineKey, ...restLineProps } = lineProps

              return (
                <div key={i} {...restLineProps}>
                  <span className="inline-block w-8 text-right mr-4 text-muted-foreground opacity-50 select-none">
                    {i + 1}
                  </span>
                  {line.map((token, key) => {
                    // Extract the key from getTokenProps and the rest of the props
                    const tokenProps = getTokenProps({ token, key })
                    const { key: tokenKey, ...restTokenProps } = tokenProps

                    return <span key={key} {...restTokenProps} />
                  })}
                </div>
              )
            })}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
