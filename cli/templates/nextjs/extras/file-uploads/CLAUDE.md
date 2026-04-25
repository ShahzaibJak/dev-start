# Project Instructions

## File Uploads

- `lib/storage.ts` — S3 client and presigned URL helpers. Do not import `S3Client` directly — use the exported helper functions.
- `components/file-upload.tsx` — Client component for file uploads. Uses the presign API route internally.
- `app/api/uploads/presign/route.ts` — Returns a presigned PUT URL for direct client-to-S3 upload. Validates file size and content type.
- No auth or database layer — add middleware to the presign route if you need access control.
- Uploads go to `uploads/{year}/{month}/{id}-{filename}` — see `generateUploadKey()` in `lib/storage.ts`.
- To add persistence, call your database after `onUploadComplete` with the returned `key`.
