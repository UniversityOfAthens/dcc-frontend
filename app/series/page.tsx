import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { EmptyState, PageContainer, PageHeader } from '@/components/page-container';
import { getSeries } from '@/server/getSeries';

export const metadata: Metadata = {
  title: 'Σειρές',
  description: 'Σειρές μαθημάτων του DIT Coding Club με πολλά επεισόδια.',
};

// Updated on demand by the admin app (app/api/revalidate), at least hourly.
export const revalidate = 3600;

export default async function Series() {
  const { data } = await getSeries({
    pagination: {
      pageSize: 50,
    },
  });

  return (
    <PageContainer>
      <PageHeader title="Σειρές" description="Σειρές μαθημάτων με πολλά επεισόδια." />
      {data.length === 0 && <EmptyState>Δεν υπάρχουν ακόμα σειρές.</EmptyState>}
      {data.map((el) => (
        <Link
          key={el.id}
          href={`/series/${el.id}`}
          className="group flex flex-col gap-2 rounded-2xl border border-transparent bg-card px-6 py-6 transition-colors hover:border-secondary/40 sm:px-7"
        >
          <h2 className="text-xl font-bold leading-snug">{el.name}</h2>
          <p className="text-sm text-foreground/60">{el.speaker}</p>
          <p className="text-[15px] leading-relaxed text-foreground/85">{el.description}</p>
          <span className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-secondary group-hover:underline">
            Παρακολούθησε
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </Link>
      ))}
    </PageContainer>
  );
}
