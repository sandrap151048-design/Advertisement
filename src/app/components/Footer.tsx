"use client";

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer style={{ background: '#000000', color: 'white', padding: '100px 40px 60px 40px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '60px', marginBottom: '80px' }}>
          {/* Services Column */}
          <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2.5rem', color: 'white', letterSpacing: '-0.5px' }}>Services</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <li><Link href="/services" style={{ color: '#888', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s' }}>Brand Identity</Link></li>
              <li><Link href="/services" style={{ color: '#888', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s' }}>Digital Printing</Link></li>
              <li><Link href="/services" style={{ color: '#888', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s' }}>Vehicle Branding</Link></li>
              <li><Link href="/services" style={{ color: '#888', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s' }}>Display Solutions</Link></li>
              <li><Link href="/services" style={{ color: '#888', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s' }}>Signages</Link></li>
              <li><Link href="/services" style={{ color: '#888', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s' }}>Façade & Cladding</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2.5rem', color: 'white', letterSpacing: '-0.5px' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <li><Link href="/about" style={{ color: '#888', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s' }}>About Us</Link></li>
              <li><Link href="/projects" style={{ color: '#888', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s' }}>Our Work</Link></li>
              <li><Link href="/locations" style={{ color: '#888', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s' }}>Locations</Link></li>
              <li><Link href="/contact" style={{ color: '#888', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s' }}>Contact</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2.5rem', color: 'white', letterSpacing: '-0.5px' }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <li><Link href="/how-it-works" style={{ color: '#888', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s' }}>How it Works</Link></li>
              <li><Link href="/faq" style={{ color: '#888', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s' }}>FAQs</Link></li>
              <li><Link href="/terms" style={{ color: '#888', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s' }}>Terms & Conditions</Link></li>
              <li><Link href="/privacy" style={{ color: '#888', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.3s' }}>Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Connect with us Column */}
          <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2.5rem', color: 'white', letterSpacing: '-0.5px' }}>Connect with us</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Phone size={18} style={{ color: '#888' }} />
                <a href="tel:+971524065110" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: 500 }}>+971 52 406 5110</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Mail size={18} style={{ color: '#888' }} />
                <a href="mailto:hello@oneclickadv.ae" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: 500 }}>hello@oneclickadv.ae</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '40px', textAlign: 'center', color: '#666', fontSize: '0.9rem', fontWeight: 500 }}>
          &copy; {currentYear || new Date().getFullYear()} One Click. All rights reserved.
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          footer { padding: 60px 20px 40px 20px !important; }
          div[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 640px) {
          div[style*="grid-template-columns: repeat(2, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
