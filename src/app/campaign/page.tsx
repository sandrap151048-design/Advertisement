"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState, FormEvent } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } as any }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 } as any
  }
};

export default function CampaignPage() {
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Direct validation
      if (!formData.name || !formData.phone || !formData.email || !formData.service || !formData.message) {
        setSubmitStatus({ success: false, message: 'Please complete all required fields.' });
        setIsSubmitting(false);
        return;
      }

      const res = await fetch('/api/campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitStatus({ 
          success: true, 
          message: "Success! Your campaign request has been recorded. Our team will contact you shortly to discuss the next steps." 
        });
        setFormData({ name: '', phone: '', email: '', company: '', service: '', message: '' });
      } else {
        setSubmitStatus({ 
          success: false, 
          message: data.error || 'Submission failed. Please check your information and try again.' 
        });
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus({ 
        success: false, 
        message: 'Unable to reach the server. Please check your connection and try again.' 
      });
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

        .campaign-page {
          background: #121212;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
        }

        .back-button-campaign {
          position: fixed;
          top: 40px;
          left: 40px;
          z-index: 100;
          color: white;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .back-button-campaign:hover {
          transform: translateX(-5px);
        }

        .campaign-container {
          max-width: 450px;
          width: 100%;
          padding: 2rem;
          background: #0f0f0f;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 50px rgba(12, 12, 12, 0.6);
        }

        .campaign-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .campaign-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          margin-bottom: 0.1rem;
          line-height: 1;
        }

        .campaign-subtitle {
          font-family: serif;
          font-style: italic;
          color: white;
          font-size: 2.22rem;
          font-weight: 300;
          margin-bottom: 0.5rem;
          line-height: 1;
          opacity: 0.9;
        }

        .campaign-description {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          line-height: 1.6;
          max-width: 400px;
          margin: 0 auto;
        }

        .campaign-form {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 1.1rem 1.25rem;
          background: #121212;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          color: white;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: rgba(255, 255, 255, 0.2);
        }

        .form-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(255,255,255,0.6)' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
        }

        .submit-button {
          padding: 1.2rem 2rem;
          background: #e61e25;
          color: white;
          font-weight: 800;
          border-radius: 50px;
          border: none;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(230,30,37,0.3);
        }

        .status-overlay {
          position: fixed; inset: 0; background: rgba(12, 12, 12,0.85);
          display: flex; align-items: center; justify-content: center; z-index: 9999;
          padding: 2rem; backdrop-filter: blur(10px);
        }
        .status-card {
          background: #111; border-radius: 24px; padding: 4rem 3rem; text-align: center;
          max-width: 450px; width: 100%; border: 1px solid rgba(255,255,255,0.1);
        }
      `}</style>

      <div className="campaign-page">
        <Link href="/">
          <div className="back-button-campaign">
            <ArrowLeft size={32} />
          </div>
        </Link>

        <motion.div
          className="campaign-container"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className="campaign-header" variants={fadeInUp}>
            <h1 className="campaign-title">Start Your</h1>
            <div className="campaign-subtitle">Campaign</div>
            <p className="campaign-description">
              Tell us about your requirements and we'll get back to you quickly
            </p>
          </motion.div>

          <AnimatePresence>
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="status-overlay"
              >
                <div className="status-card">
                  <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                    {submitStatus.success 
                      ? <CheckCircle2 size={80} color="#4ade80" /> 
                      : <XCircle size={80} color="#f87171" />}
                  </div>
                  <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>
                    {submitStatus.success ? 'Request Sent!' : 'Something went wrong'}
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                    {submitStatus.message}
                  </p>
                  <button 
                    onClick={() => setSubmitStatus(null)}
                    style={{
                      padding: '1rem 3rem', background: submitStatus.success ? '#4ade80' : '#f87171',
                      color: 'black', fontWeight: 800, border: 'none', borderRadius: 50, cursor: 'pointer'
                    }}
                  >
                    {submitStatus.success ? 'Great, thanks!' : 'Try Again'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form className="campaign-form" onSubmit={handleSubmit}>
            <input
              type="text" placeholder="Name" className="form-input"
              value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="tel" placeholder="Phone Number" className="form-input"
              value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            <input
              type="email" placeholder="Email" className="form-input"
              value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="text" placeholder="Company Name" className="form-input"
              value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
            <select
              className="form-select" value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              required
            >
              <option value="">Select Service</option>
              <option value="branding">Brand Identity</option>
              <option value="digital-graphics">Digital Printing</option>
              <option value="vehicle-graphics">Vehicle Branding</option>
              <option value="signage">Signage</option>
              <option value="exhibition">Exhibition & POS</option>
              <option value="cladding">Façade & Cladding</option>
            </select>
            <textarea
              placeholder="Your Message..." className="form-textarea"
              style={{ minHeight: '120px' }}
              value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
            <button
              type="submit" className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : 'Submit Campaign'}
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
}
