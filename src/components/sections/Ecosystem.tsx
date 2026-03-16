'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KOLMember {
  name: string;
  image: string;
  twitter: string;
}

const outerRing: KOLMember[] = [
  { name: 'Zing_Xoro', image: '/circle/1.png', twitter: 'https://x.com/Zing_Xoro' },
  { name: 'VoidWatcherWeb3', image: '/circle/2.png', twitter: 'https://x.com/VoidWatcherWeb3' },
  { name: 'Vega20032', image: '/circle/3.png', twitter: 'https://x.com/Vega20032' },
  { name: 'ShahzadaJunaid0', image: '/circle/4.png', twitter: 'https://x.com/ShahzadaJunaid0' },
  { name: 'Promzy__M', image: '/circle/5.png', twitter: 'https://x.com/Promzy__M' },
  { name: 'M0hitshrmaa', image: '/circle/6.png', twitter: 'https://x.com/M0hitshrmaa' },
  { name: 'jaydecodes', image: '/circle/7.png', twitter: 'https://x.com/jaydecodes' },
  { name: 'hmk933', image: '/circle/8.png', twitter: 'https://x.com/hmk933' },
  { name: 'flowty', image: '/circle/9.png', twitter: 'https://x.com/flowty' },
  { name: 'eth_falco', image: '/circle/10.png', twitter: 'https://x.com/eth_falco' },
  { name: 'Cryptonic_1st', image: '/circle/11.png', twitter: 'https://x.com/Cryptonic_1st' },
  { name: 'Blazetbf', image: '/circle/12.png', twitter: 'https://x.com/Blazetbf' },
];

const innerRing: KOLMember[] = [
  { name: 'Bakioption', image: '/circle/13.png', twitter: 'https://x.com/Bakioption' },
  { name: 'Akash_N3', image: '/circle/14.png', twitter: 'https://x.com/Akash_N3' },
  { name: '0xZane_', image: '/circle/15.png', twitter: 'https://x.com/0xZane_' },
  { name: '0x_Charon', image: '/circle/16.png', twitter: 'https://x.com/0x_Charon' },
  { name: '_rajpoot_mayank', image: '/circle/17.png', twitter: 'https://x.com/_rajpoot_mayank' },
  { name: 'spiderr_web3', image: '/circle/18.png', twitter: 'https://x.com/spiderr_web3' },
];

// Animated counter component
const AnimatedCounter = ({ end, suffix = '', decimals = 0 }: { end: number; suffix?: string; decimals?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * end);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
};

