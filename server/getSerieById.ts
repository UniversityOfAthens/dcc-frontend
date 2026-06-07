'use server';

import { firestore } from '@/firebase/server';
import { Serie } from '@/types/serie';

export const getSerieById = async (serieId: string) => {
  const serieSnapshot = await firestore.collection('series').doc(serieId).get();

  if (!serieSnapshot.exists) {
    return null;
  }

  const serieData = { id: serieSnapshot.id, ...serieSnapshot.data() } as Serie;

  return serieData;
};
