import type { Metadata } from 'next';
import './globals.css';
import NextTopLoader from 'nextjs-toploader';
import Header from '@/components/header';
import { Analytics } from '@vercel/analytics/react';

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
        <footer className="bg-primary h-20 flex flex-row justify-center items-center">
          @{new Date().getFullYear()} Dit Coding Club
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