const useResponsiveSize = () => {
  const [mounted, setMounted] = useState(false);
  const [size, setSize] = useState({ outerRadius: 280, innerRadius: 170, logoSize: 56, container: 640 });

  useEffect(() => {
    setMounted(true);
    const update = () => {
      const w = window.innerWidth;
      if (w < 400) {
        setSize({ outerRadius: 130, innerRadius: 75, logoSize: 36, container: 320 });
      } else if (w < 640) {
        setSize({ outerRadius: 155, innerRadius: 90, logoSize: 40, container: 380 });
      } else if (w < 768) {
        setSize({ outerRadius: 200, innerRadius: 120, logoSize: 46, container: 480 });
      } else {
        setSize({ outerRadius: 280, innerRadius: 170, logoSize: 56, container: 640 });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return { ...size, mounted };
};

export const Ecosystem = () => {
  const [selectedKOL, setSelectedKOL] = useState<KOLMember | null>(null);
  const { outerRadius, innerRadius, logoSize, container, mounted } = useResponsiveSize();

  const getCirclePosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  const handleKOLClick = (kol: KOLMember) => {
    setSelectedKOL((prev) => (prev?.name === kol.name ? null : kol));
  };

  return (
    <section id="ecosystem" className="relative pt-4 md:pt-8 pb-6 md:pb-10 overflow-hidden bg-[#0a0a0a]">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="gsap-badge inline-block px-6 py-2 border border-white/20 rounded-full text-sm text-gray-400 tracking-widest uppercase">
          Ecosystem
        </span>
        <p className="ecosystem-subtitle text-white/70 text-xl md:text-2xl font-bold mt-3 leading-tight tracking-wide">
          Building Trust In The Trustless Ecosystem
        </p>
      </motion.div>

      {/* Orbit Container */}
      {mounted ? (
      <div className="relative mx-auto" style={{ width: container, height: container, maxWidth: '100vw' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Outer ring track */}
          <div
            className="absolute rounded-full border border-white/5"
            style={{ width: outerRadius * 2 + logoSize, height: outerRadius * 2 + logoSize }}
          />
          {/* Inner ring track */}
          <div
            className="absolute rounded-full border border-white/5"
            style={{ width: innerRadius * 2 + logoSize, height: innerRadius * 2 + logoSize }}
          />

          {/* Center content */}
          <div className="absolute z-20 text-center" style={{ width: logoSize < 46 ? '120px' : '220px' }}>
            <AnimatePresence mode="wait">
              {selectedKOL ? (
                <motion.div
                  key="x-button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center gap-3"
                >
                  {/* Selected KOL avatar */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-blue-500/40">
                    <img src={selectedKOL.image} alt={selectedKOL.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-white text-xs sm:text-sm font-medium">@{selectedKOL.name}</p>
                  {/* X button */}
                  <motion.a
                    href={selectedKOL.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hoverable flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md hover:border-white/40 hover:bg-white/15 transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span className="text-white text-xs sm:text-sm font-medium">Visit Profile</span>
                  </motion.a>
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedKOL(null)}
                    className="hoverable text-gray-500 hover:text-white text-[10px] sm:text-xs transition-colors mt-1"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center gap-1.5 sm:gap-3"
                >
                  <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-widest">Trusted by</p>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl md:text-4xl font-black text-white leading-none">
                      <AnimatedCounter end={500} suffix="+" />
                    </div>
                    <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5 sm:mt-1">KOLs</p>
                  </div>
                  <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl md:text-4xl font-black text-white leading-none">
                      <AnimatedCounter end={99.9} suffix="%" decimals={1} />
                    </div>
                    <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5 sm:mt-1">Uptime</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Outer Ring - rotates LEFT */}
          <motion.div
            className="absolute"
            style={{ width: outerRadius * 2 + logoSize, height: outerRadius * 2 + logoSize }}
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            {outerRing.map((kol, i) => {
              const pos = getCirclePosition(i, outerRing.length, outerRadius);
              const isSelected = selectedKOL?.name === kol.name;

              return (
                <motion.div
                  key={kol.name}
                  className="absolute cursor-pointer hoverable"
                  style={{
                    left: `calc(50% + ${pos.x}px - ${logoSize / 2}px)`,
                    top: `calc(50% + ${pos.y}px - ${logoSize / 2}px)`,
                    width: logoSize,
                    height: logoSize,
                  }}
                  onClick={() => handleKOLClick(kol)}
                  whileHover={{ scale: 1.15 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    className="w-full h-full"
                  >
                    <div
                      className={`w-full h-full rounded-full border overflow-hidden transition-all duration-500 ${
                        isSelected
                          ? 'border-blue-500/50 shadow-[0_0_15px_rgba(60,80,255,0.3)] scale-110'
                          : 'border-white/10 hover:border-white/25'
                      }`}
                    >
                      <img
                        src={kol.image}
                        alt={kol.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Inner Ring - rotates RIGHT */}
          <motion.div
            className="absolute"
            style={{ width: innerRadius * 2 + logoSize, height: innerRadius * 2 + logoSize }}
            animate={{ rotate: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          >
            {innerRing.map((kol, i) => {
              const pos = getCirclePosition(i, innerRing.length, innerRadius);
              const isSelected = selectedKOL?.name === kol.name;

              return (
                <motion.div
                  key={kol.name}
                  className="absolute cursor-pointer hoverable"
                  style={{
                    left: `calc(50% + ${pos.x}px - ${logoSize / 2}px)`,
                    top: `calc(50% + ${pos.y}px - ${logoSize / 2}px)`,
                    width: logoSize,
                    height: logoSize,
                  }}
                  onClick={() => handleKOLClick(kol)}
                  whileHover={{ scale: 1.15 }}
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                    className="w-full h-full"
                  >
                    <div
                      className={`w-full h-full rounded-full border overflow-hidden transition-all duration-500 ${
                        isSelected
                          ? 'border-blue-500/50 shadow-[0_0_15px_rgba(60,80,255,0.3)] scale-110'
                          : 'border-white/10 hover:border-white/25'
                      }`}
                    >
                      <img
                        src={kol.image}
                        alt={kol.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
      ) : (
        <div className="relative mx-auto" style={{ width: 640, height: 640, maxWidth: '100vw' }} />
      )}

      {/* Statement Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center px-6 mt-8 md:mt-12"
      >
        <p
          className="text-sm md:text-base leading-relaxed"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.25) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          We use the data of our marketing experience and analysed the retention of users on incredibly wider area with the use of Artificial Intelligence of about 1000+ projects &amp; 1M+ users to tailor your campaign in a way which works in every market cycle.
        </p>
        <p
          className="text-sm md:text-base font-semibold mt-4 tracking-wide"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          DON&apos;T JUST SPRAY AND PRAY, use the real metrics &amp; proven data campaign to grow your project.
        </p>
      </motion.div>
    </section>
  );
};
