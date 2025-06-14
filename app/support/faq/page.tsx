import { Metadata } from 'next';
import { ChevronDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQs - PrimePass',
  description: 'Frequently asked questions about PrimePass and our services.',
};

const faqs = [
  {
    question: 'How do I book an event?',
    answer: 'Booking an event is simple! Just browse our events, select the one you like, choose your tickets, and complete the checkout process.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards, UPI, and net banking. We also support popular digital wallets.'
  },
  {
    question: 'How can I modify or cancel my booking?',
    answer: 'You can modify or cancel your booking by logging into your account and accessing the "My Bookings" section. Please note that cancellation policies vary by event.'
  },
  {
    question: 'When will I receive my e-tickets?',
    answer: 'E-tickets are typically sent to your registered email immediately after a successful booking. If you don\'t see them, please check your spam folder.'
  },
  {
    question: 'What is your refund policy?',
    answer: 'Refund policies vary by event. Please check the event details for specific refund information. We generally process refunds within 5-7 business days.'
  },
  {
    question: 'How do I contact customer support?',
    answer: 'You can reach our 24/7 customer support through the contact form on our website, via email at support@primepass.com, or by calling our toll-free number.'
  },
  {
    question: 'Do you offer group discounts?',
    answer: 'Yes, we offer special pricing for group bookings. Please contact our group sales team for more information and to discuss your requirements.'
  },
  {
    question: 'Is my personal information secure?',
    answer: 'Yes, we take data security very seriously. All personal and payment information is encrypted and processed through secure, PCI-compliant systems.'
  },
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="group border-b pb-4">
              <summary className="flex justify-between items-center py-4 font-medium cursor-pointer list-none">
                <span className="text-lg hover:text-primary transition-colors">{faq.question}</span>
                <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform" />
              </summary>
              <div className="mt-2 text-muted-foreground pb-2">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
        
        <div className="mt-12 p-6 bg-muted/50 rounded-xl text-center">
          <h2 className="text-xl font-semibold mb-2">Still have questions?</h2>
          <p className="text-muted-foreground mb-4">
            We're here to help! Contact our support team for any additional questions.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
