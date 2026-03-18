import AnnouncementCard from '@/components/announcement-card';
import { Button } from '@/components/ui/button';
import { getAnnouncements } from '@/server/getAnnouncements';
import Image from 'next/image';
import Link from 'next/link';

export default async function Art3d({
  searchParams,
}: {
  searchParams: Promise<{ aPage: string; mPage: string }>;
}) {
  const searchParamsValue = await searchParams;

  const { data: announcementData, totalPages: totalAnnouncementsPages } = await getAnnouncements({
    pagination: {
      page: searchParamsValue?.aPage ? parseInt(searchParamsValue.aPage) : 1,
      pageSize: 20,
    },
    filters: {
      section: ['art3d'],
    },
  });

  return (
    <div className="flex flex-col items-center mt-15 gap-5 min-h-screen">
      <div className="lg:w-2/5 w-full flex flex-col justify-center items-center gap-6">
        <Image src={'/art3d-logo.png'} alt="game dev logo" width={200} height={200} />
        <h1 className="text-center text-4xl">3D Art</h1>
        <h2 className="text-center text-2xl">Ανακοινώσεις</h2>
        {announcementData.length === 0 && (
          <h1 className="text-xl">Δεν υπάρχουν ακόμα ανακοινώσεις</h1>
        )}
        {announcementData && (
          <>
            {announcementData.map((announcement) => {
              return <AnnouncementCard key={announcement.id} announcement={announcement} />;
            })}
          </>
        )}
        <div className="flex flex-row justify-center mb-3">
          {Array.from({ length: totalAnnouncementsPages }).map((_, i) => (
            <Button key={i} asChild variant={'outline'} className="mx-1">
              <Link
                href={`/art3d?aPage=${i + 1}&mPage=${searchParamsValue?.mPage ? parseInt(searchParamsValue.mPage) : 1}`}
              >
                {i + 1}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
