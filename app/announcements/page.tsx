import AnnouncementCard from '@/components/announcement-card';
import PagePagination from '@/components/page-pagination';
import { getAnnouncements } from '@/server/getAnnouncements';

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
    <div className="flex flex-col w-full min-h-screen gap-4 my-5 items-center justify-center">
      <div className="lg:w-2/5 w-full flex flex-col justify-center items-center gap-6">
        <h1 className="text-3xl text-center">Ανακοινώσεις</h1>
        {data.length === 0 && <h1 className="text-xl">There are no announcements :(</h1>}
        {data && (
          <>
            {data.map((announcement) => {
              return <AnnouncementCard key={announcement.id} announcement={announcement} />;
            })}
          </>
        )}
        <PagePagination
          currentPage={currentPage}
          hrefs={Array.from({ length: totalPages }).map((_, i) => `/announcements?page=${i + 1}`)}
        />
      </div>
    </div>
  );
}
