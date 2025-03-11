'use client';

import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/app/components/ui/button"

export function Header() {
  // This would be replaced with actual auth logic
  const isLoggedIn = false

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link className="flex items-center space-x-2 group" href="/">
            <div className="relative sparkle">
              <span className="font-bold text-xl">
                <span className="magical-text">Pyramid</span>{" "}
                <span className="text-foreground group-hover:magical-text transition-all duration-300">Game</span>
              </span>
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            <Link 
              href="/join" 
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground hover:text-primary relative group"
            >
              Join Game
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/login" 
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground hover:text-primary relative group"
            >
              Login
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/register">
              <Button variant="crystal" size="sm" animation="sparkle">
                Register
              </Button>
            </Link>
          </nav>
        </div>
      </div>
      
      {/* Magical glow effect at bottom of header */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
    </header>
  )
} 