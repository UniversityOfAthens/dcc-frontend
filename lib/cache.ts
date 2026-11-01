import 'server-only';
import { unstable_cache } from 'next/cache';

/**
 * Firestore reads are cached and tagged by collection. The admin app calls
 * POST /api/revalidate with the tags it changed, so new content shows up right away
 * without a redeploy. REVALIDATE_SECONDS is only a fallback in case such a call fails.
 */
export const CACHE_TAGS = ['announcements', 'talks', 'meetings', 'series', 'hall-of-fame'] as const;
export type CacheTag = (typeof CACHE_TAGS)[number];

export const REVALIDATE_SECONDS = 3600;

export function cached<Args extends unknown[], Result>(
  fn: (...args: Args) => Promise<Result>,
  key: string,
  tags: CacheTag[],
) {
  return unstable_cache(fn, [key], { tags, revalidate: REVALIDATE_SECONDS });
}
