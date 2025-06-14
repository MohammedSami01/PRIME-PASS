import type { EventType } from "@/components/event-details"

// Mock data - replace with actual database calls in production
const mockEvents: EventType[] = [
  {
    id: 1,
    title: "Cyberpunk Concert",
    description: "Join us for an electrifying night of music and lights!",
    type: "concert",
    date: "2025-06-15",
    time: "8:00 PM",
    location: "Cyber Arena",
    address: "123 Neon Street",
    image: "/events/cyberpunk.jpg",
    gallery: ["/events/cyberpunk1.jpg", "/events/cyberpunk2.jpg"],
    price: [
      { category: "Standard", price: "$50" },
      { category: "VIP", price: "$100" },
    ],
    badge: "Featured",
    rating: 4.5,
    reviews: 123,
    tokens: 50,
    organizer: {
      name: "Cyber Events",
      logo: "/organizers/cyber-events.png"
    },
    amenities: ["Free Parking", "Food & Drinks", "VIP Lounge"],
    faq: [
      {
        question: "What's included in VIP tickets?",
        answer: "VIP tickets include priority entry, access to VIP lounge, free drinks, and meet & greet with artists."
      }
    ]
  }
]

export async function getEventById(id: string): Promise<EventType | null> {
  const event = mockEvents.find(e => e.id === parseInt(id))
  return event || null
}
