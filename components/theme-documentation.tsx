"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function ThemeDocumentation() {
  const { theme, setTheme } = useTheme()
  const [themeVariant, setThemeVariant] = useState("")

  const applyThemeVariant = (variant: string) => {
    if (variant) {
      document.documentElement.setAttribute("data-theme", variant)
    } else {
      document.documentElement.removeAttribute("data-theme")
    }
    setThemeVariant(variant)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Documentation</CardTitle>
        <CardDescription>
          This portfolio uses a flexible theming system with support for light/dark modes and color variants.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            <p>The theme system is built on CSS variables and Tailwind CSS. It supports:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Light and dark modes with system preference detection</li>
              <li>Multiple color variants (Default, Purple, Green, High Contrast)</li>
              <li>Smooth transitions between themes</li>
              <li>Consistent styling across all components</li>
            </ul>

            <div className="flex flex-wrap gap-2 pt-4">
              <Button variant="outline" size="sm" onClick={() => setTheme("light")}>
                Light Mode
              </Button>
              <Button variant="outline" size="sm" onClick={() => setTheme("dark")}>
                Dark Mode
              </Button>
              <Button variant="outline" size="sm" onClick={() => setTheme("system")}>
                System Mode
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="colors" className="space-y-4 pt-4">
            <p>Try different color variants:</p>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={themeVariant === "" ? "default" : "outline"}
                size="sm"
                onClick={() => applyThemeVariant("")}
              >
                Default Blue
              </Button>
              <Button
                variant={themeVariant === "purple" ? "default" : "outline"}
                size="sm"
                onClick={() => applyThemeVariant("purple")}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Purple
              </Button>
              <Button
                variant={themeVariant === "green" ? "default" : "outline"}
                size="sm"
                onClick={() => applyThemeVariant("green")}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Green
              </Button>
              <Button
                variant={themeVariant === "high-contrast" ? "default" : "outline"}
                size="sm"
                onClick={() => applyThemeVariant("high-contrast")}
                className="bg-black text-white dark:bg-white dark:text-black"
              >
                High Contrast
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-4">
              <div className="p-4 bg-background border rounded-md">Background</div>
              <div className="p-4 bg-foreground text-background border rounded-md">Foreground</div>
              <div className="p-4 bg-primary text-primary-foreground border rounded-md">Primary</div>
              <div className="p-4 bg-secondary text-secondary-foreground border rounded-md">Secondary</div>
              <div className="p-4 bg-muted text-muted-foreground border rounded-md">Muted</div>
              <div className="p-4 bg-accent text-accent-foreground border rounded-md">Accent</div>
              <div className="p-4 bg-card text-card-foreground border rounded-md">Card</div>
              <div className="p-4 bg-destructive text-destructive-foreground border rounded-md">Destructive</div>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4 pt-4">
            <p>To use the theme in your components:</p>

            <div className="bg-muted p-4 rounded-md">
              <pre className="text-sm">
                {`// Use Tailwind classes that reference theme variables
<div className="bg-background text-foreground">
  <h1 className="text-primary">Themed Content</h1>
  <p className="text-muted-foreground">This text uses theme colors</p>
</div>

// Add theme transitions
<div className="theme-transition">
  This element will smoothly transition when theme changes
</div>`}
              </pre>
            </div>

            <p className="pt-2">For custom theme variants:</p>

            <div className="bg-muted p-4 rounded-md">
              <pre className="text-sm">
                {`// In your component
import { useEffect, useState } from "react"

export function MyComponent() {
  const [themeVariant, setThemeVariant] = useState("")
  
  // Apply theme variant
  useEffect(() => {
    if (themeVariant) {
      document.documentElement.setAttribute("data-theme", themeVariant)
    } else {
      document.documentElement.removeAttribute("data-theme")
    }
  }, [themeVariant])
  
  return (
    <button onClick={() => setThemeVariant("purple")}>
      Switch to Purple Theme
    </button>
  )
}`}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
