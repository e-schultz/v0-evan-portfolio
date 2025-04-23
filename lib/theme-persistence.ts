"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function useThemePersistence() {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme && storedTheme !== theme) {
      setTheme(storedTheme)
    }

    const handleThemeChange = () => {
      if (theme) {
        localStorage.setItem("theme", theme)
      }
    }

    handleThemeChange() // Call on mount to ensure initial persistence

    return () => {
      // Cleanup function (not strictly needed in this case)
    }
  }, [theme, setTheme])
}
