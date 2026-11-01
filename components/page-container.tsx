import Image from 'next/image';
import { cn } from '@/lib/utils';

export function PageContainer({
  children,
  wide = false,
  className,
}: {
  children: React.ReactNode;
  wide?: boolean;
  className?: string;
}) {
  return (
    <main
      className={cn(
        'mx-auto flex min-h-[calc(100vh-10rem)] w-full flex-col gap-6 px-4 pb-20 pt-14',
        wide ? 'max-w-5xl' : 'max-w-3xl',
        className,
      )}
    >
      {children}
    </main>
  );
}

export function PageHeader({
  title,
  description,
  imageUrl,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  imageUrl?: string;
}) {
  return (
    <header className="mb-4 flex flex-col items-center gap-4 text-center">
      {imageUrl && <Image src={imageUrl} alt="" width={140} height={140} priority />}
      <h1 className="text-3xl font-bold text-balance sm:text-4xl">{title}</h1>
      {description && (
        <p className="max-w-xl text-base leading-relaxed text-foreground/65">{description}</p>
      )}
    </header>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold">{children}</h2>;
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-2xl bg-card px-6 py-10 text-center text-foreground/65">{children}</p>
  );
}
