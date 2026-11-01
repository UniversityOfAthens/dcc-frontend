import type { Metadata } from 'next';
import FieldPage, { type FieldSearchParams } from '@/components/field-page';
import { getField } from '@/lib/fields';

const field = getField('security');

export const metadata: Metadata = {
  title: field.title,
  description: field.description,
};

export default async function Security({
  searchParams,
}: {
  searchParams: Promise<FieldSearchParams>;
}) {
  return <FieldPage section="security" searchParams={await searchParams} />;
}
