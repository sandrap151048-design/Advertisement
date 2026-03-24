"use client";

import React, { useState, FormEvent, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import './black-cards.css';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const slideDown: Variants = {
  hidden: { opacity: 0, y: -60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const dropIn: Variants = {
  hidden: { opacity: 0, y: -400 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 20, stiffness: 120 } }
};

const bounceInDown: Variants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 15, stiffness: 100 } }
};

const revealDown: Variants = {
  hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
  visible: { opacity: 1, clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.5 } }
};

const swipeLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const swipeRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const swipeUp: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const swipeDown: Variants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'whyus' | 'reach' | 'solutions'>('whyus');
  const [currentLocationImage, setCurrentLocationImage] = useState(0);

  const locationImages = [
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
    'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80',
    'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=600&q=80',
    'https://images.unsplash.com/photo-1546412414-e1885259563a?w=600&q=80'
  ];

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocationImage((prev) => (prev + 1) % locationImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [locationImages.length]);

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
        setSubmitStatus({ success: true, message: 'Message sent successfully!' });
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
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          background: #ffffff;
          color: #1a1a1a;
        }

        .hero-section {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin-top: 70px;
        }

        .hero-background {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-background img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.6) contrast(1.1);
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 100%);
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          max-width: 900px;
          padding: 2rem;
        }

        .hero-content h1 {
          font-size: clamp(3rem, 10vw, 7rem);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -2px;
        }

        .hero-content .highlight {
          color: #FF6B35;
        }

        .hero-content p {
          font-size: clamp(1rem, 2.5vw, 1.3rem);
          color: rgba(255,255,255,0.95);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 1rem 2.5rem;
          font-size: 1rem;
          font-weight: 700;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-primary {
          background: #1a1a1a;
          color: white;
        }

        .btn-primary:hover {
          background: #333333;
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        .btn-secondary:hover {
          background: rgba(255,255,255,0.1);
          transform: translateY(-2px);
        }

        /* Section Styles */
        .section {
          padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem);
          background: #ffffff;
        }

        .section-dark {
          background: #f5f5f5;
        }

        .section-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 900;
          margin-bottom: 1rem;
          text-align: center;
        }

        .section-subtitle {
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          color: #666666;
          text-align: center;
          max-width: 700px;
          margin: 0 auto 3rem auto;
          line-height: 1.6;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* We Build Section */
        .we-build-section {
          text-align: center;
          padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem);
        }

        .we-build-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 900;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .we-build-title .italic {
          font-style: italic;
          color: #666666;
        }

        .we-build-subtitle {
          font-size: 1rem;
          color: #666666;
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Portfolio Grid */
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .portfolio-item {
          aspect-ratio: 1;
          background: #e0e0e0;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .portfolio-item:hover {
          transform: scale(1.05);
        }

        .portfolio-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* For Brands Section */
        .for-brands-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem);
        }

        .for-brands-content h2 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 900;
          margin-bottom: 2rem;
        }

        .for-brands-list {
          list-style: none;
        }

        .for-brands-list li {
          padding: 1rem 0;
          font-size: 1rem;
          color: #1a1a1a;
          display: flex;
          align-items: center;
          gap: 1rem;
          border-bottom: 1px solid #e0e0e0;
        }

        .for-brands-list li:last-child {
          border-bottom: none;
        }

        .for-brands-list a {
          color: #1a1a1a;
          text-decoration: none;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .for-brands-list a:hover {
          color: #FF6B35;
        }

        .for-brands-image {
          width: 100%;
          height: 400px;
          background: #e0e0e0;
          border-radius: 12px;
          overflow: hidden;
        }

        .for-brands-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Prime Locations */
        .prime-locations {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem);
        }

        .prime-locations-image {
          width: 100%;
          height: 400px;
          background: #e0e0e0;
          border-radius: 12px;
          overflow: hidden;
        }

        .prime-locations-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .prime-locations-content h2 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 900;
          margin-bottom: 1rem;
        }

        .prime-locations-content p {
          color: #666666;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        /* We Reach Section */
        .we-reach-section {
          background: #1a1a1a;
          color: white;
          padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem);
        }

        .we-reach-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .we-reach-text h2 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 900;
          margin-bottom: 1rem;
        }

        .we-reach-text p {
          color: rgba(255,255,255,0.8);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .we-reach-image {
          width: 100%;
          height: 400px;
          background: #333333;
          border-radius: 12px;
          overflow: hidden;
        }

        .we-reach-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Built for Visibility */
        .built-section {
          padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem);
          background: #f5f5f5;
        }

        .built-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .built-text h2 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 900;
          margin-bottom: 1rem;
        }

        .built-text p {
          color: #666666;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .built-image {
          width: 100%;
          height: 400px;
          background: #e0e0e0;
          border-radius: 12px;
          overflow: hidden;
        }

        .built-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Footer */
        .footer {
          background: #1a1a1a;
          color: white;
          padding: 3rem clamp(1rem, 4vw, 2rem);
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-section h3 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .footer-section ul {
          list-style: none;
        }

        .footer-section ul li {
          margin-bottom: 0.5rem;
        }

        .footer-section a {
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-section a:hover {
          color: white;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 2rem;
          text-align: center;
          color: rgba(255,255,255,0.5);
          font-size: 0.9rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-section {
            margin-top: 60px;
            height: 80vh;
          }

          .for-brands-section,
          .prime-locations,
          .we-reach-content,
          .built-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .for-brands-image,
          .prime-locations-image,
          .we-reach-image,
          .built-image {
            height: 300px;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }

          .we-build-title {
            font-size: 2rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .for-brands-content h2,
          .prime-locations-content h2,
          .we-reach-text h2,
          .built-text h2 {
            font-size: 2rem;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: 2rem;
          }

          .portfolio-grid {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .we-build-title {
            font-size: 1.8rem;
          }

          .for-brands-content h2,
          .prime-locations-content h2,
          .we-reach-text h2,
          .built-text h2 {
            font-size: 1.8rem;
          }

          .hero-content p,
          .we-build-subtitle,
          .for-brands-content p,
          .prime-locations-content p,
          .we-reach-text p,
          .built-text p {
            font-size: 0.95rem;
          }

          .btn {
            padding: 0.9rem 2rem;
            font-size: 0.95rem;
          }

          .footer-content {
            gap: 2.5rem;
          }

          .footer-section h3,
          .footer-section h4 {
            font-size: 1rem;
          }
        }

        /* Tablet Landscape */
        @media (min-width: 769px) and (max-width: 1024px) {
          .hero-content h1 {
            font-size: 5rem;
          }

          .we-build-title {
            font-size: 3rem;
          }

          .section-title {
            font-size: 2.5rem;
          }

          .for-brands-section,
          .prime-locations,
          .we-reach-content,
          .built-content {
            gap: 3rem;
          }
        }

        /* Large Screens */
        @media (min-width: 1441px) {
          .hero-content h1 {
            font-size: 8rem;
          }

          .we-build-title {
            font-size: 4.5rem;
          }

          .section-title {
            font-size: 4rem;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img 
            src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1600&q=80" 
            alt="City Background" 
          />
        </div>
        <div className="hero-overlay"></div>
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeInDown}>
            <span className="highlight">At</span>tractive
          </motion.h1>
          <motion.p variants={fadeInUp}>
            We create high-impact advertising that makes your brand visible, memorable, and impossible to ignore.
          </motion.p>
          <motion.div className="hero-buttons" variants={fadeInUp}>
            <Link href="/register" className="btn btn-primary">
              Start Your Campaign <ArrowRight size={20} />
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* We Build Section */}
      <section className="we-build-section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="container"
        >
          <motion.h2 className="we-build-title" variants={bounceInDown}>
            We build <br />
            <span className="italic">unmissable brand</span> <br />
            presence
          </motion.h2>
          <motion.p className="we-build-subtitle" variants={slideDown}>
            From concept to execution, we deliver advertising solutions that capture attention and drive results.
          </motion.p>
          
          <motion.div className="portfolio-grid" variants={staggerContainer}>
            {[
              { id: 1, url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80', alt: 'Branding Design' },
              { id: 2, url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80', alt: 'Digital Graphics' },
              { id: 3, url: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&q=80', alt: 'Vehicle Wrap' },
              { id: 4, url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80', alt: 'Signage' },
              { id: 5, url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80', alt: 'Exhibition' },
              { id: 6, url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80', alt: 'Facade Design' }
            ].map((item, index) => (
              <motion.div 
                key={item.id} 
                className="portfolio-item" 
                variants={index % 2 === 0 ? swipeLeft : swipeRight}
                whileHover={{ scale: 1.05, x: index % 2 === 0 ? 10 : -10, transition: { duration: 0.3 } }}
              >
                <img 
                  src={item.url}
                  alt={item.alt}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Link href="/services" className="btn btn-primary">
              View All Services <ArrowRight size={20} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* For Brands Section */}
      <section className="section section-dark">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="for-brands-section container"
        >
          <motion.div 
            className="for-brands-content" 
            variants={swipeLeft}
            whileHover={{ x: 5, transition: { duration: 0.3 } }}
          >
            <h2>For Brands</h2>
            <ul className="for-brands-list">
              <li><Link href="/services#branding">Branding & Identity <ArrowRight size={16} /></Link></li>
              <li><Link href="/services#graphics">Digital Graphics <ArrowRight size={16} /></Link></li>
              <li><Link href="/services#vehicle">Vehicle Graphics <ArrowRight size={16} /></Link></li>
              <li><Link href="/services#signage">Signage Production <ArrowRight size={16} /></Link></li>
            </ul>
          </motion.div>
          <motion.div 
            className="for-brands-image" 
            variants={swipeRight}
            whileHover={{ scale: 1.02, x: -5, transition: { duration: 0.3 } }}
          >
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80"
              alt="For Brands"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Prime Locations */}
      <section className="section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="prime-locations container"
        >
          <motion.div 
            className="prime-locations-image" 
            variants={swipeLeft}
            whileHover={{ scale: 1.02, x: 5, transition: { duration: 0.3 } }}
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            {locationImages.map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt={`Prime Location ${index + 1}`}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: currentLocationImage === index ? 1 : 0,
                  scale: currentLocationImage === index ? 1 : 1.1
                }}
                transition={{ duration: 1, ease: "easeInOut" }}
                style={{
                  position: index === 0 ? 'relative' : 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ))}
            
            {/* Location indicators */}
            <div style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '0.5rem',
              zIndex: 10
            }}>
              {locationImages.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentLocationImage(index)}
                  style={{
                    width: currentLocationImage === index ? '2rem' : '0.5rem',
                    height: '0.5rem',
                    borderRadius: '0.25rem',
                    background: currentLocationImage === index ? 'white' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="prime-locations-content" 
            variants={swipeRight}
            whileHover={{ x: -5, transition: { duration: 0.3 } }}
          >
            <h2>Prime Locations</h2>
            <p>
              Strategically placed across high-traffic urban areas to maximize visibility and impact for your brand. From Dubai's iconic landmarks to Abu Dhabi's business districts, we cover all major UAE locations.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* We Reach Section */}
      <section className="we-reach-section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="we-reach-content container"
        >
          <motion.div 
            className="we-reach-text" 
            variants={swipeLeft}
            whileHover={{ x: 5, transition: { duration: 0.3 } }}
          >
            <h2>We reach across cities</h2>
            <p>
              With presence in Dubai, Abu Dhabi, and across the UAE, we bring your brand to millions of potential customers every day.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Get Started <ArrowRight size={20} />
            </Link>
          </motion.div>
          <motion.div 
            className="we-reach-image" 
            variants={swipeRight}
            whileHover={{ scale: 1.02, x: -5, transition: { duration: 0.3 } }}
          >
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80"
              alt="Cities"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Tabbed Section - Why Us, Reach, Solutions */}
      <section className="section" style={{ background: '#f5f5f5', padding: 'clamp(4rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem)' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="container"
        >
          {/* Tabs */}
          <motion.div 
            variants={fadeInDown}
            style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginBottom: '3rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <div 
              onClick={() => setActiveTab('whyus')}
              style={{ 
                padding: '1rem 3rem', 
                background: activeTab === 'whyus' ? '#1a1a1a' : 'white', 
                color: activeTab === 'whyus' ? 'white' : '#1a1a1a', 
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Why Us
            </div>
            <div 
              onClick={() => setActiveTab('reach')}
              style={{ 
                padding: '1rem 3rem', 
                background: activeTab === 'reach' ? '#1a1a1a' : 'white', 
                color: activeTab === 'reach' ? 'white' : '#1a1a1a', 
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Reach
            </div>
            <div 
              onClick={() => setActiveTab('solutions')}
              style={{ 
                padding: '1rem 3rem', 
                background: activeTab === 'solutions' ? '#1a1a1a' : 'white', 
                color: activeTab === 'solutions' ? 'white' : '#1a1a1a', 
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Solutions
            </div>
          </motion.div>

          {/* Content */}
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '4rem', 
              alignItems: 'center' 
            }}
          >
            {activeTab === 'whyus' && (
              <>
                <div>
                  <h2 style={{ 
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                    fontWeight: 900, 
                    marginBottom: '1.5rem',
                    lineHeight: 1.2
                  }}>
                    Built for Visibility
                  </h2>
                  <p style={{ 
                    color: '#666666', 
                    fontSize: '1.1rem', 
                    lineHeight: 1.8,
                    marginBottom: '2rem'
                  }}>
                    We help brands stand out through high-impact outdoor advertising across real-world environments. From storefront displays to large-scale city campaigns, our focus is simple – make your brand impossible to ignore.
                  </p>
                  <Link 
                    href="/about" 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      color: '#1a1a1a',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Learn more <ArrowRight size={20} />
                  </Link>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '400px', 
                  background: '#e0e0e0', 
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80"
                    alt="Built for Visibility"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </>
            )}

            {activeTab === 'reach' && (
              <>
                <div>
                  <h2 style={{ 
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                    fontWeight: 900, 
                    marginBottom: '1.5rem',
                    lineHeight: 1.2
                  }}>
                    Nationwide Coverage
                  </h2>
                  <p style={{ 
                    color: '#666666', 
                    fontSize: '1.1rem', 
                    lineHeight: 1.8,
                    marginBottom: '2rem'
                  }}>
                    With strategic presence across all seven emirates, we deliver your message to millions. From Dubai's bustling streets to Abu Dhabi's corporate districts, our network ensures maximum exposure for your brand across the UAE.
                  </p>
                  <Link 
                    href="/contact" 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      color: '#1a1a1a',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Get in touch <ArrowRight size={20} />
                  </Link>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '400px', 
                  background: '#e0e0e0', 
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80"
                    alt="Nationwide Coverage"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </>
            )}

            {activeTab === 'solutions' && (
              <>
                <div>
                  <h2 style={{ 
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                    fontWeight: 900, 
                    marginBottom: '1.5rem',
                    lineHeight: 1.2
                  }}>
                    Complete Solutions
                  </h2>
                  <p style={{ 
                    color: '#666666', 
                    fontSize: '1.1rem', 
                    lineHeight: 1.8,
                    marginBottom: '2rem'
                  }}>
                    From concept to installation, we provide end-to-end advertising solutions. Our services include branding, digital graphics, vehicle wraps, signage production, and facade cladding – all designed to elevate your brand presence.
                  </p>
                  <Link 
                    href="/services" 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      color: '#1a1a1a',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    View services <ArrowRight size={20} />
                  </Link>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '400px', 
                  background: '#e0e0e0', 
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
                    alt="Complete Solutions"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </>
            )}
          </motion.div>

          {/* Responsive styles */}
          <style jsx>{`
            @media (max-width: 768px) {
              div[style*="gridTemplateColumns"] {
                grid-template-columns: 1fr !important;
                gap: 2rem !important;
              }
            }
          `}</style>
        </motion.div>
      </section>

      {/* CTA Section with Background */}
      <section style={{ position: 'relative', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Background Image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img 
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&q=80" 
            alt="City Background"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)' }}
          />
        </div>
        
        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1 }}></div>
        
        {/* Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white', padding: '2rem', maxWidth: '900px' }}
        >
          <motion.h2 variants={bounceInDown} style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Ready to make your brand <span style={{ fontStyle: 'italic' }}>impossible to ignore?</span>
          </motion.h2>
          <motion.p variants={slideDown} style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '2rem', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
            Launch your outdoor campaign with high-impact placements across prime locations - fast, simple, and effective.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link href="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', padding: '1rem 2.5rem', background: 'white', color: '#1a1a1a', fontWeight: 700, borderRadius: '8px', textDecoration: 'none', transition: 'all 0.3s ease', fontSize: '1rem' }}>
              Start your campaign <ArrowRight size={20} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#1a1a1a', color: 'white', padding: '6rem 2rem 4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3.5rem', marginBottom: '3.5rem' }}>
            {/* Brand Section */}
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>
                <span style={{ color: '#7C3AED' }}>One</span> Click
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem', lineHeight: '1.8', fontSize: '1rem' }}>
                Premium advertising solutions across the UAE. Delivering high-impact visual communication services.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="https://www.facebook.com/oneclickadv" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.8)', transition: 'color 0.3s' }}>
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.instagram.com/oneclickadv" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.8)', transition: 'color 0.3s' }}>
                  <svg width="24" height="24" fill="currentColor" stroke="currentColor" strokeWidth="0" viewBox="0 0 24 24"><path stroke="none" d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/></svg>
                </a>
                <a href="https://twitter.com/oneclickadv" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.8)', transition: 'color 0.3s' }}>
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
              </div>
            </div>

            {/* Services Section */}
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Services</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li><Link href="/services#branding" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Branding</Link></li>
                <li><Link href="/services#graphics" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Graphics</Link></li>
                <li><Link href="/services#signage" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Signage</Link></li>
                <li><Link href="/services#vehicle" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Vehicle Wraps</Link></li>
              </ul>
            </div>

            {/* Company Section */}
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li><Link href="/about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>About</Link></li>
                <li><Link href="/services" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Services</Link></li>
                <li><Link href="/contact" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Contact</Link></li>
                <li><Link href="/blog" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Blog</Link></li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Contact</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <Phone size={18} style={{ color: '#7C3AED', flexShrink: 0 }} />
                  <a href="tel:+97100000000" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>+971 00 000 0000</a>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <Mail size={18} style={{ color: '#7C3AED', flexShrink: 0 }} />
                  <a href="mailto:info@oneclickadv.ae" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>info@oneclickadv.ae</a>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <MapPin size={18} style={{ color: '#7C3AED', flexShrink: 0 }} />
                  <a href="https://www.google.com/maps/search/?api=1&query=Dubai+UAE" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Dubai, UAE</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
            &copy; {currentYear || 2026} One Click Advertisement. All Rights Reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
