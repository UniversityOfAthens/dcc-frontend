import AnnouncementCard from '@/components/announcement-card';
import MeetingCard from '@/components/meeting-card';
import PagePagination from '@/components/page-pagination';
import { EmptyState, PageContainer, PageHeader, SectionTitle } from '@/components/page-container';
import { getAnnouncements } from '@/server/getAnnouncements';
import { getMeetings } from '@/server/getMeetings';
import { Field, getField } from '@/lib/fields';

export type FieldSearchParams = { page?: string; aPage?: string; mPage?: string };

const toPage = (value?: string) => {
  const n = value ? parseInt(value) : 1;
  return Number.isFinite(n) && n > 0 ? n : 1;
};

export default async function FieldPage({
  section,
  searchParams,
}: {
  section: Field['section'];
  searchParams: FieldSearchParams;
}) {
  const field = getField(section);
  // `aPage` is the old name of the announcements page parameter; keep old links working.
  const announcementsPage = toPage(searchParams.page ?? searchParams.aPage);
  const meetingsPage = toPage(searchParams.mPage);

  const [announcements, meetings] = await Promise.all([
    getAnnouncements({
      pagination: { page: announcementsPage, pageSize: 20 },
      filters: { section: [section] },
    }),
    getMeetings({
      pagination: { page: meetingsPage, pageSize: 6 },
      filters: { section: [section] },
    }),
  ]);

  const href = (page: number, mPage: number) => `${field.pageUrl}?page=${page}&mPage=${mPage}`;

  return (
    <PageContainer>
      <PageHeader title={field.title} description={field.description} imageUrl={field.imageUrl} />

      <SectionTitle>Ανακοινώσεις</SectionTitle>
      {announcements.data.length === 0 && <EmptyState>Δεν υπάρχουν ακόμα ανακοινώσεις.</EmptyState>}
      {announcements.data.map((announcement) => (
        <AnnouncementCard key={announcement.id} announcement={announcement} />
      ))}
      <PagePagination
        currentPage={announcementsPage}
        hrefs={Array.from({ length: announcements.totalPages }, (_, i) =>
          href(i + 1, meetingsPage),
        )}
      />

      {meetings.data.length > 0 && (
        <>
          <div className="mt-8">
            <SectionTitle>Καταγραφές συναντήσεων</SectionTitle>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {meetings.data.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
          <PagePagination
            currentPage={meetingsPage}
            hrefs={Array.from({ length: meetings.totalPages }, (_, i) =>
              href(announcementsPage, i + 1),
            )}
          />
        </>
      )}
    </PageContainer>
  );
}
