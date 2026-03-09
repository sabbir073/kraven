'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useGsapAnimations } from '@/hooks/useGsapAnimations';
import { Navigation } from '@/components/ui/Navigation';
import { Hero } from '@/components/sections/Hero';
import { Ecosystem } from '@/components/sections/Ecosystem';
import { Campaigns } from '@/components/sections/Campaigns';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';

import { Team } from '@/components/sections/Team';
import { About } from '@/components/sections/About';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';

const CustomCursor = dynamic(
  () => import('@/components/ui/CustomCursor').then((mod) => mod.CustomCursor),
  { ssr: false }
);

export default function Home() {
  useSmoothScroll();
  useGsapAnimations();

  useEffect(() => {
    // Disable default cursor on load
    document.body.style.cursor = 'none';

    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Navigation />

      <main className="relative z-10">
        <Hero />
        <Ecosystem />
        <Campaigns />
        <Services />
        <Process />
        <Team />
        <About />
        <FAQ />
        <Contact />
      </main>
    </>
  );
}
