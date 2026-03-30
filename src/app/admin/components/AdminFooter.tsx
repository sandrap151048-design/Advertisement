"use client";

import Link from 'next/link';
import { Phone, MapPin, Mail, Layout, Users, MessageSquare, Briefcase, ExternalLink } from 'lucide-react';

export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ marginTop: '5rem', padding: '5rem 0', background: '#000000', borderTop: '1px solid rgba(255,255,255,0.08)', color: 'white' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem', marginBottom: '4rem' }}>
          {/* Logo Column */}
          <div>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0', marginBottom: '1.5rem' }}>
              <svg width="28" height="28" viewBox="0 0 28 28" style={{ marginRight: '-1px' }}>
                <circle cx="14" cy="14" r="11" fill="none" stroke="white" strokeWidth="4"/>
                <rect x="16" y="2" width="9" height="9" fill="#e61e25" rx="1"/>
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: 'white', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.5px', marginLeft: '-1px', lineHeight: '1.1' }}>ne Click</div>
                <div style={{ color: '#e61e25', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginTop: '2px' }}>Admin Portal</div>
              </div>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '280px' }}>
              Premium advertising and outdoor media solutions across the UAE.
            </p>
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
          &copy; {currentYear} One Click Admin Portal. All Rights Reserved.
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
