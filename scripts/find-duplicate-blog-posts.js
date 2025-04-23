// This script helps identify duplicate blog posts by title or slug
import fs from "fs"
import path from "path"

const contentDir = path.join(process.cwd(), "content/blog")
const files = fs.readdirSync(contentDir)

// Maps to track duplicates
const titleMap = new Map()
const slugMap = new Map()

// Process each file
files.forEach((file) => {
  if (!file.endsWith(".json")) return

  try {
    const content = JSON.parse(fs.readFileSync(path.join(contentDir, file), "utf8"))

    // Check for title duplicates
    if (titleMap.has(content.title)) {
      console.log(`Duplicate title found: "${content.title}"`)
      console.log(`  - ${file}`)
      console.log(`  - ${titleMap.get(content.title)}`)
    } else {
      titleMap.set(content.title, file)
    }

    // Check for slug duplicates
    if (slugMap.has(content.slug)) {
      console.log(`Duplicate slug found: "${content.slug}"`)
      console.log(`  - ${file}`)
      console.log(`  - ${slugMap.get(content.slug)}`)
    } else {
      slugMap.set(content.slug, file)
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message)
  }
})

console.log("Scan complete.")
