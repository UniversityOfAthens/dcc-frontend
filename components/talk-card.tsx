import { Talk } from '@/types/talk';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import DOMPurify from 'dompurify';

export default function TalkCard({ talk }: { talk: Talk }) {
  const sanitizedDescriptionHTML =
    typeof window !== 'undefined' ? DOMPurify.sanitize(talk.description) : talk.description;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between">
          {talk.title} by {talk.speaker}
        </CardTitle>
        <CardDescription>{talk.created}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {talk.image && (
          <div className="relative w-full max-w-md self-center">
            <Image
              src={talk.image}
              alt={`Image for ${talk.title}`}
              layout="responsive"
              width={500}
              height={300}
              className="rounded-md object-cover"
            />
          </div>
        )}
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedDescriptionHTML }}
        />
        <Button asChild variant={'outline'} size={'xl'}>
          <Link href={talk.url1} target="_blank">
            Μέρος 1
          </Link>
        </Button>
        {talk.url2 && talk.url2 !== '' && (
          <Button asChild variant={'outline'} size={'xl'}>
            <Link href={talk.url2} target="_blank">
              Μέρος 2
            </Link>
          </Button>
        )}
        {talk.url3 && talk.url3 !== '' && (
          <Button asChild variant={'outline'} size={'xl'}>
            <Link href={talk.url3} target="_blank">
              Μέρος 3
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
