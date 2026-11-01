import type { Metadata } from 'next';
import FieldPage, { type FieldSearchParams } from '@/components/field-page';
import { getField } from '@/lib/fields';

const field = getField('gamedev');

export const metadata: Metadata = {
  title: field.title,
  description: field.description,
};

export default async function GameDev({
  searchParams,
}: {
  searchParams: Promise<FieldSearchParams>;
}) {
  return <FieldPage section="gamedev" searchParams={await searchParams} />;
}
