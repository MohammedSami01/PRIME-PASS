import { redirect } from 'next/navigation';

export default function SportsPage() {
  redirect('/events?category=sports');
}
