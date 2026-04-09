"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScratchCard from './ScratchCard';

export default function InlineScratchCardSection() {
  const [currentStep, setCurrentStep] = useState<'scratch' | 'result' | 'success'>('scratch');
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [availableOffers, setAvailableOffers] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch offers from admin
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('/api/offers');
        const data = await response.json();
        if (data.success && data.data && data.data.length > 0) {
          setAvailableOffers(data.data);
        } else {
          // Fallback to default offers if no offers
          setAvailableOffers([
            {
              id: '1',
              title: 'Premium Package',
              description: 'Get exclusive access to premium features',
              discount: '30% OFF',
              type: 'percentage',
              color: '#e61e25',
              active: true
            },
            {
              id: '2',
              title: 'Free Consultation',
              description: 'Worth $500 - Expert consultation session',
              discount: 'FREE',
              type: 'free',
              color: '#10b981',
              active: true
            },
            {
              id: '3',
              title: 'Special Discount',
              description: 'Limited time offer on all services',
              discount: '$200 OFF',
              type: 'fixed',
              color: '#3b82f6',
              active: true
            },
            {
              id: '4',
              title: 'VIP Access',
              description: 'Exclusive benefits and priority support',
              discount: '50% OFF',
              type: 'percentage',
              color: '#f59e0b',
              active: true
            },
            {
              id: '5',
              title: 'Bonus Package',
              description: 'Extra services included with your purchase',
              discount: '25% OFF',
              type: 'percentage',
              color: '#8b5cf6',
              active: true
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching offers:', error);
        // Fallback to default offers on error
        setAvailableOffers([
          {
            id: '1',
            title: 'Premium Package',
            description: 'Get exclusive access to premium features',
            discount: '30% OFF',
            type: 'percentage',
            color: '#e61e25',
            active: true
          },
          {
            id: '2',
            title: 'Free Consultation',
            description: 'Worth $500 - Expert consultation session',
            discount: 'FREE',
            type: 'free',
            color: '#10b981',
            active: true
          },
          {
            id: '3',
            title: 'Special Discount',
            description: 'Limited time offer on all services',
            discount: '$200 OFF',
            type: 'fixed',
            color: '#3b82f6',
            active: true
          },
          {
            id: '4',
            title: 'VIP Access',
            description: 'Exclusive benefits and priority support',
            discount: '50% OFF',
            type: 'percentage',
            color: '#f59e0b',
            active: true
          },
          {
            id: '5',
            title: 'Bonus Package',
            description: 'Extra services included with your purchase',
            discount: '25% OFF',
            type: 'percentage',
            color: '#8b5cf6',
            active: true
          }
        ]);
      }
    };
    fetchOffers();
  }, []);

  const handleScratchComplete = (offer: any) => {
    setSelectedOffer(offer);
    setCurrentStep('result');
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    if (!selectedOffer) {
      alert('Please scratch the card first to reveal an offer');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/scratch-offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          offer: selectedOffer,
          scratchedAt: new Date().toISOString(),
          source: 'homepage_inline_scratch'
        }),
      });

      if (response.ok) {
        setCurrentStep('success');
        setTimeout(() => {
          handleReset();
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        alert(errorData.error || 'Error submitting form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCurrentStep('scratch');
    setSelectedOffer(null);
    setFormData({ name: '', email: '', phone: '', companyName: '' });
  };

  return (
    <section style={{
      padding: 'clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem)',
      background: `linear-gradient(135deg, rgba(12, 12, 12, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%), url('/dubai-hero-building.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      textAlign: 'center',
      position: 'relative'
    }}>
      {/* Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, rgba(230, 30, 37, 0.08) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
            fontWeight: 900,
            color: '#ffffff',
            marginBottom: '2rem',
            textAlign: 'center',
            letterSpacing: '-0.5px'
          }}
        >
          🎁 Exclusive Offer
        </motion.h2>

        {/* Scratch Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            maxWidth: '480px',
            margin: '0 auto -3rem auto',
            perspective: '1000px',
            position: 'relative',
            zIndex: 10
          }}
        >
          {currentStep === 'scratch' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {(() => {
                  if (availableOffers.length === 0) return null;
                  const randomOffer = availableOffers[Math.floor(Math.random() * availableOffers.length)];
                  return <ScratchCard offer={randomOffer} onComplete={handleScratchComplete} />;
                })()}
              </motion.div>
            )}

            {currentStep === 'result' && selectedOffer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '2px solid rgba(230, 30, 37, 0.3)',
                  borderRadius: '16px',
                  padding: '1rem',
                  marginTop: '1.5rem',
                  marginBottom: '1rem',
                  backdropFilter: 'blur(10px)',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  color: selectedOffer.color,
                  marginBottom: '0.5rem',
                  textShadow: '0 4px 12px rgba(230, 30, 37, 0.3)'
                }}>
                  {selectedOffer.discount}
                </div>
                <h4 style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: '0.3rem'
                }}>
                  {selectedOffer.title}
                </h4>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: '1.4'
                }}>
                  {selectedOffer.description}
                </p>
              </motion.div>
            )}

            {currentStep === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                style={{
                  textAlign: 'center',
                  padding: '2rem 0'
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.8 }}
                  style={{ fontSize: '3rem', marginBottom: '1rem' }}
                >
                  ✨
                </motion.div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  color: '#10b981',
                  marginBottom: '0.5rem',
                  letterSpacing: '-0.5px'
                }}>
                  Thank You!
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  We will contact you soon
                </p>
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  justifyContent: 'center',
                  marginTop: '1rem'
                }}>
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#10b981'
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
        </motion.div>

        {/* Popup Modal */}
        {currentStep === 'result' && selectedOffer && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleReset}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(8px)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: '1rem',
                overflow: 'auto'
              }}
            />

            {/* Popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                position: 'fixed',
                top: '1rem',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, rgba(11, 11, 11, 0.95) 0%, rgba(20, 10, 15, 0.95) 100%)',
                border: '1px solid rgba(255, 42, 42, 0.3)',
                borderRadius: '16px',
                padding: 'clamp(1rem, 3vw, 1.5rem)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 25px 60px rgba(255, 42, 42, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                zIndex: 1001,
                width: 'min(calc(100vw - 1rem), 450px)',
                maxHeight: 'calc(100vh - 2rem)',
                overflowY: 'auto',
                overflowX: 'hidden',
                boxSizing: 'border-box'
              }}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  background: 'rgba(255, 42, 42, 0.15)',
                  border: '1px solid rgba(255, 42, 42, 0.3)',
                  color: '#FF2A2A',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
              >
                ✕
              </motion.button>

              {/* Offer Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ textAlign: 'center', marginBottom: '1.5rem' }}
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.6 }}
                  style={{
                    fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
                    fontWeight: 900,
                    color: '#FF2A2A',
                    marginBottom: '0.3rem',
                    textShadow: '0 0 20px rgba(255, 42, 42, 0.3)'
                  }}
                >
                  {selectedOffer.discount}
                </motion.div>
                <h2 style={{
                  fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginBottom: '0.3rem'
                }}>
                  {selectedOffer.title}
                </h2>
                <p style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: '1.6'
                }}>
                  {selectedOffer.description}
                </p>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
              >
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  style={{
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 42, 42, 0.2)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(255, 42, 42, 0.6)';
                    e.target.style.boxShadow = '0 0 12px rgba(255, 42, 42, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 42, 42, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <input
                  type="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  style={{
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 42, 42, 0.2)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(255, 42, 42, 0.6)';
                    e.target.style.boxShadow = '0 0 12px rgba(255, 42, 42, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 42, 42, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  style={{
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 42, 42, 0.2)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(255, 42, 42, 0.6)';
                    e.target.style.boxShadow = '0 0 12px rgba(255, 42, 42, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 42, 42, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                  style={{
                    padding: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 42, 42, 0.2)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(255, 42, 42, 0.6)';
                    e.target.style.boxShadow = '0 0 12px rgba(255, 42, 42, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 42, 42, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255, 42, 42, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    background: 'linear-gradient(135deg, #FF2A2A 0%, #FF4444 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 800,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 8px 24px rgba(255, 42, 42, 0.3)',
                    transition: 'all 0.3s ease',
                    marginTop: '0.5rem',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Contact Us'}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReset}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'transparent',
                    color: 'rgba(255, 255, 255, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Try Another Offer
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        )}

        {/* Success Modal */}
        {currentStep === 'success' && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(8px)',
                zIndex: 1000
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'linear-gradient(135deg, rgba(11, 11, 11, 0.95) 0%, rgba(20, 10, 15, 0.95) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '16px',
                padding: '3rem 2.5rem',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 25px 60px rgba(16, 185, 129, 0.15)',
                zIndex: 1001,
                textAlign: 'center'
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.8 }}
                style={{ fontSize: '3rem', marginBottom: '1rem' }}
              >
                ✨
              </motion.div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 900,
                color: '#10b981',
                marginBottom: '0.5rem'
              }}>
                Thank You!
              </h3>
              <p style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.8)'
              }}>
                We will contact you soon
              </p>
            </motion.div>
          </>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="maxWidth"] {
            max-width: 100% !important;
            padding: 0 1rem !important;
          }
        }
        
        @media (max-width: 480px) {
          div[style*="maxWidth"] {
            max-width: 100% !important;
            padding: 0 0.75rem !important;
          }
          
          /* Mobile popup fixes - ensure centering */
          div[style*="position: fixed"][style*="left: 50%"] {
            left: 50% !important;
            right: auto !important;
            transform: translateX(-50%) !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
