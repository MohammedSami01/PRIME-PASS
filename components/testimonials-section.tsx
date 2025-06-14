"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const testimonials = [
  {
    id: 1,
    name: "Ananya Sharma",
    location: "Bangalore",
    image: "data:image/webp;base64,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",
    rating: 5,
    testimonial:
      "PrimePass has completely transformed how I book event tickets. The gamification aspect makes it fun and rewarding. I've already earned enough tokens for a free popcorn and drink combo! 🍿",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Mumbai",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
    rating: 5,
    testimonial:
      "The group booking feature is a game-changer! My friends and I can book together and split payments effortlessly. Plus, the chatroom for events helps us coordinate. Highly recommend!",
  },
  {
    id: 3,
    name: "Priya Patel",
    location: "Delhi",
    image: "data:image/webp;base64,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",
    rating: 4,
    testimonial:
      "I love how I can pre-order my snacks and parking. No more standing in long queues! The token system is also quite addictive - I find myself booking more events just to collect rewards.",
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Chennai",
    image: "https://th.bing.com/th/id/OIP.y_-RrO81dmnPR5dKO0GYWAHaHa?w=213&h=213&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    rating: 5,
    testimonial:
      "Been using PrimePass for 6 months now, and the experience keeps getting better. The referral system is generous, and I've already unlocked Gold tier benefits. Well done team! 👏",
  },
]

export default function TestimonialsSection() {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    if (!containerRef.current || !scrollerRef.current) return;
    
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    
    // Duplicate the testimonials for seamless looping
    const testimonialElements = Array.from(scroller.children);
    testimonialElements.forEach(testimonial => {
      const clone = testimonial.cloneNode(true);
      scroller.appendChild(clone);
    });

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.9;

    const animate = () => {
      if (!isPaused && container) {
        scrollPosition += scrollSpeed;
        
        // Reset scroll position when reaching the end of the cloned content
        if (scrollPosition >= scroller.scrollWidth / 2) {
          scrollPosition = 0;
        }
        
        scroller.style.transform = `translateX(-${scrollPosition}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused]);

  if (!isMounted) return null;

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              What Our Users Say
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Don't just take our word for it. Here's what our community has to say
              about their experience.
            </p>
          </div>
        </div>
        
        <div 
          className="relative mt-12 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={containerRef}
        >
          <div 
            className="flex w-max gap-6 py-4"
            ref={scrollerRef}
            style={{
              display: 'flex',
              transition: isPaused ? 'transform 0.3s ease' : 'none',
            }}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="w-[300px] flex-shrink-0"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-800">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback>
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {testimonial.testimonial}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
