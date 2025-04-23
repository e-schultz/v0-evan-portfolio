/**
 * Get the full URL for a blog post image
 * @param imagePath The image path from the blog post data
 * @returns The full URL for the image
 */
export function getBlogImageUrl(imagePath: string): string {
<<<<<<< HEAD
  // If the image path is a full URL, return it as is
=======
  // If the image path is a full URL (including Blob URLs), return it as is
>>>>>>> 52c8bb5 (image migration)
  if (imagePath.startsWith("http")) {
    return imagePath
  }

<<<<<<< HEAD
  // For local images, ensure they start with a slash
=======
  // For local images that haven't been migrated yet, ensure they start with a slash
>>>>>>> 52c8bb5 (image migration)
  return imagePath.startsWith("/") ? imagePath : `/${imagePath}`
}

/**
 * Get the appropriate image dimensions for a blog post image
 * @param type The type of image (thumbnail, card, hero, etc.)
 * @returns The width and height for the image
 */
export function getBlogImageDimensions(type: "thumbnail" | "card" | "hero" = "card") {
  switch (type) {
    case "thumbnail":
      return { width: 100, height: 100 }
    case "hero":
      return { width: 1200, height: 630 }
    case "card":
    default:
      return { width: 600, height: 400 }
  }
}

/**
 * Get the appropriate sizes attribute for responsive images
 * @param type The type of image (thumbnail, card, hero, etc.)
 * @returns The sizes attribute string for the Image component
 */
export function getImageSizes(type: "thumbnail" | "card" | "hero" | "project" = "card"): string {
  switch (type) {
    case "thumbnail":
      return "100px"
    case "hero":
      return "100vw"
    case "project":
      return "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    case "card":
    default:
      return "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  }
}
