import type { Metadata } from "next"
import { EventDetails } from "@/components/event-details"
import { notFound } from "next/navigation"

type EventPageProps = {
  params: {
    id: string
  }
}

// Mock events data - in a real app, this would come from a database
const events = [
  {
    id: 1,
    title: "Coldplay: Music of the Spheres",
    description: "Experience Coldplay's Music of the Spheres World Tour, featuring their biggest hits and songs from their latest album. This is their first tour in India since 2016, promising an unforgettable night of music, lights, and spectacular visuals.",
    type: "Concert",
    date: "Sat, Jun 15, 2025",
    time: "7:00 PM",
    location: "Narendra Modi Stadium, Ahmedabad",
    address: "Motera, Ahmedabad, Gujarat 380005",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1459749411171-04c529313777?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
    price: [
      { category: "Silver", price: "₹4,500" },
      { category: "Gold", price: "₹7,500" },
      { category: "Platinum", price: "₹12,500" },
      { category: "Diamond", price: "₹20,000" },
    ],
    badge: "🔥 Trending",
    rating: 4.9,
    reviews: 8542,
    tokens: 150,
    artists: [
      { name: "Chris Martin", role: "Vocals, Piano" },
      { name: "Jonny Buckland", role: "Guitar" },
      { name: "Guy Berryman", role: "Bass" },
      { name: "Will Champion", role: "Drums" },
    ],
    organizer: {
      name: "BookMyShow",
      logo: "/placeholder.svg?height=50&width=50",
    },
    amenities: ["Parking", "Food & Beverages", "Wheelchair Accessible", "Restrooms"],
    faq: [
      {
        question: "What time do doors open?",
        answer: "Doors open at 5:00 PM, 2 hours before the show starts.",
      },
      {
        question: "Is there an age restriction?",
        answer: "The event is open to all ages. Children under 12 must be accompanied by an adult.",
      },
      {
        question: "Can I bring my camera?",
        answer: "Professional cameras are not allowed. Phone cameras are permitted.",
      },
    ],
  },
  {
    id: 2,
    title: "IPL Final 2025",
    description: "Witness the most exciting cricket event of the year as the top two teams battle it out for the coveted IPL trophy. Experience the electrifying atmosphere with cheerleaders, music, and non-stop entertainment.",
    type: "Sports",
    date: "Sun, May 25, 2025",
    time: "7:30 PM",
    location: "M.A. Chidambaram Stadium, Chennai",
    address: "Chepauk, Chennai, Tamil Nadu 600005",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1605&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1605&q=80",
      "https://images.unsplash.com/photo-1528400970631-0cbe4b913c2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
    price: [
      { category: "Standard", price: "₹3,000" },
      { category: "Premium", price: "₹5,000" },
      { category: "VIP", price: "₹10,000" },
    ],
    badge: "🏏 Hot Selling",
    rating: 4.8,
    reviews: 6324,
    tokens: 120,
    artists: [],
    organizer: {
      name: "IPL",
      logo: "/placeholder.svg?height=50&width=50",
    },
    amenities: ["Parking", "Food Stalls", "First Aid", "Restrooms"],
    faq: [
      {
        question: "Can I bring food and drinks?",
        answer: "Outside food and drinks are not allowed. Food stalls will be available inside the stadium.",
      },
      {
        question: "What items are prohibited?",
        answer: "Weapons, alcohol, drugs, and any dangerous items are strictly prohibited.",
      },
    ],
  },
  {
    id: 4,
    title: "Zakir Khan: Haq Se Single",
    description: "India's favorite stand-up comedian Zakir Khan is back with his new show 'Haq Se Single'. Get ready for an evening filled with laughter as he shares hilarious takes on relationships, family, and the struggles of being single.",
    type: "Comedy",
    date: "Sat, Aug 23, 2025",
    time: "8:00 PM",
    location: "JLN Indoor Stadium, Delhi",
    address: "India Gate, New Delhi, Delhi 110001",
    image: "https://wallpapercave.com/wp/wp8181776.jpg",
    gallery: [
      "https://wallpapercave.com/wp/wp8181776.jpg",
      "https://wallpapercave.com/wp/wp8181793.jpg",
    ],
    price: [
      { category: "Standard", price: "₹1,500" },
      { category: "Gold", price: "₹2,500" },
      { category: "VIP", price: "₹5,000" },
    ],
    badge: "😂 Limited Seats",
    rating: 4.8,
    reviews: 4218,
    tokens: 100,
    artists: [
      { name: "Zakir Khan", role: "Stand-up Comedian" },
    ],
    organizer: {
      name: "Comicstaan",
      logo: "/placeholder.svg?height=50&width=50",
    },
    amenities: ["Food Court", "Parking", "Wheelchair Accessible"],
    faq: [
      {
        question: "What is the show duration?",
        answer: "The show will be approximately 2 hours long with one intermission.",
      },
      {
        question: "Is there an age restriction?",
        answer: "This show is recommended for ages 16 and above due to adult humor.",
      },
    ],
  },
  {
    id: 5,
    title: "Arijit Singh Live",
    description: "Experience the magical voice of Arijit Singh live in concert. The playback singing sensation will perform all his hit songs from Bollywood in this unforgettable musical evening.",
    type: "Concert",
    date: "Fri, Jul 25, 2025",
    time: "7:30 PM",
    location: "GMDC Grounds, Ahmedabad",
    address: "Bodakdev, Ahmedabad, Gujarat 380054",
    image: "https://wallpapercave.com/wp/wp1890548.jpg",
    gallery: [
      "https://wallpapercave.com/wp/wp1890548.jpg",
      "https://wallpapercave.com/wp/wp1890553.jpg",
    ],
    price: [
      { category: "Silver", price: "₹2,500" },
      { category: "Gold", price: "₹4,500" },
      { category: "Platinum", price: "₹8,000" },
      { category: "VVIP", price: "₹15,000" },
    ],
    badge: "🎵 Selling Fast",
    rating: 4.9,
    reviews: 7320,
    tokens: 120,
    artists: [
      { name: "Arijit Singh", role: "Playback Singer" },
    ],
    organizer: {
      name: "T-Series",
      logo: "/placeholder.svg?height=50&width=50",
    },
    amenities: ["Food Stalls", "Parking", "Restrooms", "First Aid"],
    faq: [
      {
        question: "Will there be an opening act?",
        answer: "Yes, there will be a 30-minute opening performance before Arijit Singh takes the stage.",
      },
      {
        question: "What time should I arrive?",
        answer: "Gates open at 5:30 PM. We recommend arriving at least 1 hour before the show starts.",
      },
    ],
  },
  {
    id: 3,
    title: "Dune: Part Three",
    description: "The epic conclusion to the Dune saga. Follow Paul Atreides as he unites with the Fremen to wage war against House Harkonnen and the Emperor. Experience the stunning visuals and gripping story on the big screen.",
    type: "Movies",
    date: "Fri, Dec 12, 2025",
    time: "9:00 PM",
    location: "PVR IMAX, Mumbai",
    address: "Phoenix Marketcity, Kurla West, Mumbai, Maharashtra 400070",
    image: "https://wallpapercave.com/wp/wp14786446.jpg",
    gallery: [
      "https://wallpapercave.com/wp/wp14786446.jpg",
      "https://wallpapercave.com/wp/wp14786441.jpg",
      "https://wallpapercave.com/wp/wp14786443.jpg",
    ],
    price: [
      { category: "Standard", price: "₹700" },
      { category: "Premium", price: "₹1,200" },
      { category: "Recliner", price: "₹1,800" },
    ],
    badge: "🎬 Premiere",
    rating: 4.7,
    reviews: 3157,
    tokens: 80,
    artists: [
      { name: "Timothée Chalamet", role: "Paul Atreides" },
      { name: "Zendaya", role: "Chani" },
      { name: "Rebecca Ferguson", role: "Lady Jessica" },
    ],
    organizer: {
      name: "PVR Cinemas",
      logo: "/placeholder.svg?height=50&width=50",
    },
    amenities: ["Food Court", "Parking", "Wheelchair Accessible", "3D Glasses"],
    faq: [
      {
        question: "What's the movie duration?",
        answer: "The movie runs for approximately 2 hours and 45 minutes including credits.",
      },
      {
        question: "Are there any age restrictions?",
        answer: "This movie is rated U/A and is suitable for viewers 12 years and above.",
      },
    ],
  },
  {
    id: 6,
    title: "FIFA World Cup Qualifier: India vs UAE",
    description: "Cheer for Team India as they take on the United Arab Emirates in a crucial FIFA World Cup qualifier match. Experience the electrifying atmosphere of international football at the iconic Salt Lake Stadium.",
    type: "Sports",
    date: "Wed, Sep 10, 2025",
    time: "7:00 PM",
    location: "Salt Lake Stadium, Kolkata",
    address: "Jawaharlal Nehru Road, Block D, Lake Area, Kolkata, West Bengal 700087",
    image: "https://images.unsplash.com/photo-1552667466-07770ae110d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1552667466-07770ae110d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1508098186683-af546edaaf8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
    price: [
      { category: "General Stand", price: "₹800" },
      { category: "East Stand", price: "₹1,500" },
      { category: "West Stand", price: "₹2,500" },
      { category: "VIP", price: "₹5,000" },
    ],
    badge: "⚽ International",
    rating: 4.6,
    reviews: 2914,
    tokens: 70,
    artists: [
      { name: "Indian Football Team", role: "Home Team" },
      { name: "UAE Football Team", role: "Away Team" },
    ],
    organizer: {
      name: "AIFF",
      logo: "/placeholder.svg?height=50&width=50",
    },
    amenities: ["Food Stalls", "Parking", "First Aid", "Merchandise"],
    faq: [
      {
        question: "What time do gates open?",
        answer: "Gates open 3 hours before kick-off at 4:00 PM.",
      },
      {
        question: "Are there any prohibited items?",
        answer: "Weapons, alcohol, drugs, and any dangerous items are strictly prohibited.",
      },
    ],
  },
  {
    id: 7,
    title: "A.R. Rahman: The Journey",
    description: "Experience the musical genius of A.R. Rahman live in concert. The Oscar-winning composer will perform his greatest hits from Bollywood and Hollywood, taking you on a magical journey through his illustrious career.",
    type: "Concert",
    date: "Sat, Oct 18, 2025",
    time: "6:30 PM",
    location: "Jawaharlal Nehru Stadium, Delhi",
    address: "Lodhi Road, New Delhi, Delhi 110003",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    ],
    price: [
      { category: "Silver", price: "₹3,000" },
      { category: "Gold", price: "₹5,000" },
      { category: "Platinum", price: "₹8,000" },
      { category: "VVIP", price: "₹15,000" },
    ],
    badge: "🎻 Musical Extravaganza",
    rating: 4.9,
    reviews: 9412,
    tokens: 150,
    artists: [
      { name: "A.R. Rahman", role: "Music Director & Performer" },
      { name: "Special Guest Artists", role: "To be announced" },
    ],
    organizer: {
      name: "A.R. Rahman Foundation",
      logo: "/placeholder.svg?height=50&width=50",
    },
    amenities: ["Food Court", "Parking", "Wheelchair Accessible", "Merchandise"],
    faq: [
      {
        question: "What time should I arrive?",
        answer: "Gates open at 4:30 PM. We recommend arriving at least 1 hour before the show starts.",
      },
      {
        question: "Will there be any opening acts?",
        answer: "Yes, there will be special opening performances before A.R. Rahman takes the stage.",
      },
    ],
  },
  {
    id: 8,
    title: "Cirque du Soleil: Luzia",
    description: "Step into a waking dream of Mexico with Cirque du Soleil's LUZIA, where a wondrous world is inspired by the rich culture and vibrant colors of Mexico. Experience a surrealistic dream woven with acrobatics, dance, and stunning visuals.",
    type: "Theatre",
    date: "Mon, Nov 3, 2025",
    time: "8:00 PM",
    location: "MMRDA Grounds, Mumbai",
    address: "BKC, Bandra East, Mumbai, Maharashtra 400051",
    image: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507924538820-ede94a04019d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1501619963603-2a7c6f6d2e1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
    price: [
      { category: "Standard", price: "₹2,800" },
      { category: "Premium", price: "₹4,500" },
      { category: "VIP", price: "₹7,500" },
      { category: "VVIP", price: "₹12,000" },
    ],
    badge: "🎭 International",
    rating: 4.8,
    reviews: 5127,
    tokens: 130,
    artists: [
      { name: "Cirque du Soleil Troupe", role: "Acrobats & Performers" },
    ],
    organizer: {
      name: "Cirque du Soleil",
      logo: "/placeholder.svg?height=50&width=50",
    },
    amenities: ["Food Court", "Parking", "Wheelchair Accessible", "Merchandise"],
    faq: [
      {
        question: "What is the show duration?",
        answer: "The show runs for approximately 2 hours and 20 minutes, including a 25-minute intermission.",
      },
      {
        question: "Is the show suitable for children?",
        answer: "Yes, the show is family-friendly and suitable for all ages. However, children under 2 years old are not permitted.",
      },
    ],
  },
];

// Function to get an event by ID
function getEvent(id: string) {
  const eventId = Number.parseInt(id);
  
  if (isNaN(eventId) || eventId <= 0) {
    return null;
  }
  
  // Find the event with the matching ID
  const event = events.find(event => event.id === eventId);
  
  return event || null;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = getEvent(params.id)

  if (!event) {
    return {
      title: "Event Not Found - PrimePass",
      description: "The event you are looking for does not exist.",
    }
  }

  return {
    title: `${event.title} - PrimePass`,
    description: event.description.substring(0, 160),
  }
}

export default function EventPage({ params }: EventPageProps) {
  const event = getEvent(params.id)

  if (!event) {
    notFound()
  }

  return <EventDetails event={event} />
}
