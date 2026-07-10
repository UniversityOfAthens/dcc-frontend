import TalkCard from '@/components/talk-card';
import PagePagination from '@/components/page-pagination';
import { getTalks } from '@/server/getTalks';

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
        <PagePagination
          currentPage={currentPage}
          hrefs={Array.from({ length: totalPages }).map((_, i) => `/talks?page=${i + 1}`)}
        />
      </div>
    </div>
  );
}
