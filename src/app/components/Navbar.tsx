"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Optimize mounting and event listeners
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close menu when clicking outside or pressing escape
  useEffect(() => {
    if (!isMounted) return;

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
  }, [isMenuOpen, isMounted]);

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link href="/" className="nav-logo" onClick={closeMenu}>
          <div className="nav-logo-icon">OC</div>
          <div className="nav-logo-text">
            <span className="brand-primary">One</span>
            <span className="brand-secondary"> Click</span>
            <div className="brand-tagline">Advertisement</div>
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
          <Link href="/blog" className="mobile-nav-link" onClick={closeMenu}>Blog</Link>
          <Link href="/contact" className="mobile-nav-link" onClick={closeMenu}>Contact</Link>
          <Link href="/about" className="mobile-nav-link" onClick={closeMenu}>About Us</Link>
        </nav>
        
        <div className="mobile-nav-actions">
          <Link href="/register" className="btn btn-outline mobile-btn" onClick={closeMenu}>Start Your Campaign</Link>
          <Link href="/admin/login" className="btn btn-primary mobile-btn" onClick={closeMenu}>Login</Link>
        </div>
      </div>
    </header>
  );
}
