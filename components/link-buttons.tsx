import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export function LinkButtons({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-2">{children}</div>;
}

export function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Button
      asChild
      variant="outline"
      className="h-10 rounded-lg border-white/20 bg-transparent px-4 font-bold text-foreground hover:border-secondary hover:bg-secondary/10 hover:text-secondary"
    >
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {children}
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </Link>
    </Button>
  );
}
