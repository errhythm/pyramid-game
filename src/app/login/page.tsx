"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "../components/header"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    let hasErrors = false
    const errors: Record<string, string> = {}
    
    if (!email) {
      errors.email = "Email is required"
      hasErrors = true
    }
    
    if (!password) {
      errors.password = "Password is required"
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
    // Redirect would happen here after successful login
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-foreground">Sign In</h1>
          
          <Card magical>
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>
                Sign in to your Pyramid Game account
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={formErrors.email}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">
                      Password
                    </label>
                    <Link 
                      href="/reset-password" 
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={formErrors.password}
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
                  Sign In
                </Button>
                
                <div className="text-center text-sm text-foreground">
                  Don't have an account?{" "}
                  <Link href="/register" className="font-semibold text-primary hover:underline">
                    Sign Up
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