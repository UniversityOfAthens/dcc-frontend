import { Meeting } from '@/types/meeting';
import { LinkButton, LinkButtons } from './link-buttons';

export default function MeetingCard({ meeting }: { meeting: Meeting }) {
  const parts = [meeting.url1, meeting.url2, meeting.url3].filter((url): url is string => !!url);

  return (
    <article className="flex w-full flex-col gap-3 rounded-2xl bg-card px-6 py-6 sm:px-7">
      <p className="text-sm text-foreground/60">{meeting.date.toDateString()}</p>
      <h3 className="text-xl font-bold leading-snug">{meeting.title}</h3>
      <LinkButtons>
        {parts.map((url, i) => (
          <LinkButton key={url} href={url}>
            Μέρος {i + 1}
          </LinkButton>
        ))}
      </LinkButtons>
    </article>
  );
}
