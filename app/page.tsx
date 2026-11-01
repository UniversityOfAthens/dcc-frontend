import Home from '@/components/home';
import { getAnnouncements } from '@/server/getAnnouncements';
import { getMeetings } from '@/server/getMeetings';

// Rebuilt on demand when the admin app changes content (see app/api/revalidate),
// and at least once an hour (route config must be a literal, same as REVALIDATE_SECONDS).
export const revalidate = 3600;

const DISCORD_INVITE_API =
  'https://discord.com/api/v9/invites/n7BZ9c8tyP?with_counts=true&with_expiration=true';

async function getDiscordMembers() {
  try {
    const response = await fetch(DISCORD_INVITE_API, { next: { revalidate: 600 } });
    const data = await response.json();
    return typeof data.approximate_member_count === 'number' ? data.approximate_member_count : 500;
  } catch (e) {
    console.log(e);
    return 500;
  }
}

export default async function HomePage() {
  const [discordMembers, announcements, meetings] = await Promise.all([
    getDiscordMembers(),
    getAnnouncements({ filters: { featured: true } }),
    getMeetings({ pagination: { pageSize: 3 } }),
  ]);

  return (
    <Home
      discordMembers={discordMembers}
      featuredAnnouncements={announcements.data}
      recentMeetings={meetings.data}
    />
  );
}
