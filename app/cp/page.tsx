import type { Metadata } from 'next';
import FieldPage, { type FieldSearchParams } from '@/components/field-page';
import { getField } from '@/lib/fields';

const field = getField('cp');

export const metadata: Metadata = {
  title: field.title,
  description: field.description,
};

export default async function Cp({ searchParams }: { searchParams: Promise<FieldSearchParams> }) {
  return <FieldPage section="cp" searchParams={await searchParams} />;
}
