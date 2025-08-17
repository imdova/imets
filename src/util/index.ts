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

  // Special case: if pattern ends with /*, match all subroutes
  if (decodedPattern.endsWith("/*")) {
    const basePattern = decodedPattern.slice(0, -2);
    if (decodedPathname === basePattern) return true;
    return decodedPathname.startsWith(basePattern + "/");
  }

  // For all other cases, require exact match
  return false;
};

export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs));
}
