# File Uploads (S3-Compatible)

Direct-to-S3 file uploads using presigned URLs. Works with any S3-compatible store: AWS S3, Cloudflare R2, MinIO, Backblaze B2.

## Setup

### 1. Create a Bucket

Create a bucket with your S3-compatible provider and generate access credentials (access key ID + secret access key).

### 2. Configure CORS on the Bucket

Your bucket must allow `PUT` requests from your app's origin. Example CORS configuration:

```json
[
  {
    "AllowedOrigins": ["http://localhost:3000", "https://yourdomain.com"],
    "AllowedMethods": ["PUT"],
    "AllowedHeaders": ["Content-Type"],
    "MaxAgeSeconds": 3600
  }
]
```

### 3. Set Environment Variables

Set the following in `.env.schema`:

```bash
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET=your-bucket-name
S3_REGION=us-east-1
```

**For non-AWS providers**, also set `S3_ENDPOINT`:

| Provider | Endpoint |
|---|---|
| Cloudflare R2 | `https://<account-id>.r2.cloudflarestorage.com` |
| MinIO | `http://localhost:9000` (or your MinIO URL) |
| Backblaze B2 | `https://s3.<region>.backblazeb2.com` |

For R2, set `S3_REGION=auto`.

## Usage

### FileUpload Component

```tsx
import { FileUpload } from "@/components/file-upload"

function MyPage() {
  return (
    <FileUpload
      accept="image/*,.pdf"
      maxSizeMB={5}
      multiple
      onUploadComplete={(results) => {
        // results: { file: File, key: string }[]
        console.log("Uploaded:", results)
      }}
      onError={(error) => {
        console.error("Upload error:", error)
      }}
    />
  )
}
```

### Server-Side Helpers

```ts
import { createPresignedDownload, deleteObject } from "@/lib/storage"

// Generate a download URL
const url = await createPresignedDownload({ key: "uploads/2026/04/abc123-photo.jpg" })

// Delete a file
await deleteObject({ key: "uploads/2026/04/abc123-photo.jpg" })
```

## Key Files

| File | Purpose |
|---|---|
| `lib/storage.ts` | S3 client, presigned URL helpers, key generator |
| `app/api/uploads/presign/route.ts` | API route — validates and returns presigned PUT URL |
| `components/file-upload.tsx` | Drag-and-drop upload component with progress |

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `S3_ACCESS_KEY_ID` | Yes | S3 access key ID |
| `S3_SECRET_ACCESS_KEY` | Yes | S3 secret access key |
| `S3_BUCKET` | Yes | S3 bucket name |
| `S3_REGION` | Yes | S3 region (default: `us-east-1`, use `auto` for R2) |
| `S3_ENDPOINT` | No | S3 endpoint URL (required for R2, MinIO, Backblaze) |
