'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { VideoAssets } from '@/lib/video-assets';


const Hero = () => {
  return (
    <section id="home" className="relative w-full h-dvh p-0 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0 bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          className="w-full h-full object-cover opacity-60 scale-105"
          style={{ filter: "grayscale(20%) contrast(110%) brightness(90%)" }}
          src={VideoAssets.heroBackground}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 mix-blend-multiply" />
      </div>

      <div className="relative z-20 container mx-auto px-6 flex flex-col items-center justify-center text-center h-fullpt-32">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tight mb-8 text-white max-w-5xl leading-[1.1] drop-shadow-2xl"
        >
          Diseño claro, imágenes que inspiran.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-300 font-sans mb-12 drop-shadow-md font-light tracking-wide leading-relaxed"
        >
          Trabajamos para que tus planos, renders y postproducciones sean precisos, llamativos y fáciles de comprender.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1, ease: "easeOut" }}
        >
          <Button asChild size="lg" className="rounded-full px-10 py-7 text-sm md:text-base tracking-widest uppercase bg-white/10 text-white hover:bg-white hover:text-black border border-white/30 backdrop-blur-md transition-all duration-300 group">
            <Link href="#contact" className="flex items-center">
              Cotiza tu proyecto
              <ArrowRight className="ml-3 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/50 z-20"
      >
        <span className="text-xs uppercase tracking-[0.3em] mb-4">Descubre</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-white/80"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;