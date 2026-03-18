export const dynamic = 'force-dynamic'; // Disable caching

import Home from '@/components/home';
import { getAnnouncements } from '@/server/getAnnouncements';

export default async function HomePage() {
  // get discord members and pass them to client components
  const API_URL =
    'https://discord.com/api/v9/invites/n7BZ9c8tyP?with_counts=true&with_expiration=true';
  let discordMembers = 500; // 500 fallback
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    discordMembers = data.approximate_member_count;
  } catch (e) {
    console.log(e);
  }

  // load featured announcements
  const announcements = await getAnnouncements({ filters: { featured: true } });

  return <Home discordMembers={discordMembers} featuredAnnouncements={announcements.data} />;
}
