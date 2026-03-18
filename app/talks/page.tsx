import TalkCard from '@/components/talk-card';
import { Button } from '@/components/ui/button';
import { getTalks } from '@/server/getTalks';
import Link from 'next/link';

export default async function Talks({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const searchParamsValue = await searchParams;

  const { data, totalPages } = await getTalks({
    pagination: {
      page: searchParamsValue?.page ? parseInt(searchParamsValue.page) : 1,
      pageSize: 20,
    },
  });

  return (
    <div className="w-full min-h-screen flex flex-col gap-4 justify-center items-center my-5">
      <div className="lg:w-2/5 w-full flex flex-col justify-center items-center gap-6">
        <h1 className="text-3xl text-center">Ομιλίες</h1>
        {data.length === 0 && <h1 className="text-xl">There are no talks</h1>}
        {data && (
          <>
            {data.map((talk) => {
              return <TalkCard key={talk.id} talk={talk} />;
            })}
          </>
        )}
        <div className="flex flex-row justify-center">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button key={i} asChild variant={'outline'} className="mx-1">
              <Link href={`/talks?page=${i + 1}`}>{i + 1}</Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
