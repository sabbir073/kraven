'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import dynamic from 'next/dynamic';
import { BookingPopup } from '../ui/BookingPopup';

const CTAGlow = dynamic(
  () => import('../ui/CTAGlow').then((mod) => mod.CTAGlow),
  { ssr: false }
);

const steps = [
  {
    number: '01',
    title: 'Submit a Form OR Book an Exploratory Call',
    description:
      'This is to get in contact with you, to understand your project, demand, and targeted audience to plan your campaign.',
  },
  {
    number: '02',
    title: 'Confirming Your Campaign Details',
    description:
      'This step is to understand what campaign you have chosen and then formulate the further preparations required.',
  },
  {
    number: '03',
    title: 'Preparing Your Campaign Execution',
    description:
      'This step is for our team to prepare the necessary things required to execute your program. The time taken for preparation is 7 Business Days.',
  },
  {
    number: '04',
    title: 'Executing Your Campaign',
    description:
      'This step executes your program, marking the start of your campaign & growth.',
  },
  {
    number: '05',
    title: 'Giving Result Sheet',
    description:
      'This step is done after the completion of your campaign to give you the analysis of what you have achieved. It takes 7 Business Days to prepare your Result Sheet.',
  },
];

// Glossy number component
const GlossyNumber = ({ number, isActive }: { number: string; isActive: boolean }) => (
  <div className="relative">
    <span
      className={`text-4xl sm:text-5xl md:text-6xl font-black transition-all duration-500 ${
        isActive ? 'text-white' : 'text-gray-600'
      }`}
      style={{
        textShadow: isActive
          ? '0 0 30px rgba(60, 80, 255, 0.8), 0 0 60px rgba(80, 120, 255, 0.5), 0 2px 4px rgba(0,0,0,0.8)'
          : '0 2px 4px rgba(0,0,0,0.5)',
        backgroundImage: isActive
          ? 'linear-gradient(180deg, #fff 0%, #6090ff 50%, #3c50ff 100%)'
          : 'linear-gradient(180deg, #6b7280 0%, #4b5563 50%, #374151 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {number}
    </span>
    {/* Glossy shine effect */}
    {isActive && (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
        }}
      />
    )}
  </div>
);

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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-20 px-4"
        >
          <span className="gsap-badge inline-block px-6 py-2 border border-white/20 rounded-full text-sm text-gray-400 tracking-widest uppercase">
            Our Process
          </span>
          <p className="ecosystem-subtitle text-white/70 text-xl md:text-2xl font-bold mt-3 leading-tight tracking-wide">
            Our 5-Step Process
          </p>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-3">
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
              width: '900px',
              height: '500px',
              marginTop: '-250px',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(60, 80, 255, 0.45) 0%, rgba(80, 100, 255, 0.25) 25%, rgba(100, 120, 255, 0.12) 45%, transparent 65%)',
                filter: 'blur(50px)',
              }}
            />
          </motion.div>

          {/* Mobile Torch Light */}
          <motion.div
            className="absolute left-4 sm:left-8 pointer-events-none md:hidden"
            style={{
              y: smoothTorchY,
              width: '350px',
              height: '350px',
              marginTop: '-175px',
              marginLeft: '-100px',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(60, 80, 255, 0.5) 0%, rgba(80, 100, 255, 0.3) 30%, rgba(100, 120, 255, 0.15) 50%, transparent 70%)',
                filter: 'blur(35px)',
              }}
            />
          </motion.div>

          {/* Animated line */}
          <div className="absolute left-4 sm:left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/20 -translate-x-1/2">
            <motion.div
              className="absolute top-0 left-0 w-full bg-white"
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
                        ? 'glass border border-blue-500/30 shadow-lg shadow-blue-500/10'
                        : 'glass border border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <GlossyNumber number={step.number} isActive={activeStep === i} />
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
                        ? '0 0 20px rgba(255, 255, 255, 0.6), 0 0 40px rgba(255, 255, 255, 0.3)'
                        : '0 0 0px rgba(255, 255, 255, 0)',
                    }}
                    transition={{ duration: 0.4 }}
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white"
                  />
                  {activeStep === i && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.8 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-white"
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
        <div className="relative mt-16 md:mt-24 pt-20 md:pt-32 pb-16 md:pb-24 border-t border-white/10 overflow-hidden">
          {/* Background image */}
          <img
            src="/light.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center relative z-10 flex flex-col items-center"
          >
            {/* Heading text */}
            <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold uppercase tracking-widest mb-6 md:mb-8">
              Build Your Foundation With
            </p>

            {/* KRAVEN logo image */}
            <img
              src="/KRAVEN.png"
              alt="KRAVEN"
              className="max-w-[280px] sm:max-w-[360px] md:max-w-[460px] w-full mb-10 md:mb-14"
            />

            {/* Glossy glass buttons like Campaign buttons */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <motion.button
                onClick={openBooking}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hoverable px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border text-sm sm:text-base font-medium transition-all duration-300 backdrop-blur-md border-white/30 bg-gradient-to-b from-white/15 to-white/5 text-white shadow-[0_0_20px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.15),0_6px_20px_-4px_rgba(255,255,255,0.15)]"
              >
                Book a Call
              </motion.button>
              <motion.a
                href="https://docs.google.com/forms/d/e/1FAIpQLScEhIX2O-DrHi9EOXUbxLbq5CJBHDmyHqqisDlnkXKInqGPlw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hoverable px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border text-sm sm:text-base font-medium transition-all duration-300 backdrop-blur-md border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] text-gray-400 hover:border-white/20 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.1)] shadow-[0_6px_20px_-4px_rgba(255,255,255,0.1)]"
              >
                Submit Form
              </motion.a>
            </div>
          </motion.div>
        </div>
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
