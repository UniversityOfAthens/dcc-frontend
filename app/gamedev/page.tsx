import FieldPage from '@/components/field-page';

export default async function GameDev({
  searchParams,
}: {
  searchParams: Promise<{ aPage: string; mPage: string }>;
}) {
  const searchParamsValue = await searchParams;
  const currentPage = searchParamsValue?.aPage ? parseInt(searchParamsValue.aPage) : 1;
  const mPage = searchParamsValue?.mPage ? parseInt(searchParamsValue.mPage) : 1;

  return (
    <FieldPage
      section="gamedev"
      currentPage={currentPage}
      pageHref={(page) => `/gamedev?aPage=${page}&mPage=${mPage}`}
    />
  );
}
