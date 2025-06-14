"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { EventDetails } from "@/components/event-details"
import { BookingForm } from "@/components/booking-form"
import { getEventById } from "@/lib/events"

export default function EventBookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const eventId = searchParams.get('id')
  const [event, setEvent] = useState<any>(null)

  // Fetch event data from your data source
  // In a real app, this would come from an API or database
  const fetchEventData = async () => {
    try {
      const eventData = await getEventById(eventId)
      setEvent(eventData)
    } catch (error) {
      console.error("Error fetching event:", error)
      router.push("/events")
    }
  }

  // Fetch event data when component mounts
  if (!event) {
    fetchEventData()
  }

  if (!event) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Book Tickets for {event.title}</h1>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-muted-foreground">
            {event.date}, {event.time}
          </span>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">
            {event.location}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <EventDetails event={event} />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <BookingForm event={event} />
        </div>
      </div>
    </div>
  )
}
