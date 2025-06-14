"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Heart, Star, Film, Ticket, Trophy, Music, Mic2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { EventFiltersType } from "./event-filters"

type EventType = {
  id: number
  title: string
  type: string
  date: string
  time: string
  location: string
  image: string
  price: string
  badge: string
  rating: number
  reviews: number
  tokens: number
}

type EventsListProps = {
  category?: string
  filters: EventFiltersType
  searchQuery?: string
}

// Mock events data
// We'll create more events here for the events page
const events = [
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
  {
    id: 5,
    title: "Arijit Singh Live",
    type: "Concerts",
    date: "Fri, Jul 25, 2025",
    time: "7:30 PM",
    location: "GMDC Grounds, Ahmedabad",
    image: "https://wallpapercave.com/wp/wp1890548.jpg",
    price: "₹2,500",
    badge: "🎵 Selling Fast",
    rating: 4.9,
    reviews: 7320,
    tokens: 120,
  },
  {
    id: 6,
    title: "FIFA World Cup Qualifier: India vs UAE",
    type: "Sports",
    date: "Wed, Sep 10, 2025",
    time: "7:00 PM",
    location: "Salt Lake Stadium, Kolkata",
    image: "https://images.unsplash.com/photo-1552667466-07770ae110d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    price: "₹800",
    badge: "⚽ International",
    rating: 4.6,
    reviews: 2914,
    tokens: 70,
  },
  {
    id: 7,
    title: "A.R. Rahman: The Journey",
    type: "Concerts",
    date: "Sat, Oct 18, 2025",
    time: "6:30 PM",
    location: "Jawaharlal Nehru Stadium, Delhi",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    price: "₹3,000",
    badge: "🎻 Musical Extravaganza",
    rating: 4.9,
    reviews: 9412,
    tokens: 150,
  },
  {
    id: 8,
    title: "Cirque du Soleil: Luzia",
    type: "Theatre",
    date: "Mon, Nov 3, 2025",
    time: "8:00 PM",
    location: "MMRDA Grounds, Mumbai",
    image: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    price: "₹2,800",
    badge: "🎭 International",
    rating: 4.8,
    reviews: 5127,
    tokens: 130,
  },
]

const getCategoryIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'movie':
      return <Film className="w-4 h-4 mr-1" />
    case 'sports':
      return <Trophy className="w-4 h-4 mr-1" />
    case 'concert':
      return <Music className="w-4 h-4 mr-1" />
    case 'comedy':
      return <Mic2 className="w-4 h-4 mr-1" />
    default:
      return <Ticket className="w-4 h-4 mr-1" />
  }
}

export default function EventsList({ category = 'all', filters, searchQuery = '' }: EventsListProps) {
  const [favorites, setFavorites] = useState<number[]>([])
  const [likedEvents, setLikedEvents] = useState<number[]>([])
  
  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    )
  }
  
  const toggleLike = (id: number) => {
    setLikedEvents((prev) =>
      prev.includes(id) ? prev.filter((eventId) => eventId !== id) : [...prev, id]
    )
  }
  
  // Filter events based on search query, filters, and category
  const filteredEvents = events.filter(event => {
    // Filter by search query
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch = 
        event.title.toLowerCase().includes(searchLower) ||
        event.type.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower)
      
      if (!matchesSearch) return false
    }

    // Filter by category from URL
    if (category !== 'all') {
      if (category === 'movies' && !['movie', 'movies'].includes(event.type.toLowerCase())) {
        return false
      }
      if (category === 'sports' && !['sports', 'sport'].includes(event.type.toLowerCase())) {
        return false
      }
    }
    
    // Filter by selected categories
    if (filters.categories.length > 0 && !filters.categories.includes(event.type.toLowerCase())) {
      return false
    }
    
    // Filter by selected cities
    if (filters.cities.length > 0) {
      const eventCity = event.location.split(', ')[1]?.toLowerCase()
      if (!eventCity || !filters.cities.some(city => eventCity.includes(city))) {
        return false
      }
    }
    
    // Filter by price range
    const eventPrice = parseInt(event.price.replace(/[^0-9]/g, ''))
    if (eventPrice < filters.priceRange[0] || eventPrice > filters.priceRange[1]) {
      return false
    }
    
    // Filter by date if selected
    if (filters.date) {
      const eventDate = new Date(event.date)
      if (!isSameDay(eventDate, filters.date)) {
        return false
      }
    }
    
    // Filter by date if specified
    if (filters.date) {
      const eventDate = new Date(event.date)
      const filterDate = new Date(filters.date)
      
      // Compare just the date part (ignoring time)
      if (
        eventDate.getFullYear() !== filterDate.getFullYear() ||
        eventDate.getMonth() !== filterDate.getMonth() ||
        eventDate.getDate() !== filterDate.getDate()
      ) {
        return false
      }
    }
    
    return true
  })
  
  if (filteredEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-xl font-medium mb-2">No events found</h3>
        <p className="text-muted-foreground mb-6">
          {searchQuery 
            ? `No events match your search for "${searchQuery}"`
            : 'Try adjusting your filters to find more events.'}
        </p>
        <Button variant="outline" onClick={() => window.location.href = '/events'}>
          Clear all filters
        </Button>
      </div>
    )
  }
  
  // Helper function to check if two dates are the same day
  function isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{filteredEvents.length} Events Found</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Recommended
          </Button>
          <Button variant="outline" size="sm">
            Date
          </Button>
          <Button variant="outline" size="sm">
            Price
          </Button>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No events found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or check back later for new events.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
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
      )}
    </div>
  )
}
