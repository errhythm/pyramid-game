"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "../components/header"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"

export default function JoinGamePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [gameCode, setGameCode] = useState("")
  const [username, setUsername] = useState("")
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  
  // This would connect to your backend in a real app
  const handleJoinGame = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    let hasErrors = false
    const errors: Record<string, string> = {}
    
    if (!gameCode) {
      errors.gameCode = "Game code is required"
      hasErrors = true
    }
    
    if (!username) {
      errors.username = "Username is required"
      hasErrors = true
    }
    
    if (hasErrors) {
      setFormErrors(errors)
      setIsLoading(false)
      return
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    // Redirect would happen here after successful joining
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-foreground">Join a Game</h1>
          
          <Card magical>
            <CardHeader>
              <CardTitle>Enter Game Details</CardTitle>
              <CardDescription>
                Enter the game code provided by the host
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleJoinGame}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Game Code
                  </label>
                  <Input
                    placeholder="Enter 6-digit code"
                    value={gameCode}
                    onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                    maxLength={6}
                    className="uppercase"
                    error={formErrors.gameCode}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Your Name
                  </label>
                  <Input
                    placeholder="Enter your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={formErrors.username}
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  className="w-full"
                  variant="magical" 
                  type="submit"
                  isLoading={isLoading}
                >
                  Join Game
                </Button>
                
                <div className="text-center text-sm text-foreground">
                  Want to host your own game?{" "}
                  <Link href="/games/new" className="font-semibold text-primary hover:underline">
                    Create Game
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
} 