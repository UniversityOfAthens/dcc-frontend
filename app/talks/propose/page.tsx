import { ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageContainer, PageHeader, SectionTitle } from '@/components/page-container';

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSe8EqzsZ26qzBwidylRiWF9huw6kyMy0m3gPs9Bysur4AibOA/viewform';

export const metadata: Metadata = {
  title: 'Κάνε μια ομιλία',
  description:
    'Θέλεις να μιλήσεις στο DIT Coding Club; Πρότεινε ένα θέμα και θα κανονίσουμε μαζί ημερομηνία και αίθουσα.',
};

const steps = [
  {
    title: 'Συμπληρώνεις τη φόρμα',
    text: 'Λίγα λόγια για σένα και το θέμα που θέλεις να παρουσιάσεις.',
  },
  {
    title: 'Επικοινωνούμε μαζί σου',
    text: 'Συζητάμε το θέμα, τη διάρκεια και αν θα είναι μία ομιλία ή σειρά.',
  },
  {
    title: 'Κλείνουμε ημερομηνία και αίθουσα',
    text: 'Η ομιλία μπαίνει στο πρόγραμμα και την ανακοινώνουμε στο site και στο Discord.',
  },
  {
    title: 'Μιλάς στο club',
    text: 'Με τη συγκατάθεσή σου, η ομιλία καταγράφεται και ανεβαίνει στις Ομιλίες.',
  },
];

const ideas = [
  {
    field: 'Security',
    topics: [
      'Εισαγωγή στα CTF',
      'Web exploitation',
      'Reverse engineering',
      'Κρυπτογραφία στην πράξη',
    ],
  },
  {
    field: 'Game Development',
    topics: ['Πρώτο παιχνίδι σε Godot ή Unity', 'Shaders', 'Game jams', 'Procedural generation'],
  },
  {
    field: 'Competitive Programming',
    topics: ['Δυναμικός προγραμματισμός', 'Γράφοι', 'Προετοιμασία για ICPC', 'Segment trees'],
  },
  {
    field: 'Γενικά',
    topics: [
      'Git και open source',
      'Η πρώτη σου πρακτική',
      'Linux για φοιτητές',
      'Ένα project σου',
    ],
  },
];

export default function ProposeTalk() {
  return (
    <PageContainer>
      <PageHeader
        title="Κάνε μια ομιλία"
        description="Οι ομιλίες του club γίνονται από φοιτητές, αποφοίτους και ανθρώπους της βιομηχανίας. Αν έχεις κάτι που σε ενθουσιάζει, θέλουμε να το ακούσουμε."
      />
      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="secondary" asChild className="h-12 rounded-lg px-6 text-base font-bold">
          <Link href={FORM_URL} target="_blank" rel="noopener noreferrer">
            Πρότεινε μια ομιλία
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button
          variant="outline"
          asChild
          className="h-12 rounded-lg border-white/25 bg-transparent px-6 text-base font-bold text-foreground hover:bg-white/5"
        >
          <Link href="/talks">Προηγούμενες ομιλίες</Link>
        </Button>
      </div>

      <section className="mt-10 flex flex-col gap-4">
        <SectionTitle>Ποιος μπορεί να μιλήσει</SectionTitle>
        <p className="text-base leading-relaxed text-foreground/75">
          Οποιοσδήποτε. Δεν χρειάζεται να είσαι ειδικός ή να έχεις ξαναμιλήσει. Ένα θέμα που έμαθες
          πρόσφατα, ένα project που έφτιαξες ή η εμπειρία σου από τη δουλειά είναι αρκετά. Η ομιλία
          μπορεί να είναι μία συνάντηση ή μια σειρά από δύο-τρεις.
        </p>
      </section>

      <section className="mt-6 flex flex-col gap-4">
        <SectionTitle>Πώς γίνεται</SectionTitle>
        <ol className="flex flex-col">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-white/10 py-5 last:border-b"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-secondary/15 font-bold text-secondary">
                {index + 1}
              </span>
              <div>
                <h3 className="font-bold">{step.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-foreground/65">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-6 flex flex-col gap-4">
        <SectionTitle>Ιδέες για θέματα</SectionTitle>
        <p className="text-[15px] text-foreground/65">
          Δεν έχεις θέμα αλλά θέλεις να μιλήσεις; Διάλεξε ένα από αυτά ή πρότεινε δικό σου.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ideas.map((group) => (
            <div key={group.field} className="rounded-2xl bg-card px-6 py-5">
              <h3 className="mb-3 font-bold">{group.field}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.topics.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-full bg-white/5 px-3 py-1 text-sm text-foreground/80"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 flex flex-col items-center gap-4 rounded-2xl bg-card px-6 py-8 text-center">
        <h2 className="text-xl font-bold">Έχεις κάτι στο μυαλό σου;</h2>
        <p className="max-w-md text-[15px] text-foreground/65">
          Η φόρμα παίρνει δύο λεπτά. Θα επικοινωνήσουμε μαζί σου για τα υπόλοιπα.
        </p>
        <Button variant="secondary" asChild className="h-12 rounded-lg px-6 text-base font-bold">
          <Link href={FORM_URL} target="_blank" rel="noopener noreferrer">
            Πρότεινε μια ομιλία
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </section>
    </PageContainer>
  );
}
