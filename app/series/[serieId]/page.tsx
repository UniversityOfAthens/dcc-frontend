import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PageContainer, PageHeader, SectionTitle } from '@/components/page-container';
import { LinkButton, LinkButtons } from '@/components/link-buttons';
import { getSerieById } from '@/server/getSerieById';

export default async function Serie({ params }: { params: Promise<{ serieId: string }> }) {
  const paramsValue = await params;
  const serie = await getSerieById(paramsValue.serieId);

  if (!serie) notFound();

  return (
    <PageContainer wide>
      <Link
        href="/series"
        className="inline-flex items-center gap-1 self-start text-sm font-bold text-secondary hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Όλες οι σειρές
      </Link>
      <PageHeader
        title={serie.name}
        description={
          <>
            <span className="block text-sm text-foreground/60">{serie.speaker}</span>
            <span className="mt-3 block">{serie.description}</span>
          </>
        }
      />
      <SectionTitle>Επεισόδια</SectionTitle>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {serie.episodes.map((el, index) => {
          const hasRecording = el.link1.trim().length !== 0;
          const hasNotes = el.notes.trim().length !== 0;
          return (
            <article key={index} className="flex flex-col gap-4 rounded-2xl bg-card px-6 py-6">
              <h3 className="text-lg font-bold leading-snug">{el.name}</h3>
              {!hasRecording && <p className="text-sm text-foreground/60">Δεν υπήρξε καταγραφή</p>}
              {(hasRecording || hasNotes) && (
                <LinkButtons>
                  {hasRecording && <LinkButton href={el.link1}>Μέρος 1</LinkButton>}
                  {hasRecording && el.link2.trim().length !== 0 && (
                    <LinkButton href={el.link2}>Μέρος 2</LinkButton>
                  )}
                  {hasNotes && <LinkButton href={el.notes}>Σημειώσεις</LinkButton>}
                </LinkButtons>
              )}
            </article>
          );
        })}
      </div>
    </PageContainer>
  );
}
