
"use client"

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { ShoppingCart, Plus, Minus, Mail, Phone, MapPin, User, ChevronLeft, Share2, Heart } from 'lucide-react'

export default function OfferDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [quantity, setQuantity] = useState(1)
  
  // Simulation of dynamic deal matching based on ID
  const mockDeals = [
    { id: '1', title: 'Gourmet Wagyu Burger Set for Two', category: 'Food', imgId: 'food-deal-1', orig: 150, cur: 75 },
    { id: '2', title: 'Premium Ceramic Car Coating', category: 'Auto', imgId: 'auto-deal-1', orig: 1200, cur: 599 },
    { id: '3', title: 'Authentic 5-Course Italian Dinner', category: 'Food', imgId: 'food-deal-2', orig: 300, cur: 199 },
    { id: '4', title: 'Smart Home Security Package', category: 'Home', imgId: 'home-deal-1', orig: 800, cur: 400 },
    { id: '5', title: 'Annual Wheel Alignment Pass', category: 'Auto', imgId: 'auto-deal-2', orig: 250, cur: 125 },
    { id: '6', title: 'Modern Minimalist Living Room Sofa', category: 'Home', imgId: 'home-deal-2', orig: 3500, cur: 2100 }
  ]

  const currentDealMeta = mockDeals.find(d => d.id === id) || mockDeals[0]

  const deal = {
    id: id,
    title: currentDealMeta.title,
    category: currentDealMeta.category,
    imageUrl: PlaceHolderImages.find(img => img.id === currentDealMeta.imgId)?.imageUrl || '',
    originalPrice: currentDealMeta.orig,
    actualPrice: currentDealMeta.cur,
    discount: Math.round(((currentDealMeta.orig - currentDealMeta.cur) / currentDealMeta.orig) * 100),
    inventory: 12,
    description: `Indulge in this exclusive offer. This deal has been handpicked to provide the best value and quality experience in the ${currentDealMeta.category} category.\n\nWhat's included in this package:\n- Premium quality product/service\n- Full support and warranty\n- Exclusive member-only benefits\n- Satisfaction guaranteed\n\nLimited time offer while stocks last!`,
    promoter: {
      name: 'Premium Services Ltd.',
      owner: 'Ahmed Al-Saud',
      address: 'Main Business District, Riyadh, Saudi Arabia',
      email: 'support@premiumservices.com',
      phone: '+966 11 223 4455'
    }
  }

  const isSoldOut = deal.inventory <= 0

  return (
    <>
      <Header />
      <main className="flex-grow py-8 md:py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to Explore
            </Link>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full shadow-sm"><Share2 className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" className="rounded-full shadow-sm"><Heart className="h-4 w-4" /></Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Image and Detailed Info */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="overflow-hidden border-none shadow-xl rounded-2xl">
                <div className="relative aspect-[16/9] md:aspect-[21/9]">
                  <Image 
                    src={deal.imageUrl} 
                    alt={deal.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-primary/90 text-white border-none px-4 py-1.5 text-sm font-bold shadow-lg">
                      {deal.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-8 md:p-12">
                  <h1 className="text-3xl md:text-5xl font-headline font-bold mb-6 tracking-tight leading-tight">{deal.title}</h1>
                  
                  <div className="flex items-baseline gap-6 mb-10">
                    <div className="flex flex-col">
                       <span className="text-5xl font-bold text-destructive">${deal.actualPrice}</span>
                       <span className="text-xl text-muted-foreground/60 line-through mt-1">${deal.originalPrice}</span>
                    </div>
                    <Badge variant="destructive" className="text-xl px-5 py-2 font-bold shadow-md h-fit">
                      {deal.discount}% OFF
                    </Badge>
                  </div>

                  <Separator className="my-10" />

                  <div className="space-y-6">
                    <h3 className="text-2xl font-headline font-bold">About this Offer</h3>
                    <div className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line max-w-3xl">
                      {deal.description}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sticky Sidebar for Purchase */}
            <div className="space-y-8">
              <Card className="shadow-2xl border-primary/10 sticky top-28 rounded-2xl overflow-hidden">
                <div className="bg-primary/5 p-4 text-center border-b border-primary/10">
                   <p className="text-xs font-bold text-primary uppercase tracking-widest">Limited Time Promotion</p>
                </div>
                <CardContent className="p-8">
                  <div className="space-y-8">
                    <div>
                      <Label className="text-xs font-bold uppercase text-muted-foreground tracking-widest mb-4 block">Select Quantity</Label>
                      <div className="flex items-center justify-between border-2 border-secondary rounded-xl p-2 bg-secondary/20">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-10 w-10 hover:bg-white"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={isSoldOut}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-bold text-2xl">{quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-10 w-10 hover:bg-white"
                          onClick={() => setQuantity(Math.min(deal.inventory, quantity + 1))}
                          disabled={isSoldOut}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm font-medium text-center mt-4">
                        {isSoldOut ? (
                           <span className="text-destructive">Sold out! Stay tuned for more.</span>
                        ) : (
                           <span className="text-primary">{deal.inventory} units remaining</span>
                        )}
                      </p>
                    </div>

                    <Button 
                      className="w-full h-16 text-xl font-bold shadow-xl rounded-xl" 
                      size="lg"
                      disabled={isSoldOut}
                    >
                      <ShoppingCart className="h-6 w-6 mr-3" />
                      {isSoldOut ? "OFFER ENDED" : "RESERVE NOW"}
                    </Button>
                  </div>

                  <Separator className="my-10" />

                  <div className="space-y-6">
                    <h3 className="font-headline font-bold text-lg flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" /> Provided by
                    </h3>
                    <div className="space-y-4 text-sm bg-secondary/30 p-4 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="bg-white p-2 rounded-lg shadow-sm">
                          <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-bold text-lg leading-none">{deal.promoter.name}</p>
                          <p className="text-muted-foreground text-xs mt-1">Verified Promoter</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 border-t border-white/50 pt-3">
                        <MapPin className="h-4 w-4 text-primary shrink-0" />
                        <p className="text-xs leading-tight">{deal.promoter.address}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
