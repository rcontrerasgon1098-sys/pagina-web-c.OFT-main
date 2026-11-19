'use client';

import { CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '../scroll-reveal';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Article } from '@/lib/rss';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

type NewsSectionProps = {
  articles: Article[];
};

const GlowCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    card.addEventListener('mousemove', handleMouseMove);
    return () => card.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={cardRef} className={cn('card-glow-effect', className)}>
      {children}
    </div>
  );
};

const NewsSection = ({ articles }: NewsSectionProps) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        <p>No se pudieron cargar las noticias en este momento. Por favor, inténtalo de nuevo más tarde.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full px-4 sm:px-12">
      <Carousel
        opts={{
          align: "start",
          loop: articles.length > 2,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {articles.map((article, i) => (
            <CarouselItem key={article.link} className="pl-4 md:basis-1/2 lg:basis-1/3 h-auto">
              <ScrollReveal delay={`${i * 100}ms`} className="h-full">
                <GlowCard className={cn("group flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-card overflow-hidden",
                  "relative rounded-xl border"
                )}>
                  {article.thumbnail ? (
                    <>
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${article.thumbnail})` }}
                      />
                      <div className="absolute inset-0 bg-black/60" />
                    </>
                  ) : <div className='absolute inset-0 bg-secondary' />}
                  <div className={cn("relative z-10 flex flex-col flex-grow p-6", article.thumbnail ? 'text-white' : 'text-foreground')}>
                    <CardHeader className="p-0">
                      <div className="mb-4">
                        <p className={cn('text-xs font-semibold text-primary uppercase tracking-wider')}>
                          {format(new Date(article.pubDate), "d 'de' MMMM, yyyy", { locale: es })}
                        </p>
                      </div>
                      <CardTitle className="text-lg md:text-xl font-bold uppercase leading-tight mb-2">{article.title}</CardTitle>
                    </CardHeader>
                    <div className="flex-grow p-0 mt-2">
                      <CardDescription className={cn("text-sm line-clamp-3", article.thumbnail ? "text-gray-300" : "text-muted-foreground")}>{article.contentSnippet}</CardDescription>
                    </div>
                    <CardFooter className="p-0 mt-auto pt-6">
                      <Button asChild variant="link" className={cn("p-0 font-semibold text-primary h-auto", article.thumbnail && "hover:text-white")}>
                        <Link href={article.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                          Leer más en ArchDaily
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </div>
                </GlowCard>
              </ScrollReveal>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious className="flex bg-background/80 text-foreground border border-border hover:bg-primary hover:text-primary-foreground -left-12" />
          <CarouselNext className="flex bg-background/80 text-foreground border border-border hover:bg-primary hover:text-primary-foreground -right-12" />
        </div>
      </Carousel>
    </div>
  );
};

export default NewsSection;