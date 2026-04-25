import { NextApiRequest } from "next-ts-api"
import { createPresignedUpload, generateUploadKey } from "@/lib/storage"

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB

const ALLOWED_CONTENT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
  "text/plain",
  "text/csv",
  "application/json",
  "application/zip",
])

interface PresignRequestBody {
  filename: string
  contentType: string
  size: number
}

export async function POST(
  request: NextApiRequest<PresignRequestBody>,
) {
  const body = await request.json()

  if (!body.filename || !body.contentType || typeof body.size !== "number") {
    return Response.json(
      { error: "Missing required fields: filename, contentType, size" },
      { status: 400 },
    )
  }

  if (body.size > MAX_FILE_SIZE) {
    return Response.json(
      { error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` },
      { status: 400 },
    )
  }

  if (!ALLOWED_CONTENT_TYPES.has(body.contentType)) {
    return Response.json(
      { error: `Content type not allowed: ${body.contentType}` },
      { status: 400 },
    )
  }

  const key = generateUploadKey(body.filename)
  const url = await createPresignedUpload({
    key,
    contentType: body.contentType,
    maxSize: body.size,
  })

  return Response.json({ url, key })
}
