import { Section } from './section';

export type Announcement = {
  id: string;
  title: string;
  description: string;
  section: Section;
  featured: boolean;
  image?: string;
  updated?: string | null;
  created?: string | null;
};
