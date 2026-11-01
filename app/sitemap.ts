import type { MetadataRoute } from 'next';
import { fields } from '@/lib/fields';
import { getSeries } from '@/server/getSeries';

const SITE_URL = 'https://codingclub.di.uoa.gr';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '',
    '/announcements',
    '/schedule',
    '/talks',
    '/talks/propose',
    '/series',
    '/hall-of-fame',
    ...fields.map((field) => field.pageUrl),
  ].map((path) => ({ url: `${SITE_URL}${path}` }));

  let seriesRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data } = await getSeries({ pagination: { pageSize: 100 } });
    seriesRoutes = data.map((serie) => ({ url: `${SITE_URL}/series/${serie.id}` }));
  } catch (e) {
    console.log(e);
  }

  return [...staticRoutes, ...seriesRoutes];
}
