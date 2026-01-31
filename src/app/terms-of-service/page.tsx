'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function TermsOfService() {
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
              Terms of <span className="gradient-text">Service</span>
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
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">1. Acceptance of Terms</h2>
                <p className="text-gray-300 leading-relaxed">
                  By accessing or using Kraven&apos;s services, website, and platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms apply to all users, including projects, KOLs, and visitors.
                </p>
              </section>

              <section className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">2. Description of Services</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Kraven provides Web3 marketing services including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base">
                  <li>Traditional Strategy: Estimation-based KOL marketing packages with guaranteed deliverables</li>
                  <li>Modern Strategy: Open competition campaigns with reward pools and leaderboard systems</li>
                  <li>Campaign management and execution services</li>
                  <li>Performance tracking and analytics</li>
                  <li>KOL coordination and content facilitation</li>
                </ul>
              </section>

              <section className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">3. User Responsibilities</h2>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="font-semibold text-white mb-2">For Projects:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
                      <li>Provide accurate project information and campaign requirements</li>
                      <li>Make timely payments according to agreed terms</li>
                      <li>Respond to communications within reasonable timeframes</li>
                      <li>Ensure your project complies with applicable laws and regulations</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">For KOLs:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
                      <li>Create authentic, high-quality content</li>
                      <li>Meet campaign deadlines and requirements</li>
                      <li>Disclose sponsored content as required by regulations</li>
                      <li>Maintain professional conduct in all interactions</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">4. Payment Terms</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base">
                  <li>All fees are quoted in USD or equivalent cryptocurrency</li>
                  <li>Payment is required before campaign execution begins</li>
                  <li>Refunds are subject to our refund policy and campaign status</li>
                  <li>We reserve the right to modify pricing with prior notice</li>
                  <li>Late payments may result in service suspension</li>
                </ul>
              </section>

              <section className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">5. Campaign Execution</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base">
                  <li>Campaign preparation takes 7 business days after confirmation</li>
                  <li>Result sheets are delivered within 7 business days after campaign completion</li>
                  <li>We strive to meet all deliverables but cannot guarantee specific engagement metrics</li>
                  <li>Campaign modifications after launch may incur additional fees</li>
                  <li>Force majeure events may affect campaign timelines</li>
                </ul>
              </section>

              <section className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">6. Intellectual Property</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  All content, branding, and materials on our platform are owned by Kraven or our licensors. You may not:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base">
                  <li>Copy, modify, or distribute our proprietary materials</li>
                  <li>Use our trademarks without written permission</li>
                  <li>Reverse engineer our platform or services</li>
                  <li>Scrape or collect data from our platform without authorization</li>
                </ul>
              </section>

              <section className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">7. Prohibited Activities</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base">
                  <li>Use our services for illegal or fraudulent purposes</li>
                  <li>Promote projects that violate securities laws or regulations</li>
                  <li>Engage in market manipulation or deceptive practices</li>
                  <li>Harass, abuse, or harm other users or KOLs</li>
                  <li>Circumvent our systems or security measures</li>
                  <li>Provide false or misleading information</li>
                </ul>
              </section>

              <section className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">8. Limitation of Liability</h2>
                <p className="text-gray-300 leading-relaxed">
                  Kraven provides services on an &quot;as is&quot; basis. We are not liable for indirect, incidental, or consequential damages arising from your use of our services. Our total liability is limited to the amount paid for the specific service in question. We do not guarantee specific investment returns or token performance.
                </p>
              </section>

              <section className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">9. Disclaimer</h2>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-sm sm:text-base">
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-yellow-400">Important:</strong> Kraven provides marketing services only. We do not provide financial, investment, or legal advice. Cryptocurrency and Web3 projects carry significant risks. Past performance does not guarantee future results. Always conduct your own research before making investment decisions.
                  </p>
                </div>
              </section>

              <section className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">10. Termination</h2>
                <p className="text-gray-300 leading-relaxed">
                  We reserve the right to suspend or terminate your access to our services at any time for violations of these terms or for any reason at our sole discretion. Upon termination, your right to use our services ceases immediately.
                </p>
              </section>

              <section className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">11. Dispute Resolution</h2>
                <p className="text-gray-300 leading-relaxed">
                  Any disputes arising from these terms or our services shall first be attempted to be resolved through good-faith negotiation. If resolution cannot be reached, disputes may be submitted to binding arbitration in accordance with applicable laws.
                </p>
              </section>

              <section className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">12. Changes to Terms</h2>
                <p className="text-gray-300 leading-relaxed">
                  We may modify these Terms of Service at any time. Material changes will be communicated through our platform or via email. Continued use of our services after changes constitutes acceptance of the modified terms.
                </p>
              </section>

              <section className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-cyan-400">13. Contact Information</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  For questions about these Terms of Service, please contact us:
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
                  <p className="text-gray-300">
                    <span className="text-white font-medium">Twitter:</span>{' '}
                    <a href="https://x.com/Kraven_Ai" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
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
