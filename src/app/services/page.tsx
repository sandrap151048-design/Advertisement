"use client";

import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
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

const services = [
  {
    title: "Billboards",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80",
    description: "High-impact outdoor advertising"
  },
  {
    title: "Retail Signage",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
    description: "Premium storefront solutions"
  },
  {
    title: "Vehicle Branding",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80",
    description: "Mobile advertising solutions"
  },
  {
    title: "Campaign Solutions",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
    description: "End-to-end campaign management"
  }
];

const accordionItems = [
  {
    title: "High-Impact Visibility",
    content: "Our strategic placements ensure maximum exposure for your brand across high-traffic areas in the UAE."
  },
  {
    title: "Prime Locations",
    content: "Access to premium advertising spaces in Dubai, Abu Dhabi, and across all seven emirates."
  },
  {
    title: "Fast Execution",
    content: "Quick turnaround times from concept to installation, ensuring your campaigns launch on schedule."
  },
  {
    title: "End-to-End Service",
    content: "Complete support from design and production to installation and maintenance."
  }
];

export default function ServicesPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.classList.add('clicked');
    setTimeout(() => {
      card.classList.remove('clicked');
    }, 600);
  };

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

        .services-page {
          background: #ffffff;
          min-height: 100vh;
        }

        .hero-services {
          position: relative;
          height: 70vh;
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin-top: 100px;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.5);
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%);
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

        .hero-title {
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -2px;
        }

        .hero-title .highlight {
          color: #FF6B35;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: rgba(255,255,255,0.9);
          max-width: 600px;
          margin: 0 auto 2rem auto;
          line-height: 1.6;
        }

        .services-section {
          padding: clamp(4rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem);
          background: #f5f5f5;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 900;
          margin-bottom: 1rem;
          color: #1a1a1a;
        }

        .section-title .italic {
          font-style: italic;
          color: #666;
        }

        .section-subtitle {
          font-size: 1rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .service-card {
          position: relative;
          height: 300px;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          will-change: transform, box-shadow;
        }

        .service-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.15), transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 1;
        }

        .service-card:hover {
          transform: translateY(-8px) scale(1.02);
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 0 25px rgba(255, 255, 255, 0.15), 0 12px 30px rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .service-card:hover::before {
          opacity: 1;
        }

        .service-card:active {
          transform: scale(0.98);
          box-shadow: 0 0 35px rgba(255, 255, 255, 0.25), 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        @keyframes glowPulse {
          0% {
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.15);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.3);
          }
          100% {
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.15);
          }
        }

        .service-card.clicked {
          animation: glowPulse 0.6s ease-out;
        }

        .service-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .service-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2rem;
          color: white;
          z-index: 2;
          transition: all 0.3s ease;
        }

        .service-card:hover .service-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%);
        }

        .service-title {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          transition: all 0.3s ease;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }

        .service-card:hover .service-title {
          color: #ffffff;
          text-shadow: 0 0 20px rgba(255,255,255,0.5), 0 2px 8px rgba(0,0,0,0.5);
          transform: translateY(-2px);
        }

        .service-desc {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.8);
          transition: all 0.3s ease;
        }

        .service-card:hover .service-desc {
          color: rgba(255,255,255,1);
          transform: translateY(-2px);
        }

        .why-choose-section {
          padding: clamp(4rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem);
          background: #ffffff;
        }

        .why-choose-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .why-choose-content h2 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 900;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .why-choose-content p {
          color: #666;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .accordion {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .accordion-item {
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          overflow: hidden;
          background: white;
          transition: all 0.3s ease;
        }

        .accordion-item.open {
          border-color: #7C3AED;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.1);
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
        }

        .accordion-header:hover {
          background: rgba(124, 58, 237, 0.05);
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

        .cta-section {
          position: relative;
          height: 60vh;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .cta-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .cta-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.4);
        }

        .cta-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 1;
        }

        .cta-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          max-width: 800px;
          padding: 2rem;
        }

        .cta-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 900;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .cta-title .italic {
          font-style: italic;
        }

        .cta-subtitle {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.9);
          margin-bottom: 2rem;
          line-height: 1.6;
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

        /* Responsive */
        @media (max-width: 768px) {
          .hero-services {
            margin-top: 80px;
            height: 60vh;
          }

          .services-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .service-card {
            height: 250px;
          }

          .why-choose-container {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .cta-section {
            height: 50vh;
          }
        }
      `}</style>

      <div className="services-page">
        {/* Hero Section */}
        <section className="hero-services">
          <div className="hero-bg">
            <img 
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80" 
              alt="Stand Out Everywhere" 
            />
          </div>
          <div className="hero-overlay"></div>
          <motion.div 
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 className="hero-title" variants={fadeInUp}>
              Stand Out <br />
              Every<span className="highlight">where</span>
            </motion.h1>
            <motion.p className="hero-subtitle" variants={fadeInUp}>
              High-impact outdoor advertising designed to make your brand visible, memorable, and impossible to ignore across the places that matter most.
            </motion.p>
          </motion.div>
        </section>

        {/* Our Services Section */}
        <section className="services-section">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="section-header" variants={fadeInUp}>
              <h2 className="section-title">
                Our <br />
                <span className="italic">Services</span>
              </h2>
              <p className="section-subtitle">
                Flexible advertising solutions tailored to your brand.
              </p>
            </motion.div>

            <motion.div className="services-grid" variants={staggerContainer}>
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="service-card"
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  onMouseMove={handleCardMouseMove}
                  onClick={handleCardClick}
                >
                  <img src={service.image} alt={service.title} />
                  <div className="service-overlay">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-desc">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Why Choose One Click Section */}
        <section className="why-choose-section">
          <motion.div
            className="why-choose-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="why-choose-content" variants={fadeInUp}>
              <h2>Why Choose One Click</h2>
              <p>
                As the leader in outdoor hope, we deliver measurable results through strategic placements and creative excellence.
              </p>
            </motion.div>

            <motion.div className="accordion" variants={fadeInUp}>
              {accordionItems.map((item, index) => (
                <div
                  key={index}
                  className={`accordion-item ${openAccordion === index ? 'open' : ''}`}
                >
                  <div
                    className="accordion-header"
                    onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                  >
                    <span>{item.title}</span>
                    <ChevronDown 
                      size={20} 
                      className={`accordion-icon ${openAccordion === index ? 'open' : ''}`}
                    />
                  </div>
                  <div className={`accordion-content ${openAccordion === index ? 'open' : ''}`}>
                    <div className="accordion-content-inner">
                      {item.content}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-bg">
            <img 
              src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&q=80" 
              alt="Ready to make your brand" 
            />
          </div>
          <div className="cta-overlay"></div>
          <motion.div 
            className="cta-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 className="cta-title" variants={fadeInUp}>
              Ready to make your brand <span className="italic">impossible to ignore?</span>
            </motion.h2>
            <motion.p className="cta-subtitle" variants={fadeInUp}>
              Launch your advertising campaign with high-impact placements across prime locations - fast, simple, and effective.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/register" className="cta-button">
                Get started <ArrowRight size={20} />
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
              <span suppressHydrationWarning>&copy; {currentYear || new Date().getFullYear()} One Click Advertisement. All Rights Reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
