
"use client"

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { UserPlus, Building2 } from 'lucide-react'

export default function RegisterPromoter() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulating API call for Part 1
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Registration Successful",
        description: "Welcome to MyOffers! You can now start creating deals.",
      })
    }, 1500)
  }

  return (
    <>
      <Header />
      <main className="flex-grow py-12 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="shadow-xl">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <UserPlus className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl font-headline">Register as a Promoter</CardTitle>
              <CardDescription>
                Join hundreds of businesses reaching thousands of customers daily.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Family Name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@company.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input id="mobile" placeholder="+966 50 000 0000" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input id="address" placeholder="e.g. King Fahd Road, Riyadh" required />
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Register Now"}
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account? <Button variant="link" className="p-0 h-auto">Sign in</Button>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
