'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const kravenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Background image: pop in from bottom to top
      tl.fromTo(
        bgImageRef.current,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.2, ease: 'power4.out' }
      );

      // Heading: fade in with slight slide up
      tl.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      );

      // KRAVEN text: fade up from bottom
      tl.fromTo(
        kravenRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.3'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="home"
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
          {/* Hero image - centered */}
          <div
            ref={bgImageRef}
            className="absolute inset-0 flex items-center justify-center z-[1]"
            style={{ opacity: 0 }}
          >
            <img
              src="/hero.png"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-transparent" />
          </div>
        </div>

        {/* Content - Centered */}
        <div className="relative z-10 text-center px-4 -mt-48">
          <h1
            ref={headingRef}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight"
            style={{
              opacity: 0,
              background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0.4) 75%, rgba(255,255,255,0) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Unlock the full Potential
            <br />
            Of your Crypto Journey
          </h1>
        </div>

        {/* KRAVEN text at bottom */}
        <div
          ref={kravenRef}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10"
          style={{ opacity: 0 }}
        >
          <span
            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-widest text-white/80"
            style={{ letterSpacing: '0.5em' }}
          >
            KRAVEN
          </span>
        </div>
      </section>
    </>
  );
};
