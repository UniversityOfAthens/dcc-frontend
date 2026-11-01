import 'server-only';
import { cached } from '@/lib/cache';
import { sanitizeDescription } from '@/lib/sanitize';

import { firestore, getTotalPages } from '@/firebase/server';
import { Talk } from '@/types/talk';

type GetTalksOptions = {
  pagination?: {
    pageSize?: number;
    page?: number;
  };
};

const loadTalks = async (options?: GetTalksOptions) => {
  const page = options?.pagination?.page || 1;
  const pageSize = options?.pagination?.pageSize || 10;

  const talksQuery = firestore.collection('talks').orderBy('updated', 'desc');

  const totalPages = await getTotalPages(talksQuery, pageSize);

  const talksSnapshot = await talksQuery
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .get();

  const talks = talksSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
        created: doc.data().updated?.toDate().toLocaleString('el-GR') || null,
        updated: doc.data().updated?.toDate().toLocaleString('el-GR') || null,
        image: doc.data().image || null,
        description: sanitizeDescription(doc.data().description),
      }) as Talk,
  );

  return { data: talks, totalPages };
};

export const getTalks = cached(loadTalks, 'getTalks', ['talks']);
