import FieldPage from '@/components/field-page';

export default async function Hackathons({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const searchParamsValue = await searchParams;
  const currentPage = searchParamsValue?.page ? parseInt(searchParamsValue.page) : 1;

  return (
    <FieldPage
      section="hackathons"
      currentPage={currentPage}
      pageHref={(page) => `/hackathons?page=${page}`}
    />
  );
}
