import AnnouncementCard from '@/components/announcement-card';
import { Button } from '@/components/ui/button';
import { getAnnouncements } from '@/server/getAnnouncements';
import Link from 'next/link';

export default async function Announcements({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const searchParamsValue = await searchParams;

  const { data, totalPages } = await getAnnouncements({
    pagination: {
      page: searchParamsValue?.page ? parseInt(searchParamsValue.page) : 1,
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
        <div className="flex flex-row justify-center">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button key={i} asChild variant={'outline'} className="mx-1">
              <Link href={`/announcements?page=${i + 1}`}>{i + 1}</Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
