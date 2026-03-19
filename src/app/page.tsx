"use client";

import React, { useState, FormEvent, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ShieldCheck, Target, Clock, Car, Store, Briefcase, Building2, Mail, Phone, MapPin, Sparkles, Monitor, Palette, Settings, Wrench, Search, Star, Users, Globe, Award, Headphones, TrendingUp, BarChart3, Zap, Heart, Camera, Megaphone } from 'lucide-react';
import Link from 'next/link';
import './black-cards.css';

// Animation Variants - Optimized for performance
const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const slideDown: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (res.ok) {
        setSubmitStatus({ success: true, message: data.message });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus({ success: false, message: data.error || 'Something went wrong.' });
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: 'Failed to connect to the server.' });
    }
    
    setIsSubmitting(false);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
            }
          }
          
          .service-card-black {
            background: #000000 !important;
            border: 1px solid rgba(255,255,255,0.2) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
          }
          .service-card-black h3 {
            color: #ffffff !important;
          }
          .service-card-black p {
            color: #cccccc !important;
          }
          .service-card-black li {
            color: #ffffff !important;
          }
        `
      }} />
      {/* Hero Section - Full Width with Background Image */}
      <section style={{
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        height: 'clamp(500px, 90vh, 800px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        marginTop: '-5rem',
        paddingTop: '5rem',
        paddingLeft: 'clamp(2rem, 8vw, 6rem)'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0
        }}>
          <img 
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&q=80" 
            alt="Digital Advertising Background" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.6) contrast(1.1)'
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.5) 60%)'
          }} />
        </div>

        {/* Content - Left Side */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer} 
          style={{
            maxWidth: '600px',
            zIndex: 10,
            position: 'relative',
            textAlign: 'left',
            padding: '2rem'
          }}
        >
          <motion.h1 
            variants={slideDown} 
            style={{
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: 900,
              color: 'white',
              marginBottom: '1.5rem',
              lineHeight: '1.1',
              letterSpacing: '-1px',
              textShadow: '0 4px 20px rgba(0,0,0,0.4)',
              background: 'linear-gradient(90deg, var(--color-primary) 0%, white 60%, white 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Attractive
          </motion.h1>

          <motion.p 
            variants={fadeInDown} 
            style={{
              color: 'rgba(255,255,255,0.95)',
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              maxWidth: '500px',
              marginBottom: '2rem',
              lineHeight: '1.8',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}
          >
            We create high-impact advertising that makes your brand visible, memorable, and impossible to ignore.
          </motion.p>

          <motion.div 
            variants={slideDown} 
            style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              width: '100%'
            }}
          >
            <Link 
              href="/contact" 
              className="btn btn-primary" 
              style={{
                padding: '1rem 2.5rem',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(124, 58, 237, 0.3)'
              }}
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* We Build Section */}
      <section style={{
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        background: '#f5f5f5',
        padding: 'clamp(4rem, 10vw, 8rem) clamp(2rem, 8vw, 6rem)',
        textAlign: 'center'
      }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            marginBottom: '4rem'
          }}
        >
          <motion.h2
            variants={slideDown}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 900,
              color: '#1a1a1f',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}
          >
            We build
          </motion.h2>
          <motion.h3
            variants={fadeInDown}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#1a1a1f',
              marginBottom: '2rem',
              lineHeight: '1.3'
            }}
          >
            unmissable brand presence
          </motion.h3>
          <motion.p
            variants={fadeInDown}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.1rem)',
              color: '#333333',
              maxWidth: '700px',
              margin: '0 auto 2.5rem',
              lineHeight: '1.8',
              fontWeight: 500
            }}
          >
            We provide signage, branding, and advertising solutions designed to make your business stand out and attract attention.
          </motion.p>
          <motion.div
            variants={slideDown}
          >
            <Link
              href="/services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2rem',
                background: '#1a3a52',
                color: 'white',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '1.05rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(26, 58, 82, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#0f2438';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(26, 58, 82, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#1a3a52';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(26, 58, 82, 0.3)';
              }}
            >
              Explore Services
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Image Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(1.5rem, 4vw, 2.5rem)',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            {
              title: 'Retail Signage',
              subtitle: 'Elevate your storefront presence',
              image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=500&q=80'
            },
            {
              title: 'Billboard Mockup',
              subtitle: 'Maximum visibility, urban placement',
              image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500&q=80'
            },
            {
              title: 'Vehicle Branding',
              subtitle: 'Mobile advertising solutions',
              image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&q=80'
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInDown}
              whileHover={{ y: -10 }}
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                height: '320px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '2rem',
                color: 'white'
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  opacity: 0.9
                }}>
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* For Brands & Prime Locations Section */}
      <section style={{
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        background: '#ffffff',
        padding: 'clamp(4rem, 10vw, 8rem) clamp(2rem, 8vw, 6rem)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {/* For Brands Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(2rem, 6vw, 4rem)',
            alignItems: 'center',
            marginBottom: 'clamp(4rem, 8vw, 6rem)'
          }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={slideDown}
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  fontWeight: 900,
                  color: '#1a1a1f',
                  marginBottom: '1.5rem',
                  lineHeight: '1.2'
                }}
              >
                For Brands
              </motion.h2>
              <motion.p
                variants={fadeInDown}
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  color: '#333333',
                  lineHeight: '1.8',
                  marginBottom: '2rem'
                }}
              >
                Outdoor advertising made simple for modern brands. Reach the right audience with high-impact placements across cities.
              </motion.p>
            </motion.div>

            {/* Service List */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              {[
                'Retail Signage',
                'Billboards',
                'Vehicle Branding',
                'Campaign Solutions'
              ].map((service, i) => (
                <motion.div
                  key={i}
                  variants={fadeInDown}
                  whileHover={{ x: 10 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.5rem 2rem',
                    background: '#f5f5f5',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '1px solid #e5e5e5'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#efefef';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f5f5f5';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <span style={{
                    fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                    fontWeight: 600,
                    color: '#1a1a1f'
                  }}>
                    {service}
                  </span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1f" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Prime Locations Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(2rem, 6vw, 4rem)',
            alignItems: 'center'
          }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={slideDown}
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  fontWeight: 900,
                  color: '#1a1a1f',
                  marginBottom: '1.5rem',
                  lineHeight: '1.2'
                }}
              >
                Prime Locations
              </motion.h2>
              <motion.p
                variants={fadeInDown}
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  color: '#333333',
                  lineHeight: '1.8'
                }}
              >
                Strategically placed across high-traffic urban areas to maximize visibility and impact for your brand.
              </motion.p>
            </motion.div>

            {/* Location Image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInDown}
              whileHover={{ scale: 1.02 }}
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                height: '400px',
                boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80"
                alt="Sheikh Zayed Road - Mega Billboard"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '2rem',
                color: 'white'
              }}>
                <h3 style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 900,
                  marginBottom: '0.5rem'
                }}>
                  SHEIKH ZAYED RD
                </h3>
                <p style={{
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  fontWeight: 600,
                  color: '#ff6b6b',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Mega Billboard
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '4rem' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.div variants={fadeInDown} style={{ marginBottom: '2rem' }}>
              <span style={{
                display: 'inline-block',
                padding: '0.6rem 1.2rem',
                background: 'rgba(124, 58, 237, 0.15)',
                border: '1px solid rgba(124, 58, 237, 0.4)',
                borderRadius: '50px',
                color: 'var(--color-primary)',
                fontSize: '0.9rem',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: '1.5rem'
              }}>
                About Us
              </span>
            </motion.div>
            <motion.h2 variants={slideDown} style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              color: 'var(--color-text-main)',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>
              We Build <span style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Unmissable Brand Presence</span>
            </motion.h2>
            <motion.p variants={fadeInDown} style={{
              color: 'var(--color-text-muted)',
              fontSize: '1.1rem',
              lineHeight: '1.8',
              marginBottom: '2rem'
            }}>
              With over a decade of excellence in the UAE market, One Click Advertisement has transformed from a traditional signage company into a cutting-edge digital advertising powerhouse. We combine AI-driven insights with premium craftsmanship to deliver advertising solutions that don't just capture attention—they create lasting impressions.
            </motion.p>
            <motion.div variants={slideDown} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/about" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontWeight: 700 }}>Learn More</Link>
              <Link href="/services" className="btn btn-outline" style={{ padding: '1rem 2.5rem', fontWeight: 700 }}>Our Services</Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInDown}
            style={{
              position: 'relative',
              height: '400px',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(124, 58, 237, 0.2)'
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
              alt="Team collaboration"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(1.1) contrast(1.1)'
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), transparent)'
            }} />
          </motion.div>
        </div>
      </section>

      {/* We Reach Across Cities Section */}
      <section style={{
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        background: 'linear-gradient(135deg, #1a1a1f 0%, #2a2a3f 100%)',
        padding: 'clamp(4rem, 10vw, 8rem) clamp(2rem, 8vw, 6rem)',
        overflow: 'hidden'
      }}>
        {/* Background Image Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.15,
          backgroundImage: 'url(https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }} />

        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(2rem, 6vw, 4rem)',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Left Side - Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInDown}
            whileHover={{ scale: 1.02 }}
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              height: '450px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80"
              alt="Urban advertising campaign"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(255, 165, 0, 0.3), rgba(0, 0, 0, 0.5))'
            }} />
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <motion.h2
              variants={slideDown}
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 900,
                color: '#ffffff',
                marginBottom: '0.5rem',
                lineHeight: '1.2'
              }}
            >
              We reach
            </motion.h2>
            <motion.h3
              variants={fadeInDown}
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#ffffff',
                marginBottom: '2rem',
                lineHeight: '1.3',
                opacity: 0.9
              }}
            >
              across cities
            </motion.h3>

            <motion.p
              variants={fadeInDown}
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                color: '#cccccc',
                lineHeight: '1.8',
                marginBottom: '2.5rem',
                maxWidth: '500px'
              }}
            >
              Our campaigns connect brands with real audiences across high-traffic urban spaces – from streets to storefronts and beyond.
            </motion.p>

            <motion.div
              variants={slideDown}
            >
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 2rem',
                  background: '#ffffff',
                  color: '#1a1a1f',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(255, 255, 255, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f0f0f0';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.2)';
                }}
              >
                Start your campaign
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="section container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <motion.h2 variants={slideDown} style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            color: 'var(--color-text-main)',
            marginBottom: '1rem'
          }}>
            Our Core <span style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Services</span>
          </motion.h2>
          <motion.p variants={fadeInDown} style={{
            color: 'var(--color-text-muted)',
            maxWidth: '700px',
            margin: '1rem auto 0',
            fontSize: '1.1rem',
            lineHeight: '1.7'
          }}>
            From concept to completion, we deliver comprehensive advertising solutions that drive results
          </motion.p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          gap: 'clamp(1.5rem, 4vw, 2rem)'
        }}>
          {[
            {
              title: "Branding & Corporate Identity",
              desc: "Complete brand implementation and rollout across all touchpoints.",
              features: ["Brand implementation & rollout", "Corporate identity applications", "Office branding & interior graphics", "Brand consistency across locations"],
              icon: <Briefcase size={48} />,
              color: "#7C3AED"
            },
            {
              title: "Digital Printed Graphics",
              desc: "Large format premium printing for every surface.",
              features: ["Large format digital printing", "Wall, glass & window graphics", "Frosted film & privacy films", "Floor & promotional graphics"],
              icon: <Monitor size={48} />,
              color: "#22D3EE"
            },
            {
              title: "Vehicle Graphics & Fleet Branding",
              desc: "Turn every vehicle into a moving advertisement.",
              features: ["Full & partial vehicle wraps", "Corporate fleet branding", "Reflective & safety graphics", "Promotional vehicle advertising"],
              icon: <Car size={48} />,
              color: "#FACC15"
            },
            {
              title: "Signage Production",
              desc: "Premium indoor and outdoor signage solutions.",
              features: ["Indoor & outdoor signage", "Illuminated & non-illuminated signboards", "3D letter signs", "Directional, wayfinding & safety signs"],
              icon: <MapPin size={48} />,
              color: "#EC4899"
            },
            {
              title: "Exhibition & POS Solutions",
              desc: "Impactful exhibition displays and in-store materials.",
              features: ["Exhibition stands & kiosks", "Pop-up systems & backdrops", "Roll-up & X-banners", "POS & in-store displays"],
              icon: <Camera size={48} />,
              color: "#10B981"
            },
            {
              title: "Cladding & Facade Solutions",
              desc: "Architectural cladding and facade branding solutions.",
              features: ["ACP cladding works", "Aluminum & composite panel cladding", "Shopfront & facade branding", "Signage-integrated facade solutions"],
              icon: <Building2 size={48} />,
              color: "#F97316"
            }
          ].map((service, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInDown}
              whileHover={{ y: -10, boxShadow: `0 20px 50px ${service.color}30` }}
              style={{
                padding: 'clamp(2rem, 5vw, 2.5rem)',
                textAlign: 'left',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                border: `1px solid ${service.color}30`,
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                color: '#ffffff',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
            >
              {/* Gradient Background */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: `radial-gradient(circle, ${service.color}20, transparent)`,
                borderRadius: '50%',
                zIndex: 0
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  fontSize: 'clamp(2.5rem, 6vw, 3rem)',
                  marginBottom: '1.5rem',
                  color: service.color,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {service.icon}
                </div>
                <h3 style={{
                  color: '#ffffff',
                  fontSize: 'clamp(1.2rem, 3vw, 1.4rem)',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  textShadow: 'none'
                }}>
                  {service.title}
                </h3>
                <p style={{
                  color: '#cccccc',
                  marginBottom: '1.5rem',
                  lineHeight: '1.6',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
                }}>
                  {service.desc}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {service.features.map((feature, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      marginBottom: '0.75rem',
                      color: '#ffffff',
                      fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                      lineHeight: '1.5'
                    }}>
                      <Zap size={16} color={service.color} style={{ marginTop: '2px', flexShrink: 0 }} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* One Click Advantage Section */}
      <section className="section container">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={staggerContainer}
          className="glass-card" 
          style={{ 
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(34, 211, 238, 0.1))',
            padding: '4rem',
            textAlign: 'center'
          }}
        >
          <motion.h2 variants={slideDown} style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-text-main)', marginBottom: '1rem' }}>
            The <span className="text-gradient">One Click</span> Advantage
          </motion.h2>
          <motion.p variants={fadeInDown} style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: '1.7' }}>
            Experience the power of seamless advertising solutions with our signature one-click approach to brand transformation
          </motion.p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {[
              { 
                title: "One Click Setup", 
                desc: "Streamlined project initiation from concept to execution", 
                icon: <Zap size={32} />,
                highlight: "Setup"
              },
              { 
                title: "One Click Design", 
                desc: "AI-powered design solutions tailored to your brand", 
                icon: <Palette size={32} />,
                highlight: "Design"
              },
              { 
                title: "One Click Production", 
                desc: "Advanced manufacturing with quality guaranteed", 
                icon: <Settings size={32} />,
                highlight: "Production"
              },
              { 
                title: "One Click Installation", 
                desc: "Professional installation across all UAE emirates", 
                icon: <Wrench size={32} />,
                highlight: "Installation"
              },
              { 
                title: "One Click Support", 
                desc: "24/7 maintenance and technical assistance", 
                icon: <Headphones size={32} />,
                highlight: "Support"
              },
              { 
                title: "One Click Analytics", 
                desc: "Real-time performance tracking and optimization", 
                icon: <BarChart3 size={32} />,
                highlight: "Analytics"
              }
            ].map((advantage, i) => (
              <motion.div key={i} variants={fadeInDown} style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-secondary)', display: 'flex', justifyContent: 'center' }}>{advantage.icon}</div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
                  One Click <span style={{ color: 'var(--color-primary)' }}>{advantage.highlight}</span>
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>{advantage.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div variants={slideDown} style={{ marginTop: '3rem' }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
              Ready to experience the One Click difference?
            </p>
            <Link href="/services" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Discover Our Solutions
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container" style={{ position: 'relative', marginTop: '4rem', zIndex: 20 }}>
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={staggerContainer}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}
        >
          {[
            { 
              title: "Premium Quality", 
              desc: "High-grade materials built to last",
              img: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&q=80",
              gradient: "linear-gradient(135deg, rgba(124, 58, 237, 0.85), rgba(34, 211, 238, 0.85))",
              icon: <ShieldCheck size={48} />
            },
            { 
              title: "Expert Team", 
              desc: "Skilled professionals with years of experience",
              img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
              gradient: "linear-gradient(135deg, rgba(124, 58, 237, 0.85), rgba(250, 204, 21, 0.85))",
              icon: <Target size={48} />
            },
            { 
              title: "Fast Turnaround", 
              desc: "Quick delivery without compromising quality",
              img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80",
              gradient: "linear-gradient(135deg, rgba(34, 211, 238, 0.85), rgba(124, 58, 237, 0.85))",
              icon: <Clock size={48} />
            },
            { 
              title: "Full Support", 
              desc: "Dedicated assistance from start to finish",
              img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80",
              gradient: "linear-gradient(135deg, rgba(250, 204, 21, 0.85), rgba(34, 211, 238, 0.85))",
              icon: <Sparkles size={48} />
            }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              variants={fadeInDown}
              whileHover={{ y: -8, scale: 1.02 }}
              style={{ 
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                height: '220px',
                boxShadow: '0 10px 30px rgba(124, 58, 237, 0.25)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <img 
                src={item.img} 
                alt={item.title}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  position: 'absolute',
                  inset: 0
                }} 
              />
              <div style={{ 
                position: 'absolute',
                inset: 0,
                background: item.gradient,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2rem'
              }}>
                <div style={{ 
                  marginBottom: '1rem',
                  color: 'white',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))'
                }}>
                  {item.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 800, 
                  color: 'white',
                  marginBottom: '0.5rem',
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}>
                  {item.title}
                </h3>
                <p style={{ 
                  color: 'white', 
                  fontSize: '0.9rem', 
                  lineHeight: '1.4',
                  fontWeight: 500,
                  textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  opacity: 0.95
                }}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Our Process Section */}
      <section className="section container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="section-title">Our Proven <span className="text-gradient">Process</span></h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '700px', margin: '1rem auto 0', fontSize: '1.1rem' }}>
            From initial consultation to final installation, we ensure every step exceeds expectations
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {[
            {
              step: "01",
              title: "Discovery & Consultation",
              desc: "We understand your brand, objectives, and target audience to create the perfect strategy",
              icon: <Search size={40} />
            },
            {
              step: "02", 
              title: "Design & Concept",
              desc: "Our creative team develops stunning visuals and concepts tailored to your brand identity",
              icon: <Palette size={40} />
            },
            {
              step: "03",
              title: "Production & Quality Control",
              desc: "State-of-the-art manufacturing with rigorous quality checks at every stage",
              icon: <Settings size={40} />
            },
            {
              step: "04",
              title: "Installation & Support",
              desc: "Professional installation and ongoing support to ensure optimal performance",
              icon: <Wrench size={40} />
            }
          ].map((process, i) => (
            <motion.div 
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInDown}
              style={{ 
                position: 'relative',
                padding: '2rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                textAlign: 'center'
              }}
            >
              <div style={{ 
                position: 'absolute',
                top: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 800,
                fontSize: '0.9rem'
              }}>
                {process.step}
              </div>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem', marginTop: '1rem', color: 'var(--color-secondary)', display: 'flex', justifyContent: 'center' }}>{process.icon}</div>
              <h3 style={{ color: 'var(--color-text-main)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
                {process.title}
              </h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                {process.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="section container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="section-title">Success <span className="text-gradient">Stories</span></h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '700px', margin: '1rem auto 0', fontSize: '1.1rem' }}>
            Real results from real projects across the UAE - transforming brands one advertisement at a time
          </p>
        </div>
        <div className="success-stories-grid">
          {[
            {
              project: "Dubai Mall Digital Transformation",
              client: "Major Shopping Destination",
              result: "300% increase in foot traffic to featured stores",
              description: "Complete digital signage overhaul with AI-powered content management system across 200+ displays throughout the mall.",
              metrics: ["200+ Digital Displays", "300% Traffic Increase", "50% Engagement Boost", "24/7 Content Updates"],
              icon: <Store size={48} />,
              image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
              color: "#7C3AED"
            },
            {
              project: "Corporate Fleet Rebranding",
              client: "Leading Logistics Company",
              result: "85% brand recognition improvement",
              description: "Complete vehicle graphics transformation for 500+ fleet vehicles across all seven emirates with GPS tracking integration.",
              metrics: ["500+ Vehicles Branded", "85% Recognition Boost", "7 Emirates Coverage", "Real-time Tracking"],
              icon: <Car size={48} />,
              image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80",
              color: "#22D3EE"
            },
            {
              project: "Luxury Tower Facade Branding",
              client: "Premium Real Estate Developer",
              result: "40% faster unit sales completion",
              description: "Architectural LED integration and premium facade cladding for luxury residential towers in Dubai Marina and Downtown.",
              metrics: ["3 Luxury Towers", "40% Faster Sales", "LED Integration", "Premium Materials"],
              icon: <Building2 size={48} />,
              image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
              color: "#FACC15"
            }
          ].map((story, i) => (
            <motion.div 
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInDown}
              className="service-card-black success-story-card"
              style={{ 
                padding: '0',
                position: 'relative',
                background: '#000000',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                overflow: 'hidden'
              }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)' }}
            >
              {/* Image Header */}
              <div style={{ 
                position: 'relative', 
                height: 'clamp(120px, 15vw, 140px)', 
                overflow: 'hidden' 
              }}>
                <img 
                  src={story.image} 
                  alt={story.project}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: 'brightness(0.7)'
                  }} 
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(135deg, ${story.color}80, transparent)`
                }} />
                <div style={{
                  position: 'absolute',
                  top: 'clamp(0.5rem, 2vw, 0.75rem)',
                  right: 'clamp(0.5rem, 2vw, 0.75rem)',
                  width: 'clamp(35px, 8vw, 45px)',
                  height: 'clamp(35px, 8vw, 45px)',
                  borderRadius: 'clamp(8px, 2vw, 10px)',
                  background: story.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)'
                }}>
                  <div style={{ transform: 'scale(clamp(0.6, 1.5vw, 0.7))' }}>{story.icon}</div>
                </div>
              </div>

              {/* Content */}
              <div className="success-story-content">
                <div className="success-story-main">
                  <div style={{ marginBottom: 'clamp(0.75rem, 2vw, 1rem)' }}>
                    <h3 style={{ 
                      color: '#ffffff', 
                      fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', 
                      fontWeight: 700, 
                      marginBottom: 'clamp(0.3rem, 1vw, 0.4rem)', 
                      lineHeight: '1.3' 
                    }}>
                      {story.project}
                    </h3>
                    <p style={{ 
                      color: story.color, 
                      fontSize: 'clamp(0.75rem, 2vw, 0.8rem)', 
                      fontWeight: 600, 
                      marginBottom: 'clamp(0.6rem, 1.5vw, 0.8rem)' 
                    }}>
                      {story.client}
                    </p>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 'clamp(0.3rem, 1vw, 0.4rem)',
                      background: `${story.color}20`,
                      padding: 'clamp(0.25rem, 1vw, 0.3rem) clamp(0.6rem, 2vw, 0.8rem)',
                      borderRadius: '16px',
                      border: `1px solid ${story.color}40`
                    }}>
                      <TrendingUp size={12} color={story.color} />
                      <span style={{ 
                        color: story.color, 
                        fontSize: 'clamp(0.7rem, 1.8vw, 0.75rem)', 
                        fontWeight: 600 
                      }}>
                        {story.result}
                      </span>
                    </div>
                  </div>
                  
                  <p style={{ 
                    color: '#cccccc', 
                    lineHeight: '1.5',
                    fontSize: 'clamp(0.8rem, 2vw, 0.85rem)',
                    marginBottom: 'clamp(1rem, 2.5vw, 1.2rem)'
                  }}>
                    {story.description}
                  </p>
                </div>
                
                <div className="success-story-metrics">
                  {story.metrics.map((metric, idx) => (
                    <div key={idx} className="success-story-metric">
                      <div style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: story.color,
                        flexShrink: 0
                      }} />
                      <span style={{ 
                        color: '#ffffff',
                        fontSize: 'clamp(0.7rem, 1.8vw, 0.75rem)',
                        fontWeight: 500,
                        lineHeight: '1.2'
                      }}>
                        {metric}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div style={{ 
          textAlign: 'center', 
          marginTop: '3rem',
          padding: '0 1rem'
        }}>
          <div className="success-stories-buttons" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            alignItems: 'center',
            maxWidth: '400px',
            margin: '0 auto',
            width: '100%'
          }}>
            <Link href="/testimonials" className="btn btn-primary" style={{ 
              padding: '1.2rem 3rem',
              width: '100%',
              maxWidth: '300px',
              textAlign: 'center',
              fontSize: '1.1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              View More Stories
            </Link>
            <Link href="/contact" className="btn btn-outline" style={{ 
              padding: '1.2rem 3rem',
              width: '100%',
              maxWidth: '300px',
              textAlign: 'center',
              fontSize: '1.1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              Start Your Project
            </Link>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="section container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="section-title">Industries We <span className="text-gradient">Serve</span></h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '700px', margin: '1rem auto 0', fontSize: '1.1rem' }}>
            Delivering specialized advertising solutions across diverse sectors throughout the UAE
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {[
            { 
              n: "Retail & Malls", 
              i: <Store />,
              desc: "Eye-catching signage, window graphics, and promotional displays that drive foot traffic and sales",
              services: ["Mall Signage", "Store Branding", "Window Graphics", "POS Displays", "Digital Directories", "Interactive Kiosks"]
            },
            { 
              n: "Corporate Centers", 
              i: <Briefcase />,
              desc: "Professional office branding and corporate identity solutions that reflect your company values",
              services: ["Office Branding", "Reception Signage", "Wayfinding", "Interior Graphics", "Conference Room Displays", "Employee Communications"]
            },
            { 
              n: "Real Estate", 
              i: <Building2 />,
              desc: "Property marketing materials and development signage that attract buyers and investors",
              services: ["Project Hoardings", "Sales Centers", "Site Signage", "Marketing Materials", "Show Unit Graphics", "Leasing Displays"]
            },
            { 
              n: "Automotive", 
              i: <Car />,
              desc: "Showroom branding and fleet vehicle graphics that showcase your automotive excellence",
              services: ["Showroom Signage", "Fleet Branding", "Vehicle Wraps", "Dealership Graphics", "Service Bay Signage", "Parts Department Displays"]
            },
            { 
              n: "Healthcare", 
              i: <ShieldCheck />,
              desc: "Medical facility signage and wayfinding solutions that prioritize patient experience",
              services: ["Hospital Signage", "Clinic Branding", "Wayfinding Systems", "Patient Information Displays", "Emergency Signage", "Compliance Graphics"]
            },
            { 
              n: "Hospitality", 
              i: <Sparkles />,
              desc: "Hotel and restaurant branding that creates memorable guest experiences",
              services: ["Hotel Signage", "Restaurant Branding", "Menu Displays", "Event Signage", "Guest Information", "Promotional Graphics"]
            }
          ].map((ind, i) => (
            <motion.div 
              key={i} 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInDown}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(124, 58, 237, 0.15)' }} 
              className="glass-card" 
              style={{ 
                padding: '2.5rem',
                borderRadius: '20px',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                background: 'rgba(255, 255, 255, 0.05)'
              }}
            >
              <div style={{ 
                width: '70px',
                height: '70px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(34, 211, 238, 0.15))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                border: '2px solid rgba(124, 58, 237, 0.3)',
                color: 'var(--color-secondary)'
              }}>
                {ind.i}
              </div>
              <h4 style={{ 
                color: 'var(--color-text-main)', 
                fontSize: '1.4rem',
                fontWeight: 700,
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {ind.n}
              </h4>
              <p style={{ 
                color: 'var(--color-text-muted)', 
                fontSize: '0.95rem',
                lineHeight: '1.6',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                {ind.desc}
              </p>
              <div style={{
                background: 'rgba(34, 211, 238, 0.1)',
                borderRadius: '12px',
                padding: '1rem',
                border: '1px solid rgba(34, 211, 238, 0.3)'
              }}>
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem'
                }}>
                  {ind.services.map((service, idx) => (
                    <li key={idx} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.6rem',
                      color: 'var(--color-text-muted)',
                      fontSize: '0.9rem'
                    }}>
                      <span style={{ 
                        width: '6px', 
                        height: '6px', 
                        borderRadius: '50%', 
                        background: 'var(--color-secondary)',
                        flexShrink: 0
                      }}></span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="section-title">Frequently Asked <span className="text-gradient">Questions</span></h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '700px', margin: '1rem auto 0', fontSize: '1.1rem' }}>
            Get answers to common questions about our services and processes
          </p>
        </div>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {[
            {
              question: "What types of advertising solutions do you offer?",
              answer: "We provide comprehensive advertising solutions including digital signage, LED displays, vehicle branding, facade cladding, interior signage, wayfinding systems, and AI-powered analytics. Our services cover everything from design to installation and maintenance."
            },
            {
              question: "How long does a typical project take to complete?",
              answer: "Project timelines vary based on scope and complexity. Simple signage projects typically take 1-2 weeks, while large-scale installations like building wraps or comprehensive digital systems can take 4-8 weeks. We provide detailed timelines during consultation."
            },
            {
              question: "Do you provide maintenance and support services?",
              answer: "Yes, we offer comprehensive maintenance packages including regular cleaning, technical support, content updates for digital displays, and emergency repair services. Our 24/7 support ensures your advertising solutions always perform optimally."
            },
            {
              question: "What areas in the UAE do you serve?",
              answer: "We serve all seven emirates across the UAE, with primary operations in Dubai, Abu Dhabi, Sharjah, and Ajman. Our mobile teams can handle installations and maintenance throughout the country."
            },
            {
              question: "Can you help with design and creative services?",
              answer: "Absolutely! Our in-house creative team provides complete design services including brand consultation, graphic design, 3D visualization, and content creation. We ensure your advertising aligns perfectly with your brand identity."
            },
            {
              question: "What makes your AI-powered solutions different?",
              answer: "Our AI technology provides real-time audience analytics, performance optimization, and predictive maintenance. This data-driven approach helps maximize your advertising ROI and ensures optimal placement and timing for maximum impact."
            }
          ].map((faq, i) => (
            <motion.div 
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInDown}
              className="glass-card"
              style={{ 
                marginBottom: '1.5rem',
                padding: '2rem'
              }}
            >
              <h3 style={{ 
                color: 'var(--color-text-main)', 
                fontSize: '1.2rem', 
                fontWeight: 700, 
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ color: 'var(--color-primary)' }}>Q:</span>
                {faq.question}
              </h3>
              <p style={{ 
                color: 'var(--color-text-muted)', 
                lineHeight: '1.7',
                paddingLeft: '1.5rem'
              }}>
                <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>A:</span> {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            Have more questions? We're here to help!
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ padding: '1rem 2.5rem' }}>
            Contact Our Experts
          </Link>
        </div>
      </section>

      {/* CTA Ribbon */}
      <section className="container" style={{ position: 'relative', zIndex: 30, marginBottom: '-5rem' }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="glass-card" style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))', padding: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '0.5rem' }}>Ready to Elevate Your Brand?</h2>
            <p style={{ color: 'white', opacity: 0.8, fontSize: '1.1rem' }}>Join the next generation of marketing leaders in the UAE.</p>
          </div>
          <Link href="/contact" className="btn" style={{ background: 'white', color: 'var(--color-primary)', padding: '1rem 3rem', fontWeight: 800 }}>CONTACT US</Link>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section container" style={{ paddingTop: '10rem' }}>
        <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title text-gradient" style={{ marginBottom: '1rem' }}>Start Your Project Today</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' }}>
              Transform your brand vision into reality. Our team is ready to bring your ideas to life with cutting-edge solutions.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="grid-2">
              <input 
                placeholder="Full Name" 
                required 
                value={formData.name} 
                onChange={e => setFormData({ ...formData, name: e.target.value })} 
                style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '2px solid rgba(124, 58, 237, 0.3)', 
                  padding: '1.2rem', 
                  borderRadius: '12px', 
                  color: 'var(--color-text-main)',
                  fontSize: '16px'
                }} 
              />
              <input 
                placeholder="Email Address" 
                type="email" 
                required 
                value={formData.email} 
                onChange={e => setFormData({ ...formData, email: e.target.value })} 
                style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '2px solid rgba(124, 58, 237, 0.3)', 
                  padding: '1.2rem', 
                  borderRadius: '12px', 
                  color: 'var(--color-text-main)',
                  fontSize: '16px'
                }} 
              />
            </div>
            <input 
              placeholder="Phone Number (Optional)" 
              type="tel" 
              value={formData.phone} 
              onChange={e => setFormData({ ...formData, phone: e.target.value })} 
              style={{ 
                background: 'rgba(255,255,255,0.05)', 
                border: '2px solid rgba(124, 58, 237, 0.3)', 
                padding: '1.2rem', 
                borderRadius: '12px', 
                color: 'var(--color-text-main)',
                fontSize: '16px'
              }} 
            />
            <textarea 
              placeholder="Tell us about your project..." 
              rows={5} 
              required 
              value={formData.message} 
              onChange={e => setFormData({ ...formData, message: e.target.value })} 
              style={{ 
                background: 'rgba(255,255,255,0.05)', 
                border: '2px solid rgba(124, 58, 237, 0.3)', 
                padding: '1.2rem', 
                borderRadius: '12px', 
                color: 'var(--color-text-main)', 
                resize: 'vertical',
                fontSize: '16px'
              }} 
            />
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="btn btn-primary" 
              style={{ 
                padding: '1.2rem', 
                width: '100%', 
                opacity: isSubmitting ? 0.7 : 1, 
                fontSize: '1.05rem', 
                fontWeight: 700 
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {submitStatus && (
              <p style={{ 
                color: submitStatus.success ? '#22D3EE' : '#ef4444', 
                textAlign: 'center', 
                padding: '1rem', 
                background: submitStatus.success ? 'rgba(34, 211, 238, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
                borderRadius: '8px', 
                fontWeight: 600 
              }}>
                {submitStatus.message}
              </p>
            )}
          </form>

          <div style={{ marginTop: '3rem', paddingTop: '3rem', borderTop: '1px solid rgba(124, 58, 237, 0.3)' }}>
            <div className="grid-3" style={{ gap: '2rem', textAlign: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.15)', marginBottom: '1rem', margin: '0 auto 1rem' }}>
                  <Mail size={24} color="var(--color-secondary)" />
                </div>
                <h4 style={{ color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>Email Us</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>info@oneclickadv.ae</p>
              </div>
              
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.15)', marginBottom: '1rem', margin: '0 auto 1rem' }}>
                  <Phone size={24} color="var(--color-primary)" />
                </div>
                <h4 style={{ color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>Call Us</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>+971 00 000 0000</p>
              </div>
              
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.15)', marginBottom: '1rem', margin: '0 auto 1rem' }}>
                  <MapPin size={24} color="var(--color-secondary)" />
                </div>
                <h4 style={{ color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>Visit Us</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Dubai, UAE</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}