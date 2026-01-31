'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const faqs = [
  {
    question: 'How does Kraven ensure that campaign engagement converts into real users, liquidity, or on-chain activity rather than vanity metrics?',
    answer:
      'Kraven is built to move beyond impressions and likes. We focus on who is speaking, not just how loud they are. Our KOL selection is based on smart followers, VC presence, tweet score, and on-chain relevance. On top of that, campaigns are structured with on-chain activity multipliers, meaning creators who drive real user actions are rewarded more. This ensures projects attract users who actually participate, not just observe.',
  },
  {
    question: 'What differentiates Kraven\'s Mindshare and leaderboard system from traditional KOL marketing platforms that rely on X API or raw impressions?',
    answer:
      'Most platforms rely heavily on X APIs and surface-level metrics. Kraven does not. We operate as raw hunters, tracking creator activity through a hybrid system that combines AI analysis with manual verification. Our Mindshare reflects how many relevant creators are consistently talking about a project, not inflated reach. The leaderboard updates every 48 hours and shows real competitive positioning, not artificial boosts.',
  },
  {
    question: 'How are KOL tiers (Class S, A, B, C) evaluated beyond follower count, and how often are these tiers reviewed or upgraded?',
    answer:
      'Follower count is only one factor and not the deciding one. KOL tiers are determined using a combination of tweet quality score, engagement consistency, smart follower ratio, VC and builder followers, historical reach, and overall social presence. This allows smaller but high-impact creators to rank higher than large but inactive accounts. Tier upgrades are possible as creators grow and prove performance.',
  },
  {
    question: 'What transparency and reporting do projects receive during and after a campaign to measure performance, ROI, and creator contribution?',
    answer:
      'Every campaign has its own tally form, internal tracking, and live leaderboard. Projects can see who is posting, how often, and how Mindshare is shifting in real time. At the end of a campaign, projects receive a clear breakdown of creator participation, ranking, and performance without hidden data or vague reports.',
  },
  {
    question: 'Which campaign model (Traditional Strategy or Modern Strategy) is best suited for a project\'s stage, budget, and growth goals?',
    answer:
      'Traditional Strategy is ideal for projects with limited budgets that want maximum organic reach and competition-driven visibility. Modern Strategy is designed for projects that need predictable outcomes, targeted audiences, and full execution handled end-to-end. We help projects choose based on their stage, goals, and timeline — not by pushing a one-size-fits-all solution.',
  },
];

const FAQItem = ({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <motion.button
        onClick={onToggle}
        className="w-full p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl glass glass-hover text-left flex items-center justify-between gap-3 sm:gap-4 hoverable"
        whileHover={{ scale: 1.01 }}
      >
        <span className="font-semibold text-sm sm:text-base md:text-lg pr-2 sm:pr-4">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 flex items-center justify-center"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 sm:p-5 md:p-6 pt-0">
              <div className="p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl bg-white/5 text-gray-400 leading-relaxed text-xs sm:text-sm md:text-base">
                {faq.answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="faq" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px]"
        style={{
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.1) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="container-custom relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Left - Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-32 lg:self-start text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass text-xs sm:text-sm text-purple-400 mb-4 sm:mb-6"
            >
              FAQ
            </motion.span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>

            <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
              Learn more about our campaign strategies, KOL tier system, and how we deliver real results for Web3 projects.
            </p>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl glass hidden lg:block"
            >
              <h4 className="font-semibold mb-2 text-sm sm:text-base">Still have questions?</h4>
              <p className="text-xs sm:text-sm text-gray-400 mb-4">
                Our team is ready to help you choose the right strategy for your project.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-outline text-xs sm:text-sm hoverable"
              >
                Contact Us
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right - FAQ Items */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
