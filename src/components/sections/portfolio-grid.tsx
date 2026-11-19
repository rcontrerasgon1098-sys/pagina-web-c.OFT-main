'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

type PortfolioGridProps = {
    projects: (Project & { mainImageUrl?: string; mainImageHint?: string })[];
    className?: string;
};

export default function PortfolioGrid({ projects, className }: PortfolioGridProps) {

    return (
        <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6", className)}>
            {projects.map((project, index) => {
                const slug = project.id;
                if (!project.mainImageUrl) return null;

                return (
                    <Link
                        key={project.id}
                        href={`/portfolio/${slug}`}
                        className={cn(
                            "group relative block overflow-hidden rounded-lg",
                            "aspect-square"
                        )}
                    >
                        <Image
                            src={project.mainImageUrl}
                            alt={project.description || `Project image ${index + 1}`}
                            fill
                            className="object-cover w-full h-full transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                            data-ai-hint={project.mainImageHint}
                        />
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out flex flex-col items-center justify-center p-4 text-center">
                            <Plus className="h-8 w-8 text-primary mb-3 transform transition-transform duration-700 group-hover:rotate-90" />
                            <h3 className="font-bold text-lg text-foreground uppercase tracking-widest mb-2">{project.title}</h3>
                            <p className="text-sm font-medium text-primary tracking-wider">{project.category}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
