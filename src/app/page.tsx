import Link from "next/link"
import { Header } from "./components/header"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { SectionTitle } from "./components/ui/section-title"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center w-full">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-28 relative flex justify-center">
          {/* Decorative elements */}
          <div className="absolute inset-0 -z-10 mix-blend-multiply opacity-70">
            <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-primary/20 blur-[80px]" />
            <div className="absolute bottom-1/4 right-1/3 h-72 w-72 rounded-full bg-accent/20 blur-[100px]" />
            <div className="absolute top-1/3 right-1/4 h-56 w-56 rounded-full bg-secondary/20 blur-[90px]" />
            <div className="absolute top-1/2 right-1/2 h-48 w-48 rounded-full bg-primary/20 blur-[70px]" />
          </div>
          
          <div className="max-w-screen-xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            <div className="sparkle max-w-4xl">
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl magical-text">
                Pyramid Game
              </h1>
            </div>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground sm:text-2xl">
              A social ranking experience inspired by the famous Korean drama
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              <Link href="/register">
                <Button variant="crystal" size="xl" animation="sparkle" className="font-semibold">
                  Host a Game
                </Button>
              </Link>
              <Link href="/join">
                <Button variant="mystic" size="xl" className="font-semibold">
                  Join a Game
                </Button>
              </Link>
            </div>
          </div>

          {/* Magical divider */}
          <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-16 relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-black/50 opacity-80"></div>
          <div className="max-w-screen-xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle subtitle="Discover how to play the social ranking game that will reveal your true standing">
              How It Works
            </SectionTitle>
            
            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              <Card variant="crystal" animation="float">
                <CardHeader className="text-center">
                  <CardTitle magical>1. Host a Game</CardTitle>
                  <CardDescription>
                    Create your own Pyramid Game and invite participants with a secret code.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 rounded-md bg-black/40 flex items-center justify-center backdrop-blur-sm">
                    <div className="text-5xl">🎮</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card variant="crystal" animation="float">
                <CardHeader className="text-center">
                  <CardTitle magical>2. Cast Your Votes</CardTitle>
                  <CardDescription>
                    Each player gets 5 votes to cast for their classmates within the time limit.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 rounded-md bg-black/40 flex items-center justify-center backdrop-blur-sm">
                    <div className="text-5xl">🗳️</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card variant="crystal" animation="float">
                <CardHeader className="text-center">
                  <CardTitle magical>3. Reveal Rankings</CardTitle>
                  <CardDescription>
                    See who gets ranked A to F based on votes received.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 rounded-md bg-black/40 flex items-center justify-center backdrop-blur-sm">
                    <div className="text-5xl">🏆</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Ranks Showcase */}
        <section className="w-full py-16 relative">
          <div className="max-w-screen-xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle>The Ranks</SectionTitle>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
              <Card variant="crystal" hover animation="float" className="overflow-hidden">
                <CardContent className="pt-6">
                  <div className="text-5xl mb-4 rank-a">A</div>
                  <p className="text-center text-md text-foreground font-medium">The Elite</p>
                  <p className="text-center text-sm text-muted-foreground mb-4">75%+ votes</p>
                  <div className="h-2 w-3/4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full"></div>
                </CardContent>
              </Card>
              
              <Card variant="crystal" hover animation="float" className="overflow-hidden">
                <CardContent className="pt-6">
                  <div className="text-5xl mb-4 rank-b">B</div>
                  <p className="text-center text-md text-foreground font-medium">The Favored</p>
                  <p className="text-center text-sm text-muted-foreground mb-4">15%+ votes</p>
                  <div className="h-2 w-3/5 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full"></div>
                </CardContent>
              </Card>
              
              <Card variant="crystal" hover animation="float" className="overflow-hidden">
                <CardContent className="pt-6">
                  <div className="text-5xl mb-4 rank-c">C</div>
                  <p className="text-center text-md text-foreground font-medium">The Average</p>
                  <p className="text-center text-sm text-muted-foreground mb-4">5%+ votes</p>
                  <div className="h-2 w-2/5 bg-gradient-to-r from-amber-700 to-amber-900 rounded-full"></div>
                </CardContent>
              </Card>
              
              <Card variant="crystal" hover animation="float" className="overflow-hidden">
                <CardContent className="pt-6">
                  <div className="text-5xl mb-4 rank-d">D</div>
                  <p className="text-center text-md text-foreground font-medium">The Unfavored</p>
                  <p className="text-center text-sm text-muted-foreground mb-4">&lt; 5% votes</p>
                  <div className="h-2 w-1/4 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full"></div>
                </CardContent>
              </Card>
              
              <Card variant="crystal" hover animation="float" className="overflow-hidden">
                <CardContent className="pt-6">
                  <div className="text-5xl mb-4 rank-f">F</div>
                  <p className="text-center text-md text-foreground font-medium">The Rejected</p>
                  <p className="text-center text-sm text-muted-foreground mb-4">No votes</p>
                  <div className="h-2 w-1/6 bg-gradient-to-r from-red-500 to-red-700 rounded-full"></div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Rules Section */}
        <section className="w-full py-16 relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 to-transparent opacity-80"></div>
          <div className="max-w-screen-xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle>The Rules</SectionTitle>
            
            <Card variant="mystic" className="max-w-3xl mx-auto">
              <CardContent className="pt-6">
                <ul className="space-y-4 pl-5">
                  <li className="flex items-start">
                    <span className="inline-block mr-2 text-primary">✦</span>
                    Users are given five votes to cast for any five classmates
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block mr-2 text-primary">✦</span>
                    The number of votes a student receives determines their rank
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block mr-2 text-primary">✦</span>
                    Users are ranked from A to D based on votes
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block mr-2 text-primary">✦</span>
                    Users with the most Rank A votes receive special privileges
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block mr-2 text-primary">✦</span>
                    The user with no votes gets F rank
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block mr-2 text-primary">✦</span>
                    There will be a certain time limit set by the host to vote
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block mr-2 text-primary">✦</span>
                    If the user is unable to vote within the time limit, they will get an F (Abstention)
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block mr-2 text-primary">✦</span>
                    Before you join, you have to accept the rules of the game
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link href="/register">
                  <Button variant="magical" size="lg">Start Your Pyramid Game</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-6 bg-black/40 backdrop-blur-sm w-full">
        <div className="max-w-screen-xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Pyramid Game. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
