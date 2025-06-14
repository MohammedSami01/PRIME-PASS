"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  ArrowUpRight,
  Calendar,
  CreditCard,
  LayoutDashboard,
  BarChart3,
  Settings,
  Users,
  LogOut,
  Plus,
  Edit,
  Trash2,
  ChevronRight,
  Flame,
} from "lucide-react"

// Mock data for the admin dashboard
const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
]

const eventTypeData = [
  { name: "Concerts", value: 40 },
  { name: "Sports", value: 25 },
  { name: "Movies", value: 20 },
  { name: "Other", value: 15 },
]

const COLORS = ["#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe"]

// Mock events for the admin panel
const events = [
  {
    id: 1,
    title: "Coldplay: Music of the Spheres",
    date: "Jun 15, 2025",
    location: "Narendra Modi Stadium, Ahmedabad",
    sales: 12453,
    status: "active",
    revenue: "₹78.5L",
  },
  {
    id: 2,
    title: "IPL Final 2025",
    date: "May 25, 2025",
    location: "M.A. Chidambaram Stadium, Chennai",
    sales: 9876,
    status: "active",
    revenue: "₹45.7L",
  },
  {
    id: 3,
    title: "Arijit Singh Live",
    date: "Jul 25, 2025",
    location: "GMDC Grounds, Ahmedabad",
    sales: 5421,
    status: "upcoming",
    revenue: "₹32.2L",
  },
  {
    id: 4,
    title: "Comedy Night with Zakir Khan",
    date: "Aug 23, 2025",
    location: "JLN Indoor Stadium, Delhi",
    sales: 3254,
    status: "upcoming",
    revenue: "₹24.8L",
  },
  {
    id: 5,
    title: "F1 Indian Grand Prix",
    date: "Apr 18, 2025",
    location: "Buddh Circuit, Greater Noida",
    sales: 8790,
    status: "completed",
    revenue: "₹67.3L",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-background fixed h-full">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">PrimePass</span>
            <span className="text-primary text-sm font-medium px-2 py-0.5 rounded-full bg-primary/10">Admin</span>
          </div>
        </div>

        <div className="flex flex-col p-4 space-y-1">
          <Button
            variant={activeTab === "dashboard" ? "secondary" : "ghost"}
            className="justify-start"
            onClick={() => setActiveTab("dashboard")}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
          </Button>
          <Button
            variant={activeTab === "events" ? "secondary" : "ghost"}
            className="justify-start"
            onClick={() => setActiveTab("events")}
          >
            <Calendar className="mr-2 h-4 w-4" /> Events
          </Button>
          <Button
            variant={activeTab === "users" ? "secondary" : "ghost"}
            className="justify-start"
            onClick={() => setActiveTab("users")}
          >
            <Users className="mr-2 h-4 w-4" /> Users
          </Button>
          <Button
            variant={activeTab === "analytics" ? "secondary" : "ghost"}
            className="justify-start"
            onClick={() => setActiveTab("analytics")}
          >
            <BarChart3 className="mr-2 h-4 w-4" /> Analytics
          </Button>
          <Button
            variant={activeTab === "finances" ? "secondary" : "ghost"}
            className="justify-start"
            onClick={() => setActiveTab("finances")}
          >
            <CreditCard className="mr-2 h-4 w-4" /> Finances
          </Button>
          <Button
            variant={activeTab === "settings" ? "secondary" : "ghost"}
            className="justify-start"
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
        </div>

        <div className="mt-auto p-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <h1 className="text-lg font-semibold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>

          <div className="ml-auto flex items-center gap-4">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Event
            </Button>
          </div>
        </header>

        <main className="p-6">
          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="dashboard" className="space-y-8">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹2.45 Cr</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <span className="text-green-500 flex items-center mr-1">
                        <ArrowUpRight className="h-3 w-3" /> +18.2%
                      </span>
                      from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ticket Sales</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45,231</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <span className="text-green-500 flex items-center mr-1">
                        <ArrowUpRight className="h-3 w-3" /> +12.5%
                      </span>
                      from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12,234</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <span className="text-green-500 flex items-center mr-1">
                        <ArrowUpRight className="h-3 w-3" /> +9.2%
                      </span>
                      from last month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Events Hosted</CardTitle>
                    <Flame className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">156</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <span className="text-green-500 flex items-center mr-1">
                        <ArrowUpRight className="h-3 w-3" /> +24.3%
                      </span>
                      from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>Monthly revenue from ticket sales</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          width={500}
                          height={300}
                          data={salesData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="sales" fill="#8b5cf6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Event Distribution</CardTitle>
                    <CardDescription>Breakdown by event type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={300}>
                          <Pie
                            data={eventTypeData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {eventTypeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Events</CardTitle>
                  <CardDescription>Overview of your recent events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-2 text-left font-medium">Event</th>
                          <th className="py-3 px-2 text-left font-medium">Date</th>
                          <th className="py-3 px-2 text-left font-medium">Location</th>
                          <th className="py-3 px-2 text-left font-medium">Sales</th>
                          <th className="py-3 px-2 text-left font-medium">Status</th>
                          <th className="py-3 px-2 text-left font-medium">Revenue</th>
                          <th className="py-3 px-2 text-right font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.map((event) => (
                          <tr key={event.id} className="border-b">
                            <td className="py-3 px-2">{event.title}</td>
                            <td className="py-3 px-2">{event.date}</td>
                            <td className="py-3 px-2">{event.location}</td>
                            <td className="py-3 px-2">{event.sales.toLocaleString()}</td>
                            <td className="py-3 px-2">
                              <span
                                className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                                  event.status === "active"
                                    ? "bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-500"
                                    : event.status === "upcoming"
                                      ? "bg-blue-100 text-blue-700 dark:bg-blue-800/30 dark:text-blue-500"
                                      : "bg-gray-100 text-gray-700 dark:bg-gray-800/30 dark:text-gray-500"
                                }`}
                              >
                                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-3 px-2">{event.revenue}</td>
                            <td className="py-3 px-2 text-right">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Button variant="outline" className="text-sm">
                      View All Events <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Events</CardTitle>
                  <CardDescription>Create, edit, and manage events on your platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex justify-end">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Add New Event
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-2 text-left font-medium">Event</th>
                          <th className="py-3 px-2 text-left font-medium">Date</th>
                          <th className="py-3 px-2 text-left font-medium">Location</th>
                          <th className="py-3 px-2 text-left font-medium">Sales</th>
                          <th className="py-3 px-2 text-left font-medium">Status</th>
                          <th className="py-3 px-2 text-left font-medium">Revenue</th>
                          <th className="py-3 px-2 text-right font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.map((event) => (
                          <tr key={event.id} className="border-b">
                            <td className="py-3 px-2">{event.title}</td>
                            <td className="py-3 px-2">{event.date}</td>
                            <td className="py-3 px-2">{event.location}</td>
                            <td className="py-3 px-2">{event.sales.toLocaleString()}</td>
                            <td className="py-3 px-2">
                              <span
                                className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                                  event.status === "active"
                                    ? "bg-green-100 text-green-700 dark:bg-green-800/30 dark:text-green-500"
                                    : event.status === "upcoming"
                                      ? "bg-blue-100 text-blue-700 dark:bg-blue-800/30 dark:text-blue-500"
                                      : "bg-gray-100 text-gray-700 dark:bg-gray-800/30 dark:text-gray-500"
                                }`}
                              >
                                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-3 px-2">{event.revenue}</td>
                            <td className="py-3 px-2 text-right space-x-1">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage users and their permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">User Management Interface</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      View and manage all platform users, set permissions, and track user activities.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics Dashboard</CardTitle>
                  <CardDescription>Detailed insights about your platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Analytics Dashboard</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Comprehensive analytics on ticket sales, user engagement, revenue, and more.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="finances" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Management</CardTitle>
                  <CardDescription>Track revenue, payments, and refunds</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <CreditCard className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Financial Dashboard</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Manage payments, track revenue streams, process refunds, and generate financial reports.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>Configure your PrimePass platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Settings className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Settings Dashboard</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Configure platform settings, payment gateways, notification templates, and more.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
