'use client';

import { ScrollReveal } from '../scroll-reveal';
import { AllProjects, getImageById } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { slugify } from '@/lib/utils';

const workProjects = AllProjects.filter(p => [
  'zambrano', 'hoja-del-descarte'
].includes(p.id));

const OurWork = () => {
  return (
    <section id="our-work" className="bg-background py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-muted/30 pointer-events-none" />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <ScrollReveal className="flex flex-col items-center justify-center mb-20">
          <span className="text-xs font-sans tracking-[0.3em] text-primary mb-3 uppercase">Portafolio</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground font-medium tracking-tight text-center">
            Nuestro <span className="italic font-light text-primary">Trabajo</span>
          </h2>
          <div className="w-12 h-px bg-primary/50 mt-8 mb-6" />
          <p className="max-w-[600px] text-center text-muted-foreground font-light text-lg">
            Una exhibición de los proyectos donde hemos transformado el rigor técnico en excelencia visual.
          </p>
        </ScrollReveal>

        <ScrollReveal delay="200ms">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-12 lg:gap-x-16 max-w-7xl mx-auto items-center">
            {workProjects.map((project, index) => {
              const mainImage = getImageById(project.mainImageId);
              if (!mainImage) return null;

              const isEven = index % 2 === 0;

              return (
                <div key={project.id} className={`md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`md:col-span-7 ${!isEven ? 'md:order-2' : 'md:order-1'}`}>
                    <Link
                      href={`/proyectos/${slugify(project.id)}`}
                      className="group block relative overflow-hidden bg-muted"
                    >
                      <div className="aspect-[16/10] sm:aspect-[4/3] relative w-full overflow-hidden">
                        <Image
                          src={mainImage.imageUrl}
                          alt={project.description || 'Project image'}
                          fill
                          className="object-cover scale-105 transition-transform duration-[2000ms] ease-out group-hover:scale-100"
                          sizes="(max-width: 768px) 100vw, 60vw"
                          data-ai-hint={mainImage.imageHint}
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
                      </div>
                    </Link>
                  </div>

                  <div className={`md:col-span-5 flex flex-col justify-center ${!isEven ? 'md:order-1 md:items-end md:text-right' : 'md:order-2 md:items-start md:text-left'}`}>
                    <span className="text-xs font-sans tracking-[0.2em] text-primary mb-3 uppercase opacity-80">{project.category}</span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-foreground font-medium tracking-tight mb-4 group-hover:text-primary transition-colors">
                      <Link href={`/proyectos/${slugify(project.id)}`}>{project.title}</Link>
                    </h3>
                    <div className="w-12 h-px bg-border mb-6" />
                    <Link
                      href={`/proyectos/${slugify(project.id)}`}
                      className="text-sm font-sans tracking-wider uppercase text-foreground hover:text-primary transition-colors flex items-center gap-2 group/btn"
                    >
                      {isEven ? (
                        <>
                          Explorar <span className="transform transition-transform group-hover/btn:translate-x-1">→</span>
                        </>
                      ) : (
                        <>
                          <span className="transform transition-transform group-hover/btn:-translate-x-1">←</span> Explorar
                        </>
                      )}
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default OurWork;
