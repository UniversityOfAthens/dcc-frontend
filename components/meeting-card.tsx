import { Meeting } from '@/types/meeting';
import { Badge } from './ui/badge';
import { LinkButton, LinkButtons } from './link-buttons';
import { sectionLabelMap } from '@/lib/fields';

export function formatMeetingDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('el-GR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Athens',
  });
}

export default function MeetingCard({
  meeting,
  showSection = false,
}: {
  meeting: Meeting;
  showSection?: boolean;
}) {
  const parts = [meeting.url1, meeting.url2, meeting.url3].filter(
    (url): url is string => !!url && url.trim() !== '',
  );

  return (
    <article className="flex w-full min-w-0 flex-col gap-3 rounded-2xl bg-card px-6 py-6 sm:px-7">
      <div className="flex flex-wrap items-center gap-3 text-sm text-foreground/60">
        {showSection && <Badge variant={meeting.section}>{sectionLabelMap[meeting.section]}</Badge>}
        {meeting.date && <span>{formatMeetingDate(meeting.date)}</span>}
      </div>
      <h3 className="text-lg font-bold leading-snug">{meeting.title}</h3>
      {parts.length > 0 ? (
        <LinkButtons>
          {parts.map((url, i) => (
            <LinkButton key={url} href={url}>
              Μέρος {i + 1}
            </LinkButton>
          ))}
        </LinkButtons>
      ) : (
        <p className="text-sm text-foreground/60">Δεν υπάρχει καταγραφή.</p>
      )}
    </article>
  );
}
