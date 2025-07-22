// This file makes environment variables available to server components/actions.
// In a real Next.js app, these would be automatically available.
// For v0 preview, we explicitly define them here.
// IMPORTANT: Do NOT expose sensitive keys on the client side.
// These are only used in server-side code (like Server Actions).

export const DEEPL_API_KEY = process.env.DEEPL_API_KEY
export const DEEPL_API_URL = process.env.DEEPL_API_URL
