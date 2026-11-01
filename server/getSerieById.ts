import 'server-only';
import { cached } from '@/lib/cache';

import { firestore } from '@/firebase/server';
import { Serie } from '@/types/serie';

const loadSerieById = async (serieId: string) => {
  const serieSnapshot = await firestore.collection('series').doc(serieId).get();

  if (!serieSnapshot.exists) {
    return null;
  }

  const data = serieSnapshot.data();
  const serieData = {
    id: serieSnapshot.id,
    ...data,
    created: data?.created?.toDate?.().toISOString(),
    updated: data?.updated?.toDate?.().toISOString(),
  } as Serie;

  return serieData;
};

export const getSerieById = cached(loadSerieById, 'getSerieById', ['series']);
