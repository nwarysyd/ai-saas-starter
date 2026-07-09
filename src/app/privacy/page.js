"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-bg-page text-primary-text">
      <Navbar />

      <main className="flex-1 w-full overflow-y-auto scrollbar-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-8">Privacy Policy</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-secondary-text">
            <section>
              <h2 className="text-2xl font-bold text-primary-text mb-4">Introduction</h2>
              <p>AIForge ("we" or "us" or "our") operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our website and the choices you have associated with that data.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary-text mb-4">Information Collection and Use</h2>
              <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
              <h3 className="text-xl font-bold text-primary-text mt-4 mb-2">Types of Data Collected:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to:
                  <ul className="list-circle pl-6 mt-2">
                    <li>Email address</li>
                    <li>First name and last name</li>
                    <li>Phone number</li>
                    <li>Cookies and Usage Data</li>
                  </ul>
                </li>
                <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This may include information such as your computer's IP address, browser type, browser version, the pages you visit, and the time and date of your visit.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary-text mb-4">Use of Data</h2>
              <p>AIForge uses the collected data for various purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain the Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our Service</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary-text mb-4">Security of Data</h2>
              <p>The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary-text mb-4">Changes to This Privacy Policy</h2>
              <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary-text mb-4">Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at: support@aiforge.com</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
