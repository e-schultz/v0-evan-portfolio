import fs from "fs"
import path from "path"
import { execSync } from "child_process"

// Define the redundant file to be removed
const redundantFile = path.join(process.cwd(), "lib/blog.ts")

// Check if the redundant file exists and remove it
if (fs.existsSync(redundantFile)) {
  console.log("Removing redundant file:", redundantFile)
  fs.unlinkSync(redundantFile)
} else {
  console.log("Redundant file already removed:", redundantFile)
}

// Run ESLint and TypeScript checks
console.log("\nRunning ESLint checks...")
try {
  execSync("npx eslint . --fix", { stdio: "inherit" })
  console.log("ESLint checks completed successfully")
} catch (error) {
  console.error("ESLint checks failed:", error.message)
}

console.log("\nRunning TypeScript checks...")
try {
  execSync("npx tsc --noEmit", { stdio: "inherit" })
  console.log("TypeScript checks completed successfully")
} catch (error) {
  console.error("TypeScript checks failed:", error.message)
}

// Find and handle duplicate blog posts
console.log("\nChecking for duplicate blog posts...")
try {
  execSync("node scripts/find-duplicate-blog-posts.js", { stdio: "inherit" })
  console.log("Duplicate blog post check completed")
} catch (error) {
  console.error("Duplicate blog post check failed:", error.message)
}

console.log("\nAll fixes have been applied!")
console.log("\nNext steps:")
console.log("1. Review any ESLint or TypeScript errors that couldn't be automatically fixed")
console.log("2. Run the image migration script if needed: node scripts/migrate-images-to-blob.js")
console.log("3. Update content references after migration: node scripts/update-content-references.js")
console.log("4. Build and test the application: npm run build && npm run start")
