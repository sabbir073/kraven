'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';

const navItems = [
  { name: 'Home', href: '#home', isExternal: false },
  { name: 'Campaigns', href: '#campaigns', isExternal: false },
  { name: 'Services', href: '#services', isExternal: false },
  { name: 'Process', href: '#process', isExternal: false },
  { name: 'About', href: '#about', isExternal: false },
  { name: 'FAQ', href: '#faq', isExternal: false },
  { name: 'Contact', href: '#contact', isExternal: false },
];

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement & HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Nav bar drops down
      tl.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      );

      // Logo slides in from left
      tl.fromTo(
        logoRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 },
        '-=0.4'
      );

      // Nav items stagger in
      if (navItemsRef.current) {
        const items = navItemsRef.current.children;
        tl.fromTo(
          items,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
          '-=0.3'
        );
      }

      // CTA button pops in
      tl.fromTo(
        ctaRef.current,
        { x: 30, opacity: 0, scale: 0.9 },
        { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
        '-=0.2'
      );
    });

    return () => ctx.revert();
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="absolute top-0 left-0 right-0 z-50 py-6"
        style={{ opacity: 0 }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo + Navigation - Left aligned */}
            <div className="flex items-center gap-10">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0 hoverable">
                <div ref={logoRef} style={{ opacity: 0 }}>
                  <Image
                    src="/KRAVEN-WHITE.png"
                    alt="Kraven"
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                    priority
                  />
                </div>
              </Link>

              {/* Desktop Navigation - After Logo */}
              <div ref={navItemsRef} className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                item.isExternal ? (
                  <div key={item.name} style={{ opacity: 0 }}>
                    <Link
                      href={item.href}
                      className="relative text-sm font-medium transition-colors hoverable text-gray-400 hover:text-white"
                    >
                      {item.name}
                    </Link>
                  </div>
                ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  style={{ opacity: 0 }}
                  className={`relative text-sm font-medium transition-colors hoverable ${
                    activeSection === item.href.replace('#', '')
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.name}
                  {activeSection === item.href.replace('#', '') && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
                )
              ))}
              </div>
            </div>

            {/* Login / Signup Button */}
            <Link
              ref={ctaRef}
              href="/login"
              style={{ opacity: 0 }}
              className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white bg-[#0a0a12] border border-blue-500/50 hover:border-blue-400 hover:bg-blue-500/10 transition-all hoverable"
            >
              Login / Signup
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="lg:hidden hoverable z-50 relative w-10 h-10 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 8 : 0,
                  }}
                  className="w-full h-0.5 bg-white block origin-center"
                />
                <motion.span
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                    x: isMobileMenuOpen ? 20 : 0,
                  }}
                  className="w-full h-0.5 bg-white block"
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -8 : 0,
                  }}
                  className="w-full h-0.5 bg-white block origin-center"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[#0a0a0a] p-6 sm:p-8 pt-20 sm:pt-24 overflow-y-auto"
            >
              <div className="flex flex-col gap-4 sm:gap-6">
                {navItems.map((item, index) => (
                  item.isExternal ? (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-xl sm:text-2xl font-medium text-left hoverable text-gray-300"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleNavClick(item.href)}
                      className={`text-xl sm:text-2xl font-medium text-left hoverable ${
                        activeSection === item.href.replace('#', '')
                          ? 'gradient-text'
                          : 'text-gray-300'
                      }`}
                    >
                      {item.name}
                    </motion.button>
                  )
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-center mt-4 px-5 py-2.5 rounded-full text-sm sm:text-base font-medium text-white border border-blue-500/50 hover:border-blue-400 hover:bg-blue-500/10 transition-all hoverable"
                  >
                    Login / Signup
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
