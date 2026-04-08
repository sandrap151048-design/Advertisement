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
        const response = await fetch('/api/offers?featured=true');
        const data = await response.json();
        if (data.success && data.data) {
          setAvailableOffers([data.data]);
        }
      } catch (error) {
        console.error('Error fetching offers:', error);
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
        alert(errorData.error || 'Error submitting form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
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
      padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem)',
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            fontWeight: 900,
            marginBottom: '1rem',
            color: '#e61e25',
            letterSpacing: '-1px'
          }}>
            🎁 Exclusive Offer
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#ffffff',
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem auto',
            lineHeight: '1.6'
          }}>
            Scratch to reveal your special discount and exclusive deals
          </p>
        </motion.div>

        {/* Scratch Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            maxWidth: '320px',
            margin: '0 auto',
            perspective: '1000px'
          }}
        >
          {/* Card Content */}
          <motion.div
            style={{
              position: 'relative',
              background: 'linear-gradient(135deg, rgba(15, 15, 25, 0.95) 0%, rgba(25, 10, 20, 0.95) 100%)',
              border: '2px solid rgba(230, 30, 37, 0.5)',
              borderRadius: '24px',
              padding: '2rem',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
              zIndex: 2
            }}
          >
            {currentStep === 'scratch' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    style={{ fontSize: '2.5rem', marginBottom: '0.75rem', display: 'inline-block' }}
                  >
                    🎁
                  </motion.div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    color: '#ffffff',
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.5px'
                  }}>
                    Special Offer
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: '1.6'
                  }}>
                    Scratch to reveal your exclusive discount
                  </p>
                </div>

                {(() => {
                  if (availableOffers.length === 0) {
                    return (
                      <div style={{ textAlign: 'center', padding: '2rem', color: '#aaa' }}>
                        <p>No offers available at the moment</p>
                      </div>
                    );
                  }
                  const offer = availableOffers[0];
                  return <ScratchCard offer={offer} onComplete={handleScratchComplete} />;
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
        </motion.div>

        {/* Form - Below Card */}
        {currentStep !== 'scratch' && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              background: 'linear-gradient(135deg, rgba(15, 15, 25, 0.95) 0%, rgba(25, 10, 20, 0.95) 100%)',
              border: '2px solid rgba(230, 30, 37, 0.5)',
              borderRadius: '24px',
              padding: '2rem',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
              maxWidth: '320px',
              margin: '0 auto',
              marginTop: '2rem'
            }}
          >
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: 900,
              color: '#ffffff',
              marginBottom: '1.5rem',
              letterSpacing: '-0.5px',
              textAlign: 'center'
            }}>
              {currentStep === 'result' ? 'Your Offer' : 'Thank You!'}
            </h3>

            {/* Contact Form */}
            {currentStep === 'result' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  style={{
                    padding: '0.85rem',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(230, 30, 37, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(230, 30, 37, 0.8)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(230, 30, 37, 0.3)'}
                />
                <input
                  type="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  style={{
                    padding: '0.85rem',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(230, 30, 37, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(230, 30, 37, 0.8)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(230, 30, 37, 0.3)'}
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  style={{
                    padding: '0.85rem',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(230, 30, 37, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(230, 30, 37, 0.8)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(230, 30, 37, 0.3)'}
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                  style={{
                    padding: '0.85rem',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(230, 30, 37, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(230, 30, 37, 0.8)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(230, 30, 37, 0.3)'}
                />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '0.95rem',
                    background: 'linear-gradient(135deg, #e61e25 0%, #ff2d35 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 10px 30px rgba(230, 30, 37, 0.4)',
                    transition: 'all 0.3s ease',
                    marginTop: '1rem',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Contact Us'}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'transparent',
                    color: 'rgba(255, 255, 255, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    marginTop: '0.5rem'
                  }}
                >
                  Try Another Offer
                </motion.button>
              </div>
            )}
          </motion.div>
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
        }
      `}</style>
    </section>
  );
}
