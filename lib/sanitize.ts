import 'server-only';
import sanitize from 'sanitize-html';

// Announcement and talk descriptions are HTML written in the admin app (Quill + markdown).
// They are sanitized once on the server so pages can render them directly.
export function sanitizeDescription(html: string | undefined | null): string {
  if (!html) return '';
  return sanitize(html, {
    allowedTags: [...sanitize.defaults.allowedTags, 'img', 'h1', 'h2', 'span', 'u', 's', 'del'],
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height'],
      '*': ['class'],
    },
    allowedClasses: {
      '*': [/^ql-/],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: sanitize.simpleTransform('a', { rel: 'noopener noreferrer' }),
    },
  });
}
