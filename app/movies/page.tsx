import { redirect } from 'next/navigation';

export default function MoviesPage() {
  redirect('/events?category=movies');
}
