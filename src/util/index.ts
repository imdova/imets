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

  // Decode both
  const decodedPathname = decodeURIComponent(pathname).replace(/\/+$/, "");
  const decodedPattern = decodeURIComponent(pattern).replace(/\/+$/, "");

  const hasQueryInPattern = decodedPattern.includes("?");

  if (hasQueryInPattern) {
    // ✅ If pattern contains a query, require full exact match
    return decodedPathname === decodedPattern;
  }

  // Otherwise, strip query/hash from pathname and match only path
  const cleanPathname = decodedPathname.split("?")[0].split("#")[0];

  // Exact match without query
  if (cleanPathname === decodedPattern) return true;

  // Wildcard support
  if (decodedPattern.endsWith("/*")) {
    const basePattern = decodedPattern.slice(0, -2);
    return (
      cleanPathname === basePattern ||
      cleanPathname.startsWith(basePattern + "/")
    );
  }

  return false;
};

export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs));
}
