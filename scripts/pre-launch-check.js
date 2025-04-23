// This is a Node.js script you can run before launch
// Run with: node scripts/pre-launch-check.js

const fs = require("fs")
const path = require("path")
const { promisify } = require("util")
const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)

const contentDir = path.join(process.cwd(), "content")

async function checkBlogPosts() {
  console.log("\n🔍 Checking blog posts...")
  const blogDir = path.join(contentDir, "blog")
  const files = await readdir(blogDir)

  for (const file of files) {
    if (!file.endsWith(".json")) continue

    try {
      const content = await readFile(path.join(blogDir, file), "utf8")
      const post = JSON.parse(content)

      // Basic validation
      if (!post.title) console.log(`⚠️ Missing title in ${file}`)
      if (!post.content || post.content.length === 0) console.log(`⚠️ No content in ${file}`)
      if (!post.date) console.log(`⚠️ Missing date in ${file}`)
      if (!post.image) console.log(`⚠️ Missing image in ${file}`)

      console.log(`✅ ${file} - OK`)
    } catch (error) {
      console.log(`❌ Error in ${file}: ${error.message}`)
    }
  }
}

async function checkProjects() {
  console.log("\n🔍 Checking projects...")
  const projectsDir = path.join(contentDir, "projects")
  const files = await readdir(projectsDir)

  for (const file of files) {
    if (!file.endsWith(".json")) continue

    try {
      const content = await readFile(path.join(projectsDir, file), "utf8")
      const project = JSON.parse(content)

      // Basic validation
      if (!project.title) console.log(`⚠️ Missing title in ${file}`)
      if (!project.description) console.log(`⚠️ Missing description in ${file}`)
      if (!project.tags || project.tags.length === 0) console.log(`⚠️ No tags in ${file}`)
      if (!project.image) console.log(`⚠️ Missing image in ${file}`)

      console.log(`✅ ${file} - OK`)
    } catch (error) {
      console.log(`❌ Error in ${file}: ${error.message}`)
    }
  }
}

async function main() {
  console.log("🚀 Running pre-launch checks...")

  await checkBlogPosts()
  await checkProjects()

  console.log("\n✨ Pre-launch check complete!")
}

main().catch(console.error)
