"use client";

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useState, FormEvent } from 'react';

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // 3D Parallax Mouse Tracking
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 20, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  const rotateX = useTransform(springY, [0, 1], [10, -10]);
  const rotateY = useTransform(springX, [0, 1], [-10, 10]);
  const bgX = useTransform(springX, [0, 1], [-20, 20]);
  const bgY = useTransform(springY, [0, 1], [-20, 20]);
  
  const handleHeroMouseMove = (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
  };

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
        setFormData({ name: '', phone: '', email: '', company: '', service: '', message: '' });
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
      <style jsx global>{`
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        *::-webkit-scrollbar {
          display: none;
        }

        .contact-page {
          background: transparent;
          min-height: 100vh;
          color: white;
        }

        .contact-hero {
          position: relative;
          height: 100vh;
          min-height: 600px;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 0 10%;
          perspective: 1500px;
          background: transparent;
        }

        .contact-hero-bg {
          position: absolute;
          inset: -30px;
          z-index: 0;
        }

        .contact-hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.6) contrast(1.1);
        }

        .contact-hero-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 70% 50%, rgba(30,0,0,0.1) 0%, rgba(0,0,0,0.9) 100%);
          z-index: 1;
        }

        .contact-hero-content {
          position: relative;
          z-index: 5;
          color: white;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 4rem;
          transform-style: preserve-3d;
          pointer-events: none;
        }

        .hero-left {
          flex: 1;
          transform: translateZ(80px);
        }

        .hero-right {
          flex: 1;
          max-width: 450px;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          text-align: left;
          transform: translateZ(40px);
        }

        .contact-hero-title {
          font-size: clamp(2.5rem, 6vw, 4.2rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -1px;
          margin-bottom: 0;
          text-transform: uppercase !important;
        }

        .contact-hero-text {
          font-size: 1.15rem;
          color: rgba(255,255,255,0.9);
          line-height: 1.7;
          font-weight: 400;
          text-transform: uppercase !important;
        }

        .hero-cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1.1rem 2.8rem;
          background: #e61e25;
          color: white;
          font-weight: 800;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1rem;
          width: fit-content;
          box-shadow: 0 10px 25px rgba(230, 30, 37, 0.3);
          pointer-events: auto;
        }
        .hero-cta-button:hover {
          background: #ff2d35;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 15px 35px rgba(230, 30, 37, 0.4);
        }

        /* Get In Touch Section */
        .touch-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 6rem 2rem;
          gap: 2rem;
        }

        .touch-left {
          background: rgba(255,255,255,0.04);
          padding: 5rem 4rem;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 15px 40px rgba(0,0,0,0.3);
          transition: all 0.4s ease;
        }

        .touch-left:hover {
          border-color: rgba(230,30,37,0.3);
          transform: translateY(-5px);
          box-shadow: 0 25px 60px rgba(0,0,0,0.5);
        }

        .touch-right {
          background: #0d0d0d;
          padding: 5rem 4rem;
          border-radius: 24px;
          border: 1px solid rgba(230, 30, 37, 0.2);
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-shadow: 0 15px 45px rgba(0,0,0,0.3);
          transition: all 0.4s ease;
        }

        .touch-right:hover {
          border-color: #e61e25;
          transform: translateY(-5px);
          box-shadow: 0 25px 60px rgba(230,30,37,0.15);
        }

        .touch-left h2 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1;
          margin-bottom: 1.5rem;
          color: #ffffff;
        }

        .touch-left h2 .italic {
          font-style: italic;
          font-weight: 400;
          color: #e61e25;
        }

        .touch-left p {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.7);
          line-height: 1.6;
        }

        .contact-info-list {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          font-size: 1.1rem;
          font-weight: 500;
        }

        .info-item a, .info-item span {
          color: white;
          text-decoration: none;
          transition: opacity 0.3s;
        }

        .info-item a:hover {
          opacity: 0.8;
        }

        .info-item-icon {
          color: #e61e25;
        }

        /* Form Section */
        .campaign-section {
          background: #0a0a0a;
          padding: 8rem 2rem;
          color: white;
          text-align: center;
        }

        .campaign-title h2 {
          font-size: clamp(3rem, 7vw, 5rem);
          font-weight: 800;
          margin-bottom: 0.5rem;
          line-height: 1;
        }

        .campaign-title .italic {
          font-style: italic;
          font-weight: 400;
          color: #e61e25;
        }

        .campaign-subtitle {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.6);
          margin-bottom: 4rem;
        }

        .form-wrapper {
          max-width: 500px;
          margin: 0 auto;
          padding: 2rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 1rem 1.2rem;
          background: #000;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 4px;
          color: white;
          font-size: 0.95rem;
          outline: none;
        }

        .form-select option {
          background: #ffffff !important;
          color: #000000 !important;
        }

        .submit-button-wrap {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }

        .submit-button {
          padding: 0.8rem 2.5rem;
          background: white;
          color: black;
          font-weight: 700;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.9rem;
        }

        .submit-button:hover {
          background: #f0f0f0;
          transform: translateY(-2px);
        }

        /* Footer */
        .footer-black {
          background: #0a0a0a;
          padding: 6rem 10% 4rem 10%;
          color: white;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 4rem;
          margin-bottom: 4rem;
        }

        .footer-col h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: white;
        }

        .footer-col ul {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .footer-col a {
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s;
        }

        .footer-col a:hover {
          color: #e61e25;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 3rem;
          text-align: center;
          color: rgba(255,255,255,0.5);
          font-size: 0.85rem;
        }

        @media (max-width: 1024px) {
          .contact-hero {
            height: auto;
            min-height: 60vh;
            padding: 120px 20px 60px;
          }
          .contact-hero-content {
            flex-direction: column;
            text-align: center;
            gap: 2rem;
          }
          .hero-left, .hero-right {
            flex: none;
            width: 100%;
          }
          .hero-right {
            text-align: center;
            align-items: center;
            max-width: 100%;
          }
          .touch-container {
            grid-template-columns: 1fr;
          }
          .touch-left, .touch-right {
            border-radius: 20px;
            padding: 3rem 2rem;
            text-align: center;
          }
          .contact-info-list {
            align-items: center;
          }
          .info-item {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .contact-hero-title {
            font-size: 2.8rem;
            letter-spacing: -1px;
          }
          .contact-hero-text {
            font-size: 1rem;
          }
          .hero-cta-button {
            margin: 0 auto;
            width: 100%;
            max-width: 280px;
          }
          .touch-container {
            padding: 4rem 1.5rem;
          }
          .campaign-section {
            padding: 5rem 1.5rem;
          }
          .campaign-title h2 {
            font-size: 2.22rem;
          }
          .form-wrapper {
            padding: 2rem 1.5rem;
          }
          .footer-black {
            padding: 4rem 5% 3rem 5%;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 480px) {
          .contact-hero-title {
            font-size: 2.2rem;
          }
          .touch-left h2 {
            font-size: 2rem;
          }
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }

      `}</style>

      <div className="contact-page">
        {/* Hero Section */}
        <section className="contact-hero" onMouseMove={handleHeroMouseMove}>
          <motion.div 
            className="contact-hero-bg"
            style={{ x: bgX, y: bgY }}
          >
            <img 
              src="/signage-cladding.png" 
              alt="Contact One Click - Night Dynamic City" 
            />
          </motion.div>
          <div className="contact-hero-overlay"></div>

          <motion.div 
            className="contact-hero-content"
            style={{ rotateX, rotateY }}
          >
            <motion.div 
              className="hero-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="contact-hero-title">Contact<br /><span style={{ color: '#e61e25' }}>Us</span></h1>
            </motion.div>

            <motion.div 
              className="hero-right"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="contact-hero-text">
                Partner with Dubai's leading advertising experts to create high-impact visual communications that resonate.
                From strategic brand identity to massive digital billboard solutions, we transform your vision into 
                unforgettable urban experiences that bring your brand into the spotlight.
              </p>
              <Link href="#campaign" className="hero-cta-button">
                Start Your Campaign
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Get In Touch Section */}
        <section className="touch-container">
          <motion.div 
            className="touch-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Get<br /><span className="italic">In Touch</span></h2>
            <p>Reach out to us for enquiries, support, or to start your advertising campaign.</p>
          </motion.div>

          <motion.div 
            className="touch-right"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="contact-info-list">
              <div className="info-item">
                <Mail className="info-item-icon" size={24} />
                <a href="mailto:hello@oneclickadv.ae">hello@oneclickadv.ae</a>
              </div>
              <div className="info-item">
                <Phone className="info-item-icon" size={24} />
                <a href="tel:+971524065110">+971 52 406 5110</a>
              </div>
              <div className="info-item">
                <MapPin className="info-item-icon" size={24} />
                <span>Dubai, United Arab Emirates</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Campaign Form Section */}
        <section id="campaign" className="campaign-section">
          <motion.div 
            className="campaign-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2>Start Your <span className="italic">Campaign</span></h2>
            <p className="campaign-subtitle">Tell us about your requirements and we'll get back to you quickly</p>
          </motion.div>

          <div className="form-wrapper">
            {submitStatus?.success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '2rem' }}
              >
                <div style={{ background: '#22c55e', width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3>Request Submitted!</h3>
                <p>Thank you. Our experts will contact you shortly.</p>
                <button onClick={() => setSubmitStatus(null)} className="submit-button" style={{ marginTop: '1.5rem' }}>Send Another</button>
              </motion.div>
            ) : (
              <motion.form 
                className="contact-form" 
                onSubmit={handleSubmit}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp}>
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <input
                    type="text"
                    placeholder="Company Name (optional)"
                    className="form-input"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <select
                    className="form-select"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    required
                  >
                    <option value="">Service (Brand Identity)</option>
                    <option value="branding">Brand Identity</option>
                    <option value="digital-graphics">Digital Graphics</option>
                    <option value="vehicle-graphics">Vehicle Graphics</option>
                    <option value="signage">Signage</option>
                    <option value="exhibition">Exhibition & POS</option>
                    <option value="cladding">Cladding & Facade</option>
                  </select>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <textarea
                    placeholder="Message"
                    className="form-textarea"
                    style={{ minHeight: 120 }}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </motion.div>
                <motion.div className="submit-button-wrap" variants={fadeInUp}>
                  <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Submit Request'}
                  </button>
                </motion.div>
              </motion.form>
            )}
          </div>
        </section>

      </div>
    </>
  );
}
