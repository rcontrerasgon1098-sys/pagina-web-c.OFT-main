
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Logo } from './logo';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/#about', label: 'Sobre nosotros' },
  { href: '/#our-work', label: 'Nuestro Trabajo' },
  { href: '/#services', label: 'Servicios' },
  { href: '/#news', label: 'Noticias' },
  { href: '/#contact', label: 'Contacto' },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('/');
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (pathname === '/') {
        const sections = ['about', 'our-work', 'services', 'news', 'contact'];
        let currentSection = '/';

        const scrollPosition = window.scrollY + window.innerHeight / 2;

        for (const id of sections) {
          const element = document.getElementById(id);
          if (element && element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
            currentSection = `/#${id}`;
            break;
          }
        }

        if (window.scrollY < window.innerHeight / 2) {
          currentSection = '/';
        }

        setActiveSection(currentSection);
      } else {
        setActiveSection(pathname);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const getIsActive = (href: string) => {
    if (href.startsWith('/#') || href === '/') {
      return activeSection === href;
    }
    return pathname.startsWith(href) && href !== '/';
  };

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
      isScrolled ? "bg-background/90 backdrop-blur-xl shadow-sm border-b border-white/10 py-3" : "bg-transparent py-6"
    )}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between">
          <Logo className={cn("transition-transform duration-700 ease-out", isScrolled ? "scale-90" : "scale-100")} />
          <nav className="hidden md:flex items-center gap-10 text-xs font-sans uppercase tracking-[0.25em] font-medium">
            {navLinks.map(({ href, label }) => {
              const isActive = getIsActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative transition-all duration-300 group overflow-hidden py-1",
                    isActive ? "text-primary" : (isScrolled ? "text-foreground" : "text-white/90 hover:text-white")
                  )}
                >
                  <span className="relative z-10 transition-transform duration-300 block group-hover:-translate-y-[120%]">{label}</span>
                  <span className="absolute left-0 top-0 z-10 transition-transform duration-300 block translate-y-[120%] group-hover:translate-y-0 text-primary">{label}</span>

                  {/* Subtle active indicator */}
                  <span className={cn(
                    "absolute -bottom-0.5 left-0 h-[1px] bg-primary transition-all duration-500 ease-out",
                    isActive ? "w-full opacity-100" : "w-0 opacity-0"
                  )} />
                </Link>
              )
            })}
          </nav>

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn("h-12 w-12 rounded-full", isScrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10")}>
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[400px] p-0 border-l-0 bg-background/95 backdrop-blur-2xl">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-8 border-b border-border/40">
                    <Logo />
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted">
                        <X className="h-6 w-6" />
                      </Button>
                    </SheetClose>
                  </div>
                  <nav className="flex flex-col gap-0 p-8 mt-4">
                    <span className="text-[10px] font-sans tracking-[0.3em] text-primary/70 mb-6 uppercase">Menú</span>
                    {navLinks.map(({ href, label }) => {
                      const isActive = getIsActive(href);
                      return (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "text-2xl font-serif font-medium tracking-wide py-5 border-b border-border/40 transition-all flex items-center justify-between group",
                            isActive ? "text-primary pl-4 border-primary/30" : "text-foreground hover:text-primary hover:pl-4"
                          )}
                        >
                          {label}
                          <ArrowRight className={cn("h-5 w-5 transition-transform duration-500 ease-out", isActive ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100")} />
                        </Link>
                      )
                    })}
                  </nav>

                  <div className="mt-auto p-8 text-center border-t border-border/40">
                    <p className="text-xs font-sans tracking-[0.2em] text-muted-foreground uppercase">Transformamos tus ideas en imágenes.</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
