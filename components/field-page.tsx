import AnnouncementCard from '@/components/announcement-card';
import PagePagination from '@/components/page-pagination';
import { EmptyState, PageContainer, PageHeader, SectionTitle } from '@/components/page-container';
import { getAnnouncements } from '@/server/getAnnouncements';
import { Field, getField } from '@/lib/fields';

export default async function FieldPage({
  section,
  currentPage,
  pageHref,
}: {
  section: Field['section'];
  currentPage: number;
  pageHref: (page: number) => string;
}) {
  const field = getField(section);
  const { data, totalPages } = await getAnnouncements({
    pagination: { page: currentPage, pageSize: 20 },
    filters: { section: [section] },
  });

  return (
    <PageContainer>
      <PageHeader title={field.title} description={field.description} imageUrl={field.imageUrl} />
      <SectionTitle>Ανακοινώσεις</SectionTitle>
      {data.length === 0 && <EmptyState>Δεν υπάρχουν ακόμα ανακοινώσεις.</EmptyState>}
      {data.map((announcement) => (
        <AnnouncementCard key={announcement.id} announcement={announcement} />
      ))}
      <PagePagination
        currentPage={currentPage}
        hrefs={Array.from({ length: totalPages }, (_, i) => pageHref(i + 1))}
      />
    </PageContainer>
  );
}
