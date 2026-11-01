import type { Metadata } from 'next';
import FieldPage, { type FieldSearchParams } from '@/components/field-page';
import { getField } from '@/lib/fields';

const field = getField('art3d');

export const metadata: Metadata = {
  title: field.title,
  description: field.description,
};

export default async function Art3d({
  searchParams,
}: {
  searchParams: Promise<FieldSearchParams>;
}) {
  return <FieldPage section="art3d" searchParams={await searchParams} />;
}
