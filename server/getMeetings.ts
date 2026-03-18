'use server';

import { firestore, getTotalPages } from '@/firebase/server';
import { Meeting } from '@/types/meeting';
import { Section } from '@/types/section';

type GetMeetingsOptions = {
  pagination?: {
    pageSize?: number;
    page?: number;
  };
  filters?: {
    section?: Section[] | null;
  };
};

export const getMeetings = async (options?: GetMeetingsOptions) => {
  const page = options?.pagination?.page || 1;
  const pageSize = options?.pagination?.pageSize || 10;
  const { section } = options?.filters || {};

  let meetingsQuery = firestore.collection('meetings').orderBy('date', 'desc');

  if (section) {
    meetingsQuery = meetingsQuery.where('section', 'in', section);
  }

  const totalPages = await getTotalPages(meetingsQuery, pageSize);

  const meetingsSnapshot = await meetingsQuery
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .get();

  const meetings = meetingsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate() || null,
      }) as Meeting,
  );

  return { data: meetings, totalPages };
};
