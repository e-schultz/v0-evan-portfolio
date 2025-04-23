import fs from 'fs'
import path from 'path'

// Find all blog post files that might contain "Simplifying React Forms with Hooks"
const contentDir = path.join(process.cwd(), 'content/blog')
const files = fs.readdirSync(contentDir)

const matchingFiles = []

files.forEach((file) => {
  if (!file.endsWith('.json')) return

  try {
    const content = JSON.parse(fs.readFileSync(path.join(contentDir, file), 'utf8'))

    if (
      content.title.includes('Simplifying React Forms with Hooks') ||
      content.slug.includes('simplifying-react-forms') ||
      file.includes('simplifying-react-forms')
    ) {
      matchingFiles.push({
        file,
        title: content.title,
        slug: content.slug,
      })
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message)
  }
})

console.log('Files matching "Simplifying React Forms with Hooks":')
console.log(matchingFiles)

if (matchingFiles.length > 1) {
  console.log('\nDuplicate files found! You should delete one of these files.')
} else if (matchingFiles.length === 0) {
  console.log('\nNo matching files found. The issue might be in how the blog list is rendered.')
} else {
  console.log('\nOnly one file found. The issue might be in how the blog list is rendered.')
}
