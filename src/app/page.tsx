"use client";

import React, { useState, FormEvent, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, MapPin, Phone, Mail, ChevronDown } from 'lucide-react';
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
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [openBrandAccordion, setOpenBrandAccordion] = useState<number | null>(0);

  const locations = [
    { 
      name: 'Dubai Marina', 
      image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=600&q=80'
    },
    { 
      name: 'Abu Dhabi Corniche', 
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80'
    },
    { 
      name: 'Downtown Dubai', 
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80'
    },
    { 
      name: 'Jumeirah Beach', 
      image: 'https://images.unsplash.com/photo-1546412414-e1885259563a?w=600&q=80'
    }
  ];

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocationIndex((prev) => (prev + 1) % locations.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [locations.length]);

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

        *::-webkit-scrollbar {
          display: none;
        }

        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
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
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding-top: 70px;
          background: #111111; /* dark fallback always */
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

        .hero-content .highlight {
          color: #e61e25;
        }

        .hero-content h1 {
          font-size: clamp(2.5rem, 8vw, 6rem);
          font-weight: 900;
          line-height: 1.05;
          margin-bottom: 1.5rem;
          letter-spacing: -2px;
          word-break: break-word;
        }

        .hero-content p {
          font-size: clamp(1rem, 2.2vw, 1.25rem);
          color: rgba(255,255,255,0.95);
          margin-bottom: 2rem;
          line-height: 1.6;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
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
          white-space: nowrap;
        }

        .btn-primary {
          background: #e61e25;
          color: white;
          box-shadow: 0 4px 15px rgba(230, 30, 37, 0.3);
        }

        .btn-primary:hover {
          background: #ff2d35;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(230, 30, 37, 0.4);
        }

        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
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
          line-height: 1.2;
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
          font-size: clamp(2.2rem, 6vw, 4rem);
          font-weight: 900;
          margin-bottom: 3rem;
          line-height: 1.1;
        }

        /* Responsive Fixes */
        /* Combined Tablet & Mobile Responsive */
        @media (max-width: 1024px) {
          .container {
            padding: 0 1.5rem;
          }
          
          .hero-section {
            height: auto;
            min-height: 100vh;
            padding: 120px 1.5rem 60px 1.5rem;
            display: flex;
            align-items: center;
          }

          .hero-content h1 {
            font-size: clamp(2.2rem, 9vw, 4rem);
            letter-spacing: -1px;
            margin-bottom: 1rem;
            line-height: 1.1;
            word-break: break-word;
          }
          
          .hero-content p {
            font-size: clamp(0.95rem, 2.5vw, 1.1rem);
            margin-bottom: 2rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }

          .hero-buttons {
            flex-direction: column;
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
            gap: 1rem;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }

          .section {
            padding: 4rem 1.5rem;
          }

          .we-build-title {
            font-size: clamp(2rem, 6vw, 3rem);
          }

          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .portfolio-item {
            height: 220px;
          }

          .for-brands-section,
          .prime-locations,
          .we-reach-content,
          .built-content {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }
          
          .for-brands-image,
          .prime-locations-image,
          .we-reach-image,
          .built-image {
            height: 350px;
          }
        }

        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: 2.5rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .portfolio-grid {
            grid-template-columns: 1fr;
          }

          .portfolio-item {
            height: 200px;
          }
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
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
          overflow: hidden;
        }

        .portfolio-item {
          height: 260px;
          background: #e0e0e0;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .portfolio-item:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.18);
        }

        .portfolio-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .portfolio-item:hover img {
          transform: scale(1.06);
        }

        .portfolio-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-start;
          padding: 1.5rem;
          color: white;
          text-align: left;
          transition: all 0.3s ease;
        }

        .portfolio-item:hover .portfolio-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 100%);
        }

        .portfolio-title {
          font-size: 1.4rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: white;
          line-height: 1.2;
        }

        .portfolio-desc {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.85);
          line-height: 1.4;
        }

        /* For Brands Section */
        .for-brands-section {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 4rem;
          align-items: start;
          padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem);
        }

        .for-brands-content h2 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 900;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .for-brands-content p {
          color: #666;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .for-brands-accordion {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .accordion-item-brand {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .accordion-item-brand:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }

        .accordion-header-brand {
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-weight: 600;
          font-size: 1.1rem;
          color: #1a1a1a;
          transition: all 0.3s ease;
        }

        .accordion-header-brand:hover {
          background: rgba(0,0,0,0.02);
        }

        .accordion-icon-brand {
          transition: transform 0.3s ease;
          color: #666;
        }

        .accordion-icon-brand.open {
          transform: rotate(180deg);
        }

        .accordion-content-brand {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .accordion-content-brand.open {
          max-height: 200px;
        }

        .accordion-content-inner-brand {
          padding: 0 2rem 1.5rem 2rem;
          color: #666;
          line-height: 1.6;
          font-size: 0.95rem;
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
          <motion.h1 
            variants={fadeInDown}
            style={{ 
              fontFamily: "'Bricolage Grotesque', sans-serif"
            }}
          >
            <span className="highlight">At</span>tractive
          </motion.h1>
          <motion.p variants={fadeInUp}>
            We create high-impact advertising that makes your brand visible, memorable, and impossible to ignore.
          </motion.p>
          <motion.div className="hero-buttons" variants={fadeInUp}>
            <Link href="/contact#campaign" className="btn btn-primary">
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
            We build <span className="italic">unmissable brand</span> presence
          </motion.h2>
          <motion.p className="we-build-subtitle" variants={slideDown}>
            From concept to execution, we deliver advertising solutions that capture attention and drive results.
          </motion.p>
          
          <motion.div className="portfolio-grid" variants={staggerContainer}>
            {[
              { 
                id: 1, 
                url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80', 
                title: 'Branding & Corporate Identity',
                desc: 'Brand implementation, rollout & corporate identity applications'
              },
              { 
                id: 2, 
                url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80', 
                title: 'Digital Printed Graphics',
                desc: 'Large format printing & interior graphics'
              },
              { 
                id: 3, 
                url: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80', 
                title: 'Vehicle Graphics & Fleet Branding',
                desc: 'Full & partial vehicle wraps for mobile advertising'
              },
              { 
                id: 4, 
                url: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80', 
                title: 'Signage Production & Installation',
                desc: 'Indoor & outdoor signage solutions'
              },
              { 
                id: 5, 
                url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80', 
                title: 'Exhibition, Display & POS',
                desc: 'Exhibition stands, kiosks & point of sale displays'
              },
              { 
                id: 6, 
                url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80', 
                title: 'Cladding & Facade Solutions',
                desc: 'ACP cladding & architectural facade branding'
              }
            ].map((item, index) => (
              <motion.div 
                key={item.id} 
                className="portfolio-item" 
                variants={index % 2 === 0 ? swipeLeft : swipeRight}
                whileHover={{ scale: 1.05, x: index % 2 === 0 ? 10 : -10, transition: { duration: 0.3 } }}
              >
                <img 
                  src={item.url}
                  alt={item.title}
                />
                <div className="portfolio-overlay">
                  <h3 className="portfolio-title">{item.title}</h3>
                  <p className="portfolio-desc">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Link href="/services" className="btn btn-primary">
              Explore Services <ArrowRight size={20} />
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
          >
            <h2>For Brands</h2>
            <p>
              Outdoor advertising made simple for modern brands. Reach the right audience with high-impact placements across cities.
            </p>
          </motion.div>
          
          <motion.div 
            className="for-brands-accordion"
            variants={swipeRight}
          >
            {[
              { 
                title: 'End-to-End Solutions', 
                desc: 'Complete advertising solutions from concept to installation, handling every detail of your campaign.' 
              },
              { 
                title: 'Premium Quality', 
                desc: 'High-quality materials and professional execution that withstand UAE climate while maintaining aesthetics.' 
              },
              { 
                title: 'UAE Compliance', 
                desc: 'Fully compliant with RTA and local regulations, ensuring smooth approvals and installations.' 
              },
              { 
                title: 'Reliable Execution', 
                desc: 'On-time delivery and professional installation across Dubai, Abu Dhabi, and the Northern Emirates.' 
              }
            ].map((item, index) => (
              <div
                key={index}
                className="accordion-item-brand"
              >
                <div
                  className="accordion-header-brand"
                  onClick={() => setOpenBrandAccordion(openBrandAccordion === index ? null : index)}
                >
                  <span>{item.title}</span>
                  <ChevronDown
                    size={20}
                    className={`accordion-icon-brand ${openBrandAccordion === index ? 'open' : ''}`}
                  />
                </div>
                <div className={`accordion-content-brand ${openBrandAccordion === index ? 'open' : ''}`}>
                  <div className="accordion-content-inner-brand">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
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
            {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                  opacity: currentLocationIndex === index ? 1 : 0,
                  x: currentLocationIndex === index ? 0 : currentLocationIndex > index ? -100 : 100,
                  scale: currentLocationIndex === index ? 1 : 1.1
                }}
                transition={{ 
                  duration: 0.2, 
                  ease: "easeInOut",
                  delay: currentLocationIndex === index ? 0 : 0
                }}
                style={{
                  position: index === 0 ? 'relative' : 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%'
                }}
              >
                <img 
                  src={location.image}
                  alt={location.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                
                {/* Gradient Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)'
                }} />

                {/* Location Name */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ 
                    opacity: currentLocationIndex === index ? 1 : 0,
                    y: currentLocationIndex === index ? 0 : 30
                  }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '2rem',
                    right: '2rem',
                    color: 'white',
                    zIndex: 2
                  }}
                >
                  <h3 style={{
                    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                    fontWeight: 900,
                    marginBottom: '0.5rem',
                    textShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    letterSpacing: '-0.5px'
                  }}>
                    {location.name}
                  </h3>
                  <div style={{
                    width: '60px',
                    height: '4px',
                    background: '#e61e25',
                    borderRadius: '2px',
                    boxShadow: '0 0 10px rgba(230, 30, 37, 0.6)'
                  }} />
                </motion.div>
              </motion.div>
            ))}
            
            {/* Location indicators */}
            <div style={{
              position: 'absolute',
              bottom: '1.5rem',
              right: '2rem',
              display: 'flex',
              gap: '0.5rem',
              zIndex: 10
            }}>
              {locations.map((_, index) => (
                <motion.div
                  key={index}
                  onClick={() => setCurrentLocationIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: currentLocationIndex === index ? '2.5rem' : '0.6rem',
                    height: '0.6rem',
                    borderRadius: '0.3rem',
                    background: currentLocationIndex === index 
                      ? '#e61e25' 
                      : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: currentLocationIndex === index 
                      ? '0 0 12px rgba(230, 30, 37, 0.8)' 
                      : 'none'
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
            className="tabs-nav-wrapper"
            style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginBottom: '3rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              width: '100%'
            }}
          >
            <div 
              onClick={() => setActiveTab('whyus')}
              className={`tabs-nav-item ${activeTab === 'whyus' ? 'active' : ''}`}
              style={{ 
                padding: '1rem 3rem', 
                background: activeTab === 'whyus' ? '#1a1a1a' : 'white', 
                color: activeTab === 'whyus' ? 'white' : '#1a1a1a', 
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
            >
              Why Us
            </div>
            <div 
              onClick={() => setActiveTab('reach')}
              className={`tabs-nav-item ${activeTab === 'reach' ? 'active' : ''}`}
              style={{ 
                padding: '1rem 3rem', 
                background: activeTab === 'reach' ? '#1a1a1a' : 'white', 
                color: activeTab === 'reach' ? 'white' : '#1a1a1a', 
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
            >
              Reach
            </div>
            <div 
              onClick={() => setActiveTab('solutions')}
              className={`tabs-nav-item ${activeTab === 'solutions' ? 'active' : ''}`}
              style={{ 
                padding: '1rem 3rem', 
                background: activeTab === 'solutions' ? '#1a1a1a' : 'white', 
                color: activeTab === 'solutions' ? 'white' : '#1a1a1a', 
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'center'
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
            className="tabs-content-grid"
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
                <div className="tabs-image-wrapper" style={{ 
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
                <div className="tabs-image-wrapper" style={{ 
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
                <div className="tabs-image-wrapper" style={{ 
                  width: '100%', 
                  height: '400px', 
                  background: '#e0e0e0', 
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80"
                    alt="Complete Solutions"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </>
            )}
          </motion.div>

          {/* Responsive styles */}
          <style jsx>{`
            @media (max-width: 1024px) {
              div[style*="gridTemplateColumns"] {
                grid-template-columns: 1fr !important;
                gap: 2.5rem !important;
              }
            }
          `}</style>
        </motion.div>
      </section>

      {/* CTA Section with Background */}
      <section style={{ 
        position: 'relative', 
        minHeight: '70vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        overflow: 'hidden',
        backgroundImage: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#111'
      }}>
        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 1 }}></div>
        
        {/* Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          style={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white', padding: 'clamp(3rem, 6vw, 4rem) clamp(1.5rem, 4vw, 2rem)', maxWidth: '900px', width: '100%' }}
        >
          <motion.h2 variants={bounceInDown} style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Ready to make your brand <span style={{ fontStyle: 'italic' }}>impossible to ignore?</span>
          </motion.h2>
          <motion.p variants={slideDown} style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '2rem', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', maxWidth: '700px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
            Launch your outdoor campaign with high-impact placements across prime locations - fast, simple, and effective.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link href="/contact#campaign" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', padding: '1rem 2.5rem', background: '#e61e25', color: 'white', fontWeight: 700, borderRadius: '8px', textDecoration: 'none', transition: 'all 0.3s ease', fontSize: '1rem', boxShadow: '0 4px 20px rgba(230,30,37,0.4)' }}>
              Start your campaign <ArrowRight size={20} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

    </>
  );
}
