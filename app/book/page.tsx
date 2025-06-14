import { Metadata } from 'next';
import { BookingForm } from '@/components/booking-form';

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description: 'Book your next appointment with us',
};

export default function BookPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] py-12 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Book Your Appointment</h1>
          <div className="bg-card rounded-lg shadow-sm border p-6">
            <BookingForm />
          </div>
        </div>
      </div>
    </main>
  );
}
