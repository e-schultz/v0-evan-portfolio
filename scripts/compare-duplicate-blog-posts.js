import fs from "fs"
import path from "path"

const contentDir = path.join(process.cwd(), "content/blog")

// Files to compare
const file1 = "simplifying-react-forms-with-hooks.json"
const file2 = "simplifying-controlled-inputs-with-hooks.json"

try {
  // Read both files
  const content1 = JSON.parse(fs.readFileSync(path.join(contentDir, file1), "utf8"))
  const content2 = JSON.parse(fs.readFileSync(path.join(contentDir, file2), "utf8"))

  console.log("File 1:", file1)
  console.log("Title:", content1.title)
  console.log("Slug:", content1.slug)
  console.log("Date:", content1.date)
  console.log("\n")

  console.log("File 2:", file2)
  console.log("Title:", content2.title)
  console.log("Slug:", content2.slug)
  console.log("Date:", content2.date)
  console.log("\n")

  // Compare content length to see if they're actually identical
  console.log("Content identical?", JSON.stringify(content1.content) === JSON.stringify(content2.content))

  // Recommend which file to keep (usually the one with the more descriptive filename)
  console.log("\nRecommendation:")
  console.log("Keep:", file1)
  console.log("Delete:", file2)

  console.log("\nTo delete the duplicate file, run:")
  console.log(`rm ${path.join(contentDir, file2)}`)
} catch (error) {
  console.error("Error comparing files:", error.message)
}
