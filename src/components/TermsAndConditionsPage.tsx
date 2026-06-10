import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export const TermsAndConditionsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-16 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-dark mb-4">Terms & Conditions</h1>
            <p className="text-dark/60">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-lg max-w-none text-dark/80 space-y-6">
            <section className="bg-blush/30 p-8 rounded-[2rem] border border-primary/10">
              <h2 className="text-2xl font-bold text-dark mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing our website and purchasing our products, you agree to be bound by these Terms and Conditions 
                and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited 
                from using or accessing this site.
              </p>
            </section>

            <section className="bg-blush/30 p-8 rounded-[2rem] border border-primary/10">
              <h2 className="text-2xl font-bold text-dark mb-4">2. Products and Pricing</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All products are subject to availability.</li>
                <li>We reserve the right to discontinue any product at any time.</li>
                <li>Prices for our products are subject to change without notice.</li>
                <li>We reserve the right at any time to modify or discontinue the Service without notice at any time.</li>
                <li>Product images are for illustrative purposes only and may differ from the actual product.</li>
              </ul>
            </section>

            <section className="bg-blush/30 p-8 rounded-[2rem] border border-primary/10">
              <h2 className="text-2xl font-bold text-dark mb-4">3. Orders and Payments</h2>
              <p>
                We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel 
                quantities purchased per person, per household or per order. You agree to provide current, complete and 
                accurate purchase and account information for all purchases made at our store.
              </p>
            </section>

            <section className="bg-blush/30 p-8 rounded-[2rem] border border-primary/10">
              <h2 className="text-2xl font-bold text-dark mb-4">4. Shipping and Delivery</h2>
              <p>
                Delivery times are estimates and may vary depending on your location and other factors beyond our control. 
                We are not responsible for delays caused by customs, natural occurrences, or courier service delays.
              </p>
            </section>

            <section className="bg-blush/30 p-8 rounded-[2rem] border border-primary/10">
              <h2 className="text-2xl font-bold text-dark mb-4">5. Returns and Refunds</h2>
              <p>
                Due to the nature of our products (food items), we have a strict quality control policy. If you receive a 
                damaged or defective product, please contact us within 24 hours of delivery with photographic evidence for 
                evaluation and potential replacement or refund.
              </p>
            </section>

            <section className="bg-blush/30 p-8 rounded-[2rem] border border-primary/10">
              <h2 className="text-2xl font-bold text-dark mb-4">6. Contact Information</h2>
              <p>
                Questions about the Terms & Conditions should be sent to us at:
              </p>
              <div className="mt-4 p-4 bg-white rounded-xl border border-primary/10">
                <p>Email: info@citynutsonline.com</p>
                <p>Phone: +971 52 303 2577</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
