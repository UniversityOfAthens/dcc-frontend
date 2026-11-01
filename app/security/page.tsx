import FieldPage from '@/components/field-page';

export default async function Security({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const searchParamsValue = await searchParams;
  const currentPage = searchParamsValue?.page ? parseInt(searchParamsValue.page) : 1;

  return (
    <FieldPage
      section="security"
      currentPage={currentPage}
      pageHref={(page) => `/security?page=${page}`}
    />
  );
}
