'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGsapAnimations = () => {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // Wait for DOM to be ready
    const ctx = gsap.context(() => {
      // --- Section titles: pop up from bottom ---
      gsap.utils.toArray<HTMLElement>('.gsap-title').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // --- Section subtitles: fade in with slight slide ---
      gsap.utils.toArray<HTMLElement>('.gsap-subtitle').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // --- Badge pills: scale in ---
      gsap.utils.toArray<HTMLElement>('.gsap-badge').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // --- Cards: slide in from sides ---
      gsap.utils.toArray<HTMLElement>('.gsap-card-left').forEach((el) => {
        gsap.fromTo(
          el,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.gsap-card-right').forEach((el) => {
        gsap.fromTo(
          el,
          { x: 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // --- Fade up elements ---
      gsap.utils.toArray<HTMLElement>('.gsap-fade-up').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // --- Pop in elements (scale bounce) ---
      gsap.utils.toArray<HTMLElement>('.gsap-pop-in').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // --- Stagger children ---
      gsap.utils.toArray<HTMLElement>('.gsap-stagger-parent').forEach((parent) => {
        const children = parent.querySelectorAll('.gsap-stagger-child');
        gsap.fromTo(
          children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: parent,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // --- Ecosystem subtitle: grow from bottom to top (clip reveal) ---
      gsap.utils.toArray<HTMLElement>('.ecosystem-subtitle').forEach((el) => {
        gsap.fromTo(
          el,
          {
            y: 50,
            opacity: 0,
            clipPath: 'inset(100% 0% 0% 0%)',
          },
          {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // --- Section dividers: width expand ---
      gsap.utils.toArray<HTMLElement>('.gsap-line-expand').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);
};
