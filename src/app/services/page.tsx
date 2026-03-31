"use client";

import { motion, Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronDown, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ServiceMap from '@/app/components/ServiceMap';

const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.9,
    filter: 'blur(10px)'
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { 
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as any
    } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const services = [
  {
    title: "Branding & Corporate Identity",
    image: "/signage-branding.png",
    description: "Brand implementation, rollout & corporate identity applications",
    details: ["Brand implementation & rollout", "Corporate identity applications", "Office branding & interior graphics", "Brand consistency across multiple locations"],
    link: "/services/branding"
  },
  {
    title: "Digital Printed Graphics",
    image: "/signage-digital-print.png",
    description: "Large format printing & interior graphics",
    details: ["Large format digital printing", "Wall, glass & window graphics", "Frosted film & privacy films", "Floor & promotional graphics", "Wallpaper & interior branding"],
    link: "/services/digital-graphics"
  },
  {
    title: "Vehicle Graphics & Fleet Branding",
    image: "/signage-vehicle.png",
    description: "Full & partial vehicle wraps for mobile advertising",
    details: ["Full & partial vehicle wraps", "Corporate fleet branding", "Reflective & safety graphics", "Promotional vehicle advertising"],
    link: "/services/vehicle-branding"
  },
  {
    title: "Signage Production & Installation",
    image: "/signage-production.png",
    description: "Indoor & outdoor signage solutions",
    details: ["Indoor & outdoor signage", "Illuminated & non-illuminated signboards", "3D letter signs (acrylic, metal, LED)", "Directional, wayfinding & safety signage", "Mall, retail & commercial signage"],
    link: "/services/signage"
  },
  {
    title: "Exhibition, Display & POS",
    image: "/signage-exhibition.png",
    description: "Exhibition stands, kiosks & point of sale displays",
    details: ["Exhibition stands & kiosks", "Pop-up systems & backdrops", "Roll-up & X-banners", "Point of Sale (POS) & in-store displays"],
    link: "/services/exhibition"
  },
  {
    title: "Cladding & Facade Solutions",
    image: "/signage-cladding.png",
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

  // 3D Parallax Mouse Tracking
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 20, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  const rotateX = useTransform(springY, [0, 1], [12, -12]);
  const rotateY = useTransform(springX, [0, 1], [-12, 12]);
  const bgX = useTransform(springX, [0, 1], [-20, 20]);
  const bgY = useTransform(springY, [0, 1], [-20, 20]);
  
  const handleHeroMouseMove = (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
  };

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
      image: service.image || "/services-hero-bg.png",
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
    
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple-effect');
    
    card.appendChild(ripple);
    
    // Add clicked animation
    card.classList.add('clicked');
    
    // Navigate after animation
    setTimeout(() => {
      window.location.href = link;
    }, 600);
    
    setTimeout(() => {
      ripple.remove();
    }, 1000);
  };

  return (
    <>
      <style jsx global>{`

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
          padding-top: 140px;
          background-color: #050505;
          perspective: 1500px;
        }

        .hero-background {
          position: absolute;
          inset: -30px;
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
          background: linear-gradient(135deg, rgba(30,0,0,0.15) 0%, rgba(0,0,0,0.85) 100%);
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          max-width: 900px;
          padding: 2rem;
          margin: 0 auto;
          transform-style: preserve-3d;
          pointer-events: none;
        }

        .hero-title {
          font-size: clamp(2.5rem, 8vw, 5.5rem);
          font-weight: 950;
          line-height: 1.05;
          margin-bottom: 1.5rem;
          letter-spacing: -2px;
          color: white;
          word-break: keep-all;
          overflow-wrap: break-word;
          transform: translateZ(100px);
          text-shadow: 0 15px 40px rgba(0,0,0,0.8);
        }

        .hero-title .highlight {
          color: #e61e25;
          display: inline-block;
          transform: translateZ(150px);
          text-shadow: 0 0 30px rgba(230,30,37,0.6);
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.3rem);
          color: rgba(255,255,255,0.95);
          max-width: 600px;
          margin: 0 auto 2rem auto;
          line-height: 1.6;
          text-shadow: 0 4px 15px rgba(0,0,0,0.6);
          transform: translateZ(60px);
          font-weight: 500;
        }

        .services-section {
          padding: 6rem 1.5rem;
          background: #ffffff;
        }

        .section-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .section-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 900;
          margin-bottom: 1rem;
          color: #1a1a1a;
          letter-spacing: -1px;
        }

        .section-title .italic {
          font-style: italic;
          color: #e61e25;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .services-deck {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 600px;
          max-width: 100vw;
          margin: 4rem auto;
          perspective: 1000px;
        }

        .service-card {
          position: absolute;
          width: 300px;
          height: 420px;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(10px);
          will-change: transform, box-shadow, z-index;
          transform-origin: bottom center;
          transform: translateX(calc(var(--offset) * 160px)) 
                     translateY(calc(var(--offset) * var(--offset) * 12px)) 
                     rotate(calc(var(--offset) * 8deg));
        }

        .service-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(230, 30, 37, 0.1), transparent 40%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 1;
        }

        .service-card:hover {
          transform-origin: bottom center;
          transform: translateX(calc(var(--offset) * 160px)) 
                     translateY(-50px) 
                     rotate(0deg) 
                     scale(1.15);
          z-index: 100 !important;
          box-shadow: 0 40px 80px rgba(230, 30, 37, 0.2), 0 0 0 2px rgba(230, 30, 37, 0.5);
          border-color: rgba(230, 30, 37, 0.3);
        }

        .service-card:hover::before {
          opacity: 1;
        }

        .service-card.clicked {
          transform: scale(1.08);
          z-index: 50;
          box-shadow: 0 0 100px rgba(230, 30, 37, 0.4);
        }

        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          transform: scale(0);
          animation: ripple 0.8s linear;
          pointer-events: none;
          z-index: 10;
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }

        .service-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .service-card:hover img {
          transform: scale(1.1);
        }

        .service-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2.5rem;
          color: white;
          z-index: 2;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .service-card:hover .service-overlay {
          background: linear-gradient(to top, rgba(230, 30, 37, 0.8) 0%, rgba(0,0,0,0.4) 100%);
        }

        .service-card.clicked .service-overlay {
          justify-content: center;
          align-items: center;
          background: rgba(230, 30, 37, 0.95);
        }

        .service-title {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 0.8rem;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        .service-card:hover .service-title {
          transform: translateY(-5px);
        }

        .service-card.clicked .service-title {
          font-size: 2.5rem;
          text-align: center;
          transform: scale(1.1);
        }

        .service-desc {
          font-size: 1rem;
          color: rgba(255,255,255,0.9);
          line-height: 1.6;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          max-width: 90%;
        }

        .service-card:hover .service-desc {
          opacity: 1;
          transform: translateY(-5px);
        }

        .service-card.clicked .service-desc {
          opacity: 0;
          display: none;
        }

        .why-choose-section {
          padding: 8rem 1.5rem;
          background: #fdfdfd;
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
          border-color: #e61e25;
          box-shadow: 0 4px 12px rgba(230, 30, 37, 0.1);
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
          background: rgba(230, 30, 37, 0.05);
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
          padding: 8rem 2rem;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #111;
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
          filter: brightness(0.7);
        }

        .cta-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4));
          z-index: 1;
        }

        .cta-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          max-width: 900px;
          padding: clamp(3rem, 6vw, 4rem) 1.5rem;
          width: 100%;
        }

        .cta-title {
          font-size: clamp(1.85rem, 5vw, 3.2rem);
          font-weight: 900;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .cta-subtitle {
          font-size: clamp(0.95rem, 2vw, 1.15rem);
          color: rgba(255,255,255,0.9);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          padding: 1rem 2.5rem;
          background: #e61e25;
          color: white;
          font-weight: 700;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1rem;
          box-shadow: 0 4px 15px rgba(230, 30, 37, 0.3);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          background: #ff2d35;
          box-shadow: 0 8px 25px rgba(230, 30, 37, 0.4);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .why-choose-container { grid-template-columns: 1fr; gap: 3rem; }
        }

        @media (max-width: 768px) {
          .hero-services {
            height: auto;
            min-height: 100vh;
            padding: 120px 1.5rem 60px 1.5rem;
          }

          .hero-title {
            font-size: clamp(2.2rem, 10vw, 3.2rem);
            letter-spacing: -1px;
            margin-bottom: 1rem;
          }

          .hero-subtitle {
            font-size: 1rem;
            padding: 0;
            margin-bottom: 1.5rem;
          }

          .services-section {
            padding: 3rem 1rem 0 1rem;
          }

          .services-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 0 0.5rem;
          }

          .service-card {
            height: 260px;
          }

          .service-title {
            font-size: 1.4rem;
          }

          .why-choose-section {
            padding: 3rem 1rem 4rem 1rem;
          }

          .why-choose-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .why-choose-content h2 {
            font-size: 2.2rem;
            text-align: left;
          }

          .why-choose-content p {
            text-align: left;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2.22rem;
            line-height: 1.2;
          }

          .service-card {
            height: 240px;
          }

          .service-title {
            font-size: 1.3rem;
          }
        }

      `}</style>

      <div className="services-page">
        {/* Hero Section */}
        <section className="hero-services" onMouseMove={handleHeroMouseMove}>
          <motion.div 
            className="hero-background"
            style={{ x: bgX, y: bgY }}
          >
            <img 
              src="/signage-production.png" 
              alt="Services Background" 
            />
          </motion.div>
          <div className="hero-overlay"></div>

          <motion.div 
            className="hero-content"
            style={{ rotateX, rotateY }}
            initial={{ opacity: 0, rotateX: 20, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
          >
            <motion.h1 
              className="hero-title" 
              initial={{ z: -150, rotateY: -15, opacity: 0 }}
              animate={{ z: 0, rotateY: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3, type: "spring", bounce: 0.4 }}
            >
              Stand Out <br />
              Every<motion.span 
                className="highlight"
                animate={{ 
                    textShadow: [
                        "0px 0px 10px rgba(230,30,37,0.5)",
                        "0px 0px 40px rgba(230,30,37,1)",
                        "0px 0px 10px rgba(230,30,37,0.5)"
                    ]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >where</motion.span>
            </motion.h1>
            <motion.p 
              className="hero-subtitle" 
              initial={{ opacity: 0, y: 30, z: -50 }}
              animate={{ opacity: 1, y: 0, z: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
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
                Our <span className="italic">Services</span>
              </h2>
              <p className="section-subtitle">
                Flexible advertising solutions tailored to your brand.
              </p>
            </motion.div>

            <motion.div className="services-deck" variants={fadeInUp}>
              {allServices.map((service, index) => {
                const total = allServices.length;
                const offset = index - (total - 1) / 2;
                const absOffset = Math.abs(offset);
                const zIndex = 50 - Math.floor(absOffset * 10);
                
                return (
                <div
                  key={index}
                  className="service-card"
                  onMouseMove={handleCardMouseMove}
                  onClick={(e) => handleCardClick(e, service.link)}
                  style={{
                    '--offset': offset,
                    '--abs-offset': absOffset,
                    zIndex: zIndex
                  } as any}
                >
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/services-hero-bg.png';
                    }}
                  />
                  <div className="service-overlay">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-desc">{service.description}</p>
                  </div>
                </div>
              )})}
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
              src="/projects-hero-bg.png" 
              alt="Ready to make your brand impossible to ignore" 
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
