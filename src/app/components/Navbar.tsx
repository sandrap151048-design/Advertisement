"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link href="/" className="nav-logo">
          <div className="nav-logo-icon">OC</div>
          <div>
            <span style={{ color: 'var(--color-primary)', fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>One</span>
            <span style={{ color: 'var(--color-text-main)', fontFamily: "'Syne', sans-serif", fontWeight: 700 }}> Click</span>
            <div style={{ fontSize: '0.55rem', fontWeight: 600, color: 'rgba(15, 23, 42, 0.4)', letterSpacing: '2px', textTransform: 'uppercase', lineHeight: 1, marginTop: '1px', fontFamily: "'Space Grotesk', sans-serif" }}>Advertisement</div>
          </div>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: 'var(--color-primary)'
          }}
          className="mobile-menu-toggle"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <nav className={`nav-links ${isMenuOpen ? 'nav-links-mobile-open' : ''}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
          <Link href="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/services" className="nav-link" onClick={() => setIsMenuOpen(false)}>Services</Link>
          <Link href="/testimonials" className="nav-link" onClick={() => setIsMenuOpen(false)}>Testimonials</Link>
          <Link href="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          <Link href="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About Us</Link>
        </nav>

        <div className={`nav-actions ${isMenuOpen ? 'nav-actions-mobile-open' : ''}`}>
          <Link href="/register" className="btn btn-outline" style={{ padding: '0.45rem 1.2rem', fontSize: '0.85rem', borderRadius: '8px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, marginRight: '0.8rem' }} onClick={() => setIsMenuOpen(false)}>Start Your Campaign</Link>
          <Link href="/admin/login" className="btn btn-primary" style={{ padding: '0.45rem 1.2rem', fontSize: '0.85rem', borderRadius: '8px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }} onClick={() => setIsMenuOpen(false)}>Admin Panel</Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: block !important;
          }

          .nav-links {
            position: fixed;
            top: 68px;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 1rem;
            gap: 0.5rem;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: none;
            border-bottom: 1px solid rgba(124, 58, 237, 0.15);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .nav-links-mobile-open {
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
          }

          .nav-link {
            width: 100%;
            text-align: center;
            padding: 0.75rem;
          }

          .nav-actions {
            position: fixed;
            top: calc(68px + 280px);
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 1rem;
            gap: 0.75rem;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: none;
            border-bottom: 1px solid rgba(124, 58, 237, 0.15);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .nav-actions-mobile-open {
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
          }

          .nav-actions .btn {
            width: 100%;
            margin: 0 !important;
          }
        }
      `}</style>
    </header>
  );
}
