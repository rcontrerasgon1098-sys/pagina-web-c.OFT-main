import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Colectivo OFT | Estudio de Arquitectura',
  description: 'Colectivo de arquitectura dedicado al diseño, planimetría, renders, post-producción y modelado 3D.',
  keywords: ['arquitectura', 'renders', 'planimetría', 'diseño', 'post-producción', 'modelado 3D', 'colectivo de arquitectura'],
  authors: [{ name: 'Colectivo OFT' }],
  openGraph: {
    title: 'Colectivo OFT | Estudio de Arquitectura',
    description: 'Transformamos planos e ideas en imágenes claras, atractivas y memorables.',
    siteName: 'Colectivo OFT',
    images: [
      {
        url: 'https://raw.githubusercontent.com/Tino109/fotos-pagina-web12/main/Captura%20de%20pantalla%202025-02-14%20173614.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const logoUrl = "/logo.png";

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href={logoUrl} sizes="any" />
        <link rel="preload" as="image" href="/hero-poster.jpg" />
      </head>
      <body className={cn("font-sans antialiased", inter.variable, cormorant.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme='light'>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
