'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
}

export function SectionTitle({ children, className, subtitle }: SectionTitleProps) {
  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <h2 className={cn(
        "text-4xl font-bold mb-4 magical-text relative inline-block",
        className
      )}>
        {children}
        <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-70"></span>
      </h2>
      {subtitle && (
        <p className="text-center max-w-2xl mx-auto text-muted-foreground">
          {subtitle}
        </p>
      )}
      <div className="mt-4 flex items-center justify-center w-full">
        <div className="h-px w-16 bg-primary/20"></div>
        <div className="mx-3 text-primary/70">✧</div>
        <div className="h-px w-16 bg-primary/20"></div>
      </div>
    </div>
  );
}
