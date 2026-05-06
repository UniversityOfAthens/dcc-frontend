import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getSerie } from '../series';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Serie({ params }: { params: Promise<{ serieId: string }> }) {
  const paramsValue = await params;
  const serie = getSerie(paramsValue.serieId);

  return (
    <div className="w-full min-h-screen flex flex-col gap-4 mt-6 items-center my-5">
      <div className="lg:w-2/5 w-full flex flex-col justify-center items-center gap-6">
        <h1 className="text-3xl text-center">
          {serie?.name} by {serie?.speaker}
        </h1>
        <p>{serie?.description}</p>
        <h2 className="text-2xl text-center">Επεισόδια</h2>
        {serie?.episodes.map((el, index) => {
          return (
            <Card key={index} className="w-full">
              <CardHeader>
                <h3 className="text-xl">{el.name}</h3>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                {el.link1.trim().length === 0 && <p>Δεν υπήρξε καταγραφή</p>}
                {el.link1.trim().length !== 0 && (
                  <div className="w-full flex flex-col gap-3">
                    <Button asChild size={'tall'} variant={'outline'} className="w-full">
                      <Link href={el.link1} target="_blank">
                        ΜΕΡΟΣ 1
                      </Link>
                    </Button>
                    <Button asChild size={'tall'} variant={'outline'} className="w-full">
                      <Link href={el.link2} target="_blank">
                        ΜΕΡΟΣ 2
                      </Link>
                    </Button>
                  </div>
                )}
                {el.notes.trim().length !== 0 && (
                  <Button asChild size={'tall'} variant={'outline'} className="w-full">
                    <Link href={el.notes} target="_blank">
                      ΣΗΜΕΙΩΣΕΙΣ
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
