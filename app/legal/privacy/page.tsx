import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - PrimePass',
  description: 'Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: June 1, 2025</p>
      
      <div className="prose dark:prose-invert">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to PrimePass. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you about how we look after your personal data when you visit our 
            website and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <p className="mb-4">
            We may collect, use, store, and transfer different kinds of personal data about you which we have 
            grouped together as follows:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Identity Data</strong> includes first name, last name, username, or similar identifier.</li>
            <li><strong>Contact Data</strong> includes billing address, delivery address, email address, and telephone numbers.</li>
            <li><strong>Financial Data</strong> includes bank account and payment card details.</li>
            <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Data</h2>
          <p className="mb-4">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>To register you as a new customer</li>
            <li>To process and deliver your orders</li>
            <li>To manage our relationship with you</li>
            <li>To enable you to participate in a prize draw, competition, or complete a survey</li>
            <li>To administer and protect our business and this website</li>
            <li>To deliver relevant website content and advertisements to you</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p className="mb-4">
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, 
            used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal 
            data to those employees, agents, contractors, and other third parties who have a business need to know.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Your Legal Rights</h2>
          <p className="mb-4">
            Under certain circumstances, you have rights under data protection laws in relation to your personal data, 
            including the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Request access to your personal data</li>
            <li>Request correction of your personal data</li>
            <li>Request erasure of your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Request restriction of processing your personal data</li>
            <li>Request transfer of your personal data</li>
            <li>Right to withdraw consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
          </p>
          <p className="mt-2">
            Email: privacy@primepass.com<br />
            Phone: +91 1234567890<br />
            Address: Hubli-Dharwad , Karnataka, India
          </p>
        </section>
      </div>
    </div>
  );
}
