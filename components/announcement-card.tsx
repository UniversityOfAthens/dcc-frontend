import { Announcement } from '@/types/announcement';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import { Badge } from './ui/badge';
import { sectionLabelMap } from '@/lib/fields';

export default function AnnouncementCard({
  announcement,
  showSection = false,
  date = announcement.updated,
}: {
  announcement: Announcement;
  showSection?: boolean;
  date?: string | null;
}) {
  // Sanitize HTML for safe rendering
  const sanitizedDescriptionHTML =
    typeof window !== 'undefined'
      ? DOMPurify.sanitize(announcement.description)
      : announcement.description;

  return (
    <article className="flex w-full min-w-0 flex-col gap-3 rounded-2xl bg-card px-6 py-6 sm:px-7">
      {(showSection || date) && (
        <div className="flex flex-wrap items-center gap-3 text-sm text-foreground/60">
          {showSection && (
            <Badge variant={announcement.section}>{sectionLabelMap[announcement.section]}</Badge>
          )}
          {date && <span>{date}</span>}
        </div>
      )}
      <h3 className="text-xl font-bold leading-snug">{announcement.title}</h3>
      {announcement.image && (
        <div className="w-full max-w-[400px] self-center">
          <Image
            src={announcement.image}
            alt={announcement.title}
            width={500}
            height={300}
            sizes="(max-width: 400px) 100vw, 400px"
            className="rounded-lg"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
      )}
      <div
        className="prose dark:prose-invert max-w-none break-words text-[15px] leading-relaxed text-foreground/85 prose-a:text-secondary"
        dangerouslySetInnerHTML={{ __html: sanitizedDescriptionHTML }}
      />
    </article>
  );
}
