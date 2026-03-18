import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { Meeting } from '@/types/meeting';

export default function MeetingCard({ meeting }: { meeting: Meeting }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">{meeting.title}</CardTitle>
        <CardDescription>{meeting.date.toDateString()}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Button asChild variant={'outline'} size={'xl'}>
          <Link href={meeting.url1} target="_blank">
            Μέρος 1
          </Link>
        </Button>
        {meeting.url2 && meeting.url2 !== '' && (
          <Button asChild variant={'outline'} size={'xl'}>
            <Link href={meeting.url2} target="_blank">
              Μέρος 2
            </Link>
          </Button>
        )}
        {meeting.url3 && meeting.url3 !== '' && (
          <Button asChild variant={'outline'} size={'xl'}>
            <Link href={meeting.url3} target="_blank">
              Μέρος 3
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
