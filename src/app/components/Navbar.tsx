"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container nav-inner">
          <Link href="/" className="nav-logo">
            <div className="nav-logo-icon">OC</div>
            <div className="nav-logo-text">
              <span className="brand-primary">One</span>
              <span className="brand-secondary"> Click</span>
              <div className="brand-tagline">Advertisement</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-links-desktop">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/services" className="nav-link">Services</Link>
            <Link href="/testimonials" className="nav-link">Testimonials</Link>
            <Link href="/blog" className="nav-link">Blog</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
            <Link href="/about" className="nav-link">About Us</Link>
          </nav>

          <div className="nav-actions-desktop">
            <Link href="/register" className="btn btn-outline nav-btn">Start Your Campaign</Link>
            <Link href="/admin/login" className="btn btn-primary nav-btn">Login</Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <style jsx>{`
          .navbar-scrolled {
            background: rgba(255, 255, 255, 0.98) !important;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }
          
          .nav-logo-text {
            display: flex;
            flex-direction: column;
            line-height: 1;
          }
          
          .brand-tagline {
            font-size: 0.65rem;
            font-weight: 500;
            color: var(--color-accent);
            letter-spacing: 1.5px;
            text-transform: uppercase;
            margin-top: 2px;
          }
        `}</style>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <div className="mobile-nav-links">
          <Link href="/" className="mobile-nav-link" onClick={closeMobileMenu}>Home</Link>
          <Link href="/services" className="mobile-nav-link" onClick={closeMobileMenu}>Services</Link>
          <Link href="/testimonials" className="mobile-nav-link" onClick={closeMobileMenu}>Testimonials</Link>
          <Link href="/blog" className="mobile-nav-link" onClick={closeMobileMenu}>Blog</Link>
          <Link href="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>Contact</Link>
          <Link href="/about" className="mobile-nav-link" onClick={closeMobileMenu}>About Us</Link>
        </div>
        
        <div className="mobile-nav-actions">
          <Link href="/register" className="btn btn-outline mobile-btn" onClick={closeMobileMenu}>
            Start Your Campaign
          </Link>
          <Link href="/admin/login" className="btn btn-primary mobile-btn" onClick={closeMobileMenu}>
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
