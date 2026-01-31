'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface WaterTextProps {
  text: string;
  isLoaded: boolean;
}

export const WaterText = ({ text, isLoaded }: WaterTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add ripple effect on mouse move
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      container.style.setProperty('--mouse-x', `${x}%`);
      container.style.setProperty('--mouse-y', `${y}%`);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const letters = text.split('');

  return (
    <div ref={containerRef} className="water-text-container relative">
      {/* SVG Filters for water effect */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="water-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.02"
              numOctaves="3"
              result="noise"
              seed="1"
            >
              <animate
                attributeName="baseFrequency"
                values="0.01 0.02;0.02 0.04;0.01 0.02"
                dur="4s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Main text with water effect - HORIZONTAL */}
      <div className="relative flex flex-row items-center justify-center lg:justify-start">
        {letters.map((letter, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, rotateX: -90 }}
            animate={
              isLoaded
                ? {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                  }
                : {}
            }
            transition={{
              delay: 0.3 + i * 0.08,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="water-letter-wrapper inline-block"
          >
            <span
              className="water-letter text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-none tracking-tight"
              style={{
                animationDelay: `${i * 0.15}s`,
              }}
            >
              {letter}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Underwater light rays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-full w-1 bg-gradient-to-b from-cyan-400/20 via-purple-500/10 to-transparent"
            style={{
              left: `${15 + i * 18}%`,
              transformOrigin: 'top',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scaleY: [1, 1.2, 1],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Bubble effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-cyan-400/30 to-purple-500/20 backdrop-blur-sm"
            style={{
              width: 4 + Math.random() * 12,
              height: 4 + Math.random() * 12,
              left: `${Math.random() * 100}%`,
              bottom: -20,
            }}
            animate={{
              y: [0, -400 - Math.random() * 200],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .water-text-container {
          --mouse-x: 50%;
          --mouse-y: 50%;
        }

        .water-letter {
          display: inline-block;
          background: linear-gradient(
            180deg,
            #06b6d4 0%,
            #8b5cf6 30%,
            #3b82f6 60%,
            #06b6d4 100%
          );
          background-size: 100% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: waterFlow 3s ease-in-out infinite, waterWave 2s ease-in-out infinite;
          filter: url(#water-filter) url(#glow-filter);
          text-shadow:
            0 0 40px rgba(6, 182, 212, 0.5),
            0 0 80px rgba(139, 92, 246, 0.3),
            0 0 120px rgba(59, 130, 246, 0.2);
          position: relative;
        }

        .water-letter::before {
          content: attr(data-letter);
          position: absolute;
          top: 0;
          left: 0;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.4) 0%,
            transparent 50%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 2s ease-in-out infinite;
        }

        @keyframes waterFlow {
          0%, 100% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 0% 100%;
          }
        }

        @keyframes waterWave {
          0%, 100% {
            transform: translateY(0) scaleY(1);
          }
          25% {
            transform: translateY(-3px) scaleY(1.02);
          }
          50% {
            transform: translateY(0) scaleY(0.98);
          }
          75% {
            transform: translateY(3px) scaleY(1.01);
          }
        }

        @keyframes shimmer {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
        }

        .water-letter-wrapper {
          position: relative;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .water-letter-wrapper::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 20px;
          background: radial-gradient(
            ellipse at center,
            rgba(6, 182, 212, 0.3) 0%,
            transparent 70%
          );
          filter: blur(8px);
          animation: reflection 2s ease-in-out infinite;
        }

        @keyframes reflection {
          0%, 100% {
            opacity: 0.5;
            transform: translateX(-50%) scaleX(1);
          }
          50% {
            opacity: 0.8;
            transform: translateX(-50%) scaleX(1.2);
          }
        }
      `}</style>
    </div>
  );
};
