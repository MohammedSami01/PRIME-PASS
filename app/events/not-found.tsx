import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function EventNotFound() {
  return (
    <div className="container px-4 py-16 mx-auto text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
        <p className="text-muted-foreground mb-8">
          Sorry, the event you are looking for doesn't exist or has been removed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/events">Browse Events</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
