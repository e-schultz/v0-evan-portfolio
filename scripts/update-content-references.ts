import fs from "fs/promises"
import path from "path"
import { globSync } from "glob"
import { existsSync } from "fs"

async function updateContentFiles() {
  try {
    // Check if migration map exists
    const mapPath = path.join(process.cwd(), "image-migration-map.json")
    if (!existsSync(mapPath)) {
      console.error("❌ Migration map not found. Run the migration script first.")
      process.exit(1)
    }

    // Load the migration map
    const migrationMapText = await fs.readFile(mapPath, "utf-8")
    const migrationMap = JSON.parse(migrationMapText)

    console.log(`Found ${Object.keys(migrationMap).length} migrated images in the map`)

    // Get all JSON content files
    const contentFiles = globSync("content/**/*.json")
    console.log(`Found ${contentFiles.length} content files to process`)

    let totalUpdates = 0

    for (const filePath of contentFiles) {
      let content = await fs.readFile(filePath, "utf-8")
      let modified = false
      let fileUpdates = 0

      // Replace all image references
      for (const [originalPath, blobUrl] of Object.entries(migrationMap)) {
        // Handle both absolute and relative paths
        const searchPaths = [
          originalPath,
          originalPath.startsWith("/") ? originalPath.substring(1) : `/${originalPath}`,
        ]

        for (const searchPath of searchPaths) {
          // Escape special characters for regex
          const escapedPath = searchPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
          const regex = new RegExp(escapedPath, "g")

          if (content.includes(searchPath)) {
            const newContent = content.replace(regex, blobUrl)
            if (newContent !== content) {
              content = newContent
              modified = true
              fileUpdates++
            }
          }
        }
      }

      // Save the file if modified
      if (modified) {
        await fs.writeFile(filePath, content)
        console.log(`✅ Updated ${fileUpdates} references in ${filePath}`)
        totalUpdates += fileUpdates
      }
    }

    console.log(`🎉 Content references updated successfully! Total updates: ${totalUpdates}`)
  } catch (error) {
    console.error("❌ Error updating content references:", error)
  }
}

updateContentFiles()
