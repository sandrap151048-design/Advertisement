"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ScratchCard from './ScratchCard';

interface ScratchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScratchPopup({ isOpen, onClose }: ScratchPopupProps) {
  const [currentStep, setCurrentStep] = useState<'scratch' | 'result'>('scratch');
  const [selectedOffer, setSelectedOffer] = useState<any>(null);

  const handleScratchComplete = (offer: any) => {
    setSelectedOffer(offer);
    setCurrentStep('result');
  };

  const handleClose = () => {
    setCurrentStep('scratch');
    setSelectedOffer(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blur Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(8px)',
              zIndex: 9998
            }}
          />

          {/* Popup Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: '80px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              width: '85%',
              maxWidth: '500px',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
          >
            {/* Glow Effect */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(230, 30, 37, 0.3)',
                  '0 0 40px rgba(230, 30, 37, 0.5)',
                  '0 0 20px rgba(230, 30, 37, 0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '24px',
                pointerEvents: 'none'
              }}
            />

            {/* Card Content */}
            <motion.div
              style={{
                position: 'relative',
                background: 'linear-gradient(135deg, rgba(15, 15, 25, 0.95) 0%, rgba(25, 10, 20, 0.95) 100%)',
                border: '2px solid rgba(230, 30, 37, 0.5)',
                borderRadius: '24px',
                padding: '1.5rem',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Close Button */}
              <motion.button
                onClick={handleClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  background: 'rgba(230, 30, 37, 0.2)',
                  border: '1px solid rgba(230, 30, 37, 0.4)',
                  color: '#e61e25',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <X size={20} />
              </motion.button>

              {/* Content */}
              <AnimatePresence mode="wait">
                {currentStep === 'scratch' && (
                  <motion.div
                    key="scratch"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                      <motion.div
                        animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        style={{ fontSize: '2.5rem', marginBottom: '0.75rem', display: 'inline-block' }}
                      >
                        🎁
                      </motion.div>
                      <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: 900,
                        color: '#ffffff',
                        marginBottom: '0.5rem',
                        letterSpacing: '-0.5px'
                      }}>
                        Special Offer
                      </h2>
                      <p style={{
                        fontSize: '0.9rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        lineHeight: '1.6'
                      }}>
                        Scratch to reveal your exclusive discount
                      </p>
                    </div>

                    <ScratchCard onComplete={handleScratchComplete} />
                  </motion.div>
                )}

                {currentStep === 'result' && selectedOffer && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    style={{ textAlign: 'center' }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.8 }}
                      style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}
                    >
                      ✨
                    </motion.div>
                    <h3 style={{
                      fontSize: '1.6rem',
                      fontWeight: 900,
                      color: '#10b981',
                      marginBottom: '1.5rem',
                      letterSpacing: '-0.5px'
                    }}>
                      Congratulations!
                    </h3>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '2px solid rgba(230, 30, 37, 0.3)',
                      borderRadius: '16px',
                      padding: '1.5rem',
                      marginBottom: '1.5rem',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: selectedOffer.color,
                        marginBottom: '0.75rem',
                        textShadow: '0 4px 12px rgba(230, 30, 37, 0.3)'
                      }}>
                        {selectedOffer.discount}
                      </div>
                      <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: 'white',
                        marginBottom: '0.5rem'
                      }}>
                        {selectedOffer.title}
                      </h4>
                      <p style={{
                        fontSize: '0.9rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        lineHeight: '1.6'
                      }}>
                        {selectedOffer.description}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleClose}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'linear-gradient(135deg, #e61e25 0%, #ff2d35 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 10px 30px rgba(230, 30, 37, 0.4)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Contact Us
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
