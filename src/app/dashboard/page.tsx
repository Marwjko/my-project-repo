
"use client"

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PlusCircle, LayoutDashboard, Tag, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'

export default function PromoterDashboard() {
  const myDeals = [
    { id: '1', title: 'Gourmet Wagyu Burger Set', sales: 45, status: 'Active', category: 'Food' },
    { id: '3', title: 'Authentic 5-Course Italian Dinner', sales: 12, status: 'Active', category: 'Food' },
    { id: '4', title: 'Smart Home Security Package', sales: 28, status: 'Closed', category: 'Home' },
  ]

  return (
    <>
      <Header />
      <main className="flex-grow bg-secondary/10 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-headline font-bold text-slate-900">Promoter Dashboard</h1>
              <p className="text-muted-foreground">Manage your active deals and track performance.</p>
            </div>
            <Button asChild size="lg" className="shadow-lg">
              <Link href="/create-offer">
                <PlusCircle className="h-5 w-5 mr-2" /> New Deal
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <Card className="border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Total Sales</p>
                    <h3 className="text-3xl font-bold mt-1">85</h3>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Active Deals</p>
                    <h3 className="text-3xl font-bold mt-1">2</h3>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Tag className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">New Customers</p>
                    <h3 className="text-3xl font-bold mt-1">12</h3>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Profile Views</p>
                    <h3 className="text-3xl font-bold mt-1">1.2k</h3>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <LayoutDashboard className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-md overflow-hidden">
            <CardHeader className="bg-white border-b">
              <CardTitle className="text-xl">Your Recent Offers</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Deal Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Sales</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right pr-6">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myDeals.map((deal) => (
                    <TableRow key={deal.id}>
                      <TableCell className="font-medium pl-6">{deal.title}</TableCell>
                      <TableCell>{deal.category}</TableCell>
                      <TableCell>{deal.sales}</TableCell>
                      <TableCell>
                        <Badge variant={deal.status === 'Active' ? 'default' : 'secondary'}>
                          {deal.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/offers/${deal.id}`}>View</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
