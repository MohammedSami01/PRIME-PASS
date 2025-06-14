import { NextResponse } from 'next/server';

// In a real app, you would use a database like Prisma
// For now, we'll use an in-memory array
let bookings: any[] = [];

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.name || !data.email || !data.date || !data.time || !data.guests) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create booking
    const newBooking = {
      id: Date.now().toString(),
      ...data,
      date: new Date(data.date).toISOString(),
      createdAt: new Date().toISOString(),
    };

    // In a real app: await prisma.booking.create({ data: newBooking });
    bookings.push(newBooking);

    return NextResponse.json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // In a real app: const bookings = await prisma.booking.findMany();
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
