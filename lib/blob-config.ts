import type { PutBlobResult } from '@vercel/blob'

export type BlobUploadResult = PutBlobResult

// This token will be available as an environment variable when deployed to Vercel
export const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN
