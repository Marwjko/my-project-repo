
"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { LogIn } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate Login
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Welcome Back",
        description: "Successfully logged in to your promoter account.",
      })
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <>
      <Header />
      <main className="flex-grow py-12 md:py-24 bg-secondary/30 flex items-center">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="shadow-2xl border-primary/10">
            <CardHeader className="text-center space-y-1">
              <div className="mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <LogIn className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-3xl font-headline font-bold">Promoter Login</CardTitle>
              <CardDescription>
                Access your dashboard to manage your offers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="name@company.com" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button variant="link" className="p-0 h-auto text-xs" type="button">Forgot password?</Button>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={isSubmitting}>
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
                <div className="text-center text-sm text-muted-foreground mt-4">
                  Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Register now</Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
