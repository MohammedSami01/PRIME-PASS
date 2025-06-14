"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Menu, X, LogIn, UserPlus, Ticket, Gift, Settings, LogOut, Calendar, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Mock user state - in a real app, this would come from an auth context
const mockUser = {
  isLoggedIn: false,
  name: "Jane Cooper",
  email: "jane@example.com",
  image: "/placeholder.svg?height=32&width=32",
  points: 2450,
  notifications: 3,
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(mockUser)
  const { toast } = useToast()

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleLogin = () => {
    setUser({ ...mockUser, isLoggedIn: true })
    toast({
      title: "🎉 Welcome back!",
      description: "You have successfully logged in.",
    })
  }

  const handleLogout = () => {
    setUser({ ...mockUser, isLoggedIn: false })
    toast({
      title: "👋 Goodbye!",
      description: "You have been logged out.",
    })
  }

  const navLinks = [
    { name: "Events", href: "/events" },
    { name: "Movies", href: "/events?category=movies" },
    { name: "Sports", href: "/events?category=sports" },
    { name: "Rewards", href: "/rewards" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex items-center"
          >
            <span className="text-2xl font-bold text-primary">
              Prime<span className="text-foreground">Pass</span>
            </span>
            <span className="absolute -top-1 -right-4">
              <motion.div
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                🎟️
              </motion.div>
            </span>
          </motion.div>
        </Link>

        <nav className="hidden md:flex ml-10 space-x-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Link href={link.href} className="text-sm font-medium transition-colors hover:text-primary">
                {link.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center ml-auto space-x-4">
          {user.isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {user.notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {user.notifications}
                  </span>
                )}
              </Button>

              <div className="hidden md:flex items-center border border-primary/20 rounded-full px-3 py-1 bg-primary/5">
                <span className="text-xs font-medium mr-1">🏆</span>
                <span className="text-xs font-medium text-primary">{user.points.toLocaleString()} points</span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Ticket className="mr-2 h-4 w-4" />
                    <span>My Tickets</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Gift className="mr-2 h-4 w-4" />
                    <span>Rewards</span>
                    <Badge variant="outline" className="ml-auto">
                      {user.points} pts
                    </Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>My Events</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Users className="mr-2 h-4 w-4" />
                    <span>My Groups</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleLogin}>
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
              <Button size="sm" onClick={handleLogin}>
                <UserPlus className="mr-2 h-4 w-4" /> Sign up
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col space-y-3 p-4 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center py-2 text-base font-medium"
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}

            {!user.isLoggedIn ? (
              <div className="flex flex-col space-y-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    handleLogin()
                    toggleMenu()
                  }}
                >
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Button>
                <Button
                  onClick={() => {
                    handleLogin()
                    toggleMenu()
                  }}
                >
                  <UserPlus className="mr-2 h-4 w-4" /> Sign up
                </Button>
              </div>
            ) : (
              <div className="pt-2 flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.name}</span>
                  <div className="flex items-center">
                    <span className="text-xs font-medium mr-1">🏆</span>
                    <span className="text-xs font-medium text-primary">{user.points.toLocaleString()} points</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </header>
  )
}
