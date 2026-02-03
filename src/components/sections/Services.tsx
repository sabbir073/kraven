'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { BookingPopup } from '../ui/BookingPopup';

// Traditional Strategy Packages
const traditionalPackages = [
  {
    name: 'BUILDER',
    price: '$5,000',
    kols: [
      { class: 'Class A KOLs', count: 1 },
      { class: 'Class B KOLs', count: 15 },
      { class: 'Class C KOLs', count: 30 },
    ],
    estimatedPosts: '736',
    estimatedReach: '400,000',
    features: ['Mass Outreach Campaign'],
    color: '#06b6d4',
    popular: false,
  },
  {
    name: 'PREMIUM',
    price: '$10,000',
    kols: [
      { class: 'Class S KOLs', count: 1 },
      { class: 'Class A KOLs', count: 7 },
      { class: 'Class B KOLs', count: 30 },
    ],
    estimatedPosts: '480',
    estimatedReach: '1,000,000',
    features: ['Precisely Targeted Audience'],
    color: '#8b5cf6',
    popular: true,
  },
  {
    name: 'PREMIUM PLUS',
    price: '$25,000',
    kols: [
      { class: 'Class S KOLs', count: 7 },
      { class: 'Class A KOLs', count: 20 },
      { class: 'Class B KOLs', count: 60 },
    ],
    estimatedPosts: '1,392',
    estimatedReach: '35,000,000',
    features: ['Precisely Targeted Audience on Large Scale'],
    color: '#ec4899',
    popular: false,
  },
];

const customPlanFeatures = [
  'Class S KOLs',
  'Class A KOLs',
  'Class B KOLs',
  'Class C KOLs',
  'Advanced UI/UX Designing Team',
];

