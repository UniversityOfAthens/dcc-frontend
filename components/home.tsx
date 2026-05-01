'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import CountingNumbers from './counting-numbers';
import { Button } from './ui/button';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Announcement } from '@/types/announcement';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import Section from './section';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

const sectionLabelMap = {
  general: 'General',
  gamedev: 'Game Development',
  security: 'Security',
  cp: 'Competitive Programming',
  hackathons: 'Hackathons',
  art3d: '3D Art',
};

export default function Home({
  discordMembers,
  featuredAnnouncements,
}: {
  discordMembers: number;
  featuredAnnouncements: Announcement[];
}) {
  return (
    <div className="flex flex-col justify-center items-center my-15">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center h-screen"
      >
        <Image width={400} height={400} src={'/logo.png'} alt="logo" />
        <p className="text-xl sm:text-3xl text-center w-2/3">
          Καλώς ήρθες στο Coding Club - μια δυναμική κοινότητα φοιτητών που μοιράζονται το πάθος
          τους για την τεχνολογία και τον προγραμματισμό!
        </p>
        <div className="mt-5">
          <CountingNumbers from={0} to={discordMembers} />
        </div>
        <Button variant={'secondary'} className="mt-15" asChild size={'xl'}>
          <Link href={'https://discord.com/invite/c34X34X6Jb'} target="_blank" className="text-xl">
            <div className="flex flex-row justify-between items-center gap-2">
              <Image src={'/discord.png'} alt="discord logo" width={32} height={32} />
              <p className="font-bold text-2xl">ΜΠΕΣ</p>
            </div>
          </Link>
        </Button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        className="flex flex-col items-center w-full mt-15 gap-7"
      >
        <h2 className="text-5xl">Ανακοινώσεις</h2>
        <Carousel className="w-3/4 sm:w-1/2">
          <CarouselContent>
            {featuredAnnouncements.map((announcement, index) => {
              return (
                <CarouselItem key={index}>
                  <Card className="min-h-200 min-w-1/2">
                    <CardHeader>
                      <CardTitle className="flex flex-row items-center gap-3 ">
                        {announcement.title}
                        <Badge variant={announcement.section}>
                          {sectionLabelMap[announcement.section]}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{announcement.created}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-center items-center gap-5">
                      {announcement.image && (
                        <div className="relative w-[400px] h-[400px]">
                          <Image
                            src={announcement.image}
                            alt="Description"
                            fill
                            style={{ objectFit: 'contain' }}
                          />
                        </div>
                      )}
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-center">{announcement.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </motion.div>
      <motion.div className="w-full flex flex-col items-center justify-center gap-25">
        <h2 className="mt-55 text-6xl">Τα πεδία</h2>
        <Section
          reverse={false}
          title="Security"
          description="Βουτήξτε στον κόσμο της ασφάλειας πληροφοριακών συστημάτων και μάθετε πώς να εντοπίζετε και να διορθώνετε ευπάθειες."
          imageUrl="/se-logo.png"
          pageUrl="/security"
        />
        <Section
          reverse={true}
          title="Game Development"
          description="Εξερευνήστε τη δημιουργία παιχνιδιών από το μηδέν! Από την ανάπτυξη ιστοριών και σχεδιασμού μέχρι την κωδικοποίηση και την κυκλοφορία."
          imageUrl="/gd-logo.png"
          pageUrl="/gamedev"
        />
        <Section
          reverse={false}
          title="Competitive Programming"
          description="Βελτιώστε τις δεξιότητές σας στον προγραμματισμό μέσα από απαιτητικές ασκήσεις, αλγοριθμικά challenges και διαγωνισμούς."
          imageUrl="/cp-logo.png"
          pageUrl="/cp"
        />
        <Section
          reverse={true}
          title="Hackathons"
          description="Λάβετε μέρος σε δημιουργικά hackathons, λύνοντας πραγματικά προβλήματα, μαθαίνοντας νέα εργαλεία και συναγωνιζόμενοι με άλλες ομάδες."
          imageUrl="/h-logo.png"
          pageUrl="/hackathons"
        />
        <Section
          reverse={false}
          title="3D Art"
          description="Εξερευνήστε τον κόσμο του 3D art, δημιουργώντας εντυπωσιακά μοντέλα, περιβάλλοντα και animations, ενώ μαθαίνετε νέα εργαλεία και τεχνικές."
          imageUrl="/art3d-logo.png"
          pageUrl="/art3d"
        />
      </motion.div>
      <div className="w-2/3 p mt-20 flex flex-col items-center gap-5 justify-center lg:w-2/3">
        <h2 className="text-5xl">FAQ</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl cursor-pointer">
              Πως γίνομαι μελος μιας ομάδας?
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              Δεν απαιτείται εγγραφή για να γίνεις μέλος ομάδας, απλά να έρχεσαι στις συναντήσεις
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl cursor-pointer">
              Δεν είμαι φοιτητής της σχολής, μπορώ να έρχομαι στις συναντήσεις?
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              Ναι. Το club είναι ανοιχτό για οποιονδήποτε θέλει να συμμετάσχει
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl cursor-pointer">
              Στον σέρβερ μπαίνει όποιο άτομο θέλει?
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              Ναι, ο σέρβερ είναι δημόσιος και ΟΠΟΙΟ θέλει είναι στον σέρβερ, είναι ανοικτός για
              όλους και δεν απαιτείται να πεις ποιο είσαι, μπορείς να παραμείνεις ανώνυμος δίχως να
              απαγορεύεται να πεις ποιο είσαι.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl cursor-pointer">
              Που βρίσκεται η σχολή?
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              <Link
                href={'https://maps.app.goo.gl/3gpQBzsScfjTWjLU9'}
                target="_blank"
                className="underline"
              >
                Google Maps
              </Link>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-xl cursor-pointer">
              Πώς πάω στη σχολή;
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              Από τον σταθμό του μετρό Ευαγγελισμός παίρνεις: Είτε το λεωφορείο 250 και κατεβαίνεις
              2η Πανεπιστημιούπολη. Είτε το λεωφορείο 224 και κατεβαίνεις 10η Καισαριανής. Αν δε σε
              εξυπηρετούν μπορείς να δεις και τους{' '}
              <Link
                className="underline"
                href={'https://www.di.uoa.gr/department/contact-location'}
                target="_blank"
              >
                υπόλοιπους τρόπους πρόσβασης
              </Link>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-xl cursor-pointer">
              Που βρίσκεται η αίθουσα ΧΧΧ?
            </AccordionTrigger>
            <AccordionContent className="flex flex-row items-center justify-center">
              <Image src={'/school.png'} alt="school map" width={600} height={400} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger className="text-xl cursor-pointer">
              Είναι απαραίτητο να πηγαίνω σε κάθε συνάντηση?
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              Δεν είναι απαραίτητο, αλλά συστείνεται για να μη μείνεις πίσω.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
