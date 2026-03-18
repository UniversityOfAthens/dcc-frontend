import AnnouncementCard from '@/components/announcement-card';
import { Button } from '@/components/ui/button';
import { getAnnouncements } from '@/server/getAnnouncements';
import Image from 'next/image';
import Link from 'next/link';

export default async function Cp({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const searchParamsValue = await searchParams;

  const { data, totalPages } = await getAnnouncements({
    pagination: {
      page: searchParamsValue?.page ? parseInt(searchParamsValue.page) : 1,
      pageSize: 20,
    },
    filters: {
      section: ['cp'],
    },
  });

  return (
    <div className="flex flex-col items-center mt-15 gap-5 min-h-screen">
      <div className="lg:w-2/5 w-full flex flex-col justify-center items-center gap-6">
        <Image src={'/cp-logo.png'} alt="game dev logo" width={200} height={200} />
        <h1 className="text-center text-4xl">Competitive Programming</h1>
        {data.length === 0 && <h1 className="text-xl">Δεν υπάρχουν ακόμα ανακοινώσεις</h1>}
        {data && (
          <>
            {data.map((announcement) => {
              return <AnnouncementCard key={announcement.id} announcement={announcement} />;
            })}
          </>
        )}
        <div className="flex flex-row justify-center mb-3">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button key={i} asChild variant={'outline'} className="mx-1">
              <Link href={`/cp?page=${i + 1}`}>{i + 1}</Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
