"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Search, Ticket, Award, Utensils, Users, Star } from "lucide-react"

const steps = [
  {
    icon: <Search className="h-8 w-8 text-primary" />,
    title: "Find Events",
    description: "Discover thousands of events across movies, concerts, sports, and more",
  },
  {
    icon: <Ticket className="h-8 w-8 text-primary" />,
    title: "Book Tickets",
    description: "Secure your seats with fast, secure booking and instant confirmation",
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Earn Rewards",
    description: "Get tokens with every booking that you can redeem for exciting perks",
  },
  {
    icon: <Utensils className="h-8 w-8 text-primary" />,
    title: "Add Extras",
    description: "Pre-order snacks and parking to skip queues and save time",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Group Bookings",
    description: "Book with friends and split payments for a hassle-free experience",
  },
  {
    icon: <Star className="h-8 w-8 text-primary" />,
    title: "Unlock Benefits",
    description: "Maintain streaks and refer friends to unlock exclusive benefits",
  },
]

export default function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold">How PrimePass Works</h2>
          <p className="mt-4 text-muted-foreground">
            A simple process to book tickets and earn rewards with every experience
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
