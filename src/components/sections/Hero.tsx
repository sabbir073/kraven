'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const typingTexts = [
  'The Wave 2 of InfoFi is here.',
  'The Market Place For Creators is here.',
];

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Typing animation effect
  useEffect(() => {
    const currentFullText = typingTexts[currentTextIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing
      if (displayedText.length < currentFullText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        }, 80);
      } else {
        // Pause before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Deleting
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 40);
      } else {
        // Move to next text
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTextIndex]);

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover opacity-40"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          {/* Overlay for better text visibility */}
          <div className="absolute inset-0 bg-[#0a0a0a]/60" />
        </div>

        {/* Content - Centered */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4"
        >
          {/* Main Title - KRAVEN */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-wider mb-6 md:mb-8"
            style={{
              textShadow: '0 0 80px rgba(139, 92, 246, 0.5), 0 0 120px rgba(6, 182, 212, 0.3)',
              letterSpacing: '0.15em',
            }}
          >
            KRAVEN
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4"
          >
            The First Ever CreatorFi
          </motion.h2>

          {/* Typing Animation Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-8 md:mb-10 h-8 md:h-10"
          >
            <p className="text-base sm:text-lg md:text-xl text-gray-400">
              {displayedText}
              <span className="inline-block w-0.5 h-5 md:h-6 bg-cyan-400 ml-1 animate-pulse" />
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center"
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
              className="group relative px-8 py-3 rounded-lg font-semibold text-white border border-white/30 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hoverable"
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
              className="group relative px-8 py-3 rounded-lg font-semibold text-white hoverable"
            >
              {/* Gradient background (border effect) */}
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {/* Default border */}
              <span className="absolute inset-0 rounded-lg border border-white/30 transition-opacity duration-300 group-hover:opacity-0" />
              {/* Inner background */}
              <span className="absolute inset-[2px] rounded-md bg-[#0a0a0a] group-hover:bg-[#0a0a0a]" />
              {/* Text */}
              <span className="relative z-10">Learn More</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats - Bottom of Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="flex items-center gap-6 sm:gap-10 md:gap-14">
            {[
              { value: '$100K', label: 'Total Volume' },
              { value: '500+', label: 'Creators' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
};
