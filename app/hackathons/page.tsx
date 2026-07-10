import AnnouncementCard from '@/components/announcement-card';
import PagePagination from '@/components/page-pagination';
import { getAnnouncements } from '@/server/getAnnouncements';
import Image from 'next/image';

export default async function Cp({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const searchParamsValue = await searchParams;
  const currentPage = searchParamsValue?.page ? parseInt(searchParamsValue.page) : 1;

  const { data, totalPages } = await getAnnouncements({
    pagination: {
      page: currentPage,
      pageSize: 20,
    },
    filters: {
      section: ['hackathons'],
    },
  });

  return (
    <div className="flex flex-col items-center mt-15 mb-5 gap-5 min-h-screen">
      <div className="lg:w-2/5 w-full flex flex-col justify-center items-center gap-6">
        <Image src={'/h-logo.png'} alt="game dev logo" width={200} height={200} />
        <h1 className="text-center text-4xl">Hackathons</h1>
        {data.length === 0 && <h1 className="text-xl">Δεν υπάρχουν ακόμα ανακοινώσεις</h1>}
        {data && (
          <>
            {data.map((announcement) => {
              return <AnnouncementCard key={announcement.id} announcement={announcement} />;
            })}
          </>
        )}
        <PagePagination
          currentPage={currentPage}
          hrefs={Array.from({ length: totalPages }).map((_, i) => `/hackathons?page=${i + 1}`)}
        />
      </div>
    </div>
  );
}
