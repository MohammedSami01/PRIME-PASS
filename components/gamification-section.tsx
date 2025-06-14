"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Gift, Trophy, CalendarClock, Users, Heart, Ticket } from "lucide-react"

// Mock rewards data
const rewards = [
  {
    id: 1,
    name: "Free Popcorn",
    description: "Get a free medium popcorn with your next movie ticket",
    tokens: 150,
    icon: "🍿",
    type: "food",
  },
  {
    id: 2,
    name: "Premium Seating",
    description: "Upgrade to premium seating for any event",
    tokens: 300,
    icon: "🪑",
    type: "upgrade",
  },
  {
    id: 3,
    name: "Free Parking",
    description: "Complimentary parking for your next booking",
    tokens: 200,
    icon: "🅿️",
    type: "convenience",
  },
  {
    id: 4,
    name: "Concession Discount",
    description: "20% off on all food & beverages",
    tokens: 250,
    icon: "🥤",
    type: "food",
  },
  {
    id: 5,
    name: "Skip the Queue",
    description: "Priority entry for any event",
    tokens: 350,
    icon: "⏩",
    type: "convenience",
  },
  {
    id: 6,
    name: "Companion Ticket",
    description: "Buy one, get one free on selected events",
    tokens: 500,
    icon: "🎫",
    type: "ticket",
  },
]

export default function GamificationSection() {
  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="text-sm font-medium text-primary">Earn & Redeem</span>
            <h2 className="text-3xl font-bold mt-1 mb-4">Unlock a World of Benefits with PrimePass</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our innovative gamification system rewards you for every booking, streak, and referral. Collect tokens,
              level up, and unlock exclusive perks.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Tokens</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Earn tokens with every booking to redeem for exclusive rewards and perks
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <CalendarClock className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Daily Streaks</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Maintain booking streaks to unlock exclusive status and multipliers
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Referrals</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Invite friends and earn bonus tokens when they make their first booking
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Loyalty Tiers</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Level up to Silver, Gold, Platinum, and Diamond for increasing benefits
                  </p>
                </CardContent>
              </Card>
            </div>

            <Button className="mt-2">
              Explore All Benefits <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="h-5 w-5 text-primary mr-2" />
                  <span>Rewards Marketplace</span>
                </CardTitle>
                <CardDescription>Redeem your tokens for exclusive perks and benefits</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="food">Food</TabsTrigger>
                    <TabsTrigger value="convenience">Convenience</TabsTrigger>
                    <TabsTrigger value="ticket">Tickets</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="mt-0">
                    <div className="space-y-4">
                      {rewards.map((reward) => (
                        <div
                          key={reward.id}
                          className="flex items-center justify-between border rounded-lg p-4 hover:bg-accent transition-colors"
                        >
                          <div className="flex items-center">
                            <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mr-4 text-2xl">
                              {reward.icon}
                            </div>
                            <div>
                              <h3 className="font-medium">{reward.name}</h3>
                              <p className="text-sm text-muted-foreground">{reward.description}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <Badge variant="outline" className="mb-2 flex items-center">
                              <Trophy className="h-3 w-3 mr-1 text-primary" />
                              {reward.tokens} tokens
                            </Badge>
                            <Button size="sm" variant="outline">
                              Redeem
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="food" className="mt-0">
                    <div className="space-y-4">
                      {rewards
                        .filter((r) => r.type === "food")
                        .map((reward) => (
                          <div
                            key={reward.id}
                            className="flex items-center justify-between border rounded-lg p-4 hover:bg-accent transition-colors"
                          >
                            <div className="flex items-center">
                              <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mr-4 text-2xl">
                                {reward.icon}
                              </div>
                              <div>
                                <h3 className="font-medium">{reward.name}</h3>
                                <p className="text-sm text-muted-foreground">{reward.description}</p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <Badge variant="outline" className="mb-2 flex items-center">
                                <Trophy className="h-3 w-3 mr-1 text-primary" />
                                {reward.tokens} tokens
                              </Badge>
                              <Button size="sm" variant="outline">
                                Redeem
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="convenience" className="mt-0">
                    <div className="space-y-4">
                      {rewards
                        .filter((r) => r.type === "convenience")
                        .map((reward) => (
                          <div
                            key={reward.id}
                            className="flex items-center justify-between border rounded-lg p-4 hover:bg-accent transition-colors"
                          >
                            <div className="flex items-center">
                              <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mr-4 text-2xl">
                                {reward.icon}
                              </div>
                              <div>
                                <h3 className="font-medium">{reward.name}</h3>
                                <p className="text-sm text-muted-foreground">{reward.description}</p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <Badge variant="outline" className="mb-2 flex items-center">
                                <Trophy className="h-3 w-3 mr-1 text-primary" />
                                {reward.tokens} tokens
                              </Badge>
                              <Button size="sm" variant="outline">
                                Redeem
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="ticket" className="mt-0">
                    <div className="space-y-4">
                      {rewards
                        .filter((r) => r.type === "ticket")
                        .map((reward) => (
                          <div
                            key={reward.id}
                            className="flex items-center justify-between border rounded-lg p-4 hover:bg-accent transition-colors"
                          >
                            <div className="flex items-center">
                              <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mr-4 text-2xl">
                                {reward.icon}
                              </div>
                              <div>
                                <h3 className="font-medium">{reward.name}</h3>
                                <p className="text-sm text-muted-foreground">{reward.description}</p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <Badge variant="outline" className="mb-2 flex items-center">
                                <Trophy className="h-3 w-3 mr-1 text-primary" />
                                {reward.tokens} tokens
                              </Badge>
                              <Button size="sm" variant="outline">
                                Redeem
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Ticket className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm font-medium">Your Token Balance</span>
                    </div>
                    <span className="font-bold text-primary">1,250 tokens</span>
                  </div>
                  <Progress value={50} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2 text-right">250 more tokens to reach Gold tier</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
