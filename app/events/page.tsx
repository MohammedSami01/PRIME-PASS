"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import EventsList from "@/components/events-list"
import EventFilters, { EventFiltersType, defaultFilters } from "@/components/event-filters"

const cities = [
  { id: "bangalore", name: "Bangalore" },
  { id: "mumbai", name: "Mumbai" },
  { id: "delhi", name: "Delhi" },
  { id: "hyderabad", name: "Hyderabad" },
  { id: "chennai", name: "Chennai" },
  { id: "kolkata", name: "Kolkata" },
  { id: "pune", name: "Pune" },
  { id: "ahmedabad", name: "Ahmedabad" },
]

// Format the header text based on the category
const getHeaderText = (category: string) => {
  switch (category) {
    case 'movies':
      return 'Movies'
    case 'sports':
      return 'Sports Events'
    case 'all':
    default:
      return 'All Events'
  }
}

// Format the subheader text based on the category
const getSubheaderText = (category: string) => {
  switch (category) {
    case 'movies':
      return 'Discover the latest movies in theaters'
    case 'sports':
      return 'Find exciting sports events near you'
    case 'all':
    default:
      return 'Discover and book the best events in your city'
  }
}

export default function EventsPage() {
  const searchParams = useSearchParams()
  const category = searchParams?.get('category') || 'all'
  const searchQuery = searchParams?.get('q') || ''
  const searchCity = searchParams?.get('city') || ''
  const searchDate = searchParams?.get('date') || ''
  
  const [filters, setFilters] = useState<EventFiltersType>({
    ...defaultFilters,
    cities: searchCity ? [searchCity] : [],
    date: searchDate ? new Date(searchDate) : undefined,
  })
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col">
        <div className="mb-8">
          <div>
            {searchQuery && (
              <p className="text-sm text-muted-foreground mb-1">
                Search results for: <span className="font-medium text-foreground">"{searchQuery}"</span>
                {searchCity && (
                  <span> in <span className="font-medium text-foreground">{cities.find(c => c.id === searchCity)?.name || searchCity}</span></span>
                )}
                {searchDate && (
                  <span> on <span className="font-medium text-foreground">{new Date(searchDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span></span>
                )}
              </p>
            )}
            <h1 className="text-3xl font-bold mb-2">
              {searchQuery ? 'Search Results' : getHeaderText(category)}
            </h1>
            <p className="text-muted-foreground">
              {searchQuery ? 'Events matching your search criteria' : getSubheaderText(category)}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/4">
            <EventFilters onFilterChange={setFilters} />
          </div>
          <div className="w-full lg:w-3/4">
            <EventsList 
              category={category} 
              filters={filters} 
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
