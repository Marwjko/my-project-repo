
"use client"

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Sparkles, Image as ImageIcon, Plus } from 'lucide-react'
import { promoterAIDescriptionGenerator } from '@/ai/flows/promoter-ai-description-generator'

export default function CreateOffer() {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Food',
    originalPrice: '',
    discount: '',
    quantity: '',
    description: '',
    keyFeatures: ['']
  })

  const handleAddFeature = () => {
    setFormData(prev => ({ ...prev, keyFeatures: [...prev.keyFeatures, ''] }))
  }

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.keyFeatures]
    newFeatures[index] = value
    setFormData(prev => ({ ...prev, keyFeatures: newFeatures }))
  }

  const generateAIDescription = async () => {
    if (!formData.title || formData.keyFeatures.every(f => !f)) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide a deal title and at least one key feature for better AI results.",
      })
      return
    }

    setIsGenerating(true)
    try {
      const result = await promoterAIDescriptionGenerator({
        productName: formData.title,
        keyFeatures: formData.keyFeatures.filter(f => f.trim() !== ''),
        originalPrice: Number(formData.originalPrice),
        discountPercentage: Number(formData.discount),
        category: formData.category
      })
      setFormData(prev => ({ ...prev, description: result.generatedDescription }))
      toast({
        title: "AI Description Generated",
        description: "The description has been updated based on your deal details.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Could not generate description at this time.",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Offer Published!",
        description: "Your new deal is now live on MyOffers.",
      })
    }, 2000)
  }

  return (
    <>
      <Header />
      <main className="flex-grow py-12 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Offer Details</CardTitle>
                <CardDescription>Provide all the information about your product or service deal.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Deal Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g. 50% Off Full Body Car Detail" 
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                    required 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(v) => setFormData(prev => ({...prev, category: v}))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Food">Food</SelectItem>
                        <SelectItem value="Auto">Auto</SelectItem>
                        <SelectItem value="Home">Home</SelectItem>
                        <SelectItem value="Spa">Spa & Wellness</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Offer Image</Label>
                    <div className="flex gap-2">
                      <Input id="image" type="file" className="flex-grow cursor-pointer" />
                      <Button type="button" variant="outline" size="icon">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">Original Price ($)</Label>
                    <Input 
                      id="originalPrice" 
                      type="number" 
                      placeholder="100" 
                      value={formData.originalPrice}
                      onChange={(e) => setFormData(prev => ({...prev, originalPrice: e.target.value}))}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount">Discount (%)</Label>
                    <Input 
                      id="discount" 
                      type="number" 
                      placeholder="50" 
                      value={formData.discount}
                      onChange={(e) => setFormData(prev => ({...prev, discount: e.target.value}))}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Available Quantity</Label>
                    <Input 
                      id="quantity" 
                      type="number" 
                      placeholder="50" 
                      value={formData.quantity}
                      onChange={(e) => setFormData(prev => ({...prev, quantity: e.target.value}))}
                      required 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-headline">AI-Powered Content</CardTitle>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary/10"
                    onClick={generateAIDescription}
                    disabled={isGenerating}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {isGenerating ? "Generating..." : "Generate Description"}
                  </Button>
                </div>
                <CardDescription>Use AI to write a persuasive description for your deal based on key features.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Key Features / Selling Points</Label>
                  {formData.keyFeatures.map((feature, idx) => (
                    <Input 
                      key={idx} 
                      placeholder={`Feature ${idx + 1}`} 
                      value={feature}
                      onChange={(e) => handleFeatureChange(idx, e.target.value)}
                    />
                  ))}
                  <Button type="button" variant="ghost" size="sm" onClick={handleAddFeature}>
                    <Plus className="h-4 w-4 mr-2" /> Add another feature
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Write a compelling description or use the AI generator above..." 
                    className="min-h-[200px]"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" size="lg">Save Draft</Button>
              <Button type="submit" size="lg" className="min-w-[200px]" disabled={isSubmitting}>
                {isSubmitting ? "Publishing..." : "Publish Offer"}
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
