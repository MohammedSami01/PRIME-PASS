import Hero from "@/components/hero"
import FeaturedEvents from "@/components/featured-events"
import HowItWorks from "@/components/how-it-works"
import GamificationSection from "@/components/gamification-section"
import TestimonialsSection from "@/components/testimonials-section"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <FeaturedEvents />
      <HowItWorks />
      <GamificationSection />
      <TestimonialsSection />
    </div>
  )
}
