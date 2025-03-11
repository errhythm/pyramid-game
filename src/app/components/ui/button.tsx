'use client';

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-foreground",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20",
        destructive:
          "bg-destructive text-white shadow-md hover:bg-destructive/90 hover:shadow-lg hover:shadow-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-input bg-background shadow-md hover:bg-accent hover:text-accent-foreground hover:shadow-lg hover:shadow-accent/10 text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/80 hover:shadow-lg hover:shadow-secondary/20",
        ghost: "hover:bg-accent hover:text-accent-foreground text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        magical: 
          "relative overflow-hidden bg-black/80 text-white backdrop-blur-sm magical-glow before:opacity-70 hover:before:opacity-100 hover:bg-black/70 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300",
        mystic:
          "relative overflow-hidden bg-gradient-to-br from-primary/80 to-accent/80 text-white shadow-md hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-300 after:absolute after:inset-0 after:opacity-0 after:bg-gradient-to-tl after:from-white/10 after:to-transparent after:transition-opacity hover:after:opacity-100",
        crystal: 
          "relative border border-white/20 bg-black/40 backdrop-blur-lg text-white shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-r before:from-primary/30 before:to-accent/30 before:opacity-0 hover:before:opacity-100 before:transition-opacity",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        xl: "h-12 rounded-md px-8 text-base has-[>svg]:px-6",
        icon: "size-9",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        float: "float",
        sparkle: "sparkle",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
)

function Button({
  className,
  variant,
  size,
  animation,
  asChild = false,
  isLoading,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, animation, className }), "text-foreground")}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          {props.children}
        </>
      ) : (
        props.children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
