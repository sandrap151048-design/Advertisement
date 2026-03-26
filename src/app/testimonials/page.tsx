"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const categories = [
  'Brand Identity',
  'Digital Printing',
  'Vehicle Branding',
  'Display Solutions',
  'Signage',
  'Facade & Cladding'
] as const;

type CategoryKey = typeof categories[number];

const projectsByCategory: Record<CategoryKey, {
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  images: { title: string; image: string; tag: string }[];
}> = {
  'Brand Identity': {
    title: 'Brand',
    subtitle: 'Identity',
    description: 'Explore our branding projects featuring logo applications, interior branding, and complete identity systems designed to create strong, consistent, and memorable brand experiences.',
    accent: '#2c4a5e',
    images: [
      { title: 'DIOR Luxury Billboard', tag: 'Luxury', image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80' },
      { title: 'Times Square LED Display', tag: 'LED', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
      { title: 'Corporate Branding', tag: 'Corporate', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
      { title: 'Brand Launch Campaign', tag: 'Campaign', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80' }
    ]
  },
  'Digital Printing': {
    title: 'Digital',
    subtitle: 'Printing',
    description: 'High-resolution digital print solutions for banners, posters, window graphics, and large-format displays that bring your brand visuals to life with vibrant, lasting quality.',
    accent: '#e61e25',
    images: [
      { title: 'Large Format Banner', tag: 'Banner', image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80' },
      { title: 'Window Graphics', tag: 'Window', image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80' },
      { title: 'Exhibition Panels', tag: 'Exhibition', image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80' },
      { title: 'Retail Poster Display', tag: 'Retail', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80' }
    ]
  },
  'Vehicle Branding': {
    title: 'Vehicle',
    subtitle: 'Branding',
    description: 'Mobile advertising solutions that turn every vehicle into a powerful marketing tool. Reach thousands of potential customers daily with eye-catching fleet wraps and luxury vinyl graphics.',
    accent: '#1a8a6a',
    images: [
      { title: 'Fleet Full Wrap', tag: 'Fleet', image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80' },
      { title: 'Delivery Van Branding', tag: 'Van', image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80' },
      { title: 'Bus Advertisement', tag: 'Transit', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80' },
      { title: 'Sports Car Wrap', tag: 'Luxury', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80' }
    ]
  },
  'Display Solutions': {
    title: 'Display',
    subtitle: 'Solutions',
    description: 'Innovative display solutions including LED screens, digital kiosks, interactive displays, and POS materials that capture attention and engage customers at point of purchase.',
    accent: '#7c3aed',
    images: [
      { title: 'LED Video Wall', tag: 'LED', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80' },
      { title: 'Interactive Kiosk', tag: 'Interactive', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80' },
      { title: 'Retail POS Display', tag: 'POS', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80' },
      { title: 'Exhibition Booth', tag: 'Exhibition', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' }
    ]
  },
  'Signage': {
    title: 'Premium',
    subtitle: 'Signage',
    description: 'From illuminated signs to laser-cut lettering, our signage solutions combine precision engineering with stunning aesthetics, ensuring your brand stands out day and night.',
    accent: '#d97706',
    images: [
      { title: 'Illuminated Channel Letters', tag: 'Illuminated', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80' },
      { title: 'Wayfinding System', tag: 'Wayfinding', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80' },
      { title: 'Office Signage', tag: 'Office', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80' },
      { title: 'Outdoor Pylon', tag: 'Outdoor', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80' }
    ]
  },
  'Facade & Cladding': {
    title: 'Facade &',
    subtitle: 'Cladding',
    description: 'Transform building exteriors with premium cladding and facade graphics that communicate brand authority at an architectural scale—ideal for commercial towers and retail hubs.',
    accent: '#0e7490',
    images: [
      { title: 'Commercial Tower Wrap', tag: 'Tower', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
      { title: 'Mall Facade Graphics', tag: 'Mall', image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80' },
      { title: 'Hotel Exterior Branding', tag: 'Hotel', image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80' },
      { title: 'Retail Park Cladding', tag: 'Retail', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' }
    ]
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
};

interface AdminProject {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  clientName?: string;
  createdAt: string;
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('Brand Identity');
  const [hoveredImg, setHoveredImg] = useState<number | null>(null);
  const [adminProjects, setAdminProjects] = useState<AdminProject[]>([]);
  const current = projectsByCategory[activeCategory];

  useEffect(() => {
    // Immediately load cached projects from localStorage for instant rendering
    try {
      const cached = localStorage.getItem('cachedAdminProjects');
      if (cached) {
        setAdminProjects(JSON.parse(cached));
      }
    } catch {}
    // Then fetch fresh data from API
    const fetchProjects = async () => {
      try {
        const timestamp = new Date().getTime();
        const response = await fetch(`/api/projects?t=${timestamp}`, {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
        });
        if (response.ok) {
          const data = await response.json();
          const list: AdminProject[] = Array.isArray(data.projects) ? data.projects : [];
          setAdminProjects(list);
          try { localStorage.setItem('cachedAdminProjects', JSON.stringify(list)); } catch {}
        }
      } catch (error) {
        console.error('Error fetching admin projects:', error);
      }
    };
    fetchProjects();
  }, []);


  return (
    <>
      <style jsx global>{`
        * { scrollbar-width: none; -ms-overflow-style: none; }
        *::-webkit-scrollbar { display: none; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
      `}</style>

      <div style={{ background: '#f4f4f0', minHeight: '100vh' }}>

        {/* ─── Hero ─── */}
        <section style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden', paddingTop: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1800&q=80"
            alt="Hero"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.45)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(26,58,82,0.6) 0%, rgba(0,0,0,0.3) 100%)' }} />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' as const }}
            style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem', maxWidth: 900 }}
          >
            {/* Removed Our Portfolio Badge */}
            <h1 style={{ fontSize: 'clamp(3rem,8vw,5.5rem)', fontWeight: 900, color: 'white', lineHeight: 1.05, letterSpacing: '-2px', margin: '0 0 1rem' }}>
              Campaigns That<br />
              <span style={{ color: '#e61e25' }}>Make an Impact</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
              Explore real-world advertising campaigns crafted to maximize visibility, attract attention, and deliver strong brand impact across prime locations.
            </p>
          </motion.div>
        </section>

        {/* ─── Projects Section ─── */}
        <section style={{ maxWidth: 1400, margin: '0 auto', padding: '5rem 2rem' }}>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <h2 style={{ fontSize: 'clamp(2.5rem,5vw,3.5rem)', fontWeight: 900, color: '#1a1a1a', lineHeight: 1.1, margin: '0 0 1rem' }}>
              Our <em style={{ fontStyle: 'italic', color: '#888', fontWeight: 400 }}>Projects</em>
            </h2>
            <p style={{ color: '#777', fontSize: '1rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
              Explore real-world advertising campaigns crafted to maximize visibility, attract attention, and deliver strong brand impact across prime locations.
            </p>
          </motion.div>

          {/* Tab Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}
          >
            {categories.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '0.65rem 1.5rem',
                    borderRadius: 50,
                    border: isActive ? `2px solid ${projectsByCategory[cat].accent}` : '2px solid #ddd',
                    background: isActive ? projectsByCategory[cat].accent : 'white',
                    color: isActive ? 'white' : '#444',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: isActive ? `0 4px 16px ${projectsByCategory[cat].accent}40` : 'none'
                  }}
                >
                  {cat}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Split Layout */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: 'easeOut' as const }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '3rem', alignItems: 'start' }}
            >
              {/* Left Info Panel */}
              <motion.div
                style={{
                  background: 'white',
                  borderRadius: 24,
                  padding: '3rem',
                  boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
                  position: 'sticky',
                  top: 120,
                  borderTop: `5px solid ${current.accent}`
                }}
              >
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'inline-block', background: `${current.accent}18`, color: current.accent, padding: '0.3rem 0.9rem', borderRadius: 50, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '1rem' }}>
                    {activeCategory}
                  </div>
                  <h3 style={{ fontSize: '3rem', fontWeight: 900, color: '#1a1a1a', lineHeight: 1.1, margin: 0 }}>
                    {current.title}<br />
                    <span style={{ color: current.accent }}>{current.subtitle}</span>
                  </h3>
                </div>
                <p style={{ color: '#666', lineHeight: 1.85, fontSize: '1rem', marginBottom: '2rem' }}>
                  {current.description}
                </p>

              </motion.div>

              {/* Right Image Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.25rem' }}
              >
                {current.images.map((img, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    onHoverStart={() => setHoveredImg(i)}
                    onHoverEnd={() => setHoveredImg(null)}
                    whileHover={{ y: -8, boxShadow: '0 24px 50px rgba(0,0,0,0.18)' }}
                    style={{
                      position: 'relative',
                      height: i === 0 ? 340 : 260,
                      borderRadius: 20,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                    }}
                  >
                    <motion.img
                      src={img.image}
                      alt={img.title}
                      animate={{ scale: hoveredImg === i ? 1.08 : 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' as const }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    {/* Gradient overlay */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }} />

                    {/* Tag badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: hoveredImg === i ? 1 : 0.9, scale: 1 }}
                      style={{
                        position: 'absolute', top: '1rem', left: '1rem',
                        background: `${current.accent}e0`, color: 'white',
                        padding: '0.3rem 0.7rem', borderRadius: 50,
                        fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.5px'
                      }}
                    >
                      {img.tag}
                    </motion.div>

                    {/* Open icon */}
                    <motion.div
                      animate={{ opacity: hoveredImg === i ? 1 : 0, y: hoveredImg === i ? 0 : 10 }}
                      transition={{ duration: 0.25 }}
                      style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'white', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <ArrowUpRight size={18} color="#1a1a1a" />
                    </motion.div>

                    {/* Title */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.25rem' }}>
                      <motion.div
                        animate={{ y: hoveredImg === i ? 0 : 4 }}
                        transition={{ duration: 0.3 }}
                        style={{ fontWeight: 700, fontSize: '1rem', color: 'white', lineHeight: 1.3 }}
                      >
                        {img.title}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* ─── Admin Projects Section ─── */}
        {adminProjects.length > 0 && (
          <section style={{ maxWidth: 1400, margin: '0 auto', padding: '2rem 2rem 5rem 2rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ textAlign: 'center', marginBottom: '3.5rem' }}
            >
              <h2 style={{ fontSize: 'clamp(2.5rem,5vw,3.5rem)', fontWeight: 900, color: '#1a1a1a', lineHeight: 1.1, margin: '0 0 1rem' }}>
                Our <em style={{ fontStyle: 'italic', color: '#888', fontWeight: 400 }}>Work</em>
              </h2>
              <p style={{ color: '#777', fontSize: '1rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
                A showcase of projects delivered by our team across the UAE.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}
            >
              {adminProjects.map((project, i) => (
                <motion.div
                  key={project.id || i}
                  variants={itemVariants}
                  whileHover={{ y: -8, boxShadow: '0 24px 50px rgba(0,0,0,0.15)' }}
                  style={{
                    background: 'white',
                    borderRadius: 20,
                    overflow: 'hidden',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.3s ease'
                  }}
                >
                  {/* Image */}
                  <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                    <img
                      src={project.image || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80'}
                      alt={project.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
                    {/* Category badge */}
                    <div style={{
                      position: 'absolute', top: '1rem', left: '1rem',
                      background: '#e61e25', color: 'white',
                      padding: '0.3rem 0.8rem', borderRadius: 50,
                      fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.5px'
                    }}>
                      {project.category}
                    </div>
                  </div>
                  {/* Content */}
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1a1a1a', margin: '0 0 0.5rem' }}>
                      {project.title}
                    </h3>
                    <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.7, margin: '0 0 1rem' }}>
                      {project.description}
                    </p>
                    {project.clientName && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#e61e2520', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#e61e25' }}>
                          {project.clientName.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontSize: '0.85rem', color: '#888', fontWeight: 600 }}>{project.clientName}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* ─── CTA Banner ─── */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ position: 'relative', padding: '6rem 2rem', overflow: 'hidden', textAlign: 'center', color: 'white' }}
        >
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
            alt="CTA"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.25)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(26,58,82,0.7) 0%, rgba(255,107,53,0.3) 100%)' }} />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: 800, margin: '0 auto' }}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.15 }}
            >
              Ready to Build Your <span style={{ color: '#e61e25' }}>Next Campaign?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem', lineHeight: 1.7 }}
            >
              A strategically placed outdoor campaign built to maximize visibility, attract attention, and deliver a strong brand impact across prime commercial locations.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <Link href="/campaign" style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.7rem', padding: '1rem 2.5rem', background: '#e61e25', color: 'white', fontWeight: 700, borderRadius: 50, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 8px 24px rgba(255,107,53,0.4)' }}
                >
                  Start a Campaign <ArrowRight size={20} />
                </motion.div>
              </Link>
              <Link href="/contact" style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.7rem', padding: '1rem 2.5rem', background: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 700, borderRadius: 50, fontSize: '1rem', cursor: 'pointer', border: '2px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)' }}
                >
                  Get in Touch
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer style={{ background: '#1a1a1a', color: 'white', padding: '6rem 2rem 4rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3.5rem', marginBottom: '3.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>
                  <span style={{ color: '#e61e25' }}>One</span> Click Advertisement
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem', lineHeight: '1.8', fontSize: '1rem' }}>
                  Premium advertising solutions across the UAE. Delivering high-impact visual communication services.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Services</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {['Branding', 'Digital Printing', 'Signage', 'Vehicle Wraps'].map(s => (
                    <li key={s}><Link href="/services" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>{s}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Company</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {[['About', '/about'], ['Services', '/services'], ['Contact', '/contact']].map(([l, h]) => (
                    <li key={l}><Link href={h} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>{l}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Support</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <li><a href="tel:+971524065110" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>+971 52 406 5110</a></li>
                  <li><a href="mailto:hello@oneclickadv.ae" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>hello@oneclickadv.ae</a></li>
                </ul>
              </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
              © 2024 One Click Advertisement. All Rights Reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
