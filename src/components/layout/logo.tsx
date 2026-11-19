import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Volver al inicio" className={cn("flex items-center gap-2", className)}>
      <div className="relative w-12 h-12">
        <Image
          src="/logo.png"
          alt="Colectivo OFT Logo"
          fill
          sizes="48px"
          className="object-contain"
          priority
        />
      </div>
      <span className="font-semibold text-primary tracking-wider hidden sm:inline-block sm:text-sm">Colectivo OFT</span>
    </Link>
  );
}
