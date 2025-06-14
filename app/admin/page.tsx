import type { Metadata } from "next"
import AdminDashboard from "@/components/admin/dashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard - PrimePass",
  description: "Manage events, users, and analytics on PrimePass",
}

export default function AdminPage() {
  return <AdminDashboard />
}
