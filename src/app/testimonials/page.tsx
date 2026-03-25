"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Filter } from 'lucide-react';
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

const categories = ['Billboards', 'Retail Signage', 'Vehicle Branding', 'Campaigns'] as const;

type CategoryKey = typeof categories[number];

const projectsByCategory: Record<CategoryKey, {
  title: string;
  description: string;
  images: { title: string; image: string; }[];
}> = {
  'Billboards': {
    title: 'Billboards',
    description: 'High-impact outdoor displays placed in high-traffic locations, designed to capture attention and deliver maximum visibility.',
    images: [
      { title: 'DIOR Luxury Billboard', image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80' },
      { title: 'Times Square LED Display', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
      { title: 'Downtown Billboard', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
      { title: 'Highway Billboard', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80' }
    ]
  },
  'Retail Signage': {
    title: 'Retail Signage',
    description: 'Premium storefront solutions that enhance brand presence at retail locations, attracting customers and building brand identity.',
    images: [
      { title: 'Luxury Store Front', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80' },
      { title: 'Mall Signage', image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80' },
      { title: 'Retail Display', image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80' },
      { title: 'Shop Window', image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80' }
    ]
  },
  'Vehicle Branding': {
    title: 'Vehicle Branding',
    description: 'Mobile advertising solutions turning vehicles into powerful marketing tools, reaching audiences wherever they go.',
    images: [
      { title: 'Fleet Wrapping', image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80' },
      { title: 'Delivery Van Branding', image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80' },
      { title: 'Bus Advertisement', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80' },
      { title: 'Car Wrap Design', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80' }
    ]
  },
  'Campaigns': {
    title: 'Campaign Solutions',
    description: 'End-to-end campaign management delivering measurable results, from strategy to execution across multiple channels.',
    images: [
      { title: 'Corporate Campaign', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80' },
      { title: 'Brand Launch', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80' },
      { title: 'Multi-Channel Campaign', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80' },
      { title: 'Event Marketing', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80' }
    ]
  }
};

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('Billboards');
  const [dbProjects, setDbProjects] = useState<any[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setDbProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  // Group database projects by category
  const groupedDbProjects = dbProjects.reduce((acc: any, project: any) => {
    const category = project.category as CategoryKey;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({
      title: project.title,
      image: project.image
    });
    return acc;
  }, {});

  // Merge database projects with hardcoded projects
  const mergedProjects: Record<CategoryKey, any> = { ...projectsByCategory };
  Object.keys(groupedDbProjects).forEach((category) => {
    const cat = category as CategoryKey;
    if (mergedProjects[cat]) {
      mergedProjects[cat].images = [
        ...mergedProjects[cat].images,
        ...groupedDbProjects[cat]
      ];
    }
  });

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

        .projects-page {
          background: #f5f5f5;
          min-height: 100vh;
        }

        .projects-hero {
          position: relative;
          height: 60vh;
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin-top: 80px;
        }

        .projects-hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .projects-hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.6);
        }

        .projects-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.3) 100%);
          z-index: 1;
        }

        .projects-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          max-width: 900px;
          padding: 2rem;
        }

        .projects-hero-title {
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 1rem;
          letter-spacing: -2px;
        }

        .projects-hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: rgba(255,255,255,0.9);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .projects-content {
          padding: 4rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .projects-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .projects-header h2 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 900;
          margin-bottom: 1rem;
          color: #1a1a1a;
        }

        .projects-header h2 .italic {
          font-style: italic;
          color: #666;
        }

        .projects-header p {
          font-size: 1rem;
          color: #666;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.8;
        }

        .projects-filters {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 4rem;
        }

        .filter-button {
          padding: 0.75rem 1.8rem;
          border-radius: 8px;
          border: 2px solid #e0e0e0;
          background: white;
          color: #666;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-button:hover {
          border-color: #1a3a52;
          color: #1a3a52;
        }

        .filter-button.active {
          background: #1a3a52;
          border-color: #1a3a52;
          color: white;
        }

        .category-section {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 3rem;
          margin-bottom: 5rem;
          align-items: start;
        }

        .category-info {
          background: white;
          padding: 3rem;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          position: sticky;
          top: 120px;
        }

        .category-info h3 {
          font-size: 2.5rem;
          font-weight: 900;
          color: #1a1a1a;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .category-info p {
          font-size: 1rem;
          color: #666;
          line-height: 1.8;
        }

        .category-images {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .category-image {
          position: relative;
          height: 300px;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s ease;
        }

        .category-image:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .category-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .category-image:hover img {
          transform: scale(1.1);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%);
          display: flex;
          align-items: flex-end;
          padding: 1.5rem;
          color: white;
        }

        .image-title {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .project-overview {
          position: relative;
          padding: 6rem 2rem;
          color: white;
          text-align: center;
          overflow: hidden;
        }

        .project-overview::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80');
          background-size: cover;
          background-position: center;
          filter: brightness(0.3);
          z-index: 0;
        }

        .project-overview-content {
          position: relative;
          z-index: 1;
        }

        .project-overview h2 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 900;
          margin-bottom: 1.5rem;
        }

        .project-overview p {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.8);
          max-width: 800px;
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
          .projects-hero {
            margin-top: 60px;
            height: 50vh;
          }

          .category-section {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .category-info {
            position: relative;
            top: 0;
            padding: 2rem;
          }

          .category-info h3 {
            font-size: 2rem;
          }

          .category-images {
            grid-template-columns: 1fr;
          }

          .category-image {
            height: 250px;
          }

          .projects-filters {
            gap: 0.5rem;
          }

          .filter-button {
            padding: 0.6rem 1.2rem;
            font-size: 0.85rem;
          }
        }
      `}</style>

      <div className="projects-page">
        {/* Hero Section */}
        <section className="projects-hero">
          <div className="projects-hero-bg">
            <img 
              src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&q=80" 
              alt="Our Projects" 
            />
          </div>
          <div className="projects-hero-overlay"></div>
          <motion.div 
            className="projects-hero-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 className="projects-hero-title" variants={fadeInUp}>
              Campaigns That<br /><span style={{ color: '#FF6B35' }}>Make an Impact</span>
            </motion.h1>
            <motion.p className="projects-hero-subtitle" variants={fadeInUp}>
              Real campaigns. Real impact.
            </motion.p>
          </motion.div>
        </section>

        {/* Projects Content */}
        <section className="projects-content">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="projects-header" variants={fadeInUp}>
              <h2>
                Our <br />
                <span className="italic">Projects</span>
              </h2>
              <p>
                Explore real-world advertising campaigns crafted to maximize visibility, attract attention, and deliver strong brand impact across prime locations.
              </p>
            </motion.div>

            {/* Category Filters */}
            <motion.div className="projects-filters" variants={fadeInUp}>
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`filter-button ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Category Section */}
            <motion.div className="category-section" variants={staggerContainer}>
              <motion.div className="category-info" variants={fadeInUp}>
                <h3>{mergedProjects[activeCategory].title}</h3>
                <p>{mergedProjects[activeCategory].description}</p>
              </motion.div>

              <motion.div className="category-images" variants={staggerContainer}>
                {mergedProjects[activeCategory].images.map((img: { title: string; image: string }, index: number) => (
                  <motion.div
                    key={index}
                    className="category-image"
                    variants={fadeInUp}
                  >
                    <img src={img.image} alt={img.title} />
                    <div className="image-overlay">
                      <div className="image-title">{img.title}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Project Overview CTA */}
        <motion.section 
          className="project-overview"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="project-overview-content">
            <motion.h2 variants={fadeInUp}>Project Overview</motion.h2>
            <motion.p variants={fadeInUp}>
              A strategically placed outdoor campaign built to maximize visibility, attract attention, and deliver a strong brand impact across prime commercial locations.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/contact" className="cta-button">
                Get This for Your Brand <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </motion.section>

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
