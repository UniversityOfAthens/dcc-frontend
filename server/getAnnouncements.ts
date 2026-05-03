'use server';

import { firestore, getTotalPages } from '@/firebase/server';
import { Announcement } from '@/types/announcement';
import { Section } from '@/types/section';

type GetAnnouncementsOptions = {
  filters?: {
    section?: Section[] | null;
    featured?: boolean | null;
  };
  pagination?: {
    pageSize?: number;
    page?: number;
  };
};

export const getAnnouncements = async (options?: GetAnnouncementsOptions) => {
  const page = options?.pagination?.page || 1;
  const pageSize = options?.pagination?.pageSize || 10;
  const { section, featured } = options?.filters || {};

  let announcementsQuery = firestore.collection('announcements').orderBy('updated', 'desc');

  if (section) {
    announcementsQuery = announcementsQuery.where('section', 'in', section);
  }

  if (featured) {
    announcementsQuery = announcementsQuery.where('featured', '==', true);
  }

  const totalPages = await getTotalPages(announcementsQuery, pageSize);

  const announcementsSnapshot = await announcementsQuery
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .get();

  const announcements = announcementsSnapshot.docs
    .map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        created: data.created || null,
        updated: data.updated || null,
      };
    })
    .sort((a, b) => {
      const aDate = a.created?.toDate?.();
      const bDate = b.created?.toDate?.();
      return bDate?.getTime?.() - aDate?.getTime?.(); // descending
    })
    .map((item) => ({
      ...item,
      created: item.created?.toDate?.().toLocaleString() || null,
      updated: item.updated?.toDate?.().toLocaleDateString() || null,
    })) as Announcement[];

  return { data: announcements, totalPages };
};
