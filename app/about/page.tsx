import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - PrimePass',
  description: 'Learn more about PrimePass and our mission to revolutionize event ticketing.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">About PrimePass</h1>
      <div className="prose dark:prose-invert max-w-3xl">
        <p className="text-lg mb-6">
          PrimePass is a next-generation event ticketing platform that combines seamless booking with 
          gamification elements to create unforgettable experiences for both event organizers and attendees.
        </p>
        
        <h2>Our Mission</h2>
        <p>
          To revolutionize the way people discover, book, and experience events by providing a platform 
          that's intuitive, engaging, and rewarding for everyone involved.
        </p>
        
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Wide selection of events across multiple categories</li>
          <li>Easy and secure booking process</li>
          <li>Exclusive rewards and loyalty programs</li>
          <li>Personalized event recommendations</li>
          <li>24/7 customer support</li>
        </ul>
        
        <h2>Our Team</h2>
        <p>
          We're a passionate team of event enthusiasts, developers, and designers dedicated to creating 
          the best possible experience for our users.
        </p>
      </div>
    </div>
  );
}
