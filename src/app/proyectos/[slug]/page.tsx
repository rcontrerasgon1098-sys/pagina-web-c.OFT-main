'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { getProjectBySlug, getImageById } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState, useCallback } from 'react';

export default function ProjectPage() {
  const params = useParams();
  const slug = String(Array.isArray(params.slug) ? params.slug[0] : params.slug);
  const project = getProjectBySlug(slug);
  const [api, setApi] = useState<CarouselApi>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const playVideo = useCallback(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Capturamos el error silenciosamente
        });
      }
    }
  }, []);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      if (videoRef.current) {
        if (api.selectedScrollSnap() === 0) {
          videoRef.current.currentTime = 0;
          playVideo();
        } else {
          videoRef.current.pause();
        }
      }
    };

    api.on("select", handleSelect);

    if (api.selectedScrollSnap() === 0) {
      playVideo();
    }

    return () => {
      api.off("select", handleSelect);
    };

  }, [api, playVideo]);


  if (!project) {
    notFound();
  }

  const isZambrano = project.id === 'zambrano';

  const galleryImages = isZambrano
    ? []
    : project.galleryImageIds.map(id => getImageById(id)).filter(Boolean);

  const autoplayPlugin = !isZambrano
    ? Autoplay({
      delay: project?.videoUrl ? 8000 : 3000,
      stopOnInteraction: false,
      playOnInit: true,
    })
    : undefined;

  const mainImage = getImageById(project.mainImageId);

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 pt-20">
        <section className="py-8 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-6 md:mb-12">
              <Button asChild variant="ghost" className="hover:bg-primary/10">
                <Link href="/#our-work" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                  <ArrowLeft className="h-4 w-4" />
                  Volver al inicio
                </Link>
              </Button>
            </div>
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-16">
              <div className="lg:col-span-3">
                <div className="relative group">
                  <Carousel
                    setApi={setApi}
                    className="w-full"
                    plugins={autoplayPlugin ? [autoplayPlugin] : []}
                    opts={{
                      loop: !isZambrano,
                    }}
                  >
                    <CarouselContent>
                      {project.videoUrl && (
                        <CarouselItem>
                          <div className="aspect-video relative overflow-hidden rounded-2xl bg-muted shadow-2xl">
                            <video
                              ref={videoRef}
                              src={project.videoUrl}
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="auto"
                              poster={mainImage?.imageUrl}
                              className="absolute top-0 left-0 w-full h-full object-cover"
                            />
                          </div>
                        </CarouselItem>
                      )}
                      {galleryImages.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="aspect-video relative overflow-hidden rounded-2xl bg-muted shadow-lg">
                            {image && (
                              <Image
                                src={image.imageUrl}
                                alt={image.description || `Project image ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 60vw"
                                priority={index === 0 && !project.videoUrl}
                                data-ai-hint={image.imageHint}
                              />
                            )}
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {(galleryImages.length > 0 || project.videoUrl) && (galleryImages.length + (project.videoUrl ? 1 : 0)) > 1 && (
                      <div className="hidden sm:block">
                        <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 backdrop-blur-sm border-none hover:bg-primary hover:text-white" />
                        <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 backdrop-blur-sm border-none hover:bg-primary hover:text-white" />
                      </div>
                    )}
                  </Carousel>
                </div>
              </div>
              <div className="lg:col-span-2 space-y-6 md:py-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-none">{project.title}</h1>
                  <div className="w-20 h-1 bg-primary rounded-full"></div>
                </div>
                <p className="text-primary font-bold text-lg uppercase tracking-widest">{project.category}</p>
                <div className="prose prose-neutral max-w-none text-muted-foreground leading-relaxed text-base md:text-lg">
                  {project.description.split('\\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}