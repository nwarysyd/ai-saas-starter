"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RefundPolicyPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-bg-page text-primary-text">
      <Navbar />

      <main className="flex-1 w-full overflow-y-auto scrollbar-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-8">Refund Policy</h1>

          <div className="prose prose-invert max-w-none space-y-6 text-secondary-text">
            <section>
              <h2 className="text-2xl font-bold text-primary-text mb-4">Refund Eligibility</h2>
              <p>We want you to be completely satisfied with your purchase. If you're not happy with your purchase, we offer refunds under the following conditions:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Refund requests must be made within 30 days of purchase</li>
                <li>The credits must not have been fully used or consumed</li>
                <li>The refund request must be accompanied by a valid reason</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary-text mb-4">Refund Process</h2>
              <p>To request a refund, please follow these steps:</p>
              <ol className="list-decimal pl-6 space-y-2 mt-4">
                <li>Contact our support team at support@aiforge.com with your refund request</li>
                <li>Provide your order number and reason for the refund</li>
                <li>Our team will review your request within 5-7 business days</li>
                <li>If approved, the refund will be processed to your original payment method within 10-15 business days</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary-text mb-4">Non-Refundable Items</h2>
              <p>The following are non-refundable:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Credits that have been fully consumed or used for AI generation</li>
                <li>Purchases made more than 30 days ago</li>
                <li>Purchases that violate our Terms of Service</li>
                <li>Duplicate or accidental purchases that resulted from user error</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary-text mb-4">Partially Used Credits</h2>
              <p>If you have used some of your credits but wish to request a refund, we will calculate a prorated refund based on the remaining unused credits. You will receive a refund equivalent to the value of the unused credits only.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary-text mb-4">Refund Methods</h2>
              <p>Refunds will be issued to your original payment method. Depending on your financial institution, it may take 10-15 business days for the refund to appear in your account. We have no control over this timeline.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary-text mb-4">Exceptions</h2>
              <p>AIForge reserves the right to deny refunds in cases of:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Abuse of the refund policy</li>
                <li>Fraudulent activity or chargebacks</li>
                <li>Terms of Service violations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary-text mb-4">Contact Support</h2>
              <p>If you have any questions about our Refund Policy, please contact our support team at support@aiforge.com or call +1 (555) 123-4567.</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
