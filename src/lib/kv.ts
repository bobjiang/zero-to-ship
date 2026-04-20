// Vercel's Marketplace Redis integration provisions UPSTASH_REDIS_REST_URL /
// UPSTASH_REDIS_REST_TOKEN. @vercel/kv only reads KV_REST_API_URL /
// KV_REST_API_TOKEN, so alias them before the client lazy-initializes.
// Why: without this, prod throws "@vercel/kv: Missing required environment
// variables" and every POST to /api/submissions or /api/votes 500s.
if (!process.env.KV_REST_API_URL && process.env.UPSTASH_REDIS_REST_URL) {
  process.env.KV_REST_API_URL = process.env.UPSTASH_REDIS_REST_URL;
}
if (!process.env.KV_REST_API_TOKEN && process.env.UPSTASH_REDIS_REST_TOKEN) {
  process.env.KV_REST_API_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
}

export { kv } from '@vercel/kv';
