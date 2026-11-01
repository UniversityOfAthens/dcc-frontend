'use client';
import { ArrowRight } from 'lucide-react';

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
    <Card className="w-full flex flex-col gap-4 overflow-hidden rounded-2xl border-0 pt-0 pb-6 shadow-none h-full">
      <div className="relative w-full h-72 shrink-0 bg-black/20">
        <Image
          src={entry.imageUrl}
          alt={`Image for ${entry.title}`}
          fill
          className="object-contain"
        />
      </div>

      <CardHeader className="shrink-0">
        <CardTitle className="flex flex-col gap-3">
          {entry.competitionUrl ? (
            <Link
              href={entry.competitionUrl}
              target="_blank"
              className="text-lg font-bold leading-snug hover:text-secondary transition-colors"
            >
              {entry.title}
            </Link>
          ) : (
            <span className="text-lg font-bold leading-snug">{entry.title}</span>
          )}
          <div className="flex flex-row justify-between items-center gap-2 w-full">
            <Badge className="max-[500px]:min-w-0 max-[500px]:shrink max-[500px]:max-w-[150px] max-[500px]:whitespace-normal max-[500px]:text-left">
              {entry.winner}
            </Badge>
            {entry.result && <Badge variant="secondary">{entry.result}</Badge>}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 overflow-hidden flex flex-col gap-2">
        <p className="text-[15px] leading-relaxed text-foreground/75 line-clamp-4">
          {truncatedDescription}
        </p>
        {isLong && (
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-secondary font-bold text-sm hover:underline text-left w-fit cursor-pointer"
              >
                Περισσότερα
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </DialogTrigger>
            <DialogContent className="w-[85vw] max-w-[85vw] rounded-lg border">
              <DialogHeader>
                <DialogTitle className="pr-8">
                  {entry.competitionUrl ? (
                    <Link
                      href={entry.competitionUrl}
                      target="_blank"
                      className="hover:underline text-secondary"
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
