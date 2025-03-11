"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "../../components/header"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { getRankClass } from "@/lib/utils"

export default function GamePage({ params }: { params: { id: string } }) {
  const [gameStatus, setGameStatus] = useState<"waiting" | "voting" | "results">("voting")
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Mock data - in a real app, this would come from your API
  const gameData = {
    id: params.id,
    title: "Class 3-A Midterm Rankings",
    description: "Vote for your top 5 classmates",
    votingTimeLimit: 30,
    status: "VOTING",
    host: { id: "1", name: "Teacher Kim" },
    participants: [
      { id: "1", name: "Min-ho Lee", rank: null, voteCount: 0 },
      { id: "2", name: "Ji-woo Park", rank: null, voteCount: 0 },
      { id: "3", name: "Soo-jin Kim", rank: null, voteCount: 0 },
      { id: "4", name: "Jun-ho Choi", rank: null, voteCount: 0 },
      { id: "5", name: "Yeon-hee Jung", rank: null, voteCount: 0 },
      { id: "6", name: "Tae-woo Kang", rank: null, voteCount: 0 },
      { id: "7", name: "Ha-na Song", rank: null, voteCount: 0 },
      { id: "8", name: "Min-seo Oh", rank: null, voteCount: 0 },
      { id: "9", name: "Joon-young Seo", rank: null, voteCount: 0 },
      { id: "10", name: "Yoo-jin Hwang", rank: null, voteCount: 0 },
    ],
    // Mock results for the results view
    results: [
      { id: "1", name: "Min-ho Lee", rank: "A", voteCount: 8 },
      { id: "7", name: "Ha-na Song", rank: "A", voteCount: 7 },
      { id: "3", name: "Soo-jin Kim", rank: "B", voteCount: 5 },
      { id: "6", name: "Tae-woo Kang", rank: "B", voteCount: 4 },
      { id: "10", name: "Yoo-jin Hwang", rank: "C", voteCount: 3 },
      { id: "9", name: "Joon-young Seo", rank: "C", voteCount: 2 },
      { id: "2", name: "Ji-woo Park", rank: "D", voteCount: 1 },
      { id: "4", name: "Jun-ho Choi", rank: "D", voteCount: 1 },
      { id: "5", name: "Yeon-hee Jung", rank: "D", voteCount: 1 },
      { id: "8", name: "Min-seo Oh", rank: "F", voteCount: 0 },
    ],
  }

  const handleParticipantSelect = (participantId: string) => {
    setSelectedParticipants(prev => {
      // If already selected, remove it
      if (prev.includes(participantId)) {
        return prev.filter(id => id !== participantId)
      }
      
      // If already selected 5 participants, don't add more
      if (prev.length >= 5) {
        return prev
      }
      
      // Add the participant
      return [...prev, participantId]
    })
  }

  const handleSubmitVotes = async () => {
    if (selectedParticipants.length !== 5) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Show results after votes are submitted
    setGameStatus("results")
    setIsSubmitting(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">{gameData.title}</h1>
            {gameData.description && (
              <p className="text-muted-foreground mt-2">{gameData.description}</p>
            )}
            <div className="flex items-center gap-2 mt-4">
              <div className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                {gameStatus === "waiting" && "Waiting for players"}
                {gameStatus === "voting" && "Voting in progress"}
                {gameStatus === "results" && "Results"}
              </div>
              <div className="text-sm">
                Host: {gameData.host.name}
              </div>
            </div>
          </header>

          {gameStatus === "voting" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cast Your Votes</CardTitle>
                  <CardDescription>
                    Select 5 participants from the list. Your choices will remain anonymous.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:grid-cols-2">
                    {gameData.participants.map(participant => (
                      <button
                        key={participant.id}
                        onClick={() => handleParticipantSelect(participant.id)}
                        className={`
                          flex items-center gap-3 p-3 rounded-md border text-left transition-all
                          ${selectedParticipants.includes(participant.id) 
                            ? "border-primary bg-primary/5 shadow-sm" 
                            : "border-border hover:border-primary/30 hover:bg-secondary/20"}
                        `}
                      >
                        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                          {selectedParticipants.includes(participant.id) ? (
                            <div className="h-3 w-3 rounded-full bg-primary"></div>
                          ) : (
                            <span>{participant.name.charAt(0)}</span>
                          )}
                        </div>
                        <span>{participant.name}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center gap-2">
                  <div className="text-sm mb-2">
                    {selectedParticipants.length} of 5 votes selected
                  </div>
                  <Button 
                    onClick={handleSubmitVotes}
                    disabled={selectedParticipants.length !== 5}
                    isLoading={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    Submit Votes
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="text-sm text-muted-foreground text-center">
                You must cast exactly 5 votes. Once submitted, votes cannot be changed.
              </div>
            </div>
          )}

          {gameStatus === "results" && (
            <div className="space-y-6">
              <Card magical>
                <CardHeader>
                  <CardTitle>Final Rankings</CardTitle>
                  <CardDescription>
                    Results based on votes received from all participants
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {gameData.results.map((participant) => (
                      <div 
                        key={participant.id} 
                        className="flex items-center justify-between p-3 rounded-md border border-border"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                            <span>{participant.name.charAt(0)}</span>
                          </div>
                          <span>{participant.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">
                            {participant.voteCount} votes
                          </span>
                          <div className={`
                            font-bold text-xl px-3 py-1 rounded-md
                            ${getRankClass(participant.rank)}
                          `}>
                            {participant.rank}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Link href="/dashboard">
                    <Button variant="outline">
                      Return to Dashboard
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
} 