import { error } from "console";
import { Logger } from "./logger";
import { Redis } from "@upstash/redis";
import { ScrapedContent } from "./get-scraped";

const redis = Redis.fromEnv();

// Define the cache time-to-live (TTL) in seconds
const CACHE_TTL = 60 * 60; // 1 hour
const MAX_CACHE_SIZE = 1024000; // Maximum storage available to cache (1MB limit)

// Function to get cache key
function getCacheKey(url: string): string {
  // Receiving a TypeError: url.substring is not a function
  // const sanitizedUrl = url.substring(0, 100); //limit the length of the URL/key length
  // return `scrape:${sanitizedUrl}`;
  return url;
}

// Function to validate ScrapedContent
/* 
Need to set up testing for this function b/c I am receiving
Invalid content to cache: [ 'https://blog.google/technology/developers/google-gemma-2/' ]
*/
function isValidScrapedContent(content: any): content is ScrapedContent {
  return (
    typeof content === "object" &&
    content !== null &&
    typeof content.url === "string" &&
    typeof content.title === "string" &&
    typeof content.headings.h1 === "string" &&
    typeof content.headings.h2 === "string" &&
    typeof content.metaDescription === "string" &&
    typeof content.content === "string" &&
    (content.error === null || typeof content.error === "string")
  );
}

// Function to get cached content
// this function will return ScrapedContent or null
export async function getCachedContent(
  url: string
): Promise<ScrapedContent | null> {
  try {
    const cacheKey = getCacheKey(url);
    console.log(`Checking cache for key: ${cacheKey}`);
    const cachedContent = await redis.get(cacheKey);

    if (!cachedContent) {
      console.log(`Cache miss - no cache content for: ${url}`);
      return null;
    }

    console.log(`Cache hit - found cache content for: ${url}`);

    //Handle both string and object responses from Redis
    let parsed: any;
    if (typeof cachedContent === "string") {
      try {
        parsed = JSON.parse(cachedContent);
      } catch (parseError) {
        console.error("Error parsing cached content:", parseError);
        await redis.del(cacheKey); // Delete the key if parsing fails
        return null;
      }
    } else {
      parsed = cachedContent;
    }

    if (isValidScrapedContent(parsed)) {
      const age = Date.now() - (parsed.cachedAt || 0);
      console.info(`Cache content age: ${Math.round(age / 1000 / 60)} minutes`);
      return parsed;
    }

    console.warn(`Invalid cache content for: ${url}`);
    await redis.del(cacheKey); // Delete the key if the content is invalid
    return null;
  } catch (error) {
    console.error("Error getting cached content:", error);
    return null;
  }
}

// Function to cache the scraped content
export async function cacheScrapedContent(
  url: string,
  content: ScrapedContent
): Promise<void> {
  try {
    const cacheKey = getCacheKey(url);
    console.log(`Caching content for key: ${cacheKey}`);
    content.cachedAt = Date.now();
    // Validate content before serializing and storing
    if (!isValidScrapedContent(content)) {
      console.warn("Invalid content to cache:", url);
      return;
    }

    // Serialize the content
    const serializedContent = JSON.stringify(content);

    // verify serialized content is not too large
    if (serializedContent.length > MAX_CACHE_SIZE) {
      console.warn("Content too large to cache:", url);
      return;
    }

    // store serialized content in Redis
    await redis.set(cacheKey, serializedContent, { ex: CACHE_TTL });
    console.info(
      `Successfully cached content for: ${url} (${serializedContent.length} bytes, TTL: ${CACHE_TTL})`
    );
  } catch (error) {
    console.error("Error caching content:", error);
  }
}
