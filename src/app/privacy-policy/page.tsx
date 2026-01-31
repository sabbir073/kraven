'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function PrivacyPolicy() {
  useEffect(() => {
    document.body.classList.add('show-cursor');
    return () => {
      document.body.classList.remove('show-cursor');
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass py-4">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Link href="/" className="hoverable">
              <Image
                src="/logo/kraven png white.png"
                alt="Kraven"
                width={160}
                height={48}
                className="h-8 sm:h-10 w-auto"
                priority
              />
            </Link>
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-white transition-colors hoverable flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full glass text-sm text-purple-400 mb-6">
              Legal
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-gray-400 mb-8">
              Last updated: January 2025
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert max-w-none"
          >
            <div className="space-y-8">
              <section className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">1. Introduction</h2>
                <p className="text-gray-300 leading-relaxed">
                  Welcome to Kraven (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Web3 marketing platform and services.
                </p>
              </section>

              <section className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">2. Information We Collect</h2>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="font-semibold text-white mb-2">Personal Information</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
                      <li>Name and contact information (email, Telegram username)</li>
                      <li>Wallet addresses for blockchain-related services</li>
                      <li>Project details and campaign requirements</li>
                      <li>Communication preferences</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Usage Information</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
                      <li>Browser type and device information</li>
                      <li>IP address and location data</li>
                      <li>Pages visited and interaction patterns</li>
                      <li>Campaign performance metrics</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">3. How We Use Your Information</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base">
                  <li>To provide and manage our marketing services</li>
                  <li>To communicate with you about campaigns and updates</li>
                  <li>To analyze and improve our platform performance</li>
                  <li>To ensure compliance with legal obligations</li>
                  <li>To prevent fraud and maintain security</li>
                  <li>To personalize your experience on our platform</li>
                </ul>
              </section>

              <section className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">4. Information Sharing</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base">
                  <li>KOLs and creators involved in your campaigns (limited to necessary information)</li>
                  <li>Service providers who assist in our operations</li>
                  <li>Legal authorities when required by law</li>
                  <li>Business partners with your explicit consent</li>
                </ul>
              </section>

              <section className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">5. Data Security</h2>
                <p className="text-gray-300 leading-relaxed">
                  We implement industry-standard security measures to protect your information, including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">6. Your Rights</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base">
                  <li>Access and receive a copy of your personal data</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your data (subject to legal requirements)</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent where applicable</li>
                </ul>
              </section>

              <section className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">7. Cookies and Tracking</h2>
                <p className="text-gray-300 leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, analyze traffic, and understand how you interact with our platform. You can manage cookie preferences through your browser settings.
                </p>
              </section>

              <section className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">8. Third-Party Links</h2>
                <p className="text-gray-300 leading-relaxed">
                  Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
                </p>
              </section>

              <section className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">9. Changes to This Policy</h2>
                <p className="text-gray-300 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on our platform and updating the &quot;Last updated&quot; date.
                </p>
              </section>

              <section className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">10. Contact Us</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-sm sm:text-base">
                  <p className="text-gray-300">
                    <span className="text-white font-medium">Email:</span>{' '}
                    <a href="mailto:Buisness.Kraven@gmail.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      Buisness.Kraven@gmail.com
                    </a>
                  </p>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">Telegram:</span>{' '}
                    <a href="https://t.me/Kraven_Ai" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      @Kraven_Ai
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 btn-outline hoverable text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
