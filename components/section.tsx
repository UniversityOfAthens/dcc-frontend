'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { AspectRatio } from './ui/aspect-ratio';
import { motion } from 'framer-motion';

type Props = {
  title: string;
  description: string;
  imageUrl: string;
  pageUrl: string;
  reverse: boolean;
};

export default function Section({ title, description, imageUrl, pageUrl, reverse }: Props) {
  return (
    <div className="overflow-x-hidden flex flex-row w-full items-center justify-center">
      <motion.div
        initial={{ x: -100 * (reverse ? -1 : 1), opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={`w-75/100 flex flex-col items-center ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} justify-between gap-15`}
      >
        <div className="w-[300px]">
          <AspectRatio ratio={1 / 1}>
            <Image src={imageUrl} alt={`${title}`} fill className="h-full w-full object-cover" />
          </AspectRatio>
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
          <h3 className="text-4xl text-center">{title}</h3>
          <p className="text-2xl text-center">{description}</p>
          <Button asChild variant={'outline'} size={'xl'}>
            <Link href={`${pageUrl}`} className="transition-colors duration-200 ease-in-out">
              ΠΕΡΙΣΣΟΤΕΡΑ
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
