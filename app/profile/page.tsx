import type { Metadata } from "next"
import UserProfile from "@/components/user-profile"

export const metadata: Metadata = {
  title: "User Profile - PrimePass",
  description: "View and manage your PrimePass profile, tickets, and rewards",
}

export default function ProfilePage() {
  return <UserProfile />
}
