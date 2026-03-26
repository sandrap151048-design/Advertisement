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
    title: "Branding & Corporate Identity",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    description: "Brand implementation, rollout & corporate identity applications",
    details: ["Brand implementation & rollout", "Corporate identity applications", "Office branding & interior graphics", "Brand consistency across multiple locations"],
    link: "/services/branding"
  },
  {
    title: "Digital Printed Graphics",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    description: "Large format printing & interior graphics",
    details: ["Large format digital printing", "Wall, glass & window graphics", "Frosted film & privacy films", "Floor & promotional graphics", "Wallpaper & interior branding"],
    link: "/services/digital-graphics"
  },
  {
    title: "Vehicle Graphics & Fleet Branding",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80",
    description: "Full & partial vehicle wraps for mobile advertising",
    details: ["Full & partial vehicle wraps", "Corporate fleet branding", "Reflective & safety graphics", "Promotional vehicle advertising"],
    link: "/services/vehicle-branding"
  },
  {
    title: "Signage Production & Installation",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80",
    description: "Indoor & outdoor signage solutions",
    details: ["Indoor & outdoor signage", "Illuminated & non-illuminated signboards", "3D letter signs (acrylic, metal, LED)", "Directional, wayfinding & safety signage", "Mall, retail & commercial signage"],
    link: "/services/signage"
  },
  {
    title: "Exhibition, Display & POS",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    description: "Exhibition stands, kiosks & point of sale displays",
    details: ["Exhibition stands & kiosks", "Pop-up systems & backdrops", "Roll-up & X-banners", "Point of Sale (POS) & in-store displays"],
    link: "/services/exhibition"
  },
  {
    title: "Cladding & Facade Solutions",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    description: "ACP cladding & architectural facade branding",
    details: ["ACP cladding works", "Aluminum & composite panel cladding", "Shopfront & facade branding", "Decorative architectural finishes", "Signage-integrated facade solutions"],
    link: "/services/cladding"
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
  const [dbServices, setDbServices] = useState<any[]>([]);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    // Immediately load cached services from localStorage for instant rendering
    try {
      const cached = localStorage.getItem('cachedDbServices');
      if (cached) {
        setDbServices(JSON.parse(cached));
      }
    } catch {}
    // Then fetch fresh data from API
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/services?t=${timestamp}`, { cache: 'no-store', headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' } });
      if (response.ok) {
        const data = await response.json();
        const servicesList = Array.isArray(data) ? data : [];
        setDbServices(servicesList);
        // Cache to localStorage for instant load next time
        try {
          localStorage.setItem('cachedDbServices', JSON.stringify(servicesList));
        } catch {}
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  // Combine hardcoded services with database services, ignoring blank database entries
  const allServices = [...services, ...dbServices.filter((s:any) => s.name).map((service:any) => {
    const slug = service.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return {
      title: service.name,
      image: service.items && service.items[0] ? service.items[0] : "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
      description: service.description,
      link: `/services/${slug}`
    };
  })];

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>, link: string) => {
    const card = e.currentTarget;
    
    // Add clicked animation
    card.classList.add('clicked');
    
    // Navigate after animation
    setTimeout(() => {
      window.location.href = link;
    }, 400);
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
          height: 100vh;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding-top: 100px;
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
          color: #e61e25;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: rgba(255,255,255,0.9);
          max-width: 600px;
          margin: 0 auto 2rem auto;
          line-height: 1.6;
        }

        .services-section {
          padding: 4rem 1rem 0 1rem;
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
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .service-card {
          position: relative;
          height: 300px;
          border-radius: 18px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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

        .service-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(124, 58, 237, 0.2), transparent 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 1;
        }

        .service-card:hover {
          transform: translateY(-6px);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.1), 0 12px 30px rgba(0, 0, 0, 0.15);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .service-card:hover::before {
          opacity: 1;
        }

        .service-card.clicked {
          transform: scale(1.05);
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 40px rgba(124, 58, 237, 0.3), 0 15px 40px rgba(0, 0, 0, 0.3);
          border-color: rgba(124, 58, 237, 0.4);
        }

        @keyframes cardPulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(124, 58, 237, 0.2), 0 12px 30px rgba(0, 0, 0, 0.2);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 40px rgba(124, 58, 237, 0.3), 0 15px 40px rgba(0, 0, 0, 0.3);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(124, 58, 237, 0.2), 0 12px 30px rgba(0, 0, 0, 0.2);
          }
        }

        .service-card.clicked::after {
          opacity: 1;
        }

        @keyframes spotlightPulse {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .service-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .service-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-start;
          padding: 2rem;
          color: white;
          z-index: 2;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .service-card:hover .service-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 100%);
        }

        .service-card.clicked .service-overlay {
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(20,0,40,0.85) 100%);
        }

        .service-title {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
          position: relative;
          z-index: 3;
        }

        .service-card:hover .service-title {
          color: #ffffff;
          text-shadow: 0 0 15px rgba(255,255,255,0.4), 0 2px 8px rgba(0,0,0,0.5);
          transform: translateY(-3px);
        }

        .service-card.clicked .service-title {
          font-size: 2.8rem;
          font-weight: 900;
          transform: translate(0, 0);
          text-align: center;
          margin-bottom: 0;
          color: #ffffff;
          text-shadow: 0 0 30px rgba(124, 58, 237, 0.8), 0 0 60px rgba(124, 58, 237, 0.4), 0 4px 12px rgba(0,0,0,0.8);
          letter-spacing: 1px;
        }

        @keyframes titleToCenter {
          0% {
            transform: translate(0, 0);
            font-size: 1.8rem;
          }
          50% {
            transform: translate(0, 0);
            font-size: 2.8rem;
          }
          100% {
            transform: translate(0, 0);
            font-size: 1.8rem;
          }
        }

        .service-desc {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.75);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 3;
        }

        .service-card:hover .service-desc {
          color: rgba(255,255,255,0.9);
          transform: translateY(-2px);
        }

        .service-card.clicked .service-desc {
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
        }

        .why-choose-section {
          padding: 6rem 1rem 8rem 1rem;
          background: #ffffff;
          min-height: 70vh;
          display: flex;
          align-items: center;
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
            height: auto;
            min-height: 250px;
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
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80" 
              alt="Stand Out Everywhere - High Impact Services" 
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
              {allServices.map((service, index) => (
                <motion.div
                  key={index}
                  className="service-card"
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  onMouseMove={handleCardMouseMove}
                  onClick={(e) => handleCardClick(e, service.link)}
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
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                Why Choose{' '}
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                    <circle cx="20" cy="20" r="17" fill="none" stroke="#1a1a1a" strokeWidth="4"/>
                    <rect x="23" y="3" width="13" height="13" fill="#e61e25" rx="1"/>
                  </svg>
                  <span style={{ color: '#1a1a1a' }}>ne Click</span>
                </span>
              </h2>
              <p>
                As the leader in outdoor advertising, we deliver measurable results through strategic placements and creative excellence.
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
              <Link href="/contact#campaign" className="cta-button">
                Get started <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </section>

      </div>
    </>
  );
}
