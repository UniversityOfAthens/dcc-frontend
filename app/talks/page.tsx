import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import TalkCard from '@/components/talk-card';
import PagePagination from '@/components/page-pagination';
import { EmptyState, PageContainer, PageHeader } from '@/components/page-container';
import { getTalks } from '@/server/getTalks';

export const metadata: Metadata = {
  title: 'Ομιλίες',
  description: 'Καταγραφές από τις ομιλίες του DIT Coding Club.',
};

export default async function Talks({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const searchParamsValue = await searchParams;
  const currentPage = searchParamsValue?.page ? parseInt(searchParamsValue.page) : 1;

  const { data, totalPages } = await getTalks({
    pagination: {
      page: currentPage,
      pageSize: 20,
    },
  });

  return (
    <PageContainer>
      <PageHeader title="Ομιλίες" description="Οι καταγραφές από τις ομιλίες του club." />
      <Link
        href="/talks/propose"
        className="group flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-secondary/30 bg-secondary/5 px-6 py-5 transition-colors hover:bg-secondary/10"
      >
        <span>
          <span className="block font-bold">Θέλεις να μιλήσεις κι εσύ;</span>
          <span className="text-sm text-foreground/65">
            Πρότεινε ένα θέμα και κανονίζουμε μαζί ημερομηνία και αίθουσα.
          </span>
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-bold text-secondary group-hover:underline">
          Κάνε μια ομιλία
          <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      </Link>
      {data.length === 0 && <EmptyState>Δεν υπάρχουν ακόμα ομιλίες.</EmptyState>}
      {data.map((talk) => (
        <TalkCard key={talk.id} talk={talk} />
      ))}
      <PagePagination
        currentPage={currentPage}
        hrefs={Array.from({ length: totalPages }).map((_, i) => `/talks?page=${i + 1}`)}
      />
    </PageContainer>
  );
}
