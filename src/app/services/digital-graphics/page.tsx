"use client";

import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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

export default function DigitalGraphicsPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const benefits = [
    { title: "Large Format Printing", desc: "High-quality digital printing for any size requirement" },
    { title: "Wall & Window Graphics", desc: "Transform spaces with custom printed graphics" },
    { title: "Interior Branding", desc: "Complete interior graphic solutions for offices and retail" },
    { title: "Premium Materials", desc: "UV-resistant, weatherproof materials for UAE climate" }
  ];

  const locations = [
    { name: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80" },
    { name: "Abu Dhabi", image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&q=80" },
    { name: "Sharjah", image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&q=80" },
    { name: "Ajman", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80" }
  ];

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

        .service-detail-page {
          background: #f5f5f5;
          min-height: 100vh;
          padding-top: 100px;
        }

        .back-button {
          position: fixed;
          top: 120px;
          left: 40px;
          z-index: 100;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .back-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

        .service-hero {
          background: transparent;
          padding: 8rem 2rem;
          min-height: 50vh;
          display: flex;
          align-items: center;
          margin: 0 auto 2rem auto;
          max-width: 1200px;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 2rem;
          align-items: center;
        }

        .hero-text {
          padding: 2rem 0;
        }

        .hero-text h1 {
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 0;
          line-height: 1;
          color: #000;
        }

        .hero-text .subtitle {
          font-style: italic;
          color: #000;
          font-size: 3.5rem;
          font-weight: 400;
          margin-bottom: 1.5rem;
          line-height: 1;
        }

        .hero-text p {
          color: #333;
          line-height: 1.6;
          font-size: 0.95rem;
          max-width: 90%;
        }

        .hero-image-large {
          border-radius: 20px;
          overflow: hidden;
          height: 350px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
          position: relative;
          transition: all 0.4s ease;
        }

        .hero-image-large:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.2);
        }

        .hero-image-large img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }

        .hero-image-large img.active {
          opacity: 1;
        }

        .why-choose-section {
          padding: 2rem;
          margin: 0 auto 2rem auto;
          max-width: 1200px;
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 3rem;
          align-items: start;
        }

        .why-choose-title {
          font-size: 2.5rem;
          font-weight: 900;
          line-height: 1.2;
          color: #000;
        }

        .accordion-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .accordion-item {
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          overflow: hidden;
          background: transparent;
          transition: all 0.3s ease;
        }

        .accordion-item.open {
          background: white;
          border-color: #ff6b35;
          box-shadow: 0 4px 12px rgba(255, 107, 53, 0.15);
          transform: translateX(5px);
        }

        .accordion-header {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          background: white;
          border-radius: 12px;
        }

        .accordion-header:hover {
          background: rgba(255, 107, 53, 0.05);
          transform: translateX(3px);
        }

        .accordion-icon {
          transition: transform 0.3s ease;
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
          max-height: 200px;
        }

        .accordion-content-inner {
          padding: 0 1.5rem 1.5rem 1.5rem;
          color: #666;
          line-height: 1.6;
        }

        .locations-section {
          padding: 3rem 2rem;
          margin: 0 auto 2rem auto;
          max-width: 1200px;
          background: white;
          border-radius: 20px;
        }

        .locations-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .locations-title {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 0.5rem;
          color: #000;
        }

        .locations-subtitle {
          font-style: italic;
          color: #000;
          font-size: 2rem;
          font-weight: 400;
          margin-bottom: 1.5rem;
        }

        .locations-description {
          color: #333;
          font-size: 1rem;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto 3rem auto;
        }

        .locations-map-container {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: #f0f0f0;
        }

        .locations-map-container img {
          width: 100%;
          height: auto;
          display: block;
        }

        .cta-section {
          background: #1a1a1a;
          padding: 3rem 2rem;
          margin: 0 auto 4rem auto;
          max-width: 800px;
          border-radius: 20px;
          text-align: center;
          color: white;
        }

        .cta-title {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 0.3rem;
        }

        .cta-subtitle {
          font-style: italic;
          color: rgba(255,255,255,0.8);
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .cta-description {
          color: rgba(255,255,255,0.7);
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .cta-form {
          max-width: 350px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }

        .form-input,
        .form-select {
          padding: 0.9rem;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.05);
          color: white;
          font-size: 0.95rem;
          outline: none;
        }

        .form-input::placeholder {
          color: rgba(255,255,255,0.5);
        }

        .form-select {
          cursor: pointer;
        }

        .form-select option {
          background: #1a1a1a;
          color: white;
        }

        .submit-button {
          padding: 1rem 2rem;
          background: white;
          color: #1a1a1a;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255,255,255,0.3);
        }

        @media (max-width: 768px) {
          .service-detail-page {
            padding-top: 80px;
          }

          .back-button {
            top: 90px;
            left: 20px;
          }

          .hero-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .hero-text h1 {
            font-size: 2rem;
          }

          .hero-text .subtitle {
            font-size: 1.8rem;
          }

          .why-choose-section {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .locations-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .locations-title {
            font-size: 2rem;
          }

          .locations-subtitle {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="service-detail-page">
        <Link href="/services">
          <button className="back-button">
            <ArrowLeft size={20} />
          </button>
        </Link>

        {/* Hero Section */}
        <motion.section
          className="service-hero"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="hero-content">
            <motion.div className="hero-text" variants={fadeInUp}>
              <h1>Digital Printed</h1>
              <div className="subtitle">Graphics</div>
              <p>
                Large format printing & interior graphics solutions that withstand the UAE climate while maintaining premium aesthetics.
              </p>
            </motion.div>

            <motion.div className="hero-image-large" variants={fadeInUp}>
              {heroImages.map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`Digital Graphics ${index + 1}`}
                  className={currentImageIndex === index ? 'active' : ''}
                />
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Why Choose Section */}
        <motion.section
          className="why-choose-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 className="why-choose-title" variants={fadeInUp}>
            Digital Solutions
          </motion.h2>

          <motion.div className="accordion-list" variants={fadeInUp}>
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`accordion-item ${openAccordion === index ? 'open' : ''}`}
              >
                <div
                  className="accordion-header"
                  onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                >
                  <span>{benefit.title}</span>
                  <ChevronDown
                    size={20}
                    className={`accordion-icon ${openAccordion === index ? 'open' : ''}`}
                  />
                </div>
                <div className={`accordion-content ${openAccordion === index ? 'open' : ''}`}>
                  <div className="accordion-content-inner">
                    {benefit.desc}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* Service Locations */}
        <motion.section
          className="locations-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="locations-header" variants={fadeInUp}>
            <h2 className="locations-title">Service</h2>
            <div className="locations-subtitle">Locations</div>
            <p className="locations-description">
              We provide our services across Dubai, Abu Dhabi, Sharjah, Ajman, and the Northern Emirates, ensuring reliable support and professional execution throughout the UAE.
            </p>
          </motion.div>

          <motion.div className="locations-map-container" variants={fadeInUp}>
            <svg viewBox="0 0 800 400" style={{ width: '100%', height: 'auto' }}>
              {/* Background */}
              <rect width="800" height="400" fill="#f8f9fa"/>
              
              {/* UAE Map Outline (simplified) */}
              <path d="M 150 200 L 200 180 L 280 160 L 350 150 L 420 155 L 480 165 L 540 180 L 580 200 L 600 230 L 590 270 L 560 300 L 500 320 L 420 330 L 350 325 L 280 310 L 220 280 L 180 250 Z" 
                    fill="#e9ecef" 
                    stroke="#dee2e6" 
                    strokeWidth="2"/>
              
              {/* Location Markers */}
              {/* Dubai */}
              <g>
                <circle cx="480" cy="240" r="30" fill="rgba(255, 107, 53, 0.2)"/>
                <circle cx="480" cy="240" r="8" fill="#ff6b35"/>
                <text x="480" y="280" textAnchor="middle" fill="#1a1a1a" fontSize="16" fontWeight="600">Dubai</text>
              </g>
              
              {/* Abu Dhabi */}
              <g>
                <circle cx="350" cy="260" r="30" fill="rgba(255, 107, 53, 0.2)"/>
                <circle cx="350" cy="260" r="8" fill="#ff6b35"/>
                <text x="350" y="300" textAnchor="middle" fill="#1a1a1a" fontSize="16" fontWeight="600">Abu Dhabi</text>
              </g>
              
              {/* Sharjah */}
              <g>
                <circle cx="520" cy="210" r="30" fill="rgba(255, 107, 53, 0.2)"/>
                <circle cx="520" cy="210" r="8" fill="#ff6b35"/>
                <text x="520" y="195" textAnchor="middle" fill="#1a1a1a" fontSize="16" fontWeight="600">Sharjah</text>
              </g>
              
              {/* Ajman */}
              <g>
                <circle cx="540" cy="190" r="30" fill="rgba(255, 107, 53, 0.2)"/>
                <circle cx="540" cy="190" r="8" fill="#ff6b35"/>
                <text x="540" y="175" textAnchor="middle" fill="#1a1a1a" fontSize="16" fontWeight="600">Ajman</text>
              </g>
              
              {/* Northern Emirates */}
              <g>
                <circle cx="580" cy="160" r="30" fill="rgba(255, 107, 53, 0.2)"/>
                <circle cx="580" cy="160" r="8" fill="#ff6b35"/>
                <text x="580" y="145" textAnchor="middle" fill="#1a1a1a" fontSize="14" fontWeight="600">Northern</text>
                <text x="580" y="160" textAnchor="middle" fill="#1a1a1a" fontSize="14" fontWeight="600">Emirates</text>
              </g>
              
              {/* Labels */}
              <text x="100" y="220" fill="#6c757d" fontSize="14" fontWeight="500">Arabian Gulf</text>
              <text x="650" y="320" fill="#6c757d" fontSize="14" fontWeight="500">Oman</text>
            </svg>
          </motion.div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="cta-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 className="cta-title" variants={fadeInUp}>
            Start Your
          </motion.h2>
          <motion.div className="cta-subtitle" variants={fadeInUp}>
            Campaign
          </motion.div>
          <motion.p className="cta-description" variants={fadeInUp}>
            Tell us about your requirements and we'll get back to you quickly
          </motion.p>

          <motion.div variants={fadeInUp} style={{ marginTop: '2rem' }}>
            <Link href="/campaign" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', padding: '1.2rem 3rem', background: 'white', color: '#1a1a1a', fontWeight: 700, borderRadius: '12px', textDecoration: 'none', transition: 'all 0.3s ease', fontSize: '1.1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              Submit Request <ArrowRight size={22} />
            </Link>
          </motion.div>
        </motion.section>

        {/* Footer */}
        <footer style={{ background: '#1a1a1a', color: 'white', padding: '6rem 4rem 4rem 4rem', maxWidth: '100%', margin: '0', borderRadius: '0' }}>
          <div style={{ maxWidth: '100%', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3.5rem', marginBottom: '3.5rem' }}>
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
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Services</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <li><Link href="/services/branding" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Branding</Link></li>
                  <li><Link href="/services/digital-graphics" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Graphics</Link></li>
                  <li><Link href="/services/signage" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Signage</Link></li>
                  <li><Link href="/services/vehicle-graphics" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Vehicle Wraps</Link></li>
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Company</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <li><Link href="/about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>About</Link></li>
                  <li><Link href="/services" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Services</Link></li>
                  <li><Link href="/contact" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Contact</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <Phone size={18} style={{ color: '#ff6b35', flexShrink: 0 }} />
                    <a href="tel:+971524065110" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>+971 52 406 5110</a>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <Mail size={18} style={{ color: '#ff6b35', flexShrink: 0 }} />
                    <a href="mailto:hello@oneclickadv.ae" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>hello@oneclickadv.ae</a>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <MapPin size={18} style={{ color: '#ff6b35', flexShrink: 0 }} />
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>Dubai, UAE</span>
                  </li>
                </ul>
              </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
              &copy; {new Date().getFullYear()} One Click Advertisement. All Rights Reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