export const Services = () => {
  const ref = useRef(null);
  const packagesRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showTraditionalPackages, setShowTraditionalPackages] = useState(false);
  const [bookingPopup, setBookingPopup] = useState<{
    isOpen: boolean;
    packageName: string;
    packagePrice: string;
  }>({
    isOpen: false,
    packageName: '',
    packagePrice: '',
  });

  const openBooking = (name: string, price: string) => {
    setBookingPopup({ isOpen: true, packageName: name, packagePrice: price });
  };

  const closeBooking = () => {
    setBookingPopup({ ...bookingPopup, isOpen: false });
  };

  const togglePackages = () => {
    const willShow = !showTraditionalPackages;
    setShowTraditionalPackages(willShow);

    if (willShow) {
      // Wait for animation to start, then scroll to packages
      setTimeout(() => {
        packagesRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  };

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px]"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px]"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20 px-4"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass text-xs sm:text-sm text-purple-400 mb-4 sm:mb-6"
          >
            Our Strategies
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
            <span className="gradient-text">Choose Your</span> Campaign Strategy
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
            Two powerful approaches to amplify your project&apos;s reach through our network of verified KOLs
          </p>
        </motion.div>

        {/* Services Grid - Two Columns */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Traditional Strategy */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="glass rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10 h-full flex flex-col">
              {/* Strategy Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-7 md:h-7 text-cyan-400">
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-cyan-400 font-medium">STRATEGY 01</span>
                  <h3 className="text-xl md:text-2xl font-bold mt-1">Traditional Strategy</h3>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4 mb-6">
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  This category is based on an <span className="text-cyan-400 font-medium">estimation system</span> — with a particular amount of money, your project will get a specific number of KOLs. As the budget varies, so does the tier of KOLs.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm text-gray-400">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <span>Campaigns fully executed by Kraven from start to end</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-400">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <span>Managed privately in TG supergroup</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-400">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <span>Guaranteed deliverables with fixed KOL allocation</span>
                  </div>
                </div>
              </div>

              {/* KOL Tiers Info */}
              <div className="glass rounded-xl p-4 mb-6 border border-cyan-500/20">
                <h4 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  KOL Tier System
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                    <span className="text-gray-400">Class S — Elite tier</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    <span className="text-gray-400">Class A — Premium tier</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    <span className="text-gray-400">Class B — Standard tier</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                    <span className="text-gray-400">Class C — Entry tier</span>
                  </div>
                </div>
              </div>

              {/* Best For */}
              <div className="glass rounded-xl p-4 mb-6 border border-purple-500/20">
                <h4 className="text-sm font-semibold text-purple-400 mb-2">
                  Best For
                </h4>
                <p className="text-xs md:text-sm text-gray-400">
                  Projects seeking <span className="text-purple-400 font-medium">predictable results</span> with guaranteed KOL allocation and hands-off campaign management.
                </p>
              </div>

              {/* Pricing Range */}
              <div className="glass rounded-xl p-4 mb-6 border border-cyan-500/20">
                <h4 className="text-sm font-semibold text-cyan-400 mb-2">
                  Package Pricing
                </h4>
                <p className="text-xs md:text-sm text-gray-400">
                  Starting from <span className="text-cyan-400 font-medium">$5,000</span> with packages designed to fit different campaign scales and budget requirements. Custom plans also available on request for larger campaigns.
                </p>
              </div>

              {/* See Packages Button */}
              <motion.button
                onClick={togglePackages}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 md:py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2 mt-auto"
              >
                {showTraditionalPackages ? 'Hide Packages' : 'See Packages'}
                <motion.svg
                  animate={{ rotate: showTraditionalPackages ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </motion.svg>
              </motion.button>
            </div>
          </motion.div>

          {/* Modern Strategy */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="glass rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10 h-full flex flex-col">
              {/* Strategy Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 md:w-7 md:h-7 text-purple-400">
                    <path
                      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-purple-400 font-medium">STRATEGY 02</span>
                  <h3 className="text-xl md:text-2xl font-bold mt-1">Modern Strategy</h3>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4 mb-6">
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  All KOLs can participate in your project&apos;s campaign with a <span className="text-purple-400 font-medium">reward pool system</span>. Top 100-200 KOLs (or as discussed) will be rewarded with a minimum threshold of 50 creators.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm text-gray-400">
                    <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <span>Deal only in Stables (USDT, USDC) to protect KOL efforts</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-400">
                    <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <span>Hybrid tracking system: AI + Manual support</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-400">
                    <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <span>Each campaign has its own Tally form for link submissions</span>
                  </div>
                </div>
              </div>

              {/* Leaderboard Info */}
              <div className="glass rounded-xl p-4 mb-6 border border-purple-500/20">
                <h4 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 20V10M12 20V4M6 20v-6" />
                  </svg>
                  Dual Leaderboard System
                </h4>
                <ul className="space-y-2 text-xs md:text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">1.</span>
                    <span>Project Mindshare Leaderboard — shows campaign reach</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">2.</span>
                    <span>KOL Ranking Leaderboard — shows creator performance</span>
                  </li>
                </ul>
                <p className="text-xs text-gray-500 mt-3">
                  Leaderboard updates every 48 hours. We&apos;re raw hunters — no X API.
                </p>
              </div>

              {/* Mindshare Info */}
              <div className="glass rounded-xl p-4 mb-6 border border-cyan-500/20">
                <h4 className="text-sm font-semibold text-cyan-400 mb-2">
                  How Do We Calculate Mindshare?
                </h4>
                <p className="text-xs md:text-sm text-gray-400">
                  Mindshare reflects how many creators are talking about your project.
                  <span className="text-cyan-400 font-medium"> Mindshare = Rank</span>
                </p>
              </div>

              {/* Best For */}
              <div className="glass rounded-xl p-4 mb-6 border border-pink-500/20">
                <h4 className="text-sm font-semibold text-pink-400 mb-2">
                  Best For
                </h4>
                <p className="text-xs md:text-sm text-gray-400">
                  Projects seeking <span className="text-pink-400 font-medium">maximum organic reach</span> through competitive KOL participation and performance-based rewards.
                </p>
              </div>

              {/* Contact Button */}
              <motion.button
                onClick={() => openBooking('Modern Strategy', 'Custom Pricing')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 md:py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all flex items-center justify-center gap-2 mt-auto"
              >
                Book a Call
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Traditional Strategy Packages - Expandable */}
        <AnimatePresence>
          {showTraditionalPackages && (
            <motion.div
              ref={packagesRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden scroll-mt-24"
            >
              <div className="pt-8 md:pt-12">
                {/* Packages Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-8"
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Traditional Strategy Packages</h3>
                  <p className="text-gray-400 text-sm">Choose the package that fits your campaign goals</p>
                </motion.div>

                {/* Packages Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                  {traditionalPackages.map((pkg, index) => (
                    <motion.div
                      key={pkg.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index + 0.3 }}
                      className={`relative glass rounded-2xl p-6 border ${
                        pkg.popular ? 'border-purple-500/50' : 'border-white/10'
                      }`}
                    >
                      {/* Popular Badge */}
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <span className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-xs font-semibold">
                            MOST POPULAR
                          </span>
                        </div>
                      )}

                      {/* Package Header */}
                      <div className="text-center mb-6 pt-2">
                        <h4
                          className="text-lg font-bold mb-2"
                          style={{ color: pkg.color }}
                        >
                          {pkg.name}
                        </h4>
                        <div className="text-3xl md:text-4xl font-black">{pkg.price}</div>
                      </div>

                      {/* KOLs List */}
                      <div className="space-y-2 mb-6">
                        <h5 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">KOLs Included</h5>
                        {pkg.kols.map((kol) => (
                          <div
                            key={kol.class}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-gray-300">{kol.class}</span>
                            <span
                              className="font-semibold"
                              style={{ color: pkg.color }}
                            >
                              {kol.count}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="glass rounded-xl p-4 mb-6 space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Estimated Posts</span>
                          <span className="font-semibold text-white">{pkg.estimatedPosts}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Estimated Reach</span>
                          <span className="font-semibold text-white">{pkg.estimatedReach}</span>
                        </div>
                      </div>

                      {/* Features */}
                      {pkg.features.length > 0 && (
                        <div className="mb-6">
                          {pkg.features.map((feature) => (
                            <div
                              key={feature}
                              className="flex items-center gap-2 text-sm text-gray-300"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke={pkg.color}
                                strokeWidth="2"
                              >
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                              {feature}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Book Button */}
                      <motion.button
                        onClick={() => openBooking(`Traditional - ${pkg.name}`, pkg.price)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                        style={{
                          background: `linear-gradient(135deg, ${pkg.color}40, ${pkg.color}20)`,
                          border: `1px solid ${pkg.color}50`,
                        }}
                      >
                        Book a Call
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </motion.div>
                  ))}
                </div>

                {/* Custom Plan Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 glass rounded-2xl p-6 md:p-8 border border-white/10"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                      <h4 className="text-lg md:text-xl font-bold mb-2">Need a Customised Plan?</h4>
                      <p className="text-gray-400 text-sm mb-4">Custom plans have access to:</p>
                      <div className="flex flex-wrap gap-2">
                        {customPlanFeatures.map((feature) => (
                          <span
                            key={feature}
                            className="px-3 py-1 rounded-full glass text-xs text-cyan-400 border border-cyan-500/30"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <motion.button
                      onClick={() => openBooking('Custom Plan', 'Contact for Pricing')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all whitespace-nowrap"
                    >
                      Contact Us
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Booking Popup */}
      <BookingPopup
        isOpen={bookingPopup.isOpen}
        onClose={closeBooking}
        packageName={bookingPopup.packageName}
        packagePrice={bookingPopup.packagePrice}
      />
    </section>
  );
};
