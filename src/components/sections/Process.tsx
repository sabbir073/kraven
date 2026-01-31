'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { BookingPopup } from '../ui/BookingPopup';

const steps = [
  {
    number: '01',
    title: 'Submit a Form OR Book an Exploratory Call',
    description:
      'This is to get in contact with you, to understand your project, demand, and targeted audience to plan your campaign.',
    icon: '📋',
  },
  {
    number: '02',
    title: 'Confirming Your Campaign Details',
    description:
      'This step is to understand what campaign you have chosen and then formulate the further preparations required.',
    icon: '✅',
  },
  {
    number: '03',
    title: 'Preparing Your Campaign Execution',
    description:
      'This step is for our team to prepare the necessary things required to execute your program. The time taken for preparation is 7 Business Days.',
    icon: '⚙️',
  },
  {
    number: '04',
    title: 'Executing Your Campaign',
    description:
      'This step executes your program, marking the start of your campaign & growth.',
    icon: '🚀',
  },
  {
    number: '05',
    title: 'Giving Result Sheet',
    description:
      'This step is done after the completion of your campaign to give you the analysis of what you have achieved. It takes 7 Business Days to prepare your Result Sheet.',
    icon: '📊',
  },
];

export const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [bookingPopup, setBookingPopup] = useState<{
    isOpen: boolean;
    packageName: string;
    packagePrice: string;
  }>({
    isOpen: false,
    packageName: '',
    packagePrice: '',
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  // Torch light position - smoothly animated
  const torchY = useMotionValue(0);
  const smoothTorchY = useSpring(torchY, { stiffness: 100, damping: 30 });

  // Track which step is in view
  useEffect(() => {
    const handleScroll = () => {
      if (!stepsContainerRef.current) return;

      const containerRect = stepsContainerRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;

      let closestStep = 0;
      let closestDistance = Infinity;

      stepRefs.current.forEach((stepEl, index) => {
        if (!stepEl) return;
        const stepRect = stepEl.getBoundingClientRect();
        const stepCenter = stepRect.top + stepRect.height / 2;
        const distance = Math.abs(stepCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestStep = index;
        }
      });

      setActiveStep(closestStep);

      // Update torch position based on active step
      const activeStepEl = stepRefs.current[closestStep];
      if (activeStepEl && stepsContainerRef.current) {
        const stepRect = activeStepEl.getBoundingClientRect();
        const containerRect = stepsContainerRef.current.getBoundingClientRect();
        const relativeY = stepRect.top - containerRect.top + stepRect.height / 2;
        torchY.set(relativeY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [torchY]);

  const openBooking = () => {
    setBookingPopup({ isOpen: true, packageName: 'General Inquiry', packagePrice: 'Custom Quote' });
  };

  const closeBooking = () => {
    setBookingPopup({ ...bookingPopup, isOpen: false });
  };

  return (
    <section
      id="process"
      ref={containerRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Static Background */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-0 w-[600px] h-[600px] -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-20 px-4"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass text-xs sm:text-sm text-cyan-400 mb-4 sm:mb-6"
          >
            Our Process
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
            Our <span className="gradient-text-alt">5-Step Process</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            From initial contact to campaign completion, we guide you through every step of your marketing journey.
          </p>
        </motion.div>

        {/* Process timeline */}
        <div className="relative" ref={stepsContainerRef}>
          {/* Torch Light Effect - Follows active step */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none hidden md:block"
            style={{
              y: smoothTorchY,
              width: '800px',
              height: '400px',
              marginTop: '-200px',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.1) 30%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
          </motion.div>

          {/* Mobile Torch Light */}
          <motion.div
            className="absolute left-4 sm:left-8 pointer-events-none md:hidden"
            style={{
              y: smoothTorchY,
              width: '300px',
              height: '300px',
              marginTop: '-150px',
              marginLeft: '-100px',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.1) 40%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
          </motion.div>

          {/* Animated line */}
          <div className="absolute left-4 sm:left-8 md:left-1/2 top-0 bottom-0 w-px bg-gray-800/50 -translate-x-1/2">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 via-cyan-500 to-pink-500"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-10 sm:space-y-16 md:space-y-24">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                ref={(el) => { stepRefs.current[i] = el; }}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`relative flex items-center gap-4 sm:gap-8 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <motion.div
                  className={`flex-1 pl-12 sm:pl-16 md:pl-0 ${
                    i % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'
                  }`}
                >
                  <motion.div
                    animate={{
                      scale: activeStep === i ? 1.02 : 1,
                      opacity: activeStep === i ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className={`inline-block p-4 sm:p-6 rounded-xl sm:rounded-2xl transition-all duration-500 ${
                      i % 2 === 0 ? 'md:ml-auto' : ''
                    } ${
                      activeStep === i
                        ? 'glass border border-purple-500/30 shadow-lg shadow-purple-500/10'
                        : 'glass border border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <motion.span
                        animate={{
                          scale: activeStep === i ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className="text-2xl sm:text-3xl md:text-4xl"
                      >
                        {step.icon}
                      </motion.span>
                      <span
                        className={`text-xs sm:text-sm font-mono transition-colors duration-300 ${
                          activeStep === i ? 'text-cyan-400' : 'text-purple-400/60'
                        }`}
                      >
                        {step.number}
                      </span>
                    </div>
                    <h3
                      className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 transition-colors duration-300 ${
                        activeStep === i ? 'text-white' : 'text-gray-300'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm md:text-base transition-colors duration-300 ${
                        activeStep === i ? 'text-gray-300' : 'text-gray-500'
                      }`}
                    >
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>

                {/* Center dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, type: 'spring' }}
                  className="absolute left-4 sm:left-8 md:left-1/2 -translate-x-1/2 z-10"
                >
                  <motion.div
                    animate={{
                      scale: activeStep === i ? 1.5 : 1,
                      boxShadow: activeStep === i
                        ? '0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(6, 182, 212, 0.4)'
                        : '0 0 0px rgba(139, 92, 246, 0)',
                    }}
                    transition={{ duration: 0.4 }}
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                  />
                  {activeStep === i && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.8 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                    />
                  )}
                </motion.div>

                {/* Empty spacer for opposite side */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 md:mt-24 pt-12 md:pt-16 border-t border-white/10"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Ready to Take Your Project to the{' '}
            <span className="gradient-text">Next Level?</span>
          </h3>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8">
            Let&apos;s discuss how we can help accelerate your project&apos;s growth with our proven marketing strategies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={openBooking}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary hoverable text-sm sm:text-base w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Book a Call
              </span>
            </motion.button>
            <motion.a
              href="https://docs.google.com/forms/d/e/1FAIpQLScEhIX2O-DrHi9EOXUbxLbq5CJBHDmyHqqisDlnkXKInqGPlw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline hoverable text-sm sm:text-base w-full sm:w-auto"
            >
              <span className="flex items-center justify-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Submit Form
              </span>
            </motion.a>
          </div>
        </motion.div>
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
