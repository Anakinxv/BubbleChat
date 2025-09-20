import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { redis } from "./redis";

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const rateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(10, "1m"),
  analytics: true,

  prefix: "@upstash/ratelimit",
});

export default rateLimit;
