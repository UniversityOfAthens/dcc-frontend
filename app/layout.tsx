import type { Metadata } from 'next';
import './globals.css';
import NextTopLoader from 'nextjs-toploader';
import Header from '@/components/header';
import { Analytics } from '@vercel/analytics/react';
import Image from 'next/image';
import Link from 'next/link';

const siteUrl = 'https://codingclub.di.uoa.gr/';
const siteName = 'Dit Coding Club';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Coding Club | Ομιλίες, Hackathons & Competitive Programming`,
    template: `%s | ${siteName}`,
  },
  description:
    'DIT Coding Club. Ομιλίες προγραμματισμού, Hackathons, Game Development, Security, Competitive Programming, 3D Art. Γίνε μέλος της κοινότητας.',
  keywords: [
    'coding club',
    'προγραμματισμός',
    'hackathon',
    'game development',
    'competitive programming',
    'security',
    '3d art',
    'DIT',
    'Πανεπιστήμιο Αθηνών',
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'el_GR',
    url: siteUrl,
    siteName,
    title: `${siteName} - Coding Club`,
    description:
      'Ομιλίες προγραμματισμού, Hackathons, Game Development, Security, Competitive Programming. Γίνε μέλος της κοινότητας.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" suppressHydrationWarning>
      <body className="antialiased">
        <NextTopLoader color="#43C5E7" height={3} showSpinner={false} />
        <Header />
        {children}
        <footer className="bg-primary px-4 py-5">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/80">© {new Date().getFullYear()} Dit Coding Club</p>
            <nav aria-label="Social media" className="flex items-center gap-2">
              <Link
                href="https://www.youtube.com/@DitCodingClub24"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                title="YouTube"
                className="flex size-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-secondary/15 hover:text-secondary focus-visible:ring-2 focus-visible:ring-secondary"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M22 12s0-3.5-.45-5.2a2.7 2.7 0 0 0-1.9-1.9C18 4.45 12 4.45 12 4.45s-6 0-7.65.45a2.7 2.7 0 0 0-1.9 1.9C2 8.5 2 12 2 12s0 3.5.45 5.2a2.7 2.7 0 0 0 1.9 1.9c1.65.45 7.65.45 7.65.45s6 0 7.65-.45a2.7 2.7 0 0 0 1.9-1.9C22 15.5 22 12 22 12Z" />
                  <path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none" />
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com/ditcodingclub/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="flex size-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-secondary/15 hover:text-secondary focus-visible:ring-2 focus-visible:ring-secondary"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </Link>
              <Link
                href="https://www.linkedin.com/company/di-coding-club/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="flex size-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-secondary/15 hover:text-secondary focus-visible:ring-2 focus-visible:ring-secondary"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 9v9" />
                  <path d="M6 6.5v.01" />
                  <path d="M10 18v-9" />
                  <path d="M10 13a4 4 0 0 1 8 0v5" />
                </svg>
              </Link>
              <Link
                href="https://discord.com/invite/c34X34X6Jb"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                title="Discord"
                className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-secondary/15 focus-visible:ring-2 focus-visible:ring-secondary"
              >
                <Image
                  src="/discord.png"
                  alt=""
                  width={20}
                  height={20}
                  className="invert opacity-80"
                  aria-hidden="true"
                />
              </Link>
            </nav>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
