
"use client"

import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { DealCard } from '@/components/deals/DealCard'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { Suspense } from 'react'

const allDeals = [
  {
    id: '1',
    title: 'Gourmet Wagyu Burger Set for Two - Special Weekend Deal',
    category: 'Food',
    imageUrl: PlaceHolderImages.find(img => img.id === 'food-deal-1')?.imageUrl || '',
    originalPrice: 150,
    actualPrice: 75,
    discount: 50,
    quantity: 12
  },
  {
    id: '2',
    title: 'Premium Ceramic Car Coating & Full Interior Detailing',
    category: 'Auto',
    imageUrl: PlaceHolderImages.find(img => img.id === 'auto-deal-1')?.imageUrl || '',
    originalPrice: 1200,
    actualPrice: 599,
    discount: 50,
    quantity: 5
  },
  {
    id: '3',
    title: 'Authentic 5-Course Italian Dinner Experience',
    category: 'Food',
    imageUrl: PlaceHolderImages.find(img => img.id === 'food-deal-2')?.imageUrl || '',
    originalPrice: 300,
    actualPrice: 199,
    discount: 33,
    quantity: 20
  },
  {
    id: '4',
    title: 'Smart Home Security Package with Installation',
    category: 'Home',
    imageUrl: PlaceHolderImages.find(img => img.id === 'home-deal-1')?.imageUrl || '',
    originalPrice: 800,
    actualPrice: 400,
    discount: 50,
    quantity: 0
  },
  {
    id: '5',
    title: 'Annual Wheel Alignment & Balance Pass',
    category: 'Auto',
    imageUrl: PlaceHolderImages.find(img => img.id === 'auto-deal-2')?.imageUrl || '',
    originalPrice: 250,
    actualPrice: 125,
    discount: 50,
    quantity: 15
  },
  {
    id: '6',
    title: 'Modern Minimalist Living Room Sofa Set',
    category: 'Home',
    imageUrl: PlaceHolderImages.find(img => img.id === 'home-deal-2')?.imageUrl || '',
    originalPrice: 3500,
    actualPrice: 2100,
    discount: 40,
    quantity: 3
  }
]

function DealsGrid() {
  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get('category')

  const filteredDeals = categoryFilter 
    ? allDeals.filter(deal => deal.category.toLowerCase() === categoryFilter.toLowerCase())
    : allDeals

  return (
    <section className="container mx-auto px-4 mb-20">
      <div className="flex items-center justify-between mb-8 border-l-4 border-primary pl-4">
        <h2 className="text-2xl md:text-3xl font-headline font-bold">
          {categoryFilter ? `${categoryFilter} Offers` : 'Latest Offers'}
        </h2>
        <div className="h-px flex-grow bg-border mx-4 hidden sm:block"></div>
      </div>

      {filteredDeals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDeals.map((deal) => (
            <DealCard key={deal.id} {...deal} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">No deals found in this category.</p>
        </div>
      )}
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <section className="bg-primary text-primary-foreground py-12 md:py-24 mb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-7xl font-headline font-bold mb-6 tracking-tight">Unbeatable Deals in Your City</h1>
            <p className="text-lg md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto mb-10">
              Discover the best promotions in food, automotive services, home decor and more. Save big today!
            </p>
          </div>
        </section>

        <Suspense fallback={<div className="container mx-auto px-4 text-center py-10">Loading deals...</div>}>
          <DealsGrid />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
