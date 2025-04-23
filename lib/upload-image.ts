import { put } from '@vercel/blob'

/**
 * Upload an image to Vercel Blob storage
 * @param file The file to upload
 * @param options Additional options for the upload
 * @returns The Blob URL of the uploaded image
 */
export async function uploadImage(
  file: File | Buffer,
  options?: {
    filename?: string
    folder?: string
  },
) {
  const filename =
    options?.filename || (file instanceof File ? file.name : `image-${Date.now()}.jpg`)

  const folder = options?.folder || 'uploads'
  const fullFilename = `${folder}/${filename}`

  try {
    const blob = await put(fullFilename, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN as string,
    })

    return blob.url
  } catch (error) {
    console.error('Error uploading image to Blob:', error)
    throw error
  }
}
