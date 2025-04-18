/**
 * Get the full URL for a blog post image
 * @param imagePath The image path from the blog post data
 * @returns The full URL for the image
 */
export function getBlogImageUrl(imagePath: string): string {
  // If the image path is a full URL, return it as is
  if (imagePath.startsWith("http")) {
    return imagePath
  }

  // For local images, just return the path as is
  return imagePath
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
