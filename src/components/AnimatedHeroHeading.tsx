"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedHeroHeadingProps {
  onReveal: () => void;
}

export default function AnimatedHeroHeading({ onReveal }: AnimatedHeroHeadingProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const text = "ATTRACTIVE";
  const letters = text.split("");

  const handleClick = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      setTimeout(() => {
        onReveal();
      }, 600);
    }
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 1, x: 0, y: 0 },
    visible: (i: number) => ({
      opacity: 0,
      x: i < letters.length / 2 ? -100 : 100,
      y: Math.random() * 50 - 25,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    })
  };

  return (
    <motion.h1
      onClick={handleClick}
      style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        cursor: 'pointer',
        fontSize: 'clamp(2.5rem, 8vw, 6.5rem)',
        fontWeight: 950,
        lineHeight: 1.05,
        marginBottom: '1.5rem',
        letterSpacing: '-2px',
        wordBreak: 'break-word',
        textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 4px 40px rgba(0,0,0,0.7)',
        position: 'relative',
        display: 'inline-block',
        minHeight: '120px'
      }}
      whileHover={!isRevealed ? { scale: 1.02 } : {}}
      whileTap={!isRevealed ? { scale: 0.98 } : {}}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isRevealed ? "visible" : "hidden"}
        style={{
          display: 'flex',
          gap: '0.1em',
          justifyContent: 'center'
        }}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            style={{
              display: 'inline-block',
              color: i === 0 ? '#e61e25' : '#ffffff'
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </motion.h1>
  );
}
