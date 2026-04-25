import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3 = new S3Client({
  region: process.env.S3_REGION ?? "us-east-1",
  endpoint: process.env.S3_ENDPOINT || undefined,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
  },
  forcePathStyle: true,
})

const bucket = process.env.S3_BUCKET ?? ""

interface PresignUploadOptions {
  key: string
  contentType: string
  maxSize?: number
  expiresIn?: number
}

interface PresignDownloadOptions {
  key: string
  expiresIn?: number
}

interface DeleteObjectOptions {
  key: string
}

/**
 * Generate a presigned PUT URL for direct client-to-S3 uploads.
 * Default expiry: 10 minutes.
 */
export async function createPresignedUpload(
  options: PresignUploadOptions,
): Promise<string> {
  const { key, contentType, maxSize, expiresIn = 600 } = options

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
    ...(maxSize ? { ContentLength: maxSize } : {}),
  })

  return getSignedUrl(s3, command, { expiresIn })
}

/**
 * Generate a presigned GET URL for downloading files.
 * Default expiry: 1 hour.
 */
export async function createPresignedDownload(
  options: PresignDownloadOptions,
): Promise<string> {
  const { key, expiresIn = 3600 } = options

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  })

  return getSignedUrl(s3, command, { expiresIn })
}

/**
 * Delete an object from the bucket.
 */
export async function deleteObject(options: DeleteObjectOptions): Promise<void> {
  const { key } = options

  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: key,
  })

  await s3.send(command)
}

/**
 * Generate a unique upload key with date-based prefix to avoid collisions.
 * Example: uploads/2026/04/a1b2c3d4-photo.jpg
 */
export function generateUploadKey(filename: string): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const id = crypto.randomUUID().slice(0, 8)
  const sanitized = filename.replace(/[^a-zA-Z0-9._-]/g, "_")

  return `uploads/${year}/${month}/${id}-${sanitized}`
}
