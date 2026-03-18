import { Section } from './section';

export type Meeting = {
  id?: string;
  title: string;
  section: Section;
  date: Date;
  url1: string;
  url2?: string;
  url3?: string;
};
