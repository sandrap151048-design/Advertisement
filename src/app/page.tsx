"use client";

import { motion, Variants } from 'framer-motion';
import { ShieldCheck, Target, Droplet, Car, Image as ImageIcon, Building2, Store, Briefcase, GraduationCap, HeartPulse, Mail, Phone, Clock, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState, FormEvent } from 'react';

// Animation Variants - Moved outside for better performance
const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const slideDown: Variants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const dropIn: Variants = {
  hidden: { opacity: 0, y: -1000 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 15, stiffness: 100 } }
};

const revealDown: Variants = {
  hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
  visible: { opacity: 1, clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.8 } }
};

const bounceInDown: Variants = {
  hidden: { opacity: 0, y: -200 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 10, stiffness: 80 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitStatus({ success: true, message: data.message });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus({ success: false, message: data.error || 'Something went wrong.' });
      }
    } catch {
      setSubmitStatus({ success: false, message: 'Failed to connect to the server.' });
    }
    setIsSubmitting(false);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: '12rem',
        paddingBottom: '8rem',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden' }}>
          <img src="/images/ai_ad_1.png" alt="Hero BG" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.08, filter: 'blur(4px) brightness(1.2) contrast(1.1)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, var(--color-bg-start) 85%)' }} />
        </div>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ maxWidth: '1000px', zIndex: 10, position: 'relative' }}>
          <motion.div variants={fadeInDown} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', background: 'rgba(124, 58, 237, 0.1)', padding: '0.5rem 1.2rem', borderRadius: '50px', border: '1px solid rgba(124, 58, 237, 0.2)', backdropFilter: 'blur(10px)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)', display: 'inline-block', boxShadow: '0 0 10px var(--color-primary)' }}></span>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-primary)' }}>Next-Gen AI Advertising</span>
          </motion.div>

          <motion.h1 variants={bounceInDown} className="hero-title" style={{ fontFamily: "'Bebas Neue', sans-serif", textTransform: 'uppercase', lineHeight: '1.05', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--color-text-main)', fontWeight: 400, marginBottom: '2rem', letterSpacing: '2px' }}>
            Transforming <span style={{ color: 'var(--color-primary)' }}>Spaces</span>, & Screens<br />Into <span className="text-gradient">Experiences</span>
          </motion.h1>

          <motion.p variants={fadeInDown} style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', maxWidth: '750px', marginBottom: '3.5rem', lineHeight: '1.8', fontFamily: "'Space Grotesk', sans-serif" }}>
            One Click Advertisement combines cutting-edge AI technology with premium branding solutions. We transform ordinary surfaces into extraordinary brand stories across the UAE.
          </motion.p>

          <motion.div variants={slideDown} style={{ display: 'flex', justifyContent: 'center' }}>
            <Link href="/services" className="btn btn-primary" style={{ padding: '1.2rem 3.5rem', borderRadius: '14px', fontWeight: 700 }}>EXPLORE SOLUTIONS</Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container" style={{ position: 'relative', marginTop: '-4rem', zIndex: 20 }}>
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={staggerContainer}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}
        >
          {[
            { 
              title: "Premium Quality", 
              desc: "High-grade materials built to last",
              img: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&q=80",
              gradient: "linear-gradient(135deg, rgba(167, 139, 250, 0.85), rgba(196, 181, 253, 0.85))",
              icon: <ShieldCheck size={48} />
            },
            { 
              title: "Fast Turnaround", 
              desc: "Quick delivery without compromising quality",
              img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80",
              gradient: "linear-gradient(135deg, rgba(196, 181, 253, 0.85), rgba(167, 139, 250, 0.85))",
              icon: <Clock size={48} />
            },
            { 
              title: "Expert Team", 
              desc: "Skilled professionals with years of experience",
              img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
              gradient: "linear-gradient(135deg, rgba(167, 139, 250, 0.85), rgba(139, 92, 246, 0.85))",
              icon: <Target size={48} />
            },
            { 
              title: "Full Support", 
              desc: "Dedicated assistance from start to finish",
              img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80",
              gradient: "linear-gradient(135deg, rgba(139, 92, 246, 0.85), rgba(167, 139, 250, 0.85))",
              icon: <Sparkles size={48} />
            }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              variants={fadeInDown}
              whileHover={{ y: -8, scale: 1.02 }}
              style={{ 
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                height: '220px',
                boxShadow: '0 10px 30px rgba(167, 139, 250, 0.25)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <img 
                src={item.img} 
                alt={item.title}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  position: 'absolute',
                  inset: 0
                }} 
              />
              <div style={{ 
                position: 'absolute',
                inset: 0,
                background: item.gradient,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2rem'
              }}>
                <div style={{ 
                  marginBottom: '1rem',
                  color: 'white',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))'
                }}>
                  {item.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 800, 
                  color: 'white',
                  marginBottom: '0.5rem',
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}>
                  {item.title}
                </h3>
                <p style={{ 
                  color: 'white', 
                  fontSize: '0.9rem', 
                  lineHeight: '1.4',
                  fontWeight: 500,
                  textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  opacity: 0.95
                }}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* AI Innovation Section */}
      <section id="innovation" className="section container">
        <div className="grid-2" style={{ alignItems: 'center', gap: '5rem' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={dropIn}>
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden', borderRadius: '32px', height: '500px', position: 'relative' }}>
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80" 
                alt="Creative Advertising" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  filter: 'brightness(0.4) saturate(1.2)' 
                }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.9), transparent)' }} />
              <div style={{ position: 'absolute', bottom: '3rem', left: '3rem' }}>
                <Sparkles color="var(--color-secondary)" size={40} style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '2.2rem', color: 'white', fontFamily: 'var(--font-heading)' }}>Generative<br />Aesthetics</h3>
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideDown}>
            <p style={{ color: 'var(--color-primary)', fontWeight: 700, letterSpacing: '4px', marginBottom: '1rem' }}>FUTURE-READY</p>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem', fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>The <span className="text-gradient">AI Advantage</span></h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {[
                { t: "AI-Driven Precision", d: "We use generative algorithms to optimize visual impact for every unique space." },
                { t: "Predictive Durability", d: "Data-driven material selection specifically for the UAE's extreme environment." },
                { t: "Automated Workflows", d: "From concept to council approval in record time using our internal AI hub." }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', fontWeight: 800 }}>0{i + 1}</div>
                  <div>
                    <h4 style={{ fontSize: '1.2rem', color: 'var(--color-text-main)', marginBottom: '0.4rem' }}>{item.t}</h4>
                    <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="section container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInDown}>
          <div className="glass-card" style={{ padding: '4rem', overflow: 'hidden', position: 'relative' }}>
            <img src="/images/ai_ad_1.png" alt="AI BG" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.1, filter: 'grayscale(1)' }} />
            <div className="grid-2" style={{ alignItems: 'center', gap: '4rem', position: 'relative', zIndex: 2 }}>
              <div>
                <h2 className="section-title text-gradient" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>Authority Excellence</h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                  We navigate the complexities of UAE regulations so you don't have to. Full compliance with Dubai Municipality, RTA, and Mall standards.
                </p>
                <div className="grid-2" style={{ gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-main)', fontWeight: 600 }}><ShieldCheck size={20} color="var(--color-primary)" /> Municipality Ready</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-main)', fontWeight: 600 }}><Car size={20} color="var(--color-primary)" /> RTA Certified</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {[1, 2, 3, 4].map(n => <div key={n} style={{ width: '120px', height: '60px', background: 'rgba(124, 58, 237, 0.05)', borderRadius: '8px', border: '1px solid rgba(124, 58, 237, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: '0.6rem', fontWeight: 800 }}>REGULATION-{n}</div>)}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="section-title">Partner <span className="text-gradient">Feedback</span></h2>
        </div>
        <div className="grid-3">
          {[
            { n: "Ahmed Al Mansouri", r: "CEO, Retail Group", q: "The AI-driven design approach was revolutionary for our mall launch." },
            { n: "Sarah Jenkins", r: "Marketing Director", q: "Absolute precision in their cladding solutions. Timely and professional." },
            { n: "John Doe", r: "Operations Head", q: "Transformed our headquarters into a tech landmark in Dubai." }
          ].map((t, i) => (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={dropIn} key={i} className="glass-card" style={{ padding: '3rem' }}>
              <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', marginBottom: '2rem' }}>"{t.q}"</p>
              <h5 style={{ color: 'var(--color-text-main)', fontWeight: 700 }}>{t.n}</h5>
              <p style={{ color: 'var(--color-primary)', fontSize: '0.8rem' }}>{t.r}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="section container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="section-title">Industries We <span className="text-gradient">Serve</span></h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '700px', margin: '1rem auto 0', fontSize: '1.1rem' }}>
            Delivering specialized advertising solutions across diverse sectors throughout the UAE
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {[
            { 
              n: "Retail & Malls", 
              i: <Store />,
              desc: "Eye-catching signage, window graphics, and promotional displays",
              services: ["Mall Signage", "Store Branding", "Window Graphics", "POS Displays"]
            },
            { 
              n: "Corporate Centers", 
              i: <Briefcase />,
              desc: "Professional office branding and corporate identity solutions",
              services: ["Office Branding", "Reception Signage", "Wayfinding", "Interior Graphics"]
            },
            { 
              n: "Real Estate", 
              i: <Building2 />,
              desc: "Property marketing materials and development signage",
              services: ["Project Hoardings", "Sales Centers", "Site Signage", "Marketing Materials"]
            },
            { 
              n: "Automotive", 
              i: <Car />,
              desc: "Showroom branding and fleet vehicle graphics",
              services: ["Showroom Signage", "Fleet Branding", "Vehicle Wraps", "Dealership Graphics"]
            }
          ].map((ind, i) => (
            <motion.div 
              key={i} 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInDown}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(124, 58, 237, 0.15)' }} 
              className="glass-card" 
              style={{ 
                padding: '2.5rem',
                borderRadius: '20px',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(124, 58, 237, 0.1)',
                background: 'white'
              }}
            >
              <div style={{ 
                width: '70px',
                height: '70px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(167, 139, 250, 0.1))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                border: '2px solid rgba(124, 58, 237, 0.2)',
                color: 'var(--color-primary)'
              }}>
                {ind.i}
              </div>
              <h4 style={{ 
                color: 'var(--color-text-main)', 
                fontSize: '1.4rem',
                fontWeight: 700,
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {ind.n}
              </h4>
              <p style={{ 
                color: 'var(--color-text-muted)', 
                fontSize: '0.95rem',
                lineHeight: '1.6',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                {ind.desc}
              </p>
              <div style={{
                background: 'rgba(124, 58, 237, 0.05)',
                borderRadius: '12px',
                padding: '1rem',
                border: '1px solid rgba(124, 58, 237, 0.1)'
              }}>
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem'
                }}>
                  {ind.services.map((service, idx) => (
                    <li key={idx} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.6rem',
                      color: 'var(--color-text-muted)',
                      fontSize: '0.9rem'
                    }}>
                      <span style={{ 
                        width: '6px', 
                        height: '6px', 
                        borderRadius: '50%', 
                        background: 'var(--color-primary)',
                        flexShrink: 0
                      }}></span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* UAE Coverage Section */}
      <section className="section container">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={fadeInDown}
          className="glass-card"
          style={{ 
            padding: '4rem',
            textAlign: 'center'
          }}
        >
          {/* Header with Globe Icon */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '3rem'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(124, 58, 237, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(124, 58, 237, 0.3)'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <h2 className="section-title" style={{ margin: 0 }}>
              UAE <span className="text-gradient">Coverage</span>
            </h2>
          </div>

          {/* Location Badges */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
            marginBottom: '3rem'
          }}>
            {[
              { name: 'Dubai', mapQuery: 'Dubai+UAE' },
              { name: 'Abu Dhabi', mapQuery: 'Abu+Dhabi+UAE' },
              { name: 'Sharjah', mapQuery: 'Sharjah+UAE' },
              { name: 'Ajman', mapQuery: 'Ajman+UAE' },
              { name: 'Northern Emirates', mapQuery: 'Ras+Al+Khaimah+UAE' }
            ].map((location, i) => (
              <a
                key={i}
                href={`https://www.google.com/maps/search/?api=1&query=${location.mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.8rem 1.5rem',
                  background: 'rgba(124, 58, 237, 0.08)',
                  border: '1px solid rgba(124, 58, 237, 0.2)',
                  borderRadius: '50px',
                  color: 'var(--color-primary)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(124, 58, 237, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(124, 58, 237, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <MapPin size={18} />
                {location.name}
              </a>
            ))}
          </div>

          {/* Location Photos Grid */}
          <motion.div 
            variants={staggerContainer}
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '1.5rem',
              marginTop: '2rem'
            }}
          >
            {[
              { name: 'Dubai', desc: 'Main Hub & Production Center', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80' },
              { name: 'Abu Dhabi', desc: 'Capital Operations', img: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=80' },
              { name: 'Sharjah', desc: 'Northern Emirates Hub', img: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&q=80' },
              { name: 'Ajman', desc: 'Local Support Center', img: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&q=80' },
              { name: 'Northern Emirates', desc: 'RAK, UAQ & Fujairah', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80' }
            ].map((location, i) => (
              <motion.div
                key={i}
                variants={fadeInDown}
                whileHover={{ y: -8, boxShadow: '0 12px 30px rgba(124, 58, 237, 0.15)' }}
                style={{
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  height: '320px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(124, 58, 237, 0.1)',
                  background: 'white'
                }}
              >
                <div style={{ position: 'relative', height: '100%' }}>
                  <img 
                    src={location.img} 
                    alt={location.name} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      display: 'block'
                    }} 
                  />
                  <div style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.5rem'
                  }}>
                    <h3 style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: 800, 
                      color: 'white', 
                      marginBottom: '0.3rem',
                      fontFamily: 'var(--font-heading)',
                      lineHeight: '1.2'
                    }}>
                      {location.name}
                    </h3>
                    <p style={{ 
                      color: 'rgba(255,255,255,0.9)', 
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      lineHeight: '1.4'
                    }}>
                      {location.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Ribbon */}
      <section className="container" style={{ position: 'relative', zIndex: 30, marginBottom: '-5rem' }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="glass-card" style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))', padding: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '0.5rem' }}>Ready to Elevate Your Brand?</h2>
            <p style={{ color: 'white', opacity: 0.8, fontSize: '1.1rem' }}>Join the next generation of marketing leaders in the UAE.</p>
          </div>
          <Link href="/contact" className="btn" style={{ background: 'white', color: 'var(--color-primary)', padding: '1rem 3rem', fontWeight: 800 }}>CONTACT US</Link>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section container" style={{ paddingTop: '10rem' }}>
        <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title text-gradient" style={{ marginBottom: '1rem' }}>Start Your Project Today</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.7' }}>
              Transform your brand vision into reality. Our team is ready to bring your ideas to life with cutting-edge solutions.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="grid-2">
              <input placeholder="Full Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid var(--color-card-border)', padding: '1.2rem', borderRadius: '12px', color: 'var(--color-text-main)' }} />
              <input placeholder="Email Address" type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid var(--color-card-border)', padding: '1.2rem', borderRadius: '12px', color: 'var(--color-text-main)' }} />
            </div>
            <input placeholder="Phone Number (Optional)" type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid var(--color-card-border)', padding: '1.2rem', borderRadius: '12px', color: 'var(--color-text-main)' }} />
            <textarea placeholder="Tell us about your project..." rows={5} required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid var(--color-card-border)', padding: '1.2rem', borderRadius: '12px', color: 'var(--color-text-main)', resize: 'vertical' }} />
            <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ padding: '1.2rem', width: '100%', opacity: isSubmitting ? 0.7 : 1, fontSize: '1.05rem', fontWeight: 700 }}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {submitStatus && <p style={{ color: submitStatus.success ? '#10b981' : '#ef4444', textAlign: 'center', padding: '1rem', background: submitStatus.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', fontWeight: 600 }}>{submitStatus.message}</p>}
          </form>

          <div style={{ marginTop: '3rem', paddingTop: '3rem', borderTop: '1px solid var(--color-card-border)' }}>
            <div className="grid-3" style={{ gap: '2rem', textAlign: 'center' }}>
              <div>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <Phone size={24} color="var(--color-primary)" />
                </div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>Call Us</h4>
                <a href="tel:+97100000000" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>+971 00 000 0000</a>
              </div>
              <div>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <Mail size={24} color="var(--color-primary)" />
                </div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>Email Us</h4>
                <a href="mailto:info@oneclickadv.ae" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>info@oneclickadv.ae</a>
              </div>
              <div>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <Clock size={24} color="var(--color-primary)" />
                </div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>Working Hours</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', margin: 0 }}>Sun - Thu: 9AM - 6PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
