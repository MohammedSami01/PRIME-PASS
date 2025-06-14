"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

type FilterOption = {
  id: string
  name: string
  count: number
}

type PriceRange = [number, number]

export type EventFiltersType = {
  categories: string[]
  priceRange: PriceRange
  date: Date | undefined
  cities: string[]
}

export const defaultFilters: EventFiltersType = {
  categories: [],
  priceRange: [0, 5000],
  date: undefined,
  cities: []
}

type EventFiltersProps = {
  onFilterChange: (filters: EventFiltersType) => void
}

const categories: FilterOption[] = [
  { id: 'all', name: 'All Events', count: 8 },
  { id: 'movies', name: 'Movies', count: 1 },
  { id: 'sports', name: 'Sports', count: 2 },
  { id: 'concerts', name: 'Concerts', count: 3 },
  { id: 'comedy', name: 'Comedy Shows', count: 1 },
  { id: 'theatre', name: 'Theatre Shows', count: 1 },
]

const cities: FilterOption[] = [
  { id: 'bangalore', name: 'Bangalore', count: 0 },
  { id: 'mumbai', name: 'Mumbai', count: 2 },
  { id: 'delhi', name: 'Delhi', count: 2 },
  { id: 'ahmedabad', name: 'Ahmedabad', count: 2 },
  { id: 'hyderabad', name: 'Hyderabad', count: 1 },
  { id: 'chennai', name: 'Chennai', count: 1 },
  { id: 'kolkata', name: 'Kolkata', count: 1 }
]

export default function EventFilters({ onFilterChange }: EventFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [filters, setFilters] = useState<EventFiltersType>(defaultFilters)
  const [priceRange, setPriceRange] = useState<PriceRange>([0, 5000])
  const [date, setDate] = useState<Date | undefined>(undefined)

  // Update parent component when filters change
  useEffect(() => {
    onFilterChange({
      ...filters,
      priceRange,
      date
    })
  }, [filters, priceRange, date, onFilterChange])

  const handleCategoryChange = (categoryId: string) => {
    // If 'all' is selected, clear other categories
    if (categoryId === 'all') {
      setFilters(prev => ({
        ...prev,
        categories: []
      }))
      router.push('/events')
      return
    }

    setFilters(prev => ({
      ...prev,
      categories: [categoryId]
    }))

    // Update URL based on category
    if (categoryId === 'movies') {
      router.push('/movies')
    } else if (categoryId === 'sports') {
      router.push('/sports')
    } else {
      router.push(`/events?category=${categoryId}`)
    }
  }

  const handleCityChange = (cityId: string) => {
    setFilters(prev => {
      const newCities = prev.cities.includes(cityId)
        ? prev.cities.filter(id => id !== cityId)
        : [...prev.cities, cityId]
      return {
        ...prev,
        cities: newCities
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <Checkbox
                id={`cat-${category.id}`}
                checked={filters.categories.includes(category.id) || filters.categories.length === 0}
                onCheckedChange={() => handleCategoryChange(category.id)}
                className="mr-2"
              />
              <label
                htmlFor={`cat-${category.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex justify-between w-full"
              >
                <span>{category.name}</span>
                <span className="text-muted-foreground">{category.count}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="font-medium mb-3">Price Range</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as PriceRange)}
            min={0}
            max={5000}
            step={100}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}+</span>
          </div>
        </div>
      </div>

      {/* Date Filter */}
      <div>
        <h3 className="font-medium mb-3">Date</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* City Filter */}
      <div>
        <h3 className="font-medium mb-3">City</h3>
        <div className="space-y-2">
          {cities.map((city) => (
            <div key={city.id} className="flex items-center">
              <Checkbox
                id={`city-${city.id}`}
                checked={filters.cities.includes(city.id)}
                onCheckedChange={() => handleCityChange(city.id)}
                className="mr-2"
              />
              <label
                htmlFor={`city-${city.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex justify-between w-full"
              >
                <span>{city.name}</span>
                <span className="text-muted-foreground">{city.count}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => {
          setFilters(defaultFilters)
          setPriceRange([0, 5000])
          setDate(undefined)
          router.push('/events')
        }}
      >
        Clear Filters
      </Button>
    </div>
  )
}
