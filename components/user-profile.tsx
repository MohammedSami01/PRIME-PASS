"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Ticket,
  Gift,
  Settings,
  LogOut,
  Edit,
  Calendar,
  MapPin,
  Download,
  Share2,
  CheckCircle,
  Trophy,
  Flame,
  CalendarClock,
  UsersIcon,
  ChevronRight,
  QrCode,
} from "lucide-react"

// Mock data for user profile
const user = {
  name: "Jane Cooper",
  email: "jane@example.com",
  image: "/placeholder.svg?height=100&width=100",
  joinedDate: "January 2024",
  points: 2450,
  level: "Gold",
  streak: 12,
  referrals: 5,
}

// Mock data for user tickets
const tickets = [
  {
    id: 1,
    event: "Coldplay: Music of the Spheres",
    date: "Sat, Jun 15, 2025",
    time: "7:00 PM",
    location: "Narendra Modi Stadium, Ahmedabad",
    image: "/placeholder.svg?height=60&width=80",
    type: "Gold",
    seats: "G-45, G-46",
    status: "upcoming",
    qrCode: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    event: "IPL Final 2025",
    date: "Sun, May 25, 2025",
    time: "7:30 PM",
    location: "M.A. Chidambaram Stadium, Chennai",
    image: "/placeholder.svg?height=60&width=80",
    type: "Platinum",
    seats: "P-12",
    status: "upcoming",
    qrCode: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    event: "F1 Indian Grand Prix",
    date: "Apr 18, 2025",
    time: "3:00 PM",
    location: "Buddh Circuit, Greater Noida",
    image: "/placeholder.svg?height=60&width=80",
    type: "Silver",
    seats: "S-78, S-79",
    status: "completed",
    qrCode: "/placeholder.svg?height=200&width=200",
  },
]

// Mock data for rewards
const rewards = [
  {
    id: 1,
    name: "Free Popcorn",
    description: "Redeem for a free medium popcorn at any partner venue",
    icon: "🍿",
    tokensRequired: 150,
    expiryDate: "No expiry",
    status: "available",
  },
  {
    id: 2,
    name: "Premium Seating Upgrade",
    description: "Upgrade your seating to premium for any event",
    icon: "🪑",
    tokensRequired: 350,
    expiryDate: "No expiry",
    status: "available",
  },
  {
    id: 3,
    name: "20% Off Next Booking",
    description: "Get 20% off on your next ticket purchase",
    icon: "🎟️",
    tokensRequired: 400,
    expiryDate: "No expiry",
    status: "available",
  },
  {
    id: 4,
    name: "Free Parking Pass",
    description: "Get complimentary parking at your next event",
    icon: "🅿️",
    tokensRequired: 200,
    redeemed: true,
    redeemedOn: "Apr 10, 2025",
    status: "redeemed",
  },
]

// Mock activity data
const activities = [
  {
    id: 1,
    type: "booking",
    event: "Coldplay: Music of the Spheres",
    date: "May 10, 2025",
    points: 150,
    description: "Booked 2 tickets",
  },
  {
    id: 2,
    type: "reward",
    event: "Free Popcorn",
    date: "Apr 28, 2025",
    points: -150,
    description: "Redeemed reward",
  },
  {
    id: 3,
    type: "referral",
    event: "Referral Bonus",
    date: "Apr 15, 2025",
    points: 200,
    description: "Rahul Singh signed up using your referral",
  },
  {
    id: 4,
    type: "streak",
    event: "Weekly Streak Bonus",
    date: "Apr 10, 2025",
    points: 50,
    description: "Maintained 10-day booking streak",
  },
  {
    id: 5,
    type: "booking",
    event: "IPL Final 2025",
    date: "Apr 5, 2025",
    points: 120,
    description: "Booked 1 ticket",
  },
]

