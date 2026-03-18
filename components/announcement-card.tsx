import { Announcement } from '@/types/announcement';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';

export default function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  return (
    <Card className="w-full h-auto flex flex-col">
      <CardHeader>
        <CardTitle className="flex  flex-row gap-2 justify-between">
          <div className="flex flex-row gap-2 items-center">{announcement.title}</div>
        </CardTitle>
        <CardDescription>{announcement.updated}</CardDescription>
      </CardHeader>
      <CardContent className="flex h-auto flex-col items-center gap-5">
        {announcement.image && (
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <Image
              src={announcement.image}
              alt="Description"
              layout="responsive"
              width={500} // Base width
              height={300} // Base height (maintains aspect ratio)
            />
          </div>
        )}
        <div className="flex flex-col items-center justify-center h-auto w-full min-w-0">
          <p className="text-center whitespace-pre-wrap break-words max-w-full">{announcement.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
