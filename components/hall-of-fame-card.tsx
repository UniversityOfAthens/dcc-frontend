'use client';

import { HallOfFameEntry } from '@/types/hall-of-fame-entry';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import Image from 'next/image';
import Link from 'next/link';
const MAX_WORDS = 50;

function getWordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function getFirstNWords(text: string, n: number): string {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.slice(0, n).join(' ');
}

export default function HallOfFameCard({ entry }: { entry: HallOfFameEntry }) {
  const wordCount = getWordCount(entry.description);
  const isLong = wordCount > MAX_WORDS;
  const truncatedDescription = isLong
    ? getFirstNWords(entry.description, MAX_WORDS) + '...'
    : entry.description;

  return (
    <Card className="w-full flex flex-col overflow-hidden pt-0 h-auto min-h-[60vh] md:h-[650px] flex-shrink-0">
      <div className="relative w-full h-90 shrink-0">
        <Image
          src={entry.imageUrl}
          alt={`Image for ${entry.title}`}
          fill
          className="object-cover"
        />
      </div>

      <CardHeader className="shrink-0">
        <CardTitle className="flex flex-col gap-3">
          {entry.competitionUrl ? (
            <Link
              href={entry.competitionUrl}
              target="_blank"
              className="hover:underline text-blue-300 transition-all"
            >
              {entry.title}
            </Link>
          ) : (
            <span>{entry.title}</span>
          )}
          <div className="flex flex-row justify-between items-center gap-2 w-full">
            <Badge className="max-[500px]:min-w-0 max-[500px]:shrink max-[500px]:max-w-[150px] max-[500px]:whitespace-normal max-[500px]:text-left">
              {entry.winner}
            </Badge>
            {entry.result && <Badge variant="secondary">{entry.result}</Badge>}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 overflow-hidden flex flex-col gap-2 pb-6">
        <p className="text-sm line-clamp-4">{truncatedDescription}</p>
        {isLong && (
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="text-secondary font-medium text-sm hover:underline text-left w-fit cursor-pointer"
              >
                Περισσότερα
              </button>
            </DialogTrigger>
            <DialogContent className="w-[85vw] max-w-[85vw] rounded-lg border">
              <DialogHeader>
                <DialogTitle className="pr-8">
                  {entry.competitionUrl ? (
                    <Link
                      href={entry.competitionUrl}
                      target="_blank"
                      className="hover:underline text-blue-300"
                    >
                      {entry.title}
                    </Link>
                  ) : (
                    entry.title
                  )}
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge>{entry.winner}</Badge>
                {entry.result && <Badge variant="secondary">{entry.result}</Badge>}
              </div>
              <p className="text-foreground text-sm whitespace-pre-wrap">{entry.description}</p>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
}