export default function UserProfile() {
  const [activeTicket, setActiveTicket] = useState<number | null>(null)

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-end">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="mt-4 text-xl">{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                  <Badge variant="outline" className="mt-2">
                    Member since {user.joinedDate}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <Trophy className="h-4 w-4 mr-1 text-primary" />
                        <span className="text-sm font-medium">Reward Points</span>
                      </div>
                      <span className="font-bold text-primary">{user.points}</span>
                    </div>
                    <Progress value={68} className="h-2" />
                    <p className="text-xs text-right mt-1 text-muted-foreground">650 more points to Platinum level</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="flex flex-col items-center p-3 bg-primary/5 rounded-lg">
                      <div className="p-2 rounded-full bg-primary/10 mb-2">
                        <Trophy className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-xs text-muted-foreground">Level</span>
                      <span className="font-medium">{user.level}</span>
                    </div>

                    <div className="flex flex-col items-center p-3 bg-primary/5 rounded-lg">
                      <div className="p-2 rounded-full bg-primary/10 mb-2">
                        <Flame className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-xs text-muted-foreground">Streak</span>
                      <span className="font-medium">{user.streak} days</span>
                    </div>

                    <div className="flex flex-col items-center p-3 bg-primary/5 rounded-lg">
                      <div className="p-2 rounded-full bg-primary/10 mb-2">
                        <UsersIcon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-xs text-muted-foreground">Referrals</span>
                      <span className="font-medium">{user.referrals}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <Button variant="outline" className="w-1/2" asChild>
                  <a href="/settings">
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </a>
                </Button>
                <Button variant="outline" className="w-1/2 ml-2" asChild>
                  <a href="/logout">
                    <LogOut className="mr-2 h-4 w-4" /> Log Out
                  </a>
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Reward Status</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Silver</span>
                      <span className="text-sm text-primary">Completed</span>
                    </div>
                    <Progress value={100} className="h-1" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Gold</span>
                      <span className="text-sm text-primary">Current</span>
                    </div>
                    <Progress value={100} className="h-1" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Platinum</span>
                      <span className="text-sm text-muted-foreground">650 points needed</span>
                    </div>
                    <Progress value={68} className="h-1" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Diamond</span>
                      <span className="text-sm text-muted-foreground">4,550 points needed</span>
                    </div>
                    <Progress value={35} className="h-1" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="link" className="w-full p-0" asChild>
                  <a href="/rewards/benefits">
                    View All Benefits <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        <div className="lg:w-2/3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue="tickets">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tickets">
                  <Ticket className="h-4 w-4 mr-2" /> My Tickets
                </TabsTrigger>
                <TabsTrigger value="rewards">
                  <Gift className="h-4 w-4 mr-2" /> Rewards
                </TabsTrigger>
                <TabsTrigger value="activity">
                  <CalendarClock className="h-4 w-4 mr-2" /> Activity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tickets" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Tickets</CardTitle>
                    <CardDescription>View and manage your upcoming and past tickets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {activeTicket === null ? (
                      <div className="space-y-4">
                        {tickets.map((ticket) => (
                          <div
                            key={ticket.id}
                            className="border rounded-lg p-4 hover:border-primary/50 cursor-pointer transition-colors"
                            onClick={() => setActiveTicket(ticket.id)}
                          >
                            <div className="flex items-start gap-4">
                              <div className="h-16 w-20 rounded overflow-hidden">
                                <img
                                  src={ticket.image || "/placeholder.svg"}
                                  alt={ticket.event}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <h3 className="font-bold">{ticket.event}</h3>
                                  <Badge variant={ticket.status === "upcoming" ? "outline" : "secondary"}>
                                    {ticket.status === "upcoming" ? "Upcoming" : "Completed"}
                                  </Badge>
                                </div>
                                <div className="text-sm text-muted-foreground mt-1 space-y-1">
                                  <div className="flex items-center">
                                    <Calendar className="h-3 w-3 mr-2" />
                                    <span>
                                      {ticket.date} • {ticket.time}
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="h-3 w-3 mr-2" />
                                    <span>{ticket.location}</span>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                    {ticket.type} • {ticket.seats}
                                  </span>
                                  <Button variant="ghost" size="sm" className="h-7">
                                    View Ticket <ChevronRight className="ml-1 h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>
                        <Button variant="ghost" className="mb-4" onClick={() => setActiveTicket(null)}>
                          ← Back to all tickets
                        </Button>

                        {tickets
                          .filter((t) => t.id === activeTicket)
                          .map((ticket) => (
                            <div key={ticket.id} className="space-y-6">
                              <div className="text-center">
                                <h3 className="text-xl font-bold mb-1">{ticket.event}</h3>
                                <p className="text-muted-foreground">
                                  {ticket.date} • {ticket.time}
                                </p>
                              </div>

                              <div className="flex justify-center">
                                <div className="border rounded-lg p-4 bg-muted/30 max-w-md">
                                  <div className="flex justify-center mb-4">
                                    <QrCode className="h-8 w-8 text-primary" />
                                  </div>
                                  <img
                                    src={ticket.qrCode || "/placeholder.svg"}
                                    alt="Ticket QR Code"
                                    className="w-full h-48 object-contain mb-4"
                                  />
                                  <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Ticket Type:</span>
                                      <span className="font-medium">{ticket.type}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Seat(s):</span>
                                      <span className="font-medium">{ticket.seats}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Gate:</span>
                                      <span className="font-medium">East Gate 2</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Entry:</span>
                                      <span className="font-medium">5:00 PM onwards</span>
                                    </div>
                                  </div>

                                  <Separator className="my-4" />

                                  <div className="flex flex-col space-y-2">
                                    <Button>
                                      <Download className="mr-2 h-4 w-4" /> Download Ticket
                                    </Button>
                                    <Button variant="outline">
                                      <Share2 className="mr-2 h-4 w-4" /> Share Ticket
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              <div className="border rounded-lg p-4">
                                <h4 className="font-medium mb-3">Event Details</h4>
                                <div className="space-y-3 text-sm">
                                  <div className="flex items-start">
                                    <Calendar className="h-4 w-4 mr-3 text-primary mt-0.5" />
                                    <div>
                                      <span className="font-medium">Date & Time</span>
                                      <p className="text-muted-foreground">
                                        {ticket.date} • {ticket.time}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-start">
                                    <MapPin className="h-4 w-4 mr-3 text-primary mt-0.5" />
                                    <div>
                                      <span className="font-medium">Venue</span>
                                      <p className="text-muted-foreground">{ticket.location}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {ticket.status === "upcoming" && (
                                <div className="flex flex-col space-y-2">
                                  <Button>
                                    <CalendarClock className="mr-2 h-4 w-4" /> Add to Calendar
                                  </Button>
                                  <Button variant="outline">
                                    <UsersIcon className="mr-2 h-4 w-4" /> Invite Friends
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rewards" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Rewards</CardTitle>
                    <CardDescription>View and redeem rewards with your earned tokens</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Trophy className="h-5 w-5 mr-2 text-primary" />
                          <span className="font-medium">Available Tokens</span>
                        </div>
                        <span className="text-xl font-bold text-primary">{user.points}</span>
                      </div>
                      <Progress value={68} className="h-2 mt-2" />
                      <div className="flex justify-between text-xs mt-1">
                        <span>Gold</span>
                        <span>Platinum (3,100)</span>
                      </div>
                    </div>

                    <h3 className="font-medium mb-4">Available Rewards</h3>
                    <div className="space-y-4">
                      {rewards.map((reward) => (
                        <div
                          key={reward.id}
                          className="border rounded-lg p-4 hover:border-primary/50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mr-4 text-2xl">
                                {reward.icon}
                              </div>
                              <div>
                                <h4 className="font-medium">{reward.name}</h4>
                                <p className="text-sm text-muted-foreground">{reward.description}</p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              {reward.status === "available" ? (
                                <>
                                  <Badge variant="outline" className="mb-2 flex items-center">
                                    <Trophy className="h-3 w-3 mr-1 text-primary" />
                                    {reward.tokensRequired} tokens
                                  </Badge>
                                  <Button size="sm" disabled={user.points < reward.tokensRequired}>
                                    Redeem
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Badge variant="secondary" className="mb-2 flex items-center">
                                    <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                                    Redeemed
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">{reward.redeemedOn}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 text-center">
                      <Button variant="outline">
                        View All Rewards <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Track your bookings, rewards, and point transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                              activity.type === "booking"
                                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                : activity.type === "reward"
                                  ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                                  : activity.type === "referral"
                                    ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                            }`}
                          >
                            {activity.type === "booking" && <Ticket className="h-5 w-5" />}
                            {activity.type === "reward" && <Gift className="h-5 w-5" />}
                            {activity.type === "referral" && <UsersIcon className="h-5 w-5" />}
                            {activity.type === "streak" && <Flame className="h-5 w-5" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{activity.event}</h4>
                                <p className="text-sm text-muted-foreground">{activity.description}</p>
                              </div>
                              <div className="text-right">
                                <span
                                  className={`font-medium ${
                                    activity.points > 0
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-red-600 dark:text-red-400"
                                  }`}
                                >
                                  {activity.points > 0 ? "+" : ""}
                                  {activity.points} tokens
                                </span>
                                <p className="text-xs text-muted-foreground">{activity.date}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 text-center">
                      <Button variant="outline">
                        View Full Activity History <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
