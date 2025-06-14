"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, MapPin, Tag } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const eventTypes = [
  { id: "all", name: "All Types" },
  { id: "concerts", name: "Concerts 🎵" },
  { id: "sports", name: "Sports 🏆" },
  { id: "movies", name: "Movies 🎬" },
  { id: "theatre", name: "Theatre 🎭" },
  { id: "comedy", name: "Comedy 😂" },
]

const cities = [
  { id: "all", name: "All Cities" },
  { id: "bangalore", name: "Bangalore" },
  { id: "mumbai", name: "Mumbai" },
  { id: "delhi", name: "Delhi" },
  { id: "hyderabad", name: "Hyderabad" },
  { id: "chennai", name: "Chennai" },
]

export default function Hero() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedDate, setSelectedDate] = useState("")

  const handleSearch = () => {
    const params = new URLSearchParams()
    
    if (searchQuery) params.set('q', searchQuery)
    if (selectedCity && selectedCity !== 'all') params.set('city', selectedCity)
    if (selectedDate) params.set('date', selectedDate)
    if (activeTab && activeTab !== 'all') params.set('category', activeTab)
    
    router.push(`/events?${params.toString()}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <section className="relative pb-20">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-50 to-white dark:from-gray-900 dark:to-background h-[500px] -z-10" />

      <div className="container px-4 pt-10 pb-16 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-8"
        >
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl gradient-heading">
            Experience Events Like Never Before
          </h1>
          <p className="mx-auto text-lg text-gray-600 dark:text-gray-400">
            Book tickets, earn rewards, and unlock exclusive perks with India's first gamified booking platform. Every
            booking brings you closer to amazing rewards! 🎁
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex overflow-x-auto py-4 space-x-2 justify-center no-scrollbar mb-6"
        >
          {eventTypes.map((type) => (
            <Button
              key={type.id}
              variant={activeTab === type.id ? "default" : "outline"}
              className={cn("rounded-full whitespace-nowrap", activeTab === type.id && "shadow-md")}
              onClick={() => setActiveTab(type.id)}
            >
              {type.name}
            </Button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-background rounded-xl p-3 shadow-xl">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              <div className="flex items-center space-x-2 bg-background rounded-lg border px-3 py-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search events..."
                  className="border-0 p-0 focus-visible:ring-0 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>

              <div className="flex items-center space-x-2 bg-background rounded-lg border px-3 py-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="border-0 p-0 focus:ring-0 h-8 w-full">
                    <SelectValue placeholder="All Cities" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 bg-background rounded-lg border px-3 py-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Input 
                  type="date" 
                  className="border-0 p-0 focus-visible:ring-0 text-sm"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>

              <Button className="w-full" onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" />
                Find Events
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center">
            <Tag className="w-4 h-4 mr-1" />
            <span>50,000+ Events</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">🏆</span>
            <span>Earn Rewards</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">🎁</span>
            <span>Exclusive Perks</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">👫</span>
            <span>Group Bookings</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
