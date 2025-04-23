import fs from "fs"
import path from "path"

const contentDir = path.join(process.cwd(), "content/blog")
const fileToDelete = "simplifying-controlled-inputs-with-hooks.json" // Replace with the actual duplicate file
const filePath = path.join(contentDir, fileToDelete)

try {
  // Check if file exists
  if (fs.existsSync(filePath)) {
    // Delete the file
    fs.unlinkSync(filePath)
    console.log(`Successfully deleted ${fileToDelete}`)
  } else {
    console.log(`File ${fileToDelete} does not exist`)
  }
} catch (error) {
  console.error("Error deleting file:", error.message)
}
