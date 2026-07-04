import { Redis } from '@upstash/redis';

// Vercel's older KV integration used KV_REST_* names, while Upstash's Redis
// client reads UPSTASH_REDIS_REST_*. Accept both so existing envs keep working.
const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

export const kv =
  url && token
    ? new Redis({ url, token })
    : (new Proxy(
        {},
        {
          get() {
            throw new Error(
              'Missing Upstash Redis env: set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN'
            );
          },
        }
      ) as Redis);
