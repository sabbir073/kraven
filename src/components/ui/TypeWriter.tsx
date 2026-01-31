'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TypeWriterProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  showCursor?: boolean;
  loop?: boolean;
  loopDelay?: number;
  backspaceSpeed?: number;
  onComplete?: () => void;
}

export const TypeWriter = ({
  text,
  delay = 1.5,
  speed = 50,
  className = '',
  highlightWords = [],
  highlightClassName = 'text-cyan-400 font-semibold',
  showCursor = true,
  loop = true,
  loopDelay = 2000,
  backspaceSpeed = 30,
  onComplete,
}: TypeWriterProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const hasStarted = useRef(false);

  // Initial delay before starting
  useEffect(() => {
    const startDelay = setTimeout(() => {
      setIsTyping(true);
      hasStarted.current = true;
    }, delay * 1000);

    return () => clearTimeout(startDelay);
  }, [delay]);

  // Typing and deleting logic
  useEffect(() => {
    if (!hasStarted.current) return;

    // Typing phase
    if (isTyping && !isDeleting) {
      if (displayedText.length < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1));
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing
        setIsComplete(true);
        onComplete?.();

        if (loop) {
          // Wait, then start deleting
          const waitTimeout = setTimeout(() => {
            setIsDeleting(true);
            setIsComplete(false);
          }, loopDelay);
          return () => clearTimeout(waitTimeout);
        }
      }
    }

    // Deleting phase
    if (isDeleting) {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, backspaceSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished deleting, start typing again
        setIsDeleting(false);
      }
    }
  }, [displayedText, isTyping, isDeleting, text, speed, backspaceSpeed, loop, loopDelay, onComplete]);

  // Function to highlight specific words
  const renderText = () => {
    if (highlightWords.length === 0) {
      return displayedText;
    }

    const words = displayedText.split(' ');
    return words.map((word, index) => {
      const isHighlighted = highlightWords.some(
        (hw) => word.includes(hw) || hw.includes(word)
      );
      return (
        <span key={index}>
          {isHighlighted ? (
            <span className={highlightClassName}>{word}</span>
          ) : (
            word
          )}
          {index < words.length - 1 ? ' ' : ''}
        </span>
      );
    });
  };

  return (
    <span className={className}>
      {renderText()}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="inline-block ml-1 w-[3px] h-[1em] bg-cyan-400 align-middle"
          style={{ verticalAlign: 'middle' }}
        />
      )}
    </span>
  );
};
