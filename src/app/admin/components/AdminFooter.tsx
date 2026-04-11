"use client";

import Link from 'next/link';
import { Phone, MapPin, Mail, Layout, Users, MessageSquare, Briefcase, ExternalLink, Facebook, Instagram, Linkedin } from 'lucide-react';
import Logo from '../../components/Logo';

export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ marginTop: '5rem', padding: '5rem 0', background: '#121212', borderTop: '1px solid rgba(255,255,255,0.08)', color: 'white' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem', marginBottom: '4rem' }}>
          {/* Logo Column */}
          <div>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <Logo size="small" showFullText={true} />
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '280px', marginBottom: '1.5rem' }}>
              Premium advertising and outdoor media solutions across the UAE.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <a href="https://www.facebook.com/oneclickadvertisement/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color = '#e61e25'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'} aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/oneclick_advertisement?igsh=NzNwaGo2b2VwbDNh" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color = '#e61e25'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'} aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color = '#e61e25'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'} aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '2rem', color: 'white' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.3s' }}>Home</Link></li>
              <li><Link href="/projects" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.3s' }}>Projects</Link></li>
              <li><Link href="/services" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.3s' }}>Services</Link></li>
              <li><Link href="/contact" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.3s' }}>Contact</Link></li>
              <li><Link href="/about" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.3s' }}>About</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '2rem', color: 'white' }}>Contact Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div 
                onClick={() => window.location.href = '/admin/settings'}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  padding: '1rem',
                  background: 'rgba(230, 30, 37, 0.1)',
                  border: '1px solid rgba(230, 30, 37, 0.2)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#e61e25', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <LocalEditIcon size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'white' }}>Edit Contact Details</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>Manage phone, email, and location</div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        <div suppressHydrationWarning style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
          &copy; {currentYear} One Click Advertisement LLC. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

// Local Edit icon component if not using lucide
function LocalEditIcon({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}
