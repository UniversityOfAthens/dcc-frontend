import type { Metadata } from 'next';
import HallOfFameCard from '@/components/hall-of-fame-card';
import { EmptyState, PageContainer, PageHeader } from '@/components/page-container';
import { getHallOfFameEntries } from '@/server/getHallOfFameEntries';

export const metadata: Metadata = {
  title: 'Hall of Fame',
  description: 'Διακρίσεις μελών του DIT Coding Club σε διαγωνισμούς και hackathons.',
};

// Updated on demand by the admin app (app/api/revalidate), at least hourly.
export const revalidate = 3600;

export default async function HallOfFame() {
  const { data } = await getHallOfFameEntries();

  return (
    <PageContainer wide>
      <PageHeader
        title="Hall of Fame"
        description="Διακρίσεις μελών του club σε διαγωνισμούς και hackathons."
      />
      {data.length === 0 && <EmptyState>Δεν υπάρχουν ακόμα καταχωρήσεις.</EmptyState>}
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {data.map((entry) => (
          <HallOfFameCard key={entry.id} entry={entry} />
        ))}
      </div>
    </PageContainer>
  );
}
