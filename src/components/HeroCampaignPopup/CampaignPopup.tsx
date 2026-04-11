'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  type: string;
  color: string;
  active: boolean;
  createdAt: string;
}

interface CampaignPopupProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function CampaignPopup({ isOpen: externalIsOpen, onOpenChange }: CampaignPopupProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  
  const setIsOpen = (value: boolean) => {
    if (externalIsOpen !== undefined) {
      onOpenChange?.(value);
    } else {
      setInternalIsOpen(value);
    }
  };

  const [step, setStep] = useState<'initial' | 'form' | 'success'>('initial');
  const [showMoreOffers, setShowMoreOffers] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch offers on mount
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch('/api/offers');
        if (res.ok) {
          const response = await res.json();
          // Handle the API response format: { success: true, data: [...] }
          const offersArray = response.data || response || [];
          const validOffers = Array.isArray(offersArray) ? offersArray : [];
          setOffers(validOffers);
          if (validOffers.length > 0) {
            setSelectedOffer(validOffers[0]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch offers:', error);
        setOffers([]);
      }
    };

    fetchOffers();
  }, []);

  // Auto-show popup after 3 seconds
  useEffect(() => {
    const hasShown = sessionStorage.getItem('campaignPopupShown');
    if (!hasShown && externalIsOpen === undefined) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('campaignPopupShown', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOffer) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/scratch-offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          companyName: formData.companyName,
          offer: selectedOffer.title,
          source: 'campaign_popup'
        })
      });

      if (res.ok) {
        setStep('success');
        setFormData({ fullName: '', email: '', phone: '', companyName: '' });
        setTimeout(() => {
          setIsOpen(false);
          setStep('initial');
          setShowMoreOffers(false);
          setSelectedOffer(offers[0] || null);
        }, 3000);
      }
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTryAnotherOffer = () => {
    setShowMoreOffers(!showMoreOffers);
  };

  const handleSelectOffer = (offer: Offer) => {
    setSelectedOffer(offer);
    setShowMoreOffers(false);
  };

  const handleLaunchNow = () => {
    setStep('form');
    setShowMoreOffers(false);
  };

  const renderOfferCards = () => {
    if (!Array.isArray(offers) || offers.length === 0) {
      return null;
    }
    
    return (
      <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1.5rem' }}>
        {offers.map((offer, index) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            onClick={() => handleSelectOffer(offer)}
            whileHover={{ scale: 1.02, y: -4 }}
            style={{
              background: '#1a1a1a',
              border: '2px solid #e61e25',
              borderRadius: '12px',
              padding: 'clamp(0.75rem, 2vw, 1rem)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <h4 style={{ color: 'white', fontSize: 'clamp(0.9rem, 2vw, 1rem)', fontWeight: 700, marginBottom: '0.25rem' }}>
                  {offer.title}
                </h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)' }}>
                  {offer.description}
                </p>
              </div>
              <div style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 900, color: '#e61e25', marginLeft: '1rem', whiteSpace: 'nowrap' }}>
                {offer.discount}
              </div>
            </div>
            {selectedOffer?.id === offer.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  background: '#e61e25',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}
              >
                ✓ Selected
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 40
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: 'clamp(1.5rem, 10vh, 3rem)',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 50,
              width: 'clamp(260px, 85vw, 420px)',
              maxHeight: '85vh',
              overflowY: 'auto'
            }}
          >
            {/* Glass Card Background */}
            <div
              style={{
                background: 'rgba(20, 20, 20, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: 'clamp(0.75rem, 3vw, 1.5rem)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
                position: 'relative',
                width: '100%',
                margin: '0 auto',
                boxSizing: 'border-box'
              }}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10
                }}
              >
                ✕
              </motion.button>

              {/* Initial Step */}
              {step === 'initial' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Badge */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      display: 'inline-block',
                      background: 'rgba(230, 30, 37, 0.2)',
                      border: '1px solid rgba(230, 30, 37, 0.5)',
                      color: '#e61e25',
                      padding: 'clamp(0.3rem, 1.5vw, 0.4rem) clamp(0.6rem, 2vw, 0.8rem)',
                      borderRadius: '50px',
                      fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                      textAlign: 'center',
                      width: '100%'
                    }}
                  >
                    📢 Campaign Offer ⭐ Limited Time
                  </motion.div>

                  {/* Offer Display */}
                  {selectedOffer && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        background: 'rgba(230, 30, 37, 0.1)',
                        border: '2px solid #e61e25',
                        borderRadius: '12px',
                        padding: 'clamp(0.75rem, 2vw, 1rem)',
                        marginBottom: '1rem',
                        textAlign: 'center'
                      }}
                    >
                      <h3 style={{ color: 'white', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', fontWeight: 700, marginBottom: '0.3rem' }}>
                        {selectedOffer.title}
                      </h3>
                      <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)', marginBottom: '0.75rem' }}>
                        {selectedOffer.description}
                      </p>
                      <div style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', fontWeight: 900, color: '#e61e25' }}>
                        {selectedOffer.discount}
                      </div>
                    </motion.div>
                  )}

                  {/* Buttons */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLaunchNow}
                    style={{
                      width: '100%',
                      padding: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                      background: '#e61e25',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      marginBottom: '0.5rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    💎 Claim Your Offer
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleTryAnotherOffer}
                    style={{
                      width: '100%',
                      padding: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                      background: 'transparent',
                      color: 'white',
                      border: '2px solid white',
                      borderRadius: '8px',
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    🔄 Try Another Offer
                  </motion.button>

                  {/* Offer Cards */}
                  <AnimatePresence>
                    {showMoreOffers && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{ marginTop: '1.5rem' }}
                      >
                        {renderOfferCards()}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Form Step */}
              {step === 'form' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: '100%' }}
                >
                  <h2 style={{ color: 'white', fontSize: 'clamp(1rem, 3vw, 1.3rem)', fontWeight: 700, marginBottom: '0.2rem', textAlign: 'center' }}>
                    Get Your Campaign Started
                  </h2>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)', marginBottom: '0.75rem', textAlign: 'center' }}>
                    Fill in your details to claim your offer
                  </p>

                  {/* Selected Offer Badge */}
                  {selectedOffer && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        background: 'rgba(230, 30, 37, 0.1)',
                        border: '1px solid rgba(230, 30, 37, 0.5)',
                        borderRadius: '8px',
                        padding: 'clamp(0.4rem, 1.5vw, 0.6rem)',
                        marginBottom: '0.6rem',
                        textAlign: 'center'
                      }}
                    >
                      <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 'clamp(0.65rem, 1.2vw, 0.75rem)', marginBottom: '0.15rem' }}>
                        Selected Offer
                      </p>
                      <p style={{ color: '#e61e25', fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', fontWeight: 700 }}>
                        {selectedOffer.title} - {selectedOffer.discount}
                      </p>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                    <div style={{ width: '100%' }}>
                      <label style={{ display: 'block', color: 'white', fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', fontWeight: 600, marginBottom: '0.3rem' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleFormChange}
                        required
                        style={{
                          width: '100%',
                          padding: 'clamp(0.4rem, 1vw, 0.6rem)',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '6px',
                          color: 'white',
                          fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)',
                          outline: 'none',
                          transition: 'all 0.3s ease',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#e61e25';
                          e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                          e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                        }}
                      />
                    </div>

                    <div style={{ width: '100%' }}>
                      <label style={{ display: 'block', color: 'white', fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', fontWeight: 600, marginBottom: '0.3rem' }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        style={{
                          width: '100%',
                          padding: 'clamp(0.4rem, 1vw, 0.6rem)',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '6px',
                          color: 'white',
                          fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)',
                          outline: 'none',
                          transition: 'all 0.3s ease',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#e61e25';
                          e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                          e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                        }}
                      />
                    </div>

                    <div style={{ width: '100%' }}>
                      <label style={{ display: 'block', color: 'white', fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', fontWeight: 600, marginBottom: '0.3rem' }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        required
                        style={{
                          width: '100%',
                          padding: 'clamp(0.4rem, 1vw, 0.6rem)',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '6px',
                          color: 'white',
                          fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)',
                          outline: 'none',
                          transition: 'all 0.3s ease',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#e61e25';
                          e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                          e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                        }}
                      />
                    </div>

                    <div style={{ width: '100%' }}>
                      <label style={{ display: 'block', color: 'white', fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)', fontWeight: 600, marginBottom: '0.3rem' }}>
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleFormChange}
                        style={{
                          width: '100%',
                          padding: 'clamp(0.4rem, 1vw, 0.6rem)',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '6px',
                          color: 'white',
                          fontSize: 'clamp(0.75rem, 1.2vw, 0.85rem)',
                          outline: 'none',
                          transition: 'all 0.3s ease',
                          boxSizing: 'border-box'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#e61e25';
                          e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                          e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                        }}
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        width: '100%',
                        padding: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                        background: isSubmitting ? 'rgba(230, 30, 37, 0.5)' : '#e61e25',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
                        fontWeight: 700,
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        marginTop: '0.25rem',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {isSubmitting ? '⏳ Processing...' : '💎 Claim Your Offer'}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleTryAnotherOffer}
                      style={{
                        width: '100%',
                        padding: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                        background: 'transparent',
                        color: 'white',
                        border: '2px solid white',
                        borderRadius: '8px',
                        fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      🔄 Try Another Offer
                    </motion.button>
                  </form>

                  {/* Offer Cards */}
                  <AnimatePresence>
                    {showMoreOffers && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{ marginTop: '1.5rem' }}
                      >
                        {renderOfferCards()}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Success Step */}
              {step === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  style={{ textAlign: 'center', padding: 'clamp(2rem, 5vw, 3rem) 1rem' }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
                    style={{ fontSize: 'clamp(3rem, 8vw, 4rem)', marginBottom: '1.5rem' }}
                  >
                    ✓
                  </motion.div>
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ color: '#e61e25', fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', fontWeight: 900, marginBottom: '0.75rem' }}
                  >
                    Thank You!
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', lineHeight: 1.6 }}
                  >
                    We will contact you soon
                  </motion.p>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', marginTop: '1rem' }}
                  >
                    Redirecting in a moment...
                  </motion.p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
