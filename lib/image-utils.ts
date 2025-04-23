/**
 * Get the full URL for an image
 * @param imagePath The image path from the content data
 * @returns The full URL for the image
 */
export function getBlogImageUrl(imagePath?: string): string {
  // If the image path is a full URL (including Blob URLs), return it as is
  if (imagePath && (imagePath.startsWith("http") || imagePath.startsWith("https"))) {
    return imagePath
  }

  // For local images that haven't been migrated yet, ensure they start with a slash
  if (imagePath) {
    return imagePath.startsWith("/") ? imagePath : `/${imagePath}`
  }

  // Return a fallback image if no image path is provided
  return "/images/fallback-image.png"
}

/**
 * Get the appropriate image dimensions for different types of images
 * @param type The type of image (thumbnail, card, hero, etc.)
 * @returns The width and height for the image
 */
export function getImageDimensions(type: "thumbnail" | "card" | "hero" = "card") {
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
