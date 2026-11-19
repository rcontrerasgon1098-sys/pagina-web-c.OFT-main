'use client';

import { DraftingCompass, Camera, BarChartBig, Images } from 'lucide-react';
import { ScrollReveal } from '../scroll-reveal';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { VideoAssets } from '@/lib/video-assets';

const services = [
  {
    icon: <DraftingCompass className="h-10 w-10 text-primary" />,
    title: 'Planimetría',
    description: 'Elaboración de planos técnicos detallados para proyectos arquitectónicos y de construcción.',
    imageUrl: '/images/planimetria.png'
  },
  {
    icon: <Camera className="h-10 w-10 text-primary" />,
    title: 'Renders',
    description: 'Creación de visualizaciones 3D fotorrealistas para dar vida a tus proyectos antes de construirlos.',
    imageUrl: '/images/renders.png'
  },
  {
    icon: <BarChartBig className="h-10 w-10 text-primary" />,
    title: 'Diagramas',
    description: 'Desarrollo de diagramas conceptuales y esquemas para comunicar ideas y procesos de diseño.',
    imageUrl: '/images/imagen_2025-12-11_004950008.png'
  },
  {
    icon: <Images className="h-10 w-10 text-primary" />,
    title: 'Post-producción',
    description: 'Retoque y mejora de imágenes para presentaciones de alto impacto visual.',
    imageUrl: '/images/imagen_2025-12-11_003152523.png'
  }
];

const GlowCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

const Services = () => {
  return (
    <section id="services" className="relative py-12 md:py-24 lg:py-32 overflow-hidden bg-muted">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-40"
        src={VideoAssets.servicesBackgroundNew}
      />
      <div className="absolute inset-0 bg-black/60 z-0 backdrop-blur-[2px]"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <ScrollReveal className="flex flex-col items-center text-center mb-16 text-white px-4">
          <span className="text-xs font-sans tracking-[0.3em] text-primary/80 mb-4 uppercase">Qué Hacemos</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-medium tracking-tight">
            Nuestros <span className="italic font-light">Servicios</span>
          </h2>
          <div className="w-12 h-px bg-primary mt-8 mb-6" />
          <p className="max-w-[600px] text-base md:text-lg text-neutral-300 font-light tracking-wide leading-relaxed">
            Nos enfocamos en la calidad y la innovación para dar vida a tus ideas a través de estos servicios clave.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-2">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={`${i * 150}ms`} className="h-full">
              <GlowCard className="group text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full rounded-2xl border border-white/10 bg-black/40 overflow-hidden flex flex-col relative">
                {/* Minimalist Top Bar */}
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="aspect-[4/3] relative w-full overflow-hidden">
                  <Image
                    src={service.imageUrl}
                    alt={`Imagen de ${service.title}`}
                    fill
                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent mix-blend-multiply" />

                  {/* Floating Icon */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform group-hover:-translate-y-2 transition-transform duration-500 drop-shadow-2xl bg-black/30 p-3 rounded-full backdrop-blur-md border border-white/5">
                    {service.icon}
                  </div>
                </div>

                <div className='p-8 flex flex-col flex-grow items-center justify-start bg-gradient-to-b from-black/80 to-black/60'>
                  <h3 className="text-xl font-serif text-white tracking-widest uppercase mb-4">{service.title}</h3>
                  <div className="w-6 h-px bg-primary/40 mb-4 group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
                  <p className="text-neutral-400 font-light text-sm flex-grow leading-relaxed">{service.description}</p>
                </div>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;