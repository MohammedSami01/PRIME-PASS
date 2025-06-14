import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - PrimePass',
  description: 'Terms and conditions governing the use of PrimePass services.',
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <p className="text-muted-foreground mb-8">Last updated: June 1, 2025</p>
      
      <div className="prose dark:prose-invert">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing or using the PrimePass website and services, you agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
          <p className="mb-4">
            PrimePass provides an online platform that allows users to discover, book, and manage tickets for various 
            events, including but not limited to concerts, sports, theater, and other live entertainment events.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
          <p className="mb-2">To access certain features of the service, you may be required to create an account. You agree to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Provide accurate, current, and complete information during registration</li>
            <li>Maintain the security of your password and accept all risks of unauthorized access</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
            <li>Be responsible for all activities that occur under your account</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Booking and Payments</h2>
          <p className="mb-2">When you book tickets through our platform, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Pay all amounts due for tickets and any applicable fees</li>
            <li>Provide accurate billing information</li>
            <li>Comply with all event rules and policies</li>
            <li>Be aware that all sales are final unless otherwise stated</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Cancellation and Refunds</h2>
          <p className="mb-4">
            Cancellation and refund policies vary by event. Please review the specific event details for information 
            about cancellations and refunds. In general, all sales are final, and refunds are only available in limited 
            circumstances as determined by the event organizer.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
          <p className="mb-4">
            All content included on the platform, such as text, graphics, logos, button icons, images, audio clips, 
            digital downloads, data compilations, and software, is the property of PrimePass or its content suppliers 
            and protected by international copyright laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p className="mb-4">
            To the maximum extent permitted by law, PrimePass shall not be liable for any indirect, incidental, special, 
            consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or 
            indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Your access to or use of or inability to access or use the services</li>
            <li>Any conduct or content of any third party on the services</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            <li>Any other matter relating to the services</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these terms at any time. We will provide notice of any changes by posting 
            the updated terms on our website. Your continued use of the services after such changes constitutes your 
            acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p className="mt-2">
            Email: legal@primepass.com<br />
            Phone: +91 1234567890<br />
            Address: Hubli-Dharwad , Karnataka, India
          </p>
        </section>
      </div>
    </div>
  );
}
