import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Checks if the current pathname matches the given pattern, supporting:
 * - Exact matches
 * - Dynamic segments
 * - Arabic/encoded characters in URLs
 * - Catch-all routes
 * - Optional catch-all routes
 * - Wildcard patterns
 */
export const isCurrentPage = (pathname: string, pattern: string): boolean => {
  if (!pathname || !pattern) return false;

  // Decode both pathname and pattern for proper comparison
  const decodedPathname = decodeURIComponent(pathname).replace(/\/+$/, "");
  const decodedPattern = decodeURIComponent(pattern).replace(/\/+$/, "");

  // Handle exact matches first (after decoding)
  if (decodedPathname === decodedPattern) return true;

  // Convert Next.js dynamic route pattern to regex
  let regexPattern = decodedPattern
    // Replace optional catch-all segments
    .replace(/\[\[\.\.\.(.*?)]]/g, "(?:/(.*))?")
    // Replace catch-all segments
    .replace(/\[\.\.\.(.*?)]/g, "(?:/(.*))")
    // Replace dynamic segments
    .replace(/\[(.*?)]/g, "([^/]+)")
    // Escape special regex characters
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    // Convert to regex pattern
    .replace(/\//g, "\\/");

  // Handle wildcard patterns
  if (regexPattern.includes("*")) {
    regexPattern = regexPattern.replace(/\*/g, ".*");
  }

  // Create regex with start/end anchors
  const routeRegex = new RegExp(`^${regexPattern}$`);

  return routeRegex.test(decodedPathname);
};

export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs));
}
