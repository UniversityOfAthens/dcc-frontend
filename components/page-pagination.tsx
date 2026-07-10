import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type PagePaginationProps = {
  currentPage: number;
  hrefs: string[];
};

export default function PagePagination({ currentPage, hrefs }: PagePaginationProps) {
  if (hrefs.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Σελιδοποίηση"
      className="w-full rounded-xl border border-secondary/20 bg-card/80 px-4 py-3 shadow-sm"
    >
      <p className="mb-2 border-b border-secondary/10 pb-2 text-center text-xs tracking-wide text-muted-foreground">
        Σελίδα <span className="font-semibold text-secondary">{currentPage}</span> από{' '}
        {hrefs.length}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-1">
        {hrefs.map((href, index) => {
          const page = index + 1;
          const isCurrentPage = page === currentPage;

          return (
            <Button
              key={page}
              asChild
              variant="ghost"
              size="sm"
              className={cn(
                'min-w-9 text-secondary hover:bg-secondary/10 hover:text-secondary',
                isCurrentPage &&
                  'bg-secondary/15 text-secondary ring-1 ring-secondary/50 hover:bg-secondary/20',
              )}
            >
              <Link href={href} aria-current={isCurrentPage ? 'page' : undefined}>
                {page}
              </Link>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
