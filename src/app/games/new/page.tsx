"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "../../components/header"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { generateGameCode } from "@/lib/utils"

export default function NewGamePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [gameCode, setGameCode] = useState(generateGameCode())
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // This would connect to your backend in a real app
  const handleCreateGame = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    // Redirect would happen here after successful game creation
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Host a New Game</h1>
          
          <Card magical>
            <CardHeader>
              <CardTitle>Game Details</CardTitle>
              <CardDescription>
                Set up your Pyramid Game and invite participants
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleCreateGame}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Game Title
                  </label>
                  <Input
                    id="title"
                    placeholder="e.g., Class 3-A Rankings"
                    required
                    error={formErrors.title}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description (Optional)
                  </label>
                  <Input
                    id="description"
                    placeholder="Brief description of your game"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="votingTimeLimit" className="text-sm font-medium">
                    Voting Time Limit (minutes)
                  </label>
                  <Input
                    id="votingTimeLimit"
                    type="number"
                    min={1}
                    defaultValue={30}
                    required
                    error={formErrors.votingTimeLimit}
                  />
                  <p className="text-xs text-muted-foreground">
                    How long participants will have to cast their votes
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="gameCode" className="text-sm font-medium">
                    Game Code
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="gameCode"
                      value={gameCode}
                      onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                      className="text-center font-mono text-lg tracking-wider uppercase"
                      maxLength={6}
                      readOnly
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setGameCode(generateGameCode())}
                    >
                      Regenerate
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Share this code with participants to join your game
                  </p>
                </div>
                
                <div className="rounded-md bg-secondary/20 p-4">
                  <h3 className="font-medium mb-2">Game Rules</h3>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    <li>Each participant gets 5 votes</li>
                    <li>Players are ranked A-F based on votes received</li>
                    <li>Players with the most votes get Rank A</li>
                    <li>Players with no votes get Rank F</li>
                    <li>Failure to vote within the time limit results in Rank F</li>
                  </ul>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end gap-3">
                <Link href="/dashboard">
                  <Button 
                    type="button" 
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  isLoading={isLoading}
                >
                  Create Game
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
} 