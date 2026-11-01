import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-5xl font-bold text-secondary">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Η σελίδα δεν βρέθηκε</h1>
      <p className="mt-3 max-w-prose text-foreground/65">
        Η σελίδα που ζητήσατε δεν υπάρχει ή έχει μετακινηθεί.
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center h-12 rounded-lg bg-secondary px-6 text-base font-bold text-secondary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Επιστροφή στην αρχική
      </Link>
    </main>
  );
}
