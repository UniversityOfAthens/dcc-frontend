import { timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { CACHE_TAGS, type CacheTag } from '@/lib/cache';

/**
 * Called by the admin app (dcc-backend) after it changes content:
 *   POST /api/revalidate
 *   Authorization: Bearer <REVALIDATE_SECRET>
 *   { "tags": ["announcements"] }
 */
function isAuthorized(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const header = request.headers.get('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length) : '';
  if (!secret || !token) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Body must be JSON: { "tags": [...] }' }, { status: 400 });
  }

  const requested = (body as { tags?: unknown })?.tags;
  const tags = Array.isArray(requested)
    ? requested.filter((tag): tag is CacheTag => CACHE_TAGS.includes(tag as CacheTag))
    : [];
  if (tags.length === 0) {
    return NextResponse.json(
      { error: `Send at least one known tag: ${CACHE_TAGS.join(', ')}` },
      { status: 400 },
    );
  }

  for (const tag of tags) revalidateTag(tag, { expire: 0 });
  return NextResponse.json({ revalidated: tags });
}
