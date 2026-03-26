"use client";

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, Award, Globe, TrendingUp, Target, Palette, Settings, Rocket } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

export default function AboutPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  return (
    <>
      <style jsx global>{`
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        *::-webkit-scrollbar {
          display: none;
        }

        .about-page {
          background: #f5f5f5;
          min-height: 100vh;
        }

        .about-hero {
          position: relative;
          height: 100vh;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding-top: 100px;
        }

        .about-hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .about-hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.6);
        }

        .about-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.3) 100%);
          z-index: 1;
        }

        .about-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          max-width: 900px;
          padding: 2rem;
        }

        .about-hero-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(3rem, 10vw, 7rem);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 2rem;
          letter-spacing: -4px;
        }

        .about-hero-subtitle {
          font-size: clamp(1rem, 2.5vw, 1.4rem);
          color: rgba(255,255,255,0.95);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 500;
        }

        .about-content {
          padding: 4rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-layout {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 3rem;
          margin-bottom: 5rem;
          align-items: start;
        }

        .section-info {
          background: white;
          padding: 3rem;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          position: sticky;
          top: 120px;
        }

        .section-info h2 {
          font-size: 2.5rem;
          font-weight: 900;
          color: #1a1a1a;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .section-info h2 .italic {
          font-style: italic;
          color: #666;
        }

        .section-info p {
          font-size: 1rem;
          color: #666;
          line-height: 1.8;
        }

        .section-images {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .section-image {
          position: relative;
          height: 300px;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s ease;
        }

        .section-image:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .section-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .section-image:hover img {
          transform: scale(1.1);
        }

        .accordion-section {
          background: white;
          padding: 5rem 3rem;
          border-radius: 32px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.05);
          margin-bottom: 5rem;
        }

        .accordion-title {
          font-size: 3rem;
          font-weight: 900;
          color: #1a1a1a;
          margin-bottom: 4rem;
          text-align: center;
          letter-spacing: -1.5px;
        }

        .accordion-item {
          border-bottom: 1px solid #f0f0f0;
          padding: 2rem 0;
        }

        .accordion-item:last-child {
          border-bottom: none;
        }

        .accordion-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-size: 1.4rem;
          font-weight: 800;
          color: #1a1a1a;
          transition: all 0.3s;
        }

        .accordion-header:hover {
          color: #e61e25;
          padding-left: 10px;
        }

        .accordion-icon {
          transition: transform 0.3s;
          color: #e61e25;
        }

        .accordion-icon.open {
          transform: rotate(180deg);
        }

        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .accordion-content.open {
          max-height: 800px;
          padding-top: 1.5rem;
        }

        .accordion-content p {
          color: #666;
          line-height: 1.9;
          font-size: 1.1rem;
        }

        .cta-section {
          position: relative;
          padding: 8rem 2rem;
          color: white;
          text-align: center;
          overflow: hidden;
          border-radius: 32px;
          margin-bottom: 4rem;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&q=80');
          background-size: cover;
          background-position: center;
          filter: brightness(0.4);
          z-index: 0;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          padding: 1.2rem 3rem;
          background: white;
          color: #1a1a1a;
          font-weight: 800;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1.1rem;
        }

        .cta-button:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(255,107,53,0.3);
          background: #e61e25;
          color: white;
        }

        @media (max-width: 768px) {
          .about-hero {
            height: 70vh;
            min-height: 500px;
          }

          .about-hero-title {
            font-size: clamp(2.5rem, 8vw, 4rem);
            letter-spacing: -2px;
          }

          .about-hero-title svg {
            width: 48px !important;
            height: 48px !important;
          }

          .about-hero-subtitle {
            font-size: 0.95rem;
            padding: 0 0.5rem;
          }

          .about-content {
            padding: 3rem 1.2rem;
          }

          .section-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .section-info {
            position: relative;
            top: auto;
            padding: 2rem;
          }

          .section-info h2 {
            font-size: 2rem;
          }

          .section-images {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }

          .section-image {
            height: 200px;
          }

          .accordion-section {
            padding: 2.5rem 1.2rem;
            border-radius: 20px;
          }

          .accordion-title {
            font-size: 2rem;
            margin-bottom: 2rem;
            letter-spacing: -0.5px;
          }

          .accordion-title svg {
            width: 32px !important;
            height: 32px !important;
          }

          .accordion-header {
            font-size: 1.1rem;
          }

          .cta-section {
            padding: 5rem 1.5rem;
            border-radius: 20px;
          }

          .cta-button {
            padding: 1rem 2rem;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .about-hero {
            height: 60vh;
          }

          .about-hero-title {
            font-size: 2rem;
            letter-spacing: -1px;
          }

          .section-images {
            grid-template-columns: 1fr;
          }

          .section-image {
            height: 220px;
          }

          .accordion-title {
            font-size: 1.6rem;
          }

          .accordion-header {
            font-size: 1rem;
            padding: 1rem 0;
          }
        }

      `}</style>

      <div className="about-page">

        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-bg">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80" 
              alt="About Us - One Click Advertisement" 
            />
          </div>
          <div className="about-hero-overlay"></div>
          <motion.div 
            className="about-hero-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 className="about-hero-title" variants={fadeInUp}>
              About{' '}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', verticalAlign: 'middle' }}>
                <svg width="80" height="80" viewBox="0 0 32 32" style={{ display: 'inline-block' }}>
                  <circle cx="16" cy="16" r="13" fill="none" stroke="white" strokeWidth="4"/>
                  <rect x="18" y="3" width="10" height="10" fill="#e61e25" rx="1"/>
                </svg>
                <span style={{ color: 'white' }}>ne Click</span>
              </span>
            </motion.h1>
            <motion.p className="about-hero-subtitle" variants={fadeInUp}>
              Build your visibility with customized advertising strategies and precision-engineered signage designed to maximize your market presence across the UAE.
            </motion.p>
          </motion.div>
        </section>

        {/* About Content */}
        <section className="about-content">
          {/* Who We Are */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="section-layout">
              <motion.div className="section-info" variants={fadeInUp}>
                <h2 style={{ letterSpacing: '-1px' }}>
                  Who <br />
                  <span className="italic">We Are</span>
                </h2>
                <p>
                  One Click Advertisement is a premier full-service advertising company specializing in high-impact visual communication. With over a decade of expertise in the UAE market, we transform bold ideas into stunning reality.
                </p>
                <p style={{ marginTop: '1.5rem' }}>
                  We provide end-to-end solutions — from initial creative concept and authority approvals to precision manufacturing and professional installation across Dubai and the Northern Emirates.
                </p>
              </motion.div>

              <motion.div className="section-images" variants={staggerContainer}>
                <motion.div className="section-image" variants={fadeInUp}><img src="https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80" alt="Work 1" /></motion.div>
                <motion.div className="section-image" variants={fadeInUp}><img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="Work 2" /></motion.div>
                <motion.div className="section-image" variants={fadeInUp}><img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" alt="Work 3" /></motion.div>
                <motion.div className="section-image" variants={fadeInUp}><img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80" alt="Work 4" /></motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Why Choose One Click - Accordion */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="accordion-section"
          >
            <h2 className="accordion-title">
              Why Choose{' '}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', verticalAlign: 'middle' }}>
                <svg width="48" height="48" viewBox="0 0 32 32" style={{ display: 'inline-block' }}>
                  <circle cx="16" cy="16" r="13" fill="none" stroke="#1a1a1a" strokeWidth="4"/>
                  <rect x="18" y="3" width="10" height="10" fill="#e61e25" rx="1"/>
                </svg>
                <span style={{ color: '#1a1a1a' }}>ne Click</span>
              </span>
            </h2>
            
            {[
              {
                title: 'Prime Strategic Locations',
                content: 'We provide access to the most high-traffic advertising spots across the UAE, ensuring your brand message reaches maximum eyes in Dubai, Abu Dhabi, and beyond.'
              },
              {
                title: 'Expert Creative Team',
                content: 'Our team of designers and engineers are experts in UAE market requirements, delivering designs that are stunning, compliant, and durable.'
              },
              {
                title: 'Premium Quality Materials',
                content: 'We use only the highest-grade, UV-resistant materials built to withstand the unique UAE climate, ensuring your signage stays vibrant for years.'
              },
              {
                title: 'Complete Turnkey Solutions',
                content: 'From initial design and authority approvals (RTA, Municipality) to professional installation and maintenance — we handle it all.'
              }
            ].map((item, index) => (
              <div key={index} className="accordion-item">
                <div 
                  className="accordion-header"
                  onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                >
                  <span>{item.title}</span>
                  <span className={`accordion-icon ${openAccordion === index ? 'open' : ''}`}>▼</span>
                </div>
                <div className={`accordion-content ${openAccordion === index ? 'open' : ''}`}>
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.section 
            className="cta-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="cta-content">
              <h2>Ready to scale your brand?</h2>
              <p>Experience the power of world-class advertisement with the UAE's most trusted partner.</p>
              <Link href="/contact" className="cta-button">
                Get Your Proposal <ArrowRight size={22} />
              </Link>
            </div>
          </motion.section>
        </section>
      </div>
    </>
  );
}
