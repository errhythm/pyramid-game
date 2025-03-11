"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "../components/header"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    let hasErrors = false
    const errors: Record<string, string> = {}
    
    if (!name) {
      errors.name = "Name is required"
      hasErrors = true
    }
    
    if (!email) {
      errors.email = "Email is required"
      hasErrors = true
    }
    
    if (!password) {
      errors.password = "Password is required"
      hasErrors = true
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters"
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
    // Redirect would happen here after successful registration
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-foreground">Create Account</h1>
          
          <Card magical>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create a new Pyramid Game account
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Full Name
                  </label>
                  <Input
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={formErrors.name}
                  />
                </div>
                
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
                  <label className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={formErrors.password}
                  />
                  <p className="text-xs text-muted-foreground">
                    Must be at least 8 characters
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  className="w-full"
                  variant="magical" 
                  type="submit"
                  isLoading={isLoading}
                >
                  Create Account
                </Button>
                
                <div className="text-center text-sm text-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="font-semibold text-primary hover:underline">
                    Sign In
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