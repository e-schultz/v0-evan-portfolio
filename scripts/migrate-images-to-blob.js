import { put } from "@vercel/blob"
import fs from "fs/promises"
import path from "path"
import { existsSync } from "fs"

// Map to store original paths and their new Blob URLs
const migrationMap = {}

async function uploadFile(filePath) {
  try {
    const fileBuffer = await fs.readFile(filePath)
    const fileName = path.basename(filePath)
    const contentType = getContentType(fileName)

    console.log(`Uploading ${filePath}...`)

    const blob = await put(fileName, fileBuffer, {
      access: "public",
      contentType,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    console.log(`✅ Uploaded ${filePath} to ${blob.url}`)
    return blob.url
  } catch (error) {
    console.error(`❌ Error uploading ${filePath}:`, error)
    return null
  }
}

function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase()
  const contentTypes = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
  }

  return contentTypes[ext] || "application/octet-stream"
}

async function scanDirectory(directory) {
  if (!existsSync(directory)) {
    console.warn(`⚠️ Directory does not exist: ${directory}`)
    return
  }

  console.log(`Scanning directory: ${directory}`)
  const entries = await fs.readdir(directory, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      await scanDirectory(fullPath)
    } else if (isImageFile(entry.name)) {
      const relativePath = fullPath.replace(process.cwd(), "").replace(/\\/g, "/")
      const blobUrl = await uploadFile(fullPath)

      if (blobUrl) {
        migrationMap[relativePath] = blobUrl
      }
    }
  }
}

function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase()
  return [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"].includes(ext)
}

async function saveMapToFile() {
  await fs.writeFile("image-migration-map.json", JSON.stringify(migrationMap, null, 2))
  console.log("📝 Migration map saved to image-migration-map.json")
}

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("❌ BLOB_READ_WRITE_TOKEN environment variable is not set")
    process.exit(1)
  }

  try {
    // Migrate images from public directory
    await scanDirectory(path.join(process.cwd(), "public"))

    // Save the migration map
    await saveMapToFile()

    console.log("🎉 Migration completed successfully!")
  } catch (error) {
    console.error("❌ Migration failed:", error)
  }
}

main()
