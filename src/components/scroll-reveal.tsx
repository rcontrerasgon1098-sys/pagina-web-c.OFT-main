"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useEffect, useState } from "react";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: string;
};

export const ScrollReveal = ({ children, className, threshold = 0.1, delay = '0' }: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
        className
      )}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
};
