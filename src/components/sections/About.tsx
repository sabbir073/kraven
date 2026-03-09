'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const highlights = [
  {
    label: 'Real Audience',
    text: 'Distributing your word to targeted humans, not bots.',
  },
  {
    label: 'Super Users',
    text: 'Turning 100K users into 1,000 loyal supporters who back you in every market.',
  },
  {
    label: 'Founder-First',
    text: 'Helping projects & founders truly get what they aim for.',
  },
];

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(60, 80, 255, 0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="gsap-badge inline-block px-6 py-2 border border-white/20 rounded-full text-sm text-gray-400 tracking-widest uppercase">
            About
          </span>
          <p className="ecosystem-subtitle text-white/70 text-xl md:text-2xl font-bold mt-3 leading-tight tracking-wide">
            Why Kraven Exists
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Main statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative p-6 sm:p-8 md:p-10 rounded-2xl glass border border-white/10 mb-8 md:mb-12"
          >
            {/* Accent line */}
            <div className="absolute left-0 top-6 bottom-6 w-px bg-gradient-to-b from-blue-500/60 via-blue-400/30 to-transparent rounded-full" />

            <div className="pl-5 sm:pl-6 space-y-5 sm:space-y-6">
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                <span className="text-white font-semibold">Kraven is not just another marketing agency.</span>{' '}
                The real problem is driving genuine audience when the market is filled with noise.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                Kraven is not about setting up KOLs to make a post or spreading your word to bots &mdash; it&apos;s about distributing your word to your targeted humans and then turning 100K users into super 1,000 users who support you in every market situation.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                Kraven was initiated with the plan to help projects & founders truly get what they aim for, instead of just buzzwords & irrelevant impressions.
              </p>
              <p className="text-base sm:text-lg md:text-xl font-semibold">
                <span
                  style={{
                    background: 'linear-gradient(90deg, #fff 0%, #6090ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Kraven is the authentic market pace founders wanted.
                </span>
              </p>
            </div>
          </motion.div>

          {/* Highlight cards */}
          <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                className="p-5 sm:p-6 rounded-xl glass border border-white/10 hover:border-blue-500/20 transition-all duration-300"
              >
                <h4 className="text-blue-400 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">
                  {item.label}
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
