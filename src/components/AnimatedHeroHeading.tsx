"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedHeroHeadingProps {
  onReveal: () => void;
  onTagClick: () => void;
}

export default function AnimatedHeroHeading({ onReveal, onTagClick }: AnimatedHeroHeadingProps) {
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
        ease: "easeInOut" as const
      }
    })
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
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

      {/* Floating Glowing Tag */}
      <motion.button
        animate={{
          y: [0, -15, 0],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Get Offer tag clicked');
          onTagClick();
        }}
        style={{
          position: 'absolute',
          top: '-20px',
          right: '-60px',
          background: 'linear-gradient(135deg, rgba(230, 30, 37, 0.9) 0%, rgba(255, 45, 53, 0.9) 100%)',
          border: '2px solid rgba(230, 30, 37, 0.6)',
          borderRadius: '50px',
          padding: '0.6rem 1.2rem',
          fontSize: '0.85rem',
          fontWeight: 700,
          color: 'white',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 20px rgba(230, 30, 37, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          zIndex: 10
        }}
      >
        <motion.span
          animate={{
            textShadow: [
              '0 0 10px rgba(230, 30, 37, 0.5)',
              '0 0 20px rgba(230, 30, 37, 0.8)',
              '0 0 10px rgba(230, 30, 37, 0.5)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          🎁 Get Offer
        </motion.span>
      </motion.button>
    </div>
  );
}
