import { Talk } from '@/types/talk';
import Image from 'next/image';
import { LinkButton, LinkButtons } from './link-buttons';

export default function TalkCard({ talk }: { talk: Talk }) {
  const parts = [talk.url1, talk.url2, talk.url3].filter((url): url is string => !!url);

  return (
    <article className="flex w-full min-w-0 flex-col gap-3 rounded-2xl bg-card px-6 py-6 sm:px-7">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground/60">
        <span>{talk.speaker}</span>
        {talk.created && <span>· {talk.created}</span>}
      </div>
      <h3 className="text-xl font-bold leading-snug">{talk.title}</h3>
      {talk.image && (
        <div className="w-full max-w-md self-center">
          <Image
            src={talk.image}
            alt={`Image for ${talk.title}`}
            width={500}
            height={300}
            sizes="(max-width: 448px) 100vw, 448px"
            className="rounded-lg object-cover"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      )}
      <div
        className="prose dark:prose-invert max-w-none break-words text-[15px] leading-relaxed text-foreground/85 prose-a:text-secondary"
        dangerouslySetInnerHTML={{ __html: talk.description }}
      />
      {parts.length > 0 && (
        <LinkButtons>
          {parts.map((url, i) => (
            <LinkButton key={url} href={url}>
              Μέρος {i + 1}
            </LinkButton>
          ))}
        </LinkButtons>
      )}
    </article>
  );
}
