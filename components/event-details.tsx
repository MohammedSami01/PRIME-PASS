"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Calendar,
  MapPin,
  Share2,
  Star,
  Users,
  Heart,
  ChevronLeft,
  ChevronRight,
  Info,
  MessageSquare,
  ShoppingBag,
  Car,
  AlertCircle,
  Trophy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import EventAddons from "@/components/event-addons"

// This would come from the database in a real app
export type EventType = {
  id: number
  title: string
  description: string
  type: string
  date: string
  time: string
  location: string
  address: string
  image: string
  gallery: string[]
  price: { category: string; price: string }[]
  badge: string
  rating: number
  reviews: number
  tokens: number
  artists?: { name: string; role: string }[]
  organizer: { name: string; logo: string }
  amenities: string[]
  faq: { question: string; answer: string }[]
}

export function EventDetails({ event }: { event: EventType }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [liked, setLiked] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(event.price[0].category)
  const [ticketsLeft, setTicketsLeft] = useState<number | null>(null)
  const [selectedAddons, setSelectedAddons] = useState<{id: string; name: string; price: number}[]>([])
  const [groupSize, setGroupSize] = useState(2)
  
  // Sample add-ons data - in a real app, this would come from your API
  const addons = [
    { id: 'snacks', name: 'Pre-order Snacks', description: 'Skip the queue, get it delivered to your seat', price: 299 },
    { id: 'parking', name: 'Premium Parking', description: 'Guaranteed parking spot near the venue', price: 500 },
    { id: 'merch', name: 'Event Merchandise', description: 'Exclusive event t-shirt and goodies', price: 999 },
  ]

  const nextImage = () => {
    setCurrentImage((current) => (current + 1) % event.gallery.length)
  }

  const prevImage = () => {
    setCurrentImage((current) => (current - 1 + event.gallery.length) % event.gallery.length)
  }

  const toggleLike = () => setLiked(!liked)

  // Generate random number of tickets left (client-side only)
  useEffect(() => {
    setTicketsLeft(Math.floor(Math.random() * 50) + 10)
  }, [])

  // Calculate total price including add-ons
  const calculateTotal = () => {
    const basePrice = parseInt(
      event.price.find((p) => p.category === selectedCategory)?.price.replace(/[^0-9]/g, '') || '0'
    )
    const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0)
    const bookingFee = 150
    const gst = Math.round((basePrice + bookingFee) * 0.18) // 18% GST
    
    return {
      basePrice,
      addonsTotal,
      bookingFee,
      gst,
      total: basePrice + addonsTotal + bookingFee + gst
    }
  }

  const toggleAddon = (addon: {id: string; name: string; price: number}) => {
    setSelectedAddons(prev => 
      prev.some(a => a.id === addon.id)
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    )
  }

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-6">
        <Link href="/events" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to all events
        </Link>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <Badge className="mb-2">{event.type}</Badge>
            <h1 className="text-3xl font-bold mb-1">{event.title}</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="h-4 w-4 text-amber-500 mr-1" />
              <span className="font-medium">{event.rating}</span>
              <span className="mx-1">•</span>
              <span>{event.reviews.toLocaleString()} reviews</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={toggleLike}>
              <Heart className={cn("h-5 w-5", liked && "fill-destructive text-destructive")} />
            </Button>

            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden md:inline">Group Booking</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <DialogTitle className="text-xl">Create a Group Booking</DialogTitle>
                      <DialogDescription>
                        Invite friends and enjoy exclusive group benefits
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>
                
                <div className="space-y-6 py-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="groupSize" className="text-sm font-medium">
                        Group Size
                      </label>
                      <div className="flex items-center gap-2">
                        <select
                          id="groupSize"
                          value={groupSize}
                          onChange={(e) => setGroupSize(Number(e.target.value))}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? 'person' : 'people'}
                            </option>
                          ))}
                        </select>
                        <Button type="button" variant="outline" size="icon" className="h-10 w-10">
                          <Users className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Total Price
                      </label>
                      <div className="rounded-lg border p-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Price per person</span>
                          <span className="font-medium">
                            ₹{Math.round(calculateTotal().total).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span>Total for {groupSize} {groupSize === 1 ? 'person' : 'people'}</span>
                          <span className="text-lg">
                            ₹{(calculateTotal().total * groupSize).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Benefits of Group Booking:</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <span className="text-sm">👫</span>
                        </div>
                        <div>
                          <p className="font-medium">Book together</p>
                          <p className="text-sm text-muted-foreground">Secure seats together for your entire group</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <span className="text-sm">💰</span>
                        </div>
                        <div>
                          <p className="font-medium">Split payments</p>
                          <p className="text-sm text-muted-foreground">Easily split the cost with your friends</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <span className="text-sm">🎁</span>
                        </div>
                        <div>
                          <p className="font-medium">Bonus tokens</p>
                          <p className="text-sm text-muted-foreground">Earn 50 bonus tokens per person</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 sm:flex-row-reverse sm:justify-between sm:space-x-2">
                  <Button className="w-full sm:w-auto">
                    <Users className="mr-2 h-4 w-4" /> Create Group Booking
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Share Invite Link
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div className="lg:col-span-2" initial="hidden" animate="visible" variants={fadeIn}>
          <div className="relative rounded-xl overflow-hidden mb-6 bg-muted aspect-video">
            <img
              src={event.gallery[currentImage] || "/placeholder.svg"}
              alt={event.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full opacity-75 hover:opacity-100"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>

            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full opacity-75 hover:opacity-100"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {event.gallery.map((_, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  size="icon"
                  className={cn(
                    "w-2 h-2 p-0 rounded-full",
                    currentImage === index ? "bg-primary" : "bg-background/50 hover:bg-background",
                  )}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
          </div>

          <div className="flex overflow-x-auto gap-2 mb-8 pb-1">
            {event.gallery.map((image, index) => (
              <button
                key={index}
                className={cn(
                  "relative shrink-0 rounded-md overflow-hidden w-24 h-16 border-2",
                  currentImage === index ? "border-primary" : "border-transparent",
                )}
                onClick={() => setCurrentImage(index)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${event.title} - image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <Tabs defaultValue="about" className="mb-8">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="artists">Artists</TabsTrigger>
              <TabsTrigger value="venue">Venue</TabsTrigger>
              <TabsTrigger value="addons">Add-ons</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Terms & Conditions</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>No refunds or exchanges.</li>
                    <li>Event is subject to change or cancellation.</li>
                    <li>By purchasing tickets, you agree to follow venue policies.</li>
                    <li>Outside food and beverages are not allowed.</li>
                    <li>Professional cameras and recording equipment are prohibited.</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="artists" className="mt-6">
              <div className="space-y-6">
                <h3 className="text-xl font-bold mb-4">Artists & Performers</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {event.artists?.map((artist, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg border">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={`/placeholder.svg?height=80&width=80`} alt={artist.name} />
                        <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold text-lg">{artist.name}</h4>
                        <p className="text-sm text-muted-foreground">{artist.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="venue" className="mt-6">
              <div className="space-y-6">
                <h3 className="text-xl font-bold mb-2">Venue Information</h3>

                <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-4">
                  <img
                    src="https://media.gettyimages.com/id/1719826030/photo/topshot-cricket-icc-mens-wc-2023-ind-pak-odi.jpg?s=1024x1024&w=gi&k=20&c=5Gcw30P40dHKjROvxXsT7czhSIzyCx2nuFD81OZlwAo="
                    alt={event.location}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-lg mb-2">{event.location}</h4>
                    <p className="text-muted-foreground mb-4">{event.address}</p>

                    <h4 className="font-medium mb-2">Getting There</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Car className="h-5 w-5 mr-2 text-primary" />
                        <div className="text-sm">
                          <p className="font-medium">Parking</p>
                          <p className="text-muted-foreground">
                            Paid parking available at the venue. Pre-book for guaranteed spots.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-2 text-primary" />
                        <div className="text-sm">
                          <p className="font-medium">Public Transport</p>
                          <p className="text-muted-foreground">
                            Bus routes 101, 102, 103 stop nearby. Metro Station 2km away.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-lg mb-2">Venue Amenities</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {event.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                            <span className="text-primary text-xs">✓</span>
                          </div>
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="addons" className="mt-6">
              <EventAddons />
            </TabsContent>

            <TabsContent value="faq" className="mt-6">
              <div className="space-y-6">
                <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>

                <Accordion type="single" collapsible className="w-full">
                  {event.faq.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                      <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <div className="flex items-start p-4 rounded-lg bg-muted">
                  <AlertCircle className="h-5 w-5 mr-3 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Have more questions?</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Contact the event organizer for additional information.
                    </p>
                    <Button variant="outline" size="sm">
                      Contact Organizer
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="border-t pt-8">
            <h3 className="text-xl font-bold mb-4">Event Chat</h3>
            <div className="border rounded-lg p-4 bg-muted/50">
              <div className="flex items-center justify-center h-64 text-center">
                <div className="max-w-md">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h4 className="font-medium mb-1">Join the conversation</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with other attendees, discuss the event, and share your excitement.
                  </p>
                  <Button>Enter Chat Room</Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="lg:col-span-1" initial="hidden" animate="visible" variants={fadeIn}>
          <div className="sticky top-24">
            <div className="border rounded-lg overflow-hidden mb-6">
              <div className="bg-primary text-primary-foreground p-4">
                <h3 className="font-bold text-lg">Ticket Information</h3>
              </div>

              <div className="p-4 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>
                    {event.date} • {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{event.location}</span>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Select Ticket Category</h4>
                  <div className="space-y-2">
                    {event.price.map((priceOption) => (
                      <div
                        key={priceOption.category}
                        className={cn(
                          "border rounded-md p-3 cursor-pointer",
                          selectedCategory === priceOption.category
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/50",
                        )}
                        onClick={() => setSelectedCategory(priceOption.category)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="font-medium">{priceOption.category}</h5>
                            <p className="text-sm text-muted-foreground">Regular Seating</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{priceOption.price}</p>
                            <div className="flex items-center text-xs text-primary">
                              <span className="mr-1">🏆</span>
                              <span>+{event.tokens} tokens</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Ticket Price</span>
                      <span className="font-medium">
                        ₹{calculateTotal().basePrice.toLocaleString()}
                      </span>
                    </div>
                    
                    {selectedAddons.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Add-ons:</div>
                        {selectedAddons.map(addon => (
                          <div key={addon.id} className="flex justify-between pl-4">
                            <span className="text-xs">• {addon.name}</span>
                            <span className="text-xs">₹{addon.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-sm">Booking Fee</span>
                      <span className="font-medium">₹{calculateTotal().bookingFee.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm">GST (18%)</span>
                      <span className="font-medium">₹{calculateTotal().gst.toLocaleString()}</span>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-bold">₹{calculateTotal().total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Proceed to Book</Button>

                {ticketsLeft !== null && (
                  <div className="flex items-center pt-2">
                    <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Only {ticketsLeft} tickets left at this price
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden mb-6">
              <div className="p-4">
                <h3 className="font-bold text-lg mb-4">Add-ons & Extras</h3>
                <div className="space-y-4">
                  {addons.map((addon) => {
                    const isSelected = selectedAddons.some(a => a.id === addon.id)
                    return (
                      <div 
                        key={addon.id}
                        className={cn(
                          "border rounded-md p-3 cursor-pointer transition-colors",
                          isSelected ? "border-primary bg-primary/5" : "hover:border-primary/50"
                        )}
                        onClick={() => toggleAddon(addon)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start">
                            <span className="text-xl mr-3">
                              {addon.id === 'snacks' ? '🍿' : addon.id === 'parking' ? '🚗' : '👕'}
                            </span>
                            <div>
                              <h5 className="font-medium">{addon.name}</h5>
                              <p className="text-xs text-muted-foreground">{addon.description}</p>
                              <p className="text-sm font-medium mt-1">₹{addon.price.toLocaleString()}</p>
                            </div>
                          </div>
                          <Button 
                            variant={isSelected ? "default" : "outline"} 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleAddon(addon)
                            }}
                          >
                            {isSelected ? 'Added' : 'Add'}
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                  
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Earn {event.tokens * (selectedAddons.length + 1)} Tokens</h4>
                    <p className="text-xs text-muted-foreground">
                      Book this event with add-ons to earn extra tokens for rewards
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
