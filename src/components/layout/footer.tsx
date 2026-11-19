import Link from 'next/link';
import { Instagram } from 'lucide-react';
import { Logo } from './logo';
import { VideoAssets } from '@/lib/video-assets';

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const Footer = () => {
  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/#about', label: 'Sobre nosotros' },
    { href: '/#our-work', label: 'Nuestro Trabajo' },
    { href: '/#services', label: 'Servicios' },
    { href: '/#news', label: 'Noticias' },
    { href: '/#contact', label: 'Contacto' },
  ];

  return (
    <footer className="relative bg-background py-12 overflow-hidden border-t">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={VideoAssets.servicesBackground}
      />
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">

          <div className="flex flex-col items-start gap-4">
            <div className="bg-white/90 rounded-2xl p-3 inline-block shadow-lg backdrop-blur-sm">
              <Logo />
            </div>
            <p className="text-white font-medium drop-shadow-md">Transformamos tus ideas en imágenes.</p>
          </div>

          <div className="hidden md:flex flex-col gap-3">
            <h3 className="font-serif text-lg text-white mb-2 uppercase tracking-widest drop-shadow-md">Navegación</h3>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-white/90 hover:text-primary transition-colors font-medium drop-shadow-sm">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <div className='flex flex-col gap-3'>
              <h3 className="font-serif text-lg text-white mb-2 uppercase tracking-widest drop-shadow-md">Contáctanos</h3>
              <a href="mailto:colectivo.oft.arquitectura@gmail.com" className="text-white/90 hover:text-primary transition-colors break-words font-medium drop-shadow-sm">
                colectivo.oft.arquitectura@gmail.com
              </a>
              <a href="tel:+56983732198" className="text-white/90 hover:text-primary transition-colors font-medium drop-shadow-sm">
                +56 9 8373 2198
              </a>
              <a href="https://wa.me/56983732198?text=Hola%20Colectivo%20OFT,%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/90 hover:text-primary transition-colors font-medium drop-shadow-sm">
                <WhatsAppIcon />
                <span>WhatsApp</span>
              </a>
            </div>
            <div className="flex flex-col gap-3 mt-4">
              <h3 className="font-serif text-lg text-white mb-2 uppercase tracking-widest drop-shadow-md">Síguenos</h3>
              <div className="flex gap-4">
                <Link href="https://www.instagram.com/colectivo_oft/" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-primary transition-colors">
                  <Instagram className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 md:hidden">
          <h3 className="font-bold text-white mb-4 uppercase text-center drop-shadow-md">Navegación</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-center text-white/90 font-medium">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-primary transition-colors drop-shadow-sm">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/60 font-medium">
          <p>&copy; {new Date().getFullYear()} Colectivo OFT. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;