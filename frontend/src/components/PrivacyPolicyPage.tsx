import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export const PrivacyPolicyPage: React.FC = () => {
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
            <h1 className="text-4xl font-bold text-dark mb-4">Privacy Policy</h1>
            <p className="text-dark/60">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-lg max-w-none text-dark/80 space-y-6">
            <section className="bg-blush/30 p-8 rounded-[2rem] border border-primary/10">
              <h2 className="text-2xl font-bold text-dark mb-4">1. Introduction</h2>
              <p>
                Welcome to Citynuts. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you as to how we look after your personal data when you visit our 
                website and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section className="bg-blush/30 p-8 rounded-[2rem] border border-primary/10">
              <h2 className="text-2xl font-bold text-dark mb-4">2. Data We Collect</h2>
              <p>
                We may collect, use, store and transfer different kinds of personal data about you which we have 
                grouped together as follows:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                <li><strong>Financial Data:</strong> includes payment card details (processed securely by our payment providers).</li>
                <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
              </ul>
            </section>

            <section className="bg-blush/30 p-8 rounded-[2rem] border border-primary/10">
              <h2 className="text-2xl font-bold text-dark mb-4">3. How We Use Your Data</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal 
                data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
            </section>

            <section className="bg-blush/30 p-8 rounded-[2rem] border border-primary/10">
              <h2 className="text-2xl font-bold text-dark mb-4">4. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, 
                used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal 
                data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
            </section>

            <section className="bg-blush/30 p-8 rounded-[2rem] border border-primary/10">
              <h2 className="text-2xl font-bold text-dark mb-4">5. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-white rounded-xl border border-primary/10">
                <p>Email: info@citynutsonline.com</p>
                <p>Phone: +971 52 303 2577</p>
                <p>Address: ALRAFI BUILDING EYAL NASIR, Shop No 4 & 5 Near Naif Police Station, Sabhka, Deira - Dubai</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
