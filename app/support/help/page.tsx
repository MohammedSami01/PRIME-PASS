import { Metadata } from 'next';
import { HelpCircle, MessageSquare, Ticket, CreditCard, User, Settings } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Help Center - PrimePass',
  description: 'Find answers to common questions and get support for your PrimePass experience.',
};

export default function HelpCenterPage() {
  const helpTopics = [
    {
      icon: <Ticket className="w-6 h-6 text-primary" />,
      title: 'Booking Tickets',
      description: 'Learn how to book, modify, or cancel your event tickets.',

    },
    {
      icon: <CreditCard className="w-6 h-6 text-primary" />,
      title: 'Payments & Refunds',
      description: 'Information about payment methods and refund policies.',
     
    },
    {
      icon: <User className="w-6 h-6 text-primary" />,
      title: 'Account & Profile',
      description: 'Manage your account settings and profile information.',
    
    },
    {
      icon: <Settings className="w-6 h-6 text-primary" />,
      title: 'Technical Support',
      description: 'Troubleshoot technical issues with our platform.',
      
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">How can we help you today?</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions or get in touch with our support team.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Search help articles..."
            className="w-full px-6 py-4 pl-12 text-lg border rounded-full focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <HelpCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-muted-foreground" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {helpTopics.map((topic, index) => (
          <a
            key={index}
            href={topic.link}
            className="group p-6 border rounded-lg hover:border-primary transition-colors hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                {topic.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                  {topic.title}
                </h3>
                <p className="text-muted-foreground">{topic.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-16 p-8 bg-muted/50 rounded-xl max-w-4xl mx-auto text-center">
        <MessageSquare className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-semibold mb-2">Still need help?</h2>
        <p className="text-muted-foreground mb-6">
          Our support team is available 24/7 to assist you with any questions or issues.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
