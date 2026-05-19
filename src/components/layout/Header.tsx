
"use client"

import Link from 'next/link'
import { Search, UserPlus, Home, Utensils, Car, PlusCircle, LogIn, Sofa } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg shadow-sm">
            <span className="font-headline font-bold text-xl">MO</span>
          </div>
          <span className="font-headline font-bold text-xl hidden sm:inline-block tracking-tight">MyOffers</span>
        </Link>

        <div className="flex-1 max-w-md hidden md:flex relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search for amazing deals..." 
            className="pl-9 w-full bg-secondary/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        <nav className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="sm" asChild className="hidden lg:flex">
            <Link href="/login">
              <LogIn className="h-4 w-4 mr-2" />
              Promoter Login
            </Link>
          </Button>
          <Button variant="default" size="sm" asChild className="shadow-md">
            <Link href="/create-offer">
              <PlusCircle className="h-4 w-4 mr-2" />
              Post a Deal
            </Link>
          </Button>
        </nav>
      </div>
      
      <div className="border-t bg-secondary/30 overflow-x-auto no-scrollbar">
        <div className="container mx-auto px-4 flex items-center h-10 gap-8 text-sm font-medium whitespace-nowrap">
          <Link href="/" className="flex items-center gap-1.5 hover:text-primary transition-colors py-2 border-b-2 border-transparent hover:border-primary">
            <Home className="h-4 w-4" /> Home
          </Link>
          <Link href="/?category=Food" className="flex items-center gap-1.5 hover:text-primary transition-colors py-2 border-b-2 border-transparent hover:border-primary">
            <Utensils className="h-4 w-4" /> Food
          </Link>
          <Link href="/?category=Auto" className="flex items-center gap-1.5 hover:text-primary transition-colors py-2 border-b-2 border-transparent hover:border-primary">
            <Car className="h-4 w-4" /> Auto
          </Link>
          <Link href="/?category=Home" className="flex items-center gap-1.5 hover:text-primary transition-colors py-2 border-b-2 border-transparent hover:border-primary">
            <Sofa className="h-4 w-4" /> Home
          </Link>
        </div>
      </div>
    </header>
  )
}
