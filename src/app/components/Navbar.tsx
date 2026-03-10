"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      // Close mobile menu when resizing to desktop
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link href="/" className="nav-logo" onClick={closeMenu}>
          <div className="nav-logo-icon">OC</div>
          <div>
            <span style={{ color: 'var(--color-primary)', fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>One</span>
            <span style={{ color: 'var(--color-text-main)', fontFamily: "'Syne', sans-serif", fontWeight: 700 }}> Click</span>
            <div style={{ fontSize: '0.55rem', fontWeight: 600, color: 'rgba(15, 23, 42, 0.4)', letterSpacing: '2px', textTransform: 'uppercase', lineHeight: 1, marginTop: '1px', fontFamily: "'Space Grotesk', sans-serif" }}>Advertisement</div>
          </div>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="mobile-menu-toggle"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="nav-links-desktop" style={{ 
          fontFamily: "'Plus Jakarta Sans', sans-serif", 
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.2rem'
        }}>
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/services" className="nav-link">Services</Link>
          <Link href="/testimonials" className="nav-link">Testimonials</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
          <Link href="/about" className="nav-link">About Us</Link>
          <Link href="/blog" className="nav-link">Blog</Link>
        </nav>

        <div className="nav-actions-desktop" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          padding: '0 0.5rem'
        }}>
          <Link href="/register" className="btn btn-outline" style={{ padding: '0.45rem 1.2rem', fontSize: '0.85rem', borderRadius: '8px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, marginRight: '0.8rem' }}>Start Your Campaign</Link>
          <Link href="/admin/login" className="btn btn-primary" style={{ padding: '0.45rem 1.2rem', fontSize: '0.85rem', borderRadius: '8px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>Admin Panel</Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
        <nav className="mobile-nav-links">
          <Link href="/" className="mobile-nav-link" onClick={closeMenu}>Home</Link>
          <Link href="/services" className="mobile-nav-link" onClick={closeMenu}>Services</Link>
          <Link href="/testimonials" className="mobile-nav-link" onClick={closeMenu}>Testimonials</Link>
          <Link href="/contact" className="mobile-nav-link" onClick={closeMenu}>Contact</Link>
          <Link href="/about" className="mobile-nav-link" onClick={closeMenu}>About Us</Link>
          <Link href="/blog" className="mobile-nav-link" onClick={closeMenu}>Blog</Link>
        </nav>
        
        <div className="mobile-nav-actions">
          <Link href="/register" className="btn btn-outline mobile-btn" onClick={closeMenu}>Start Your Campaign</Link>
          <Link href="/admin/login" className="btn btn-primary mobile-btn" onClick={closeMenu}>Admin Panel</Link>
        </div>
      </div>
    </header>
  );
}
