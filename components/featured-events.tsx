"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Heart, Star } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock event data
const featuredEvents = [
  {
    id: 1,
    title: "Coldplay: Music of the Spheres",
    type: "Concerts",
    date: "Sat, Jun 15, 2025",
    time: "7:00 PM",
    location: "Narendra Modi Stadium, Ahmedabad",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    price: "₹4,500",
    badge: "🔥 Trending",
    rating: 4.9,
    reviews: 8542,
    tokens: 150,
  },
  {
    id: 2,
    title: "IPL Final 2025",
    type: "Sports",
    date: "Sun, May 25, 2025",
    time: "7:30 PM",
    location: "M.A. Chidambaram Stadium, Chennai",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1605&q=80",
    price: "₹3,000",
    badge: "🏏 Hot Selling",
    rating: 4.8,
    reviews: 6324,
    tokens: 120,
  },
  {
    id: 3,
    title: "Dune: Part Three",
    type: "Movies",
    date: "Fri, Dec 12, 2025",
    time: "9:00 PM",
    location: "PVR IMAX, Mumbai",
    image: "https://wallpapercave.com/wp/wp14786446.jpg",
    price: "₹700",
    badge: "🎬 Premiere",
    rating: 4.7,
    reviews: 3157,
    tokens: 80,
  },
  {
    id: 4,
    title: "Zakir Khan: Haq Se Single",
    type: "Comedy",
    date: "Sat, Aug 23, 2025",
    time: "8:00 PM",
    location: "JLN Indoor Stadium, Delhi",
    image: "https://wallpapercave.com/wp/wp8181776.jpg",
    price: "₹1,500",
    badge: "😂 Limited Seats",
    rating: 4.8,
    reviews: 4218,
    tokens: 100,
  },
]

export default function FeaturedEvents() {
  const [likedEvents, setLikedEvents] = useState<number[]>([])

  const toggleLike = (id: number) => {
    if (likedEvents.includes(id)) {
      setLikedEvents(likedEvents.filter((eventId) => eventId !== id))
    } else {
      setLikedEvents([...likedEvents, id])
    }
  }

  return (
    <section className="py-16 container px-4 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <span className="text-sm font-medium text-primary">Discover & Book</span>
          <h2 className="text-3xl font-bold mt-1">Featured Events</h2>
          <p className="text-muted-foreground mt-2">Find the most exciting events from around the country</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href="/events">
            <Button variant="outline">View All Events</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover-card-animation">
              <Link href={`/events/${event.id}`}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {event.badge && <Badge className="absolute top-3 left-3 z-10">{event.badge}</Badge>}
                  <Badge variant="secondary" className="absolute top-3 right-3 z-10 flex items-center space-x-1">
                    <span className="text-amber-500">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    </span>
                    <span>{event.rating}</span>
                  </Badge>
                </div>
              </Link>

              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <Link href={`/events/${event.id}`}>
                      <h3 className="font-bold text-lg line-clamp-1 hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">{event.type}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleLike(event.id)}>
                    <Heart
                      className={cn("h-5 w-5", likedEvents.includes(event.id) && "fill-destructive text-destructive")}
                    />
                  </Button>
                </div>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>
                      {event.date} • {event.time}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <span className="font-bold">{event.price}</span>
                  <span className="text-sm text-muted-foreground">onwards</span>
                </div>

                <div className="flex items-center">
                  <span className="mr-1 text-xs">🏆</span>
                  <span className="text-xs font-medium text-primary">+{event.tokens} tokens</span>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
