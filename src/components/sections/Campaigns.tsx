'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Category = 'awareness' | 'distribution' | 'clipping';
type TimeFilter = 'live' | 'past';

interface CampaignItem {
  name: string;
  budget: string;
  duration: string;
  upcoming?: boolean;
}

interface CampaignData {
  live: CampaignItem[];
  past: CampaignItem[];
}

const campaignData: Record<Category, CampaignData> = {
  awareness: {
    live: [
      { name: 'Kraven', budget: 'Rewards TBA', duration: '' },
    ],
    past: [],
  },
  distribution: {
    live: [
      { name: 'Neuralai', budget: '$30,000/month', duration: '3 months', upcoming: true },
    ],
    past: [
      { name: '@permute finance', budget: '$5,000/month', duration: '5 months' },
      { name: '@nodeaieth', budget: '$25,000/month', duration: '3 months' },
      { name: '@10101-art', budget: '$10,000/month', duration: '2 months' },
    ],
  },
  clipping: {
    live: [],
    past: [],
  },
};

const categories: { key: Category; label: string }[] = [
  { key: 'awareness', label: 'Awareness Scaling' },
  { key: 'distribution', label: 'Sustainable Distribution' },
  { key: 'clipping', label: 'Clipping' },
];

export const Campaigns = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('awareness');
  const [activeFilter, setActiveFilter] = useState<TimeFilter>('live');

  const currentData = campaignData[activeCategory][activeFilter];

  return (
    <section id="campaigns" className="relative pt-6 md:pt-10 pb-6 md:pb-10 overflow-hidden bg-[#0a0a0a]">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="gsap-badge inline-block px-6 py-2 border border-white/20 rounded-full text-sm text-gray-400 tracking-widest uppercase">
            Campaigns
          </span>
          <p className="ecosystem-subtitle text-white/70 text-xl md:text-2xl font-bold mt-3 leading-tight tracking-wide">
            Join The Future
          </p>
        </motion.div>

        {/* Category Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 md:mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                setActiveFilter('live');
              }}
              className={`hoverable px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border text-sm sm:text-base font-medium transition-all duration-300 backdrop-blur-md ${
                activeCategory === cat.key
                  ? 'border-white/30 bg-gradient-to-b from-white/15 to-white/5 text-white shadow-[0_0_20px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.15),0_6px_20px_-4px_rgba(255,255,255,0.15)]'
                  : 'border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] text-gray-400 hover:border-white/20 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.1)] shadow-[0_6px_20px_-4px_rgba(255,255,255,0.1)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Live / Past Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-4 mb-10 md:mb-12"
        >
          <button
            onClick={() => setActiveFilter('live')}
            className={`hoverable flex items-center gap-2 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full border text-sm font-medium transition-all duration-300 backdrop-blur-md ${
              activeFilter === 'live'
                ? 'border-white/30 bg-gradient-to-b from-white/15 to-white/5 text-white shadow-[0_0_15px_rgba(52,211,153,0.1),inset_0_1px_0_rgba(255,255,255,0.15),0_6px_20px_-4px_rgba(255,255,255,0.15)]'
                : 'border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] text-gray-500 hover:border-white/20 hover:text-gray-300 shadow-[0_6px_20px_-4px_rgba(255,255,255,0.1)]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
            Live
          </button>
          <button
            onClick={() => setActiveFilter('past')}
            className={`hoverable flex items-center gap-2 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full border text-sm font-medium transition-all duration-300 backdrop-blur-md ${
              activeFilter === 'past'
                ? 'border-white/30 bg-gradient-to-b from-white/15 to-white/5 text-white shadow-[0_0_15px_rgba(248,113,113,0.1),inset_0_1px_0_rgba(255,255,255,0.15),0_6px_20px_-4px_rgba(255,255,255,0.15)]'
                : 'border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] text-gray-500 hover:border-white/20 hover:text-gray-300 shadow-[0_6px_20px_-4px_rgba(255,255,255,0.1)]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.6)]" />
            Past
          </button>
        </motion.div>

        {/* Campaign Cards */}
        <div className="min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${activeFilter}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {currentData.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-sm">No campaigns yet</p>
                </div>
              ) : (
                currentData.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg sm:text-xl font-semibold text-white truncate">
                            {item.name}
                          </h3>
                          {item.upcoming && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              Upcoming
                            </span>
                          )}
                        </div>
                        {item.duration && (
                          <p className="text-gray-500 text-sm mt-1">{item.duration}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-white/80 font-medium text-sm sm:text-base">
                          {item.budget}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
