"use client";

import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ServiceMap() {
  return (
    <section className="locations-section">
      <style jsx>{`
        .locations-section {
          width: 100vw;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          background: #ffffff;
          text-align: center;
          padding: 8rem 0 0 0;
          overflow: hidden;
        }

        .locations-header {
          margin-bottom: 5rem;
          padding: 0 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .locations-title {
          font-size: 4rem;
          font-weight: 900;
          margin-bottom: 0.2rem;
          color: #111;
          line-height: 1;
        }

        .locations-subtitle {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          color: #333;
          font-size: 3rem;
          font-weight: 400;
          margin-bottom: 2rem;
        }

        .locations-description {
          color: #555;
          font-size: 1.1rem;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
          font-weight: 500;
        }

        .map-wrapper {
          width: 100%;
          height: 500px;
          position: relative;
          line-height: 0;
          overflow: hidden;
          margin: 0;
        }

        .map-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .map-wrapper:hover img {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .locations-title { font-size: 2.5rem; }
          .locations-subtitle { font-size: 2rem; }
          .map-wrapper { height: 350px; }
        }
      `}</style>

      <div className="locations-wrapper">
        <motion.div 
          className="locations-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } as any }
          }}
        >
          <h2 className="locations-title">Service</h2>
          <div className="locations-subtitle">Locations</div>
          <p className="locations-description">
            We provide our services across Dubai, Abu Dhabi, Sharjah, Ajman, and the Northern Emirates, ensuring reliable support and professional execution throughout the UAE.
          </p>
        </motion.div>

        <motion.div 
          className="map-wrapper"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <img 
            src="/images/uae_service_map_ultra_wide.png" 
            alt="One Click Advertisement - Service Locations UAE Map" 
          />
        </motion.div>
      </div>
    </section>
  );
}
