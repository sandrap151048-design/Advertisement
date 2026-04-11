"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CampaignPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  // Check if popup was already shown in this session
  useEffect(() => {
    const popupShown = localStorage.getItem('campaignPopupShown');
    if (popupShown) {
      setHasShownPopup(true);
    }
  }, []);

  // Auto-show popup after 3 seconds (only once per session)
  useEffect(() => {
    if (!hasShownPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        setHasShownPopup(true);
        localStorage.setItem('campaignPopupShown', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hasShownPopup]);

  const handleBadgeClick = () => {
    setShowPopup(true);
    setHasShownPopup(true);
    localStorage.setItem('campaignPopupShown', 'true');
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      {/* Floating Campaign Badge */}
      {showBadge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            zIndex: 40,
          }}
        >
          <motion.button
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            onClick={handleBadgeClick}
            style={{
              padding: '12px 24px',
              background: '#000000',
              border: '2px solid #FF1E2D',
              borderRadius: '50px',
              color: 'white',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 0 20px rgba(255, 30, 45, 0.4)',
              transition: 'all 0.3s ease',
            }}
            whileHover={{
              boxShadow: '0 0 40px rgba(255, 30, 45, 0.8)',
              transform: 'scale(1.05)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>📢</span>
            <span>Campaign Offer</span>
          </motion.button>
        </motion.div>
      )}

      {/* Popup */}
      <AnimatePresence>
        {showPopup && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(8px)',
                zIndex: 9998,
              }}
            />

            {/* Popup Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999,
                width: '90%',
                maxWidth: '500px',
              }}
            >
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(11, 11, 11, 0.99) 0%, rgba(20, 10, 15, 0.99) 100%)',
                  border: '1px solid rgba(255, 30, 45, 0.3)',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 0 60px rgba(255, 30, 45, 0.2), 0 20px 60px rgba(0, 0, 0, 0.4)',
                  position: 'relative',
                }}
              >
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    background: 'transparent',
                    border: 'none',
                    color: '#FF1E2D',
                    fontSize: '1.8rem',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  ✕
                </button>

                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  style={{ textAlign: 'center', marginBottom: '2rem' }}
                >
                  <div
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: '#FF1E2D',
                      marginBottom: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '1.5px',
                    }}
                  >
                    📢 Launch Your Campaign
                  </div>
                  <h2
                    style={{
                      fontSize: 'clamp(1.8rem, 5vw, 2.2rem)',
                      fontWeight: 900,
                      color: '#ffffff',
                      margin: '0 0 0.5rem 0',
                      letterSpacing: '-0.5px',
                    }}
                  >
                    ⭐ Limited Time Offer
                  </h2>
                </motion.div>

                {/* Premium Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  style={{
                    background: 'rgba(255, 30, 45, 0.08)',
                    border: '1px solid rgba(255, 30, 45, 0.3)',
                    borderRadius: '14px',
                    padding: '1.5rem',
                    marginBottom: '1.8rem',
                    textAlign: 'center',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      margin: '0 0 0.5rem 0',
                    }}
                  >
                    Premium Package
                  </h3>
                  <p
                    style={{
                      fontSize: '0.95rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      margin: 0,
                      lineHeight: '1.5',
                    }}
                  >
                    Get exclusive access to premium features
                  </p>
                </motion.div>

                {/* Discount Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 30, 45, 0.15) 0%, rgba(255, 30, 45, 0.05) 100%)',
                    border: '2px solid rgba(255, 30, 45, 0.4)',
                    borderRadius: '14px',
                    padding: '1.8rem',
                    marginBottom: '2rem',
                    textAlign: 'center',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.6)',
                      margin: '0 0 0.8rem 0',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontWeight: 600,
                    }}
                  >
                    Your Exclusive Discount
                  </p>
                  <p
                    style={{
                      fontSize: '3rem',
                      fontWeight: 950,
                      background: 'linear-gradient(135deg, #FF1E2D 0%, #FF6B6B 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      margin: 0,
                      letterSpacing: '-1px',
                    }}
                  >
                    30% OFF
                  </p>
                </motion.div>

                {/* CTA Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 30, 45, 0.6)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClose}
                  style={{
                    width: '100%',
                    padding: '1.3rem',
                    background: 'linear-gradient(135deg, #FF1E2D 0%, #FF4444 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(255, 30, 45, 0.4)',
                    transition: 'all 0.3s ease',
                    marginBottom: '1rem',
                  }}
                >
                  🚀 Launch Now
                </motion.button>

                {/* Feature Icons Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '1rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {[
                    { icon: '✨', label: 'Premium Design' },
                    { icon: '⚡', label: 'Fast Delivery' },
                    { icon: '🎯', label: 'Expert Support' },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                      whileHover={{ y: -5 }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        padding: '1rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                        {feature.icon}
                      </div>
                      <p
                        style={{
                          fontSize: '0.8rem',
                          color: 'rgba(255, 255, 255, 0.7)',
                          margin: 0,
                          fontWeight: 600,
                        }}
                      >
                        {feature.label}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
