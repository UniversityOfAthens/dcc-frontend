import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-sm text-muted-foreground">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Η σελίδα δεν βρέθηκε</h1>
      <p className="mt-3 max-w-prose text-muted-foreground">
        Η σελίδα που ζητήσατε δεν υπάρχει ή έχει μετακινηθεί.
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Επιστροφή στην αρχική
      </Link>
    </main>
  );
}
