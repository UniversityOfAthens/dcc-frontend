'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Button } from './ui/button';
import { AlignJustify, ChevronDown } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

const DISCORD_INVITE = 'https://discord.com/invite/c34X34X6Jb';

const links = [
  { label: 'Ανακοινώσεις', href: '/announcements', subSections: [] },
  { label: 'Πρόγραμμα', href: '/schedule', subSections: [] },
  {
    label: 'Παρουσιάσεις',
    href: '',
    subSections: [
      { label: 'Ομιλίες', href: '/talks' },
      { label: 'Σειρές', href: '/series' },
      { label: 'Κάνε μια ομιλία', href: '/talks/propose' },
    ],
  },
  {
    label: 'Πεδία',
    href: '',
    subSections: [
      { label: 'Game Development', href: '/gamedev' },
      { label: 'Security', href: '/security' },
      { label: 'Competitive Programming', href: '/cp' },
      { label: 'Hackathons', href: '/hackathons' },
      { label: '3D Art', href: '/art3d' },
    ],
  },
  { label: 'Hall of Fame', href: '/hall-of-fame', subSections: [] },
];

export default function Header() {
  const [width, setWidth] = useState(0);
  const [openSectionIndex, setOpenSectionIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showDrawer = width <= 700;
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 flex h-18 flex-row items-center justify-between px-5 transition-[background-color,box-shadow,backdrop-filter] duration-300',
        isHome && !scrolled
          ? 'bg-transparent'
          : 'bg-primary/90 shadow-[0_1px_0_rgba(255,255,255,0.06),0_10px_30px_-18px_rgba(0,0,0,0.8)] backdrop-blur-md',
      )}
    >
      <Link href={'/'} aria-label="Αρχική">
        <Image src={'/logo.png'} alt="DIT Coding Club" width={54} height={54} data-logo-slot />
      </Link>
      {showDrawer ? (
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={'ghost'} size={'lg'}>
                <AlignJustify />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[85vw] max-w-[320px] px-5">
              <SheetHeader className="space-y-1 pb-2">
                <SheetTitle className="text-xl font-semibold">Dit Coding Club</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 pt-1">
                {links.map((el, index) => {
                  if (el.subSections.length === 0) {
                    return (
                      <SheetClose asChild key={index}>
                        <Link
                          key={index}
                          href={el.href}
                          className="py-2.5 px-2 text-base rounded-md hover:bg-accent block"
                        >
                          {el.label}
                        </Link>
                      </SheetClose>
                    );
                  } else {
                    const isOpen = openSectionIndex === index;
                    return (
                      <div className="px-2 flex flex-col gap-0.5" key={index}>
                        <button
                          type="button"
                          onClick={() => setOpenSectionIndex((i) => (i === index ? null : index))}
                          className="text-base font-medium flex flex-row gap-1.5 items-center text-foreground/90 hover:bg-accent rounded-md py-2.5 px-2 -mx-2 text-left w-full"
                        >
                          {el.label}
                          <ChevronDown
                            className={`size-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                        {isOpen &&
                          el.subSections.map((sub, subIndex) => (
                            <SheetClose asChild key={subIndex}>
                              <Link
                                href={sub.href}
                                className="py-1.5 pl-5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                              >
                                {sub.label}
                              </Link>
                            </SheetClose>
                          ))}
                      </div>
                    );
                  }
                })}
                <Button variant="secondary" asChild className="mt-4 h-11 rounded-lg font-bold">
                  <Link href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
                    <Image
                      src="/discord.png"
                      alt=""
                      width={20}
                      height={20}
                      className="brightness-0 opacity-85"
                    />
                    Μπες στο Discord
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-4">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {links.map((el, index) => {
                if (el.subSections.length == 0) {
                  return (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink href={el.href}>{el.label}</NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                } else {
                  return (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuTrigger>{el.label}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="flex flex-col w-full max-w-[300px] min-w-0">
                          {el.subSections.map((el, index) => (
                            <Link href={el.href} className="p-3 hover:underline" key={index}>
                              {el.label}
                            </Link>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }
              })}
            </NavigationMenuList>
          </NavigationMenu>
          <Button variant="secondary" size="sm" asChild className="rounded-lg font-bold">
            <Link href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
              <Image
                src="/discord.png"
                alt=""
                width={18}
                height={18}
                className="brightness-0 opacity-85"
              />
              Discord
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
