export {}

declare global {
  namespace PrismaJson {
    type EventMetadata = {
      source?: string
      ip?: string
      [key: string]: unknown
    }
  }
}
