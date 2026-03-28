"use client";

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, Award, Globe, TrendingUp, Target, Palette, Settings, Rocket, Layout, Building2 } from 'lucide-react';
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

        .vision-mission-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 5rem;
        }

        .vm-card {
          background: white;
          padding: 3.5rem;
          border-radius: 32px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.05);
          transition: all 0.4s ease;
        }

        .vm-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(230, 30, 37, 0.1);
          border-color: #e61e25;
        }

        .vm-icon {
          width: 60px;
          height: 60px;
          background: rgba(230, 30, 37, 0.08);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #e61e25;
          margin-bottom: 2rem;
        }

        .vm-card h3 {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
          color: #1a1a1a;
          letter-spacing: -1px;
        }

        .vm-card p {
          color: #666;
          line-height: 1.8;
          font-size: 1.1rem;
        }

        .services-detail-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 4rem;
        }

        .service-detail-card {
          background: white;
          padding: 2.5rem;
          border-radius: 24px;
          border: 1px solid rgba(0,0,0,0.05);
          transition: all 0.4s ease;
        }

        .service-detail-card:hover {
          border-color: #e61e25;
          box-shadow: 0 15px 40px rgba(0,0,0,0.05);
        }

        .service-detail-card h3 {
          font-size: 1.4rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
          color: #1a1a1a;
          line-height: 1.3;
          height: 3.5rem;
          display: flex;
          align-items: center;
        }

        .service-bullets {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .service-bullets li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.8rem;
          color: #666;
          font-size: 0.95rem;
          line-height: 1.4;
        }

        .service-bullets li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #e61e25;
          font-weight: bold;
        }

        .process-section, .work-section {
          padding: 8rem 0;
          text-align: center;
        }

        .section-heading-main {
          font-size: 4rem;
          font-weight: 900;
          margin-bottom: 0.5rem;
          line-height: 1;
        }

        .section-heading-sub {
          font-size: 3rem;
          font-family: 'Playfair Display', serif;
          font-style: italic;
          color: #1a1a1a;
          margin-bottom: 1.5rem;
        }

        .section-desc {
          max-width: 600px;
          margin: 0 auto 4rem;
          color: #666;
          line-height: 1.6;
          font-size: 1.1rem;
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-top: 4rem;
          position: relative;
        }

        .process-step {
          background: white;
          padding: 2.5rem 1.8rem;
          border-radius: 12px;
          border: 1px solid #d1d5db;
          transition: all 0.4s ease;
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          text-align: left;
          height: 100%;
        }

        .process-header {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .process-icon {
          width: 48px;
          height: 48px;
          background: rgba(230, 30, 37, 0.05);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #e61e25;
          flex-shrink: 0;
          border: 1px solid rgba(230, 30, 37, 0.1);
          transition: all 0.3s ease;
        }

        .process-step h3 {
          font-size: 1.8rem;
          font-weight: 600;
          color: #111;
          margin: 0;
        }

        .process-step p {
          color: #4b5563;
          font-size: 1rem;
          line-height: 1.6;
          margin: 0;
        }

        /* Sequential line crossing ONLY in the gap between cards */
        .step-connector {
          position: absolute;
          top: 48px; /* Aligned with icon center */
          left: 100%;
          width: 1.5rem; /* Exactly the gap width */
          height: 3px;
          background: #e5e7eb;
          z-index: 1;
        }

        .step-progress-line {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: #e61e25;
          box-shadow: 0 0 10px rgba(230, 30, 37, 0.3);
        }

        .process-step:hover {
          border-color: #e61e25;
          transform: translateY(-5px);
        }

        .process-step:hover .process-icon {
          background: #e61e25;
          color: white;
        }

        @media (max-width: 1024px) {
          .step-connector {
            display: none;
          }
        }

        .work-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-top: 4rem;
        }

        .work-card {
          text-align: center;
        }

        .work-img-container {
          width: 100%;
          height: 180px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 1rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }

        .work-img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .work-card:hover .work-img-container img {
          transform: scale(1.1);
        }

        .work-card h4 {
          font-size: 0.95rem;
          font-weight: 800;
          color: #111;
          line-height: 1.4;
          padding: 0 0.5rem;
        }

        .compliance-section {
          background: #111;
          color: white;
          padding: 6rem 3rem;
          border-radius: 40px;
          margin: 6rem 0;
        }

        .compliance-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .compliance-info h2 {
          font-size: 3rem;
          font-weight: 900;
          margin-bottom: 2rem;
          letter-spacing: -1.5px;
        }

        .compliance-info p {
          color: #aaa;
          font-size: 1.2rem;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .compliance-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .compliance-item {
          background: rgba(255,255,255,0.05);
          padding: 1.5rem;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 1rem;
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.3s ease;
        }

        .compliance-item:hover {
          background: rgba(255,255,255,0.1);
          border-color: #e61e25;
        }

        .compliance-item span {
          color: #fff;
          font-weight: 700;
          font-size: 1rem;
        }

        .commitment-banner {
          background: white;
          color: #333;
          padding: 4rem;
          border-radius: 32px;
          text-align: center;
          margin-bottom: 5rem;
          border: 1px solid #f0f0f0;
          box-shadow: 0 10px 40px rgba(0,0,0,0.03);
        }

        .commitment-banner h2 {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
          color: #e61e25; /* Commitment in Red */
        }

        .commitment-banner p {
          font-size: 1.3rem;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
          color: #1a1a1a;
          font-weight: 500;
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
          background-image: url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80');
          background-size: cover;
          background-position: center;
          filter: brightness(0.4);
          z-index: 0;
        }

        .cta-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-section h2 {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 900;
          margin-bottom: 2rem;
          line-height: 1.1;
          letter-spacing: -2px;
        }

        @media (max-width: 1024px) {
          .section-layout {
            grid-template-columns: 1fr;
          }
          .services-detail-grid, .work-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .process-grid {
            grid-template-columns: 1fr;
          }
          .step-connector {
            display: none;
          }
          .compliance-grid, .vision-mission-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .services-detail-grid, .work-grid {
            grid-template-columns: 1fr;
          }
          .compliance-list {
            grid-template-columns: 1fr;
          }
          .commitment-banner {
            padding: 3rem 1.5rem;
          }
          .about-hero-title {
            font-size: 2.5rem;
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
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', verticalAlign: 'middle' }}>
                <svg width="0.8em" height="0.8em" viewBox="0 0 32 32" style={{ display: 'inline-block' }}>
                  <circle cx="16" cy="16" r="13" fill="none" stroke="white" strokeWidth="3"/>
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
          {/* Company Profile / Who We Are */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="section-layout">
              <motion.div className="section-info" variants={fadeInUp}>
                <h2 style={{ letterSpacing: '-1px' }}>
                  Company <br />
                  <span className="italic">Profile</span>
                </h2>
                <p>
                  One Click Advertisement is a full-service advertising and branding company delivering end-to-end visual communication solutions. We specialize in transforming spaces, surfaces, and screens into powerful brand experiences.
                </p>
                <p style={{ marginTop: '1.5rem' }}>
                  From high-quality printing to large-scale digital displays, we ensure your brand gets noticed—clearly, creatively, and professionally. We are a UAE-based advertising and branding solutions company delivering high-quality visual communication services to businesses across Dubai, Abu Dhabi, Sharjah, Ajman, and the Northern Emirates.
                </p>
                <p style={{ marginTop: '1.5rem' }}>
                  With a commitment to international standards and local market compliance, we provide complete turnkey solutions — from design and production to installation and maintenance.
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

          {/* Vision & Mission */}
          <div className="vision-mission-grid">
            <motion.div 
              className="vm-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="vm-icon"><TrendingUp size={32} /></div>
              <h3>Our Vision</h3>
              <p>To be recognized as a reliable and innovative branding and signage partner in the UAE, delivering world-class visual solutions that enhance brand presence and support business growth.</p>
            </motion.div>
            <motion.div 
              className="vm-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="vm-icon"><Target size={32} /></div>
              <h3>Our Mission</h3>
              <p>To deliver creative, compliant, and high-quality advertising solutions that meet UAE authority requirements while exceeding client expectations in terms of durability, safety, and visual impact.</p>
            </motion.div>
          </div>

          {/* Core Services Detailed */}
          <section className="work-section" style={{ paddingBottom: '0' }}>
            <motion.h2 className="section-heading-main" variants={fadeInUp}>Our Core</motion.h2>
            <motion.h3 className="section-heading-sub" variants={fadeInUp}>Services</motion.h3>
            <motion.p className="section-desc" variants={fadeInUp}>
              We deliver world-class visual solutions that enhance brand presence and support business growth across various platforms.
            </motion.p>

            <motion.div 
              className="services-detail-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  title: 'Branding & Corporate Identity',
                  items: ['Brand implementation & rollout', 'Corporate identity applications', 'Office branding & interior graphics', 'Brand consistency across multiple locations']
                },
                {
                  title: 'Digital Printed Graphics',
                  items: ['Large format digital printing', 'Wall, glass & window graphics', 'Frosted film & privacy films', 'Floor & promotional graphics', 'Wallpaper & interior branding']
                },
                {
                  title: 'Vehicle Graphics & Fleet Branding',
                  items: ['Full & partial vehicle wraps', 'Corporate fleet branding', 'Reflective & safety graphics', 'Promotional vehicle advertising']
                },
                {
                  title: 'Signage Production & Installation',
                  items: ['Indoor & outdoor signage', 'Illuminated & non-illuminated signboards', '3D letter signs (acrylic, metal, LED)', 'Directional, wayfinding & safety signage', 'Mall, retail & commercial signage']
                },
                {
                  title: 'Exhibition, Display & POS Solutions',
                  items: ['Exhibition stands & kiosks', 'Pop-up systems & backdrops', 'Roll-up & X-banners', 'Point of Sale (POS) & in-store displays']
                },
                {
                  title: 'Cladding & Facade Solutions',
                  items: ['ACP cladding works', 'Aluminum & composite panel cladding', 'Shopfront & facade branding', 'Decorative architectural finishes', 'Signage-integrated facade solutions']
                }
              ].map((service, idx) => (
                <motion.div key={idx} className="service-detail-card" variants={fadeInUp}>
                  <h3>{service.title}</h3>
                  <ul className="service-bullets">
                    {service.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Our Process Section */}
          <section className="process-section">
            <div className="container">
              <motion.h2 className="section-heading-main" variants={fadeInUp}>Our</motion.h2>
              <motion.h3 className="section-heading-sub" variants={fadeInUp}>Process</motion.h3>
              <motion.p className="section-desc" variants={fadeInUp}>
                A simple and efficient approach to launch your advertising campaign.
              </motion.p>

              <motion.div 
                className="process-grid" 
                variants={staggerContainer} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
              >
                {[
                  { title: 'Plan', desc: 'We understand your goals and recommend the right placements.', icon: <Layout size={24} /> },
                  { title: 'Design', desc: 'We create visuals that match your brand and campaign needs.', icon: <Palette size={24} /> },
                  { title: 'Execute', desc: 'We manage production and installation across selected locations.', icon: <Settings size={24} /> },
                  { title: 'Launch', desc: 'Your campaign goes live and reaches real audiences.', icon: <Rocket size={24} /> }
                ].map((step, idx) => (
                  <motion.div key={idx} className="process-step" variants={fadeInUp} style={{ position: 'relative' }}>
                    <div className="process-header">
                      <div className="process-icon">{step.icon}</div>
                      <h3>{step.title}</h3>
                    </div>
                    <p>{step.desc}</p>
                    
                    {idx < 3 && (
                      <div className="step-connector">
                        <motion.div 
                          className="step-progress-line"
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.8 + (idx * 0.5), ease: "easeInOut" }}
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Where We Work Section */}
          <section className="work-section">
            <div className="container">
              <motion.h2 className="section-heading-main" variants={fadeInUp}>Where</motion.h2>
              <motion.h3 className="section-heading-sub" variants={fadeInUp}>We Work</motion.h3>
              <motion.p className="section-desc" variants={fadeInUp}>
                Our advertising placements span across high-traffic urban locations, ensuring your brand reaches the right audience in the spaces that matter most.
              </motion.p>

              <motion.div className="work-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {[
                  { title: 'Retail & Shopping Malls', img: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80' },
                  { title: 'Corporate & Business Centers', img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80' },
                  { title: 'Hospitality (Hotels, Cafés & Restaurants)', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80' },
                  { title: 'Real Estate & Property Developers', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80' },
                  { title: 'Automotive & Logistics', img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80' },
                  { title: 'Healthcare & Clinics', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80' },
                  { title: 'Schools & Educational Institutions', img: '/images/about_school.png' },
                  { title: 'Government & Semi-Government Entities', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80' }
                ].map((item, idx) => (
                  <motion.div key={idx} className="work-card" variants={fadeInUp}>
                    <div className="work-img-container">
                      <img src={item.img} alt={item.title} />
                    </div>
                    <h4>{item.title}</h4>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Compliance Section */}
          <motion.div 
            className="compliance-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="compliance-grid">
              <div className="compliance-info">
                <h2>Compliance & Authority Approvals</h2>
                <p>We are experienced in working in accordance with UAE municipality and mall regulations, ensuring smooth approvals and proper installation.</p>
                <div className="compliance-list">
                  <div className="compliance-item"><CheckCircle size={20} color="#e61e25" /> <span>Dubai Municipality</span></div>
                  <div className="compliance-item"><CheckCircle size={20} color="#e61e25" /> <span>RTA Guidelines</span></div>
                  <div className="compliance-item"><CheckCircle size={20} color="#e61e25" /> <span>Mall Management</span></div>
                  <div className="compliance-item"><CheckCircle size={20} color="#e61e25" /> <span>Safety Standards</span></div>
                </div>
              </div>
              <div style={{ display: 'grid', placeItems: 'center' }}>
                 <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <p style={{ fontSize: '1.1rem', color: '#fff', textAlign: 'center', fontStyle: 'italic', maxWidth: '400px' }}>
                      "We ensure all projects meet UAE authority requirements for durability, safety, and long-term visual impact."
                    </p>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Commitment Banner */}
          <motion.div 
            className="commitment-banner"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 style={{ fontSize: '3.5rem', fontWeight: 900 }}>
              <span style={{ color: '#000', fontFamily: "'Bricolage Grotesque', sans-serif" }}>Our </span>
              <span style={{ color: '#e61e25', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>Commitment</span>
            </h2>
            <p>We are committed to delivering professional workmanship, premium finishing, and long-lasting branding solutions that withstand the UAE climate while maintaining strong visual impact.</p>
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
