'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import dynamic from 'next/dynamic';

const WaterText = dynamic(
  () => import('../ui/WaterText').then((mod) => mod.WaterText),
  { ssr: false }
);

const TypeWriter = dynamic(
  () => import('../ui/TypeWriter').then((mod) => mod.TypeWriter),
  { ssr: false }
);

const textVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const y = useTransform(smoothProgress, [0, 1], [0, isMobile ? 150 : 300]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5], [1, isMobile ? 0.9 : 0.8]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const subtitleText = 'The First Ever CreatorFi';
  const taglineText = 'The Wave 2 of InfoFi is Here';

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient orbs - responsive sizes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, isMobile ? 25 : 50, 0],
            y: [0, isMobile ? 15 : 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, isMobile ? -15 : -30, 0],
            y: [0, isMobile ? 25 : 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="container-custom relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center min-h-screen py-24 md:py-32">
          {/* Left side - Text content - Full width on mobile */}
          <div className="order-2 lg:order-1 text-center lg:text-left w-full">
            {/* Main Title - KRAVEN with Water Effect */}
            <div className="mb-6 md:mb-8">
              <WaterText text="KRAVEN" isLoaded={isLoaded} />
            </div>

            {/* Subtitle */}
            <motion.div
              custom={1}
              variants={textVariants}
              initial="hidden"
              animate={isLoaded ? 'visible' : 'hidden'}
              className="overflow-hidden mb-4 md:mb-4"
            >
              <motion.h2
                className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  background: 'linear-gradient(90deg, #fff, #8b5cf6, #06b6d4, #fff)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {subtitleText}
              </motion.h2>
            </motion.div>

            {/* Tagline with Typing Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mb-8 md:mb-8"
            >
              <p className="text-lg sm:text-lg md:text-xl lg:text-2xl text-gray-400">
                <TypeWriter
                  text={taglineText}
                  delay={1.5}
                  speed={60}
                  highlightWords={['Wave', '2']}
                  highlightClassName="text-cyan-400 font-semibold"
                  showCursor={true}
                  loop={true}
                  loopDelay={2000}
                  backspaceSpeed={40}
                />
              </p>
            </motion.div>

            {/* CTA Buttons - Full width on mobile */}
            <motion.div
              custom={3}
              variants={textVariants}
              initial="hidden"
              animate={isLoaded ? 'visible' : 'hidden'}
              className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-primary hoverable w-full sm:w-auto"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const aboutSection = document.getElementById('about');
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-outline hoverable w-full sm:w-auto"
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Stats - Better spacing on mobile */}
            <motion.div
              custom={4}
              variants={textVariants}
              initial="hidden"
              animate={isLoaded ? 'visible' : 'hidden'}
              className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 mt-12 md:mt-16 w-full"
            >
              {[
                { value: '$100K', label: 'Total Volume' },
                { value: '500+', label: 'Creators' },
                { value: '99.9%', label: 'Uptime' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="text-center lg:text-left"
                >
                  <div className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right side - Glow effect placeholder for K (hidden on mobile, K is fullscreen on desktop) */}
          <motion.div
            className="order-1 lg:order-2 h-[100px] sm:h-[200px] md:h-[400px] lg:h-[600px] relative flex items-center justify-center hidden md:flex"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {/* Glow effect behind K area */}
            <div
              className="absolute inset-0 -z-10"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(139, 92, 246, 0.3) 0%, transparent 60%)',
                filter: 'blur(60px)',
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator - hide on small mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden sm:flex"
      >
        <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 md:w-6 md:h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0], y: [0, 12] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-purple-500 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
