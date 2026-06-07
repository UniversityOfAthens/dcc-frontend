'use server';

import { firestore, getTotalPages } from '@/firebase/server';
import { Serie } from '@/types/serie';

type GetSeriesOptions = {
  pagination?: {
    pageSize?: number;
    page?: number;
  };
};

export const getSeries = async (options?: GetSeriesOptions) => {
  const page = options?.pagination?.page || 1;
  const pageSize = options?.pagination?.pageSize || 10;

  const seriesQuery = firestore.collection('series').orderBy('updated', 'desc');

  const totalPages = await getTotalPages(seriesQuery, pageSize);

  const seriesSnapshot = await seriesQuery
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .get();

  const series = seriesSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
        created: doc.data().created?.toDate().toLocaleString('el-GR') || null,
        updated: doc.data().updated?.toDate().toLocaleString('el-GR') || null,
      }) as Serie,
  );

  return { data: series, totalPages };
};
