import HallOfFameCard from '@/components/hall-of-fame-card';
import { getHallOfFameEntries } from '@/server/getHallOfFameEntries';

export default async function HallOfFame() {
  const { data } = await getHallOfFameEntries();

  return (
    <div className="w-full min-h-screen flex flex-col gap-4 mt-6 items-center my-5">
      <div className="w-[90vw] lg:w-4/5 flex flex-col justify-center items-center gap-6">
        <h1 className="text-4xl text-center">Hall of Fame</h1>
        {data.length === 0 && <h1 className="text-xl">No entries yet</h1>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {data.map((entry) => (
            <HallOfFameCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  );
}
