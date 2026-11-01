import 'server-only';
import { cached } from '@/lib/cache';

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

const loadMeetings = async (options?: GetMeetingsOptions) => {
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

  // Only plain, declared fields: results are cached as JSON and passed to client components.
  const meetings: Meeting[] = meetingsSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title ?? '',
      section: data.section,
      date: data.date?.toDate?.().toISOString() ?? '',
      url1: data.url1 ?? '',
      url2: data.url2 ?? '',
      url3: data.url3 ?? '',
    };
  });

  return { data: meetings, totalPages };
};

export const getMeetings = cached(loadMeetings, 'getMeetings', ['meetings']);
