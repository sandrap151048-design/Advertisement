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
    <footer style={{ background: '#1a1a1a', color: 'white', padding: '6rem 2rem 4rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
          {/* Brand Section */}
          <div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '1.8rem', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '-0.5px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="34" height="34" viewBox="0 0 32 32" style={{ display: 'inline-block' }}>
                  <circle cx="16" cy="16" r="13" fill="none" stroke="white" strokeWidth="4"/>
                  <rect x="18" y="3" width="10" height="10" fill="#e61e25" rx="1"/>
                </svg>
                <span style={{ color: 'white' }}>ne Click</span>
              </div>
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', lineHeight: '1.9', fontSize: '1.05rem', maxWidth: '320px' }}>
              Premium advertising solutions across the UAE. Delivering high-impact visual communication services since 2012.
            </p>
            <div style={{ display: 'flex', gap: '1.2rem' }}>
              <a href="https://www.facebook.com/oneclickadv" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.6)', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#e61e25'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                <Facebook size={22} />
              </a>
              <a href="https://www.instagram.com/oneclickadv" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.6)', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#e61e25'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                <Instagram size={22} />
              </a>
              <a href="https://twitter.com/oneclickadv" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.6)', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#e61e25'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                <Twitter size={22} />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '2rem', color: 'white', textTransform: 'uppercase', letterSpacing: '1px' }}>Services</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><Link href="/services#branding" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#e61e25', e.currentTarget.style.paddingLeft = '8px')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)', e.currentTarget.style.paddingLeft = '0')}>Branding</Link></li>
              <li><Link href="/services#graphics" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#e61e25', e.currentTarget.style.paddingLeft = '8px')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)', e.currentTarget.style.paddingLeft = '0')}>Graphics</Link></li>
              <li><Link href="/services#signage" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#e61e25', e.currentTarget.style.paddingLeft = '8px')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)', e.currentTarget.style.paddingLeft = '0')}>Signage</Link></li>
              <li><Link href="/services#vehicle" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#e61e25', e.currentTarget.style.paddingLeft = '8px')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)', e.currentTarget.style.paddingLeft = '0')}>Vehicle Wraps</Link></li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '2rem', color: 'white', textTransform: 'uppercase', letterSpacing: '1px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><Link href="/about" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#e61e25', e.currentTarget.style.paddingLeft = '8px')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)', e.currentTarget.style.paddingLeft = '0')}>About Us</Link></li>
              <li><Link href="/services" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#e61e25', e.currentTarget.style.paddingLeft = '8px')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)', e.currentTarget.style.paddingLeft = '0')}>Our Services</Link></li>
              <li><Link href="/contact" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#e61e25', e.currentTarget.style.paddingLeft = '8px')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)', e.currentTarget.style.paddingLeft = '0')}>Contact</Link></li>
              <li><Link href="/blog" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '1rem', transition: 'all 0.3s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#e61e25', e.currentTarget.style.paddingLeft = '8px')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)', e.currentTarget.style.paddingLeft = '0')}>Latest News</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '2rem', color: 'white', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <Phone size={20} style={{ color: '#e61e25', flexShrink: 0 }} />
                <a href="tel:+971524065110" style={{ color: 'white', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 500, transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#e61e25'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>+971 52 406 5110</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <Mail size={20} style={{ color: '#e61e25', flexShrink: 0 }} />
                <a href="mailto:hello@oneclickadv.ae" style={{ color: 'white', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 500, transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#e61e25'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>hello@oneclickadv.ae</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'start', gap: '1.2rem' }}>
                <MapPin size={20} style={{ color: '#e61e25', flexShrink: 0, marginTop: '4px' }} />
                <a href="https://www.google.com/maps/search/?api=1&query=Dubai+UAE" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', fontSize: '1.05rem', fontWeight: 500, lineHeight: 1.5, transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#e61e25'} onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>Dubai, UAE</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', fontWeight: 500 }}>
          &copy; {currentYear || new Date().getFullYear()} One Click Advertisement. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
