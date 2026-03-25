"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
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
      const res = await fetch('/api/campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitStatus({ success: true, message: "Your campaign request has been submitted! We'll reach out to you shortly." });
        setFormData({ name: '', phone: '', email: '', company: '', service: '', message: '' });
      } else {
        setSubmitStatus({ success: false, message: data.error || 'Something went wrong. Please try again.' });
      }
    } catch {
      setSubmitStatus({ success: false, message: 'Failed to connect to the server. Please check your connection.' });
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
          background: #0a0a0a;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
        }

        .back-button-campaign {
          position: fixed;
          top: 30px;
          left: 40px;
          z-index: 100;
          background: rgba(255, 255, 255, 0.1);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .back-button-campaign:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        .campaign-container {
          max-width: 500px;
          width: 100%;
          padding: 3rem 2.5rem;
          background: rgba(20, 20, 20, 0.8);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        }

        .campaign-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .campaign-title {
          font-size: 3rem;
          font-weight: 900;
          color: white;
          margin-bottom: 0.3rem;
          line-height: 1.1;
        }

        .campaign-subtitle {
          font-style: italic;
          color: rgba(255, 255, 255, 0.7);
          font-size: 2.5rem;
          font-weight: 400;
          margin-bottom: 1rem;
        }

        .campaign-description {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .campaign-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 1rem 1.2rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          color: white;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.08);
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .form-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(255,255,255,0.6)' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 3rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .form-select option {
          background: #1a1a1a;
          color: white;
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
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.95);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .status-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 2rem;
          backdrop-filter: blur(8px);
        }
        .status-card {
          background: #111;
          border-radius: 24px;
          padding: 3rem 2.5rem;
          text-align: center;
          max-width: 420px;
          width: 100%;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 24px 60px rgba(0,0,0,0.6);
        }
        .status-error-card {
          border-color: rgba(239,68,68,0.3);
        }

        @media (max-width: 768px) {
          .back-button-campaign {
            top: 20px;
            left: 20px;
            width: 45px;
            height: 45px;
          }

          .campaign-container {
            padding: 2rem 1.5rem;
          }

          .campaign-title {
            font-size: 2.5rem;
          }

          .campaign-subtitle {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="campaign-page">
        <Link href="/">
          <div className="back-button-campaign">
            <ArrowLeft size={24} color="white" />
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
                onClick={() => !submitStatus.success ? setSubmitStatus(null) : undefined}
              >
                <motion.div
                  initial={{ scale: 0.7, opacity: 0, y: 40 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={`status-card ${!submitStatus.success ? 'status-error-card' : ''}`}
                  onClick={e => e.stopPropagation()}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
                    style={{ marginBottom: '1.5rem' }}
                  >
                    {submitStatus.success
                      ? <CheckCircle2 size={72} color="#4ade80" strokeWidth={1.5} />
                      : <XCircle size={72} color="#f87171" strokeWidth={1.5} />}
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{ color: 'white', fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.75rem' }}
                  >
                    {submitStatus.success ? '🎉 Request Submitted!' : 'Something went wrong'}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}
                  >
                    {submitStatus.message}
                  </motion.p>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => setSubmitStatus(null)}
                    style={{
                      padding: '0.85rem 2.5rem',
                      background: submitStatus.success ? '#4ade80' : '#f87171',
                      color: '#0a0a0a',
                      border: 'none',
                      borderRadius: 50,
                      fontWeight: 700,
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    {submitStatus.success ? 'Awesome! Close' : 'Try Again'}
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form className="campaign-form" onSubmit={handleSubmit} variants={staggerContainer}>
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

            <motion.input
              variants={fadeInUp}
              type="text"
              placeholder="Company Name (optional)"
              className="form-input"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
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
        </motion.div>
      </div>
    </>
  );
}
