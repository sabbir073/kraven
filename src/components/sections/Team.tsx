'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  twitter?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'BlackBull',
    role: 'Founder & CEO',
    image: '/team/1.png',
    twitter: 'https://x.com/blackbulls00',
  },
  {
    name: 'Zonium',
    role: 'Co-founder & CTO',
    image: '/team/2.png',
    twitter: 'https://x.com/Itszonium',
  },
  {
    name: 'Khalex',
    role: 'CMO',
    image: '/team/3.png',
    twitter: 'https://x.com/khalex3_0',
  },
  {
    name: 'Ezikwa',
    role: 'Product Manager',
    image: '/team/4.png',
    twitter: 'https://x.com/MrAlphabet22',
  },
  {
    name: 'Bright Benjie',
    role: 'Operation Lead',
    image: '/team/5.png',
    twitter: 'https://x.com/tradingBenjie',
  },
  {
    name: 'Darrel',
    role: 'Senior Developer',
    image: '/team/6.png',
  },
];

export const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative pt-6 md:pt-10 pb-16 md:pb-24 overflow-hidden bg-[#0a0a0a]">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
        style={{
          background: 'radial-gradient(circle, rgba(60,80,255,0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Title - Ecosystem style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="gsap-badge inline-block px-6 py-2 border border-white/20 rounded-full text-sm text-gray-400 tracking-widest uppercase">
            Build The Foundation
          </span>
          <p className="ecosystem-subtitle text-white/70 text-xl md:text-2xl font-bold mt-3 leading-tight tracking-wide">
            Experts Behind Kraven
          </p>
        </motion.div>

        {/* Team Grid - 3x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-white/10 hover:border-white/20 overflow-hidden transition-all duration-500"
            >
              {/* Card background image */}
              <img
                src="/Frame 6.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-bottom rounded-2xl pointer-events-none"
              />

              <div className="relative z-10 p-5 md:p-6 flex items-center gap-4">
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-lg md:text-xl font-bold"
                    style={{
                      background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0.4) 75%, rgba(255,255,255,0) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-blue-400 text-sm font-medium mt-0.5">{member.role}</p>

                  {/* Social links */}
                  <div className="flex items-center gap-3 mt-3">
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hoverable w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:border-white/30 hover:bg-white/10 transition-all duration-300"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 hover:text-white transition-colors">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Avatar */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white/10 flex-shrink-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
