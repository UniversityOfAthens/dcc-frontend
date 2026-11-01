import { Section } from './section';

export type Meeting = {
  id?: string;
  title: string;
  section: Section;
  /** ISO 8601 */
  date: string;
  url1: string;
  url2?: string;
  url3?: string;
};
