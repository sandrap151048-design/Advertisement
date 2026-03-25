"use client";

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
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
    service: '',
    location: '',
    duration: '',
    message: ''
  });
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
        setFormData({ name: '', phone: '', email: '', service: '', location: '', duration: '', message: '' });
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
          background: #f5f5f5;
          min-height: 100vh;
        }

        .contact-hero {
          position: relative;
          height: 60vh;
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          overflow: hidden;
          padding-top: 80px;
          padding: 0 4rem;
        }

        .contact-hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .contact-hero-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.5);
        }

        .contact-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%);
          z-index: 1;
        }

        .contact-hero-content {
          position: relative;
          z-index: 2;
          color: white;
          max-width: 600px;
        }

        .contact-hero-title {
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -2px;
        }

        .contact-hero-text {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.9);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .hero-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          padding: 1rem 2rem;
          background: white;
          color: #1a1a1a;
          font-weight: 700;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1rem;
          border: none;
          cursor: pointer;
        }

        .hero-cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255,255,255,0.3);
        }

        .contact-content {
          padding: 4rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .get-in-touch-section {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .touch-info {
          padding: 4rem 3rem;
          background: white;
          border-radius: 20px;
        }

        .touch-info h2 {
          font-size: 2.5rem;
          font-weight: 900;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .touch-info h2 .italic {
          font-style: italic;
          color: #666;
        }

        .touch-info p {
          font-size: 1rem;
          color: #666;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .contact-details {
          background: #2c4a5e;
          padding: 4rem 3rem;
          color: white;
          border-radius: 0;
        }

        .contact-detail-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .contact-detail-item svg {
          flex-shrink: 0;
        }

        .contact-detail-item div {
          flex: 1;
        }

        .contact-detail-item a {
          color: white;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .contact-detail-item a:hover {
          text-decoration: underline;
        }

        .form-section {
          background: #0a0a0a;
          padding: 6rem 2rem;
          color: white;
          text-align: center;
        }

        .form-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 3rem 2.5rem;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 16px;
          background: rgba(20, 20, 20, 0.5);
          backdrop-filter: blur(10px);
        }

        .form-section h2 {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 900;
          margin-bottom: 0.3rem;
          color: white;
        }

        .form-section h2 .italic {
          font-style: italic;
          color: rgba(255,255,255,0.7);
          font-weight: 400;
        }

        .form-section p {
          color: rgba(255,255,255,0.6);
          margin-bottom: 2.5rem;
          font-size: 0.95rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 1rem 1.2rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 8px;
          color: white;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.08);
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: rgba(255,255,255,0.4);
        }

        .form-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(255,255,255,0.6)' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 3rem;
          color: rgba(255,255,255,0.8);
        }

        .form-select option {
          background: #1a1a1a !important;
          color: white !important;
        }

        .form-textarea {
          min-height: 100px;
          resize: vertical;
        }

        .submit-button {
          -webkit-appearance: none;
          appearance: none;
          padding: 1.4rem 2rem;
          background: white;
          color: #0a0a0a;
          font-weight: 800;
          border-radius: 50px;
          border: none;
          font-size: 1.15rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          margin-top: 1rem;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.95);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .contact-hero {
            margin-top: 60px;
            height: 50vh;
            padding: 0 2rem;
            flex-direction: column;
            justify-content: center;
          }

          .get-in-touch-section {
            grid-template-columns: 1fr;
          }

          .touch-info,
          .contact-details {
            padding: 2rem;
          }
        }
      `}</style>

      <div className="contact-page">

        {/* Hero Section */}
        <section className="contact-hero">
          <div className="contact-hero-bg">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80" 
              alt="Contact Us - One Click Billboard" 
            />
          </div>
          <div className="contact-hero-overlay"></div>
          
          <motion.div 
            className="contact-hero-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 className="contact-hero-title" variants={fadeInUp}>
              Contact<br />Us
            </motion.h1>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            style={{ position: 'relative', zIndex: 2, color: 'white', maxWidth: '400px' }}
          >
            <p className="contact-hero-text">
              Let's start your advertising campaign and bring your brand into the spotlight.
            </p>
            <Link href="/campaign" className="hero-cta-button" style={{ display: 'inline-block', textDecoration: 'none' }}>
              Start Your Campaign
            </Link>
          </motion.div>
        </section>

        {/* Get In Touch Section */}
        <section className="contact-content">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="get-in-touch-section"
          >
            <motion.div className="touch-info" variants={fadeInUp}>
              <h2>
                Get <br />
                <span className="italic">In Touch</span>
              </h2>
              <p>
                Reach out to us for enquiries, support, or to start your advertising campaign.
              </p>
            </motion.div>

            <motion.div className="contact-details" variants={fadeInUp}>
              <div className="contact-detail-item">
                <Mail size={24} />
                <div>
                  <a href="mailto:hello@oneclick.adv.ae">hello@oneclick.adv.ae</a>
                </div>
              </div>
              <div className="contact-detail-item">
                <Phone size={24} />
                <div>
                  <a href="tel:+971524065110">+971 52 406 5110</a>
                </div>
              </div>
              <div className="contact-detail-item">
                <MapPin size={24} />
                <div>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                    Dubai, United Arab Emirates
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Form Section */}
          <motion.section 
            id="contact-form"
            className="form-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="form-container">
              <motion.h2 variants={fadeInUp}>
                Start Your <br />
                <span className="italic">Campaign</span>
              </motion.h2>
              <motion.p variants={fadeInUp}>
                Tell us about your requirements and we'll get back to you quickly
              </motion.p>

              {submitStatus && (
                <motion.div 
                  variants={fadeInUp}
                  style={{ 
                    padding: '1rem', 
                    borderRadius: '8px', 
                    background: submitStatus.success ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
                    color: submitStatus.success ? '#4ade80' : '#f87171', 
                    border: `1px solid ${submitStatus.success ? '#4ade8033' : '#f8717133'}`, 
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                  }}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              <motion.form className="contact-form" onSubmit={handleSubmit} variants={staggerContainer}>
                <motion.input
                  variants={fadeInUp}
                  type="text"
                  placeholder="Name"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                
                <motion.input
                  variants={fadeInUp}
                  type="tel"
                  placeholder="Phone Number"
                  className="form-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                
                <motion.input
                  variants={fadeInUp}
                  type="email"
                  placeholder="Email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                
                <motion.select
                  variants={fadeInUp}
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
                </motion.select>
                
                <motion.input
                  variants={fadeInUp}
                  type="text"
                  placeholder="Company Name (optional)"
                  className="form-input"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
                
                <motion.textarea
                  variants={fadeInUp}
                  placeholder="Message"
                  className="form-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
                
                <motion.button
                  variants={fadeInUp}
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Submit Request'}
                </motion.button>
              </motion.form>
            </div>
          </motion.section>
        </section>

        {/* Footer */}
        <footer style={{ background: '#1a1a1a', color: 'white', padding: '6rem 2rem 4rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3.5rem', marginBottom: '3.5rem' }}>
              {/* Services Section */}
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Services</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <li><Link href="/services/billboards" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Retail Signage</Link></li>
                  <li><Link href="/services/billboards" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Billboards</Link></li>
                  <li><Link href="/services/vehicle-branding" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Vehicle Branding</Link></li>
                  <li><Link href="/services/campaign-solutions" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Campaign Solutions</Link></li>
                </ul>
              </div>

              {/* Company Section */}
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Company</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <li><Link href="/about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>About Us</Link></li>
                  <li><Link href="/services" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Our Work</Link></li>
                  <li><Link href="/testimonials" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Locations</Link></li>
                  <li><Link href="/contact" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Contact</Link></li>
                </ul>
              </div>

              {/* Support Section */}
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Support</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <li><Link href="/contact" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>How It Works</Link></li>
                  <li><Link href="/contact" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>FAQs</Link></li>
                  <li><Link href="/contact" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Terms & Conditions</Link></li>
                  <li><Link href="/contact" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>Privacy Policy</Link></li>
                </ul>
              </div>

              {/* Connect Section */}
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: 'white' }}>Connect with us</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <li><a href="tel:+971524065110" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>+971 52 406 5110</a></li>
                  <li><a href="mailto:hello@oneclickadv.ae" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.3s' }}>hello@oneclickadv.ae</a></li>
                </ul>
              </div>
            </div>

            {/* Footer Bottom */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
              <span>© 2025 One Click. All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
