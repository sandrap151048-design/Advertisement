"use client";

import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
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
          transition: transform 0.3s ease;
        }

        .service-card:hover {
          transform: scale(1.02);
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
        }

        .service-title {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .service-desc {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.9);
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
              src="https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1600&q=80" 
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
      </div>
    </>
  );
}
