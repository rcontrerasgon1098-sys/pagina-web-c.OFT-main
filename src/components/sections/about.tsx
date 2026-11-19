'use client';

import Image from 'next/image';
import { AllImages } from '@/lib/placeholder-images';
import { ScrollReveal } from '../scroll-reveal';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const teamMembers = [
  {
    name: 'Antonia Orrego',
    image: AllImages.find((img) => img.id === 'team-1'),
    portfolioUrl: 'https://simplebooklet.com/portafolioaorrego',
  },
  {
    name: 'Darling Feliú',
    image: AllImages.find((img) => img.id === 'team-2'),
  },
  {
    name: 'Camila Troncoso',
    image: AllImages.find((img) => img.id === 'team-3'),
  },
];


const About = () => {
  return (
    <section id="about" className="bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-24 items-center">
          <ScrollReveal className="space-y-6 lg:col-span-5 relative z-10">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-foreground font-medium tracking-tight">
              Sobre <span className="text-primary italic font-light">Nosotros</span>
            </h2>
            <div className="w-12 h-px bg-primary/50 mb-8" />
            <p className="text-muted-foreground md:text-lg/relaxed font-light leading-relaxed">
              Somos un colectivo de estudiantes de arquitectura apasionados por el diseño. Ofrecemos nuestros servicios a otros estudiantes y profesionales, brindando apoyo en todas las etapas de la carrera, desde el primer semestre hasta el proyecto de título.
            </p>
          </ScrollReveal>

          <ScrollReveal className="space-y-6 lg:col-span-7 bg-white p-8 md:p-12 shadow-sm relative" delay="200ms">
            <div className="absolute -left-4 -top-4 w-24 h-24 border-l border-t border-primary/20" />
            <div className="absolute -right-4 -bottom-4 w-24 h-24 border-r border-b border-primary/20" />

            <h3 className="text-2xl sm:text-3xl font-serif text-foreground font-medium tracking-tight">Nuestra Filosofía</h3>
            <p className="text-muted-foreground font-light leading-relaxed">
              En Colectivo OFT creemos que cada proyecto merece ser representado con precisión, belleza y carácter. Nuestro enfoque combina el rigor técnico de la arquitectura con la sensibilidad estética del diseño gráfico, para transformar planos e ideas en imágenes claras, atractivas y memorables. Nos motiva entregar trabajos que no solo comuniquen, sino que también inspiren, aportando valor visual a cada proceso académico o profesional.
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-24 pt-24 border-t border-border/40">
          <ScrollReveal className="flex flex-col items-center justify-center mb-16">
            <span className="text-xs font-sans tracking-[0.3em] text-primary mb-3 uppercase">Quienes Somos</span>
            <h3 className="text-4xl font-serif text-foreground font-medium tracking-tight text-center">
              Nuestro Equipo
            </h3>
          </ScrollReveal>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
              }),
            ]}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {teamMembers.map((member, i) => (
                <CarouselItem key={i} className="basis-full sm:basis-1/2 md:basis-1/3 pl-4 sm:pl-6">
                  <div className="p-2 h-full">
                    <div className="group relative overflow-hidden bg-background h-full flex flex-col hover:-translate-y-2 transition-transform duration-500 ease-out">
                      <div className="aspect-[3/4] overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                        {member.image && (
                          <Image
                            src={member.image.imageUrl}
                            alt={`Photo of ${member.name}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-in-out"
                            data-ai-hint={member.image.imageHint}
                          />
                        )}
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                      </div>

                      <div className="pt-6 pb-2 text-center bg-background z-10">
                        <h4 className="text-xl font-serif font-medium tracking-wider text-foreground">
                          {member.name}
                        </h4>
                        <div className="w-8 h-[1px] bg-primary/30 mx-auto mt-4 transition-all duration-300 group-hover:w-16 group-hover:bg-primary" />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="mt-32 pt-24 border-t border-border/40 pb-12">
          <ScrollReveal className="flex flex-col items-center justify-center mb-16">
            <span className="text-xs font-sans tracking-[0.3em] text-primary mb-3 uppercase">Herramientas</span>
            <h3 className="text-3xl font-serif text-foreground font-medium tracking-tight text-center">
              Software que Utilizamos
            </h3>
          </ScrollReveal>
          <ScrollReveal delay="200ms">
            <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-14 md:gap-20 opacity-70">
              {[
                { name: 'AutoCAD', icon: '/icons/autocad.svg' },
                { name: 'SketchUp', icon: '/icons/sketchup.svg' },
                { name: 'Rhinoceros', icon: '/icons/rhinoceros.svg' },
                { name: 'Photoshop', icon: '/icons/photoshop.svg' },
                { name: 'Illustrator', icon: '/icons/illustrator.svg' },
                { name: 'Revit', icon: '/icons/revit.svg' },
                { name: 'Twinmotion', icon: '/icons/twinmotion.png' },
                { name: 'InDesign', icon: '/icons/indesign.svg' }
              ].map(software => (
                <div key={software.name} className="flex flex-col items-center gap-4 group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 relative grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500 ease-out hover:-translate-y-2">
                    <Image
                      src={software.icon}
                      alt={software.name}
                      title={software.name}
                      fill
                      className="object-contain"
                      sizes="56px"
                    />
                  </div>
                  <span className="text-[10px] sm:text-xs font-sans tracking-[0.2em] font-light text-muted-foreground uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {software.name}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;
