// DONE: Implement the code here to add rate limiting with Redis
// Refer to the Next.js Docs: https://nextjs.org/docs/app/building-your-application/routing/middleware
// Refer to Redis docs on Rate Limiting: https://upstash.com/docs/redis/sdks/ratelimit-ts/algorithms

import { Ratelimit } from "@upstash/ratelimit";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Redis } from "@upstash/redis";

// Create a new instance of the Ratelimit class
// Set the Redis connection and the rate limiter algorithm
// Use the slidingWindow algorithm with a limit of 10 requests per 60 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "60 s"),
  analytics: true,
});

export async function middleware(request: NextRequest) {
  try {
    // Create a unique identifier for the user based on their IP address
    const identifier =
      request.headers.get("x-real-ip") ??
      request.headers.get("x-forwarded-for") ??
      "127.0.0.1";
    const { success, remaining, limit, reset } =
      await ratelimit.limit(identifier);

    // If the user has not exceeded the rate limit, allow the request to proceed
    const response = success
      ? NextResponse.next()
      : NextResponse.json(
          {
            message: `Too many requests, please wait ${remaining / 1000} seconds before you make another request`,
          },
          { status: 429 }
        );

    // Add the rate limit headers to the response
    response.headers.set("X-RateLimit-Limit", limit.toString());
    // question: could we set this to the groq "retry-after" header value?
    response.headers.set("X-RateLimit-Remaining", remaining.toString());
    response.headers.set("X-RateLimit-Reset", reset.toString());

    return response;
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error();
  }
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except static files and images
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
