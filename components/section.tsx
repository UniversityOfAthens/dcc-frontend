'use client';
import { ArrowRight } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
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
    <motion.div
      initial={{ y: 16, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`grid grid-cols-1 items-center justify-items-center gap-5 border-t border-white/10 py-8 text-center md:justify-items-start md:gap-10 md:text-left ${
        reverse ? 'md:grid-cols-[1fr_160px]' : 'md:grid-cols-[160px_1fr]'
      }`}
    >
      <Image
        src={imageUrl}
        alt={title}
        width={160}
        height={160}
        className={`size-30 md:size-40 ${reverse ? 'md:order-last' : ''}`}
      />
      <div className="flex flex-col items-center gap-3 md:items-start">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="max-w-prose text-base leading-relaxed text-foreground/65">{description}</p>
        <Link
          href={pageUrl}
          className="inline-flex items-center gap-1 text-sm font-bold text-secondary hover:underline"
        >
          Περισσότερα
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );
}
