import FieldPage from '@/components/field-page';

export default async function Art3d({
  searchParams,
}: {
  searchParams: Promise<{ aPage: string; mPage: string }>;
}) {
  const searchParamsValue = await searchParams;
  const currentPage = searchParamsValue?.aPage ? parseInt(searchParamsValue.aPage) : 1;
  const mPage = searchParamsValue?.mPage ? parseInt(searchParamsValue.mPage) : 1;

  return (
    <FieldPage
      section="art3d"
      currentPage={currentPage}
      pageHref={(page) => `/art3d?aPage=${page}&mPage=${mPage}`}
    />
  );
}
