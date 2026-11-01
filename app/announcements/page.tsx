import type { Metadata } from 'next';
import AnnouncementCard from '@/components/announcement-card';
import PagePagination from '@/components/page-pagination';
import { EmptyState, PageContainer, PageHeader } from '@/components/page-container';
import { getAnnouncements } from '@/server/getAnnouncements';

export const metadata: Metadata = {
  title: 'Ανακοινώσεις',
  description: 'Τα νέα και οι ανακοινώσεις του DIT Coding Club.',
};

export default async function Announcements({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const searchParamsValue = await searchParams;
  const currentPage = searchParamsValue?.page ? parseInt(searchParamsValue.page) : 1;

  const { data, totalPages } = await getAnnouncements({
    pagination: {
      page: currentPage,
      pageSize: 20,
    },
    filters: {
      section: ['general'],
    },
  });

  return (
    <PageContainer>
      <PageHeader title="Ανακοινώσεις" description="Τα νέα του Coding Club." />
      {data.length === 0 && <EmptyState>Δεν υπάρχουν ακόμα ανακοινώσεις.</EmptyState>}
      {data.map((announcement) => (
        <AnnouncementCard key={announcement.id} announcement={announcement} />
      ))}
      <PagePagination
        currentPage={currentPage}
        hrefs={Array.from({ length: totalPages }).map((_, i) => `/announcements?page=${i + 1}`)}
      />
    </PageContainer>
  );
}
