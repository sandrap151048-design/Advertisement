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
          height: 60vh;
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin-top: 80px;
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
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 1rem;
          letter-spacing: -2px;
        }

        .about-hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: rgba(255,255,255,0.9);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
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
          padding: 3rem;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          margin-bottom: 3rem;
        }

        .accordion-title {
          font-size: 2rem;
          font-weight: 900;
          color: #1a1a1a;
          margin-bottom: 2rem;
          text-align: center;
        }

        .accordion-item {
          border-bottom: 1px solid #e0e0e0;
          padding: 1.5rem 0;
        }

        .accordion-item:last-child {
          border-bottom: none;
        }

        .accordion-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-size: 1.2rem;
          font-weight: 700;
          color: #1a1a1a;
          transition: color 0.3s;
        }

        .accordion-header:hover {
          color: #1a3a52;
        }

        .accordion-icon {
          transition: transform 0.3s;
        }

        .accordion-icon.open {
          transform: rotate(180deg);
        }

        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .accordion-content.open {
          max-height: 500px;
          padding-top: 1rem;
        }

        .accordion-content p {
          color: #666;
          line-height: 1.8;
        }

        .process-section {
          background: #f5f5f5;
          padding: 4rem 3rem;
          border-radius: 20px;
          margin-bottom: 3rem;
        }

        .process-title {
          font-size: 2.5rem;
          font-weight: 900;
          color: #1a1a1a;
          margin-bottom: 1rem;
          text-align: center;
        }

        .process-title .italic {
          font-style: italic;
          color: #666;
        }

        .process-subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 3rem;
          font-size: 1rem;
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .process-card {
          text-align: center;
          padding: 2rem;
          border-radius: 16px;
          background: white;
          transition: all 0.3s ease;
          border: 2px solid #e0e0e0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .process-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.15);
          border-color: #1a3a52;
        }

        .process-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          border-radius: 16px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border: 2px solid #e0e0e0;
        }

        .process-card h4 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 0.8rem;
        }

        .process-card p {
          font-size: 0.9rem;
          color: #666;
          line-height: 1.6;
        }

        .locations-section {
          background: white;
          padding: 4rem 3rem;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          margin-bottom: 3rem;
        }

        .locations-title {
          font-size: 2.5rem;
          font-weight: 900;
          color: #1a1a1a;
          margin-bottom: 1rem;
          text-align: center;
        }

        .locations-title .italic {
          font-style: italic;
          color: #666;
        }

        .locations-subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 3rem;
          font-size: 1rem;
        }

        .locations-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .location-card {
          position: relative;
          height: 250px;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s ease;
        }

        .location-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .location-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .location-card:hover img {
          transform: scale(1.1);
        }

        .location-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);
          display: flex;
          align-items: flex-end;
          padding: 1.5rem;
          color: white;
        }

        .location-name {
          font-size: 1.3rem;
          font-weight: 800;
        }

        .cta-section {
          position: relative;
          padding: 6rem 2rem;
          color: white;
          text-align: center;
          overflow: hidden;
          border-radius: 20px;
          margin-bottom: 3rem;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&q=80');
          background-size: cover;
          background-position: center;
          filter: brightness(0.5);
          z-index: 0;
        }

        .cta-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 100%);
          z-index: 0;
        }

        .cta-content {
          position: relative;
          z-index: 1;
        }

        .cta-section h2 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 900;
          margin-bottom: 1.5rem;
        }

        .cta-section p {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.9);
          max-width: 700px;
          margin: 0 auto 2rem auto;
          line-height: 1.8;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          padding: 1rem 2.5rem;
          background: white;
          color: #1a1a1a;
          font-weight: 700;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255,255,255,0.3);
        }

        @media (max-width: 768px) {
          .about-hero {
            margin-top: 60px;
            height: 50vh;
          }

          .section-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .section-info {
            position: relative;
            top: 0;
          }

          .section-images {
            grid-template-columns: 1fr;
          }

          .process-grid {
            grid-template-columns: 1fr;
          }

          .locations-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <div className="about-page">

        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-bg">
            <img 
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80" 
              alt="About Us" 
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
              About <span style={{ color: '#FF6B35' }}>One Click</span>
            </motion.h1>
            <motion.p className="about-hero-subtitle" variants={fadeInUp}>
              Full-service advertising and branding company delivering end-to-end visual communication solutions
            </motion.p>
          </motion.div>
        </section>

        {/* About Content */}
        <section className="about-content">
          {/* Who We Are Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="section-layout">
              <motion.div className="section-info" variants={fadeInUp}>
                <h2>
                  Who <br />
                  <span className="italic">We Are</span>
                </h2>
                <p>
                  One Click Advertisement is a full-service advertising and branding company delivering end-to-end visual communication solutions. We specialize in transforming spaces, surfaces, and screens into powerful brand experiences.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  From high-quality printing to large-scale digital displays, we ensure your brand gets noticed—clearly, creatively, and professionally across Dubai, Abu Dhabi, Sharjah, Ajman, and the Northern Emirates.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  With a commitment to international standards and local market compliance, we provide complete turnkey solutions — from design and production to installation and maintenance.
                </p>
              </motion.div>

              <motion.div className="section-images" variants={staggerContainer}>
                <motion.div className="section-image" variants={fadeInUp}>
                  <img src="https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80" alt="Billboard Advertising" />
                </motion.div>
                <motion.div className="section-image" variants={fadeInUp}>
                  <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="LED Display" />
                </motion.div>
                <motion.div className="section-image" variants={fadeInUp}>
                  <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" alt="Retail Signage" />
                </motion.div>
                <motion.div className="section-image" variants={fadeInUp}>
                  <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80" alt="Vehicle Branding" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* What We Do Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            style={{ marginBottom: '5rem' }}
          >
            <motion.div variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#1a1a1a', marginBottom: '1rem' }}>
                What <br />
                <span style={{ fontStyle: 'italic', color: '#666' }}>We Do</span>
              </h2>
              <p style={{ fontSize: '1rem', color: '#666', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
                We deliver complete outdoor advertising solutions — from storefront signage to large-scale billboards and mobile branding — designed to maximize visibility and brand impact.
              </p>
            </motion.div>

            <motion.div 
              className="section-images" 
              variants={staggerContainer}
              style={{ maxWidth: '1000px', margin: '0 auto' }}
            >
              <motion.div className="section-image" variants={fadeInUp}>
                <img src="https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80" alt="Billboards" />
                <div style={{ 
                  position: 'absolute', 
                  bottom: '1.5rem', 
                  left: '50%', 
                  transform: 'translateX(-50%)',
                  background: 'rgba(0,0,0,0.8)',
                  padding: '0.8rem 2rem',
                  borderRadius: '8px',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'white'
                }}>
                  Billboards
                </div>
              </motion.div>
              <motion.div className="section-image" variants={fadeInUp}>
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" alt="Retail Signage" />
                <div style={{ 
                  position: 'absolute', 
                  bottom: '1.5rem', 
                  left: '50%', 
                  transform: 'translateX(-50%)',
                  background: 'rgba(0,0,0,0.8)',
                  padding: '0.8rem 2rem',
                  borderRadius: '8px',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'white'
                }}>
                  Retail Signage
                </div>
              </motion.div>
              <motion.div className="section-image" variants={fadeInUp}>
                <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80" alt="Vehicle Branding" />
                <div style={{ 
                  position: 'absolute', 
                  bottom: '1.5rem', 
                  left: '50%', 
                  transform: 'translateX(-50%)',
                  background: 'rgba(0,0,0,0.8)',
                  padding: '0.8rem 2rem',
                  borderRadius: '8px',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'white'
                }}>
                  Vehicle Branding
                </div>
              </motion.div>
              <motion.div className="section-image" variants={fadeInUp}>
                <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80" alt="Campaign Solutions" />
                <div style={{ 
                  position: 'absolute', 
                  bottom: '1.5rem', 
                  left: '50%', 
                  transform: 'translateX(-50%)',
                  background: 'rgba(0,0,0,0.8)',
                  padding: '0.8rem 2rem',
                  borderRadius: '8px',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'white'
                }}>
                  Campaign Solutions
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Why Choose One Click - Accordion */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="accordion-section"
          >
            <h2 className="accordion-title">Why Choose One Click</h2>
            
            {[
              {
                title: 'Prime Locations',
                content: 'Strategic placement in high-traffic areas across Dubai, Abu Dhabi, and Sharjah ensures maximum visibility for your brand.'
              },
              {
                title: 'Expert Team',
                content: 'Our experienced professionals bring creativity, technical expertise, and market knowledge to every project.'
              },
              {
                title: 'Quality Materials',
                content: 'We use premium materials and cutting-edge technology to ensure durability and visual impact in UAE\'s climate.'
              },
              {
                title: 'End-to-End Service',
                content: 'From initial concept and design through production, installation, and maintenance - we handle everything.'
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

          {/* Vision & Mission Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            style={{ marginBottom: '5rem' }}
          >
            <div className="section-layout">
              <motion.div className="section-info" variants={fadeInUp}>
                <h2>
                  Our <br />
                  <span className="italic">Vision</span>
                </h2>
                <p>
                  To be recognized as a reliable and innovative branding and signage partner in the UAE, delivering world-class visual solutions that enhance brand presence and support business growth.
                </p>
              </motion.div>

              <motion.div className="section-info" variants={fadeInUp}>
                <h2>
                  Our <br />
                  <span className="italic">Mission</span>
                </h2>
                <p>
                  To deliver creative, compliant, and high-quality advertising solutions that meet UAE authority requirements while exceeding client expectations in terms of durability, safety, and visual impact.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Industries We Serve Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="accordion-section"
          >
            <h2 className="accordion-title">Industries We Serve</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
              {[
                'Retail & Shopping Malls',
                'Corporate & Business Centers',
                'Real Estate & Property Developers',
                'Schools & Educational Institutions',
                'Automotive & Logistics',
                'Hospitality (Hotels, Cafés & Restaurants)',
                'Healthcare & Clinics',
                'Government & Semi-Government Entities'
              ].map((industry, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  style={{
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
                    borderRadius: '12px',
                    border: '1px solid #e0e0e0',
                    textAlign: 'center',
                    fontWeight: 600,
                    color: '#1a1a1a',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    borderColor: '#ff6b35'
                  }}
                >
                  {industry}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Compliance & Authority Approvals Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="accordion-section"
          >
            <h2 className="accordion-title">Compliance & Authority Approvals</h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.8' }}>
              We are experienced in working in accordance with UAE municipality and mall regulations, ensuring smooth approvals, proper installation, and long-term durability of all projects.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
              {[
                {
                  title: 'Dubai Municipality Guidelines',
                  desc: 'Full compliance with Dubai Municipality signage and advertising regulations'
                },
                {
                  title: 'RTA Requirements',
                  desc: 'Adherence to RTA standards for vehicle graphics and mobile advertising'
                },
                {
                  title: 'Mall & Property Standards',
                  desc: 'Meeting mall and property management requirements for installations'
                },
                {
                  title: 'Safety & Installation',
                  desc: 'Certified safety compliance and professional installation standards'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  style={{
                    padding: '2rem',
                    background: 'white',
                    borderRadius: '16px',
                    border: '2px solid #e0e0e0',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{ 
                    borderColor: '#2c4a5e',
                    boxShadow: '0 8px 20px rgba(44, 74, 94, 0.15)'
                  }}
                >
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#2c4a5e', marginBottom: '1rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.95rem' }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Commitment Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            style={{
              background: 'linear-gradient(135deg, #2c4a5e 0%, #1a2f3d 100%)',
              padding: '4rem 3rem',
              borderRadius: '20px',
              marginBottom: '3rem',
              textAlign: 'center',
              color: 'white'
            }}
          >
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>
              Our <span style={{ fontStyle: 'italic', color: '#ff6b35' }}>Commitment</span>
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '900px', margin: '0 auto', color: 'rgba(255,255,255,0.9)' }}>
              We are committed to delivering professional workmanship, premium finishing, and long-lasting branding solutions that withstand the UAE climate while maintaining strong visual impact. Every project is executed with attention to detail, quality materials, and adherence to international standards.
            </p>
          </motion.div>

          {/* Our Process Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="process-section"
          >
            <motion.h2 className="process-title" variants={fadeInUp}>
              Our <span className="italic">Process</span>
            </motion.h2>
            <motion.p className="process-subtitle" variants={fadeInUp}>
              A simple and efficient approach to launch your advertising campaign. Steps
            </motion.p>

            <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto' }}>
              {/* Connecting Lines - Animate one by one */}
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.3 + (index * 0.4),
                    ease: "easeInOut" 
                  }}
                  style={{
                    position: 'absolute',
                    top: '80px',
                    left: `${12.5 + (index * 25)}%`,
                    width: '25%',
                    height: '3px',
                    background: 'linear-gradient(90deg, #1a3a52, #2d5a7b)',
                    transformOrigin: 'left',
                    zIndex: 0
                  }}
                />
              ))}

              <motion.div className="process-grid" variants={staggerContainer}>
                {[
                  { 
                    Icon: Target, 
                    title: 'Plan', 
                    desc: 'We understand your goals and recommend the right placements.' 
                  },
                  { 
                    Icon: Palette, 
                    title: 'Design', 
                    desc: 'We create visuals that match your brand and campaign needs.' 
                  },
                  { 
                    Icon: Settings, 
                    title: 'Execute', 
                    desc: 'We manage production and installation across selected locations.' 
                  },
                  { 
                    Icon: Rocket, 
                    title: 'Launch', 
                    desc: 'Your campaign goes live and reaches real audiences.' 
                  }
                ].map((step, index) => (
                  <motion.div 
                    key={index} 
                    className="process-card" 
                    variants={fadeInUp}
                    style={{ position: 'relative', zIndex: 1 }}
                  >
                    <div className="process-icon">
                      <step.Icon size={36} color="#1a3a52" strokeWidth={2} />
                    </div>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Where We Work Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="locations-section"
          >
            <motion.h2 className="locations-title" variants={fadeInUp}>
              Where <span className="italic">We Work</span>
            </motion.h2>
            <motion.p className="locations-subtitle" variants={fadeInUp}>
              Serving businesses across the UAE with local expertise and nationwide reach
            </motion.p>

            <motion.div className="locations-grid" variants={staggerContainer}>
              {[
                { name: 'Dubai', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80' },
                { name: 'Abu Dhabi', image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=600&q=80' },
                { name: 'Sharjah', image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=600&q=80' },
                { name: 'Ajman', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80' },
                { name: 'Ras Al Khaimah', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80' },
                { name: 'Fujairah', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80' },
                { name: 'Umm Al Quwain', image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80' },
                { name: 'Al Ain', image: 'https://images.unsplash.com/photo-1451847251646-8a6c0dd1510c?w=600&q=80' }
              ].map((location, index) => (
                <motion.div key={index} className="location-card" variants={fadeInUp}>
                  <img src={location.image} alt={location.name} />
                  <div className="location-overlay">
                    <div className="location-name">{location.name}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* CTA Section */}
          <motion.section 
            className="cta-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="cta-content">
              <motion.h2 variants={fadeInUp}>Ready to work with us?</motion.h2>
              <motion.p variants={fadeInUp}>
                Let's create something remarkable together. Get in touch to discuss your advertising needs and discover how we can help your brand stand out.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link href="/contact" className="cta-button">
                  Get Started <ArrowRight size={20} />
                </Link>
              </motion.div>
            </div>
          </motion.section>
        </section>

        {/* Footer */}
        <footer style={{ background: '#1a1a1a', color: 'white', padding: '6rem 2rem 4rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3.5rem', marginBottom: '3.5rem' }}>
              {/* Brand Section */}
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="32" height="32" viewBox="0 0 32 32" style={{ display: 'inline-block' }}>
                    <circle cx="16" cy="16" r="13" fill="none" stroke="white" strokeWidth="4"/>
                    <rect x="18" y="3" width="10" height="10" fill="#ff6b35" rx="1"/>
                  </svg>
                  <span style={{ color: 'white' }}>ne Click</span>
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
                </ul>
              </div>

              {/* Support Section */}
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Support</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <li><a href="tel:+971524065110" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>+971 52 406 5110</a></li>
                  <li><a href="mailto:hello@oneclickadv.ae" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>hello@oneclickadv.ae</a></li>
                  <li><Link href="/contact" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Terms & Conditions</Link></li>
                  <li><Link href="/contact" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Privacy Policy</Link></li>
                </ul>
              </div>
            </div>

            {/* Footer Bottom */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
              <span>&copy; 2024 One Click Advertisement. All Rights Reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
