'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CountingNumbers from './counting-numbers';
import FlyingLogo from './flying-logo';
import { Button } from './ui/button';
import Link from 'next/link';
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Announcement } from '@/types/announcement';
import { Meeting } from '@/types/meeting';
import MeetingCard from './meeting-card';
import Section from './section';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import AnnouncementCard from './announcement-card';
import { fields } from '@/lib/fields';

const DISCORD_INVITE = 'https://discord.com/invite/c34X34X6Jb';

function AnnouncementCarousel({ announcements }: { announcements: Announcement[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ align: 'start' }} className="w-full">
      <CarouselContent className="items-start">
        {announcements.map((announcement, index) => (
          <CarouselItem key={index}>
            <AnnouncementCard announcement={announcement} showSection date={announcement.created} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:inline-flex" />
      <CarouselNext className="hidden lg:inline-flex" />
      <div className="mt-4 flex justify-center gap-2">
        {announcements.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Ανακοίνωση ${index + 1}`}
            aria-current={index === current}
            onClick={() => api?.scrollTo(index)}
            className={`h-2 rounded-full transition-all ${
              index === current ? 'w-6 bg-secondary' : 'w-2 bg-white/20 hover:bg-white/35'
            }`}
          />
        ))}
      </div>
    </Carousel>
  );
}

export default function Home({
  discordMembers,
  featuredAnnouncements,
  recentMeetings,
}: {
  discordMembers: number;
  featuredAnnouncements: Announcement[];
  recentMeetings: Meeting[];
}) {
  return (
    <div className="flex flex-col items-center pb-16">
      {/* Hero */}
      {/* Pulled up under the header (-mt-18) so the glow sits behind it while it is transparent. */}
      <section className="relative -mt-18 flex min-h-svh w-full flex-col items-center justify-center gap-5 overflow-hidden px-4 pb-28 pt-28 text-center">
        <div className="hero-mesh" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
        <FlyingLogo className="relative w-[min(300px,70vw)]" />
        <h1 className="relative max-w-[30ch] text-2xl font-bold leading-snug text-balance sm:text-3xl">
          Καλώς ήρθες στο Coding Club
        </h1>
        <p className="relative max-w-xl text-base leading-relaxed text-foreground/65 sm:text-lg">
          Μια δυναμική κοινότητα φοιτητών που μοιράζονται το πάθος τους για την τεχνολογία και τον
          προγραμματισμό.
        </p>
        <span className="relative inline-flex items-center gap-2 text-foreground/65">
          <span className="size-2 rounded-full bg-green-400 shadow-[0_0_0_4px_rgba(74,222,128,0.15)]" />
          <CountingNumbers
            from={0}
            to={discordMembers}
            className="text-2xl font-bold text-secondary"
          />
          μέλη στο Discord
        </span>
        <div className="relative mt-1 flex flex-wrap justify-center gap-3">
          <Button variant="secondary" asChild className="h-12 rounded-lg px-6 text-base font-bold">
            <Link href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
              <Image
                src="/discord.png"
                alt=""
                width={22}
                height={22}
                className="brightness-0 opacity-85"
              />
              Μπες στο Discord
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="h-12 rounded-lg border-white/25 bg-transparent px-6 text-base font-bold text-foreground hover:bg-white/5"
          >
            <Link href="/schedule">Πρόγραμμα</Link>
          </Button>
        </div>
        <span className="scroll-cue" aria-hidden="true" />
      </section>

      {/* Announcements */}
      {featuredAnnouncements.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="w-full max-w-3xl px-4"
        >
          <h2 className="mb-7 text-center text-3xl font-bold sm:text-4xl">Ανακοινώσεις</h2>
          {featuredAnnouncements.length > 1 ? (
            <AnnouncementCarousel announcements={featuredAnnouncements} />
          ) : (
            <AnnouncementCard
              announcement={featuredAnnouncements[0]}
              showSection
              date={featuredAnnouncements[0].created}
            />
          )}
        </motion.section>
      )}

      {/* Recent meetings */}
      {recentMeetings.length > 0 && (
        <section className="mt-20 w-full max-w-5xl px-4">
          <h2 className="mb-7 text-center text-3xl font-bold sm:text-4xl">Πρόσφατες συναντήσεις</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {recentMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} showSection />
            ))}
          </div>
        </section>
      )}

      {/* Fields */}
      <section className="mt-20 w-full max-w-4xl px-4">
        <h2 className="mb-7 text-center text-3xl font-bold sm:text-4xl">Τα πεδία</h2>
        <div className="flex flex-col [&>*:last-child]:border-b">
          {fields.map((field, index) => (
            <Section
              key={field.pageUrl}
              reverse={index % 2 === 1}
              title={field.title}
              description={field.description}
              imageUrl={field.imageUrl}
              pageUrl={field.pageUrl}
            />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-20 w-full max-w-3xl px-4">
        <h2 className="mb-5 text-center text-3xl font-bold sm:text-4xl">FAQ</h2>
        <Accordion
          type="single"
          collapsible
          className="w-full [&_[data-slot=accordion-content]]:text-foreground/65 [&_[data-slot=accordion-item]]:border-white/10 [&_[data-slot=accordion-trigger]]:py-5 [&_[data-slot=accordion-trigger]]:font-bold [&_[data-slot=accordion-trigger]]:text-foreground"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base">
              Πώς γίνομαι μέλος μιας ομάδας;
            </AccordionTrigger>
            <AccordionContent className="text-[15px] leading-relaxed">
              Δεν απαιτείται εγγραφή για να γίνεις μέλος ομάδας, απλά να έρχεσαι στις συναντήσεις.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-base">
              Δεν είμαι φοιτητής της σχολής, μπορώ να έρχομαι στις συναντήσεις;
            </AccordionTrigger>
            <AccordionContent className="text-[15px] leading-relaxed">
              Ναι. Το club είναι ανοιχτό για οποιονδήποτε θέλει να συμμετάσχει.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-base">
              Στον server μπαίνει όποιος θέλει;
            </AccordionTrigger>
            <AccordionContent className="text-[15px] leading-relaxed">
              Ναι, ο server είναι δημόσιος και ανοιχτός για όλους. Δεν απαιτείται να πεις ποιος
              είσαι, μπορείς να παραμείνεις ανώνυμος, χωρίς να απαγορεύεται να πεις ποιος είσαι.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-base">Πού βρίσκεται η σχολή;</AccordionTrigger>
            <AccordionContent className="text-[15px] leading-relaxed">
              <Link
                href={'https://maps.app.goo.gl/3gpQBzsScfjTWjLU9'}
                target="_blank"
                className="text-secondary underline"
              >
                Google Maps
              </Link>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-base">Πώς πάω στη σχολή;</AccordionTrigger>
            <AccordionContent className="text-[15px] leading-relaxed">
              Από τον σταθμό του μετρό Ευαγγελισμός παίρνεις: Είτε το λεωφορείο 250 και κατεβαίνεις
              2η Πανεπιστημιούπολη. Είτε το λεωφορείο 224 και κατεβαίνεις 10η Καισαριανής. Αν δε σε
              εξυπηρετούν μπορείς να δεις και τους{' '}
              <Link
                className="text-secondary underline"
                href={'https://www.di.uoa.gr/department/contact-location'}
                target="_blank"
              >
                υπόλοιπους τρόπους πρόσβασης
              </Link>
              .
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-base">Πού βρίσκεται η αίθουσα ΧΧΧ;</AccordionTrigger>
            <AccordionContent className="flex flex-row items-center justify-center">
              <Image src={'/school.png'} alt="school map" width={600} height={400} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger className="text-base">
              Είναι απαραίτητο να πηγαίνω σε κάθε συνάντηση;
            </AccordionTrigger>
            <AccordionContent className="text-[15px] leading-relaxed">
              Δεν είναι απαραίτητο, αλλά προτείνεται για να μη μείνεις πίσω.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}
