'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Moon, Sun, Laptop, Palette } from 'lucide-react'

export function ModeToggle() {
  const { theme, setTheme, themes } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle Theme" disabled>
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    )
  }

  // Filter out internal themes
  const availableThemes = themes.filter((t) => !t.startsWith('_'))

  // Get the icon for the current theme
  const getThemeIcon = (themeName: string | undefined) => {
    switch (themeName) {
      case 'light':
        return <Sun className="h-[1.2rem] w-[1.2rem]" />
      case 'dark':
        return <Moon className="h-[1.2rem] w-[1.2rem]" />
      case 'system':
        return <Laptop className="h-[1.2rem] w-[1.2rem]" />
      default:
        return <Palette className="h-[1.2rem] w-[1.2rem]" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle Theme"
          className="relative overflow-hidden"
        >
          <div className="transition-all duration-200">{getThemeIcon(theme)}</div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[8rem]">
        {availableThemes.map((t) => (
          <DropdownMenuItem
            key={t}
            onClick={() => setTheme(t)}
            className="flex items-center gap-2 capitalize"
          >
            {getThemeIcon(t)}
            <span>{t}</span>
            {theme === t && (
              <span className="absolute right-2 flex h-2 w-2 rounded-full bg-primary"></span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
