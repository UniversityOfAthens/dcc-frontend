import 'server-only';
import { cached } from '@/lib/cache';

import { firestore } from '@/firebase/server';
import { HallOfFameEntry } from '@/types/hall-of-fame-entry';

const loadHallOfFameEntries = async () => {
  const hallOfFameCollection = firestore.collection('hallOfFameEntries').orderBy('title');

  const hallOfFameSnapshot = await hallOfFameCollection.get();

  const entries: HallOfFameEntry[] = hallOfFameSnapshot.docs.map((doc) => {
    const raw = doc.data();
    return {
      id: doc.id,
      title: raw.title ?? '',
      description: raw.description ?? '',
      imageUrl: raw.imageUrl ?? '',
      winner: raw.winner ?? '',
      result: raw.result,
      competitionUrl: raw.competitionUrl,
    };
  });

  return { data: entries };
};

export const getHallOfFameEntries = cached(loadHallOfFameEntries, 'getHallOfFameEntries', [
  'hall-of-fame',
]);
