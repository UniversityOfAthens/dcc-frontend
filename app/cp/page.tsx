import FieldPage from '@/components/field-page';

export default async function Cp({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const searchParamsValue = await searchParams;
  const currentPage = searchParamsValue?.page ? parseInt(searchParamsValue.page) : 1;

  return (
    <FieldPage section="cp" currentPage={currentPage} pageHref={(page) => `/cp?page=${page}`} />
  );
}
