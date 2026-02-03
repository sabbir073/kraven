'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';

const kravenFeatures = [
  {
    icon: '✦',
    title: 'Data-Driven Audience Targeting',
    description: 'Precision targeting based on analytics and user behavior data.',
  },
  {
    icon: '✦',
    title: 'Quality with Mass Scaling',
    description: 'Premium quality marketing that scales to reach millions.',
  },
  {
    icon: '✦',
    title: 'Limited Budget, Wider Reach',
    description: 'Maximize your reach with our Traditional Strategy packages.',
  },
  {
    icon: '✦',
    title: 'On-Chain Behavior Tracking',
    description: 'Track real user engagement and on-chain activity.',
  },
  {
    icon: '✦',
    title: 'Estimated Built-in Packages',
    description: 'Pre-designed packages for high accuracy and predictable results.',
  },
];

const problemsSolved = [
  'Projects spending money without getting real users',
  'Wasted marketing budgets with no liquidity gains',
  'Lack of authentic traction and engagement',
  'Disconnect between KOLs and project goals',
];

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div
        className="absolute top-1/4 left-0 w-[600px] h-[600px]"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-[500px] h-[500px]"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Decorative elements */}
      <motion.div
        style={{ y: y1, rotate }}
        className="absolute top-20 right-10 w-32 h-32 rounded-2xl border border-purple-500/20 opacity-30"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-40 left-20 w-24 h-24 rounded-full border border-cyan-500/20 opacity-30"
      />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass text-xs sm:text-sm text-pink-400 mb-4 sm:mb-6"
          >
            About Kraven
          </motion.span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
            The First <span className="gradient-text">CreatorFi</span> Built for Web3
          </h2>

          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
            Kraven is the only marketplace where all your questions and doubts will be resolved —
            we provide every way of marketing with the highest quality on a mass scale.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start mb-16">
          {/* Left - The Problem We Solve */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-red-500/20 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  The <span className="text-red-400">Problem</span> We Solve
                </h3>
              </div>

              <div className="space-y-4">
                {problemsSolved.map((problem, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </div>
                    <p className="text-gray-300 text-sm sm:text-base">{problem}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Unique Value Proposition */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="glass rounded-2xl p-6 border border-purple-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <span className="text-xl text-purple-400">✦</span>
                </div>
                <h4 className="text-lg font-semibold text-purple-400">Fair Terms for Everyone</h4>
              </div>
              <p className="text-gray-400 text-sm sm:text-base">
                We are the only marketplace that puts <span className="text-white font-medium">projects & KOLs on terms</span> which are satisfactory for both parties — creating genuine partnerships that drive real results.
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Kraven Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-cyan-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl overflow-hidden">
                  <Image
                    src="/logo/forprofile.png"
                    alt="Kraven Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">Kraven Combines</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">Everything you need for success</p>
                </div>
              </div>

              <div className="space-y-4">
                {kravenFeatures.map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg text-cyan-400">{feature.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base mb-0.5">{feature.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="inline-block glass rounded-2xl p-6 sm:p-8 border border-white/10 max-w-2xl">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3">
              Kraven is the <span className="gradient-text">Only Authentic Marketplace</span>
            </h3>
            <p className="text-gray-400 text-sm sm:text-base mb-6">
              Built to solve all your Web3 marketing problems with transparency, quality, and measurable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-primary hoverable text-sm sm:text-base"
              >
                Explore Our Services
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-outline hoverable text-sm sm:text-base"
              >
                Get in Touch
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
