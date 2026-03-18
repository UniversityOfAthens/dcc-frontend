import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { series } from './series';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Series() {
  return (
    <div className="w-full min-h-screen flex flex-col gap-4 mt-6 items-center my-5">
      <div className="lg:w-2/5 w-full flex flex-col justify-center items-center gap-6">
        <h1 className="text-3xl text-center">Σειρές</h1>
        {series.map((el, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <h2 className="text-2xl">
                {el.name} by {el.speaker}
              </h2>
            </CardHeader>
            <CardContent className="flex flex-col gap-7">
              {el.description}
              <Button asChild className="w-full" variant={'outline'}>
                <Link href={`/series/${el.id}`}>ΠΑΡΑΚΟΛΟΥΘΗΣΕ</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
