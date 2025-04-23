'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'

export interface ExtendedThemeProviderProps extends ThemeProviderProps {
  /** Whether to enable theme transitions */
  enableTransitions?: boolean
  /** Time in ms for the transition duration */
  transitionDuration?: number
  /** Default theme variant */
  defaultVariant?: string
}

export function ThemeProvider({
  children,
  enableTransitions = true,
  transitionDuration = 200,
  defaultVariant = '',
  ...props
}: ExtendedThemeProviderProps) {
  // Add a class to the document element when the theme is ready
  // This prevents flash of unstyled content
  React.useEffect(() => {
    document.documentElement.classList.add('theme-ready')

    // Apply default theme variant if provided
    if (defaultVariant) {
      const savedVariant = localStorage.getItem('theme-variant')
      if (!savedVariant) {
        document.documentElement.setAttribute('data-theme', defaultVariant)
        localStorage.setItem('theme-variant', defaultVariant)
      }
    }

    // Apply transition styles if enabled
    if (enableTransitions) {
      const style = document.createElement('style')
      style.appendChild(
        document.createTextNode(`
          .theme-ready * {
            transition: background-color ${transitionDuration}ms ease-in-out, 
                      border-color ${transitionDuration}ms ease-in-out, 
                      color ${transitionDuration}ms ease-in-out, 
                      fill ${transitionDuration}ms ease-in-out, 
                      stroke ${transitionDuration}ms ease-in-out !important;
          }
        `),
      )
      document.head.appendChild(style)

      return () => {
        document.head.removeChild(style)
      }
    }
  }, [enableTransitions, transitionDuration, defaultVariant])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
