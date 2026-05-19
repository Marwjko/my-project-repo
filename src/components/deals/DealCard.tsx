
"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

interface DealCardProps {
  id: string
  title: string
  category: string
  imageUrl: string
  originalPrice: number
  actualPrice: number
  discount: number
  quantity: number
}

export function DealCard({ id, title, category, imageUrl, originalPrice, actualPrice, discount, quantity }: DealCardProps) {
  const isSoldOut = quantity <= 0

  return (
    <Link href={`/offers/${id}`} className="block group">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image 
            src={imageUrl} 
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            data-ai-hint="deal image"
          />
          <Badge className="absolute top-3 left-3 bg-white/90 text-black hover:bg-white/90">
            {category}
          </Badge>
          {discount > 0 && (
            <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-2 py-1 rounded-md font-bold text-sm shadow-lg">
              {discount}% OFF
            </div>
          )}
        </div>
        
        <CardContent className="p-4 flex-grow">
          <h3 className="font-headline font-bold text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between border-t border-secondary mt-auto bg-secondary/20">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground line-through">
              ${originalPrice}
            </span>
            <span className="text-xl font-bold text-destructive">
              ${actualPrice}
            </span>
          </div>
          <div className="text-right">
            {isSoldOut ? (
              <span className="text-destructive font-bold text-sm uppercase">Deal is Over</span>
            ) : (
              <span className="text-xs text-muted-foreground">{quantity} left</span>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
