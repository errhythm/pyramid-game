'use client';

import * as React from "react"

import { cn } from "@/lib/utils"

const cardVariants = {
  default: "rounded-lg border bg-card text-card-foreground shadow-sm",
  magical: "rounded-lg border bg-card text-card-foreground shadow-lg magical-glow backdrop-blur-sm bg-opacity-90 card-hover",
  crystal: "rounded-lg border border-white/20 bg-black/40 text-card-foreground shadow-lg backdrop-blur-lg card-hover",
  mystic: "rounded-lg border-0 bg-gradient-to-br from-primary/10 to-accent/10 text-card-foreground shadow-lg card-hover"
}

function Card({ 
  className, 
  variant = "default",
  magical = false, // For backward compatibility
  hover = false,
  animation,
  ...props 
}: React.ComponentProps<"div"> & { 
  variant?: keyof typeof cardVariants;
  magical?: boolean;
  hover?: boolean;
  animation?: "none" | "float" | "pulse";
}) {
  // For backward compatibility
  if (magical) {
    variant = "magical";
  }

  return (
    <div
      className={cn(
        cardVariants[variant],
        hover && "card-hover",
        animation === "float" && "float",
        animation === "pulse" && "animate-pulse",
        "flex flex-col",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-6 text-foreground items-center", className)}
      {...props}
    />
  )
}

function CardTitle({ 
  className, 
  magical = false,
  ...props 
}: React.ComponentProps<"div"> & { 
  magical?: boolean 
}) {
  return (
    <div
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight text-foreground text-center",
        magical && "magical-text",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-sm text-muted-foreground text-center", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div 
      className={cn("p-6 pt-0 text-foreground flex flex-col items-center", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center justify-center p-6 pt-0 text-foreground", className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
