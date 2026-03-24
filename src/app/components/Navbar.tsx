"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
      <style jsx global>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modern-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeInDown 0.6s ease-out;
          display: block;
          visibility: visible;
          opacity: 1;
          border-radius: 0 0 20px 20px;
        }

        .modern-navbar.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 0 0 20px 20px;
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
          gap: 2rem;
          visibility: visible;
          opacity: 1;
        }

        /* Logo Section */
        .navbar-logo {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          text-decoration: none;
          transition: transform 0.3s ease;
          visibility: visible;
          opacity: 1;
        }

        .navbar-logo:hover {
          transform: scale(1.02);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .logo-main {
          font-size: 1.4rem;
          font-weight: 700;
          color: #1a1a1a;
          letter-spacing: -0.5px;
        }

        .logo-main .accent {
          background: linear-gradient(135deg, #7C3AED 0%, #A855F7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .logo-tagline {
          font-size: 0.65rem;
          font-weight: 600;
          color: #666;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 2px;
        }

        /* Center Navigation */
        .navbar-nav {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
        }

        .nav-link {
          position: relative;
          color: #1a1a1a;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.3px;
          transition: color 0.3s ease;
          padding: 0.5rem 0;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #7C3AED 0%, #A855F7 100%);
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link:hover {
          color: #7C3AED;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* Right Actions */
        .navbar-actions {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .btn-campaign {
          padding: 0.75rem 1.75rem;
          background: linear-gradient(135deg, #7C3AED 0%, #A855F7 100%);
          color: white;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 600;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.2);
          letter-spacing: 0.3px;
        }

        .btn-campaign:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 6px 20px rgba(124, 58, 237, 0.35);
        }

        .btn-campaign:active {
          transform: translateY(0) scale(0.98);
        }

        .btn-login {
          padding: 0.75rem 1.75rem;
          background: #1a1a1a;
          color: white;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 600;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: 0.3px;
        }

        .btn-login:hover {
          background: #333;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .btn-login:active {
          transform: translateY(0) scale(0.98);
        }

        /* Mobile Menu Toggle */
        .mobile-toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          transition: transform 0.3s ease;
          visibility: visible;
          opacity: 1;
        }

        .mobile-toggle:hover {
          transform: scale(1.1);
        }

        .mobile-toggle span {
          width: 24px;
          height: 2.5px;
          background: #1a1a1a;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .mobile-toggle.open span:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .mobile-toggle.open span:nth-child(2) {
          opacity: 0;
        }

        .mobile-toggle.open span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 2rem;
          transform: translateY(-100%);
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          max-height: calc(100vh - 80px);
          overflow-y: auto;
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .mobile-nav-link {
          color: #1a1a1a;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 500;
          padding: 1rem;
          border-radius: 10px;
          transition: all 0.3s ease;
          letter-spacing: 0.3px;
        }

        .mobile-nav-link:hover {
          background: rgba(124, 58, 237, 0.08);
          color: #7C3AED;
          transform: translateX(8px);
        }

        .mobile-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mobile-actions .btn-campaign,
        .mobile-actions .btn-login {
          width: 100%;
          text-align: center;
          padding: 1rem;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .navbar-nav {
            gap: 1.5rem;
          }

          .nav-link {
            font-size: 0.9rem;
          }

          .btn-campaign,
          .btn-login {
            padding: 0.7rem 1.5rem;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 768px) {
          .modern-navbar {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            z-index: 9999 !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
          }

          .navbar-container {
            height: 70px;
            padding: 0 1.5rem;
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
          }

          .navbar-nav,
          .navbar-actions {
            display: none !important;
          }

          .mobile-toggle {
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
          }

          .navbar-logo {
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
          }

          .logo-main {
            font-size: 1.2rem;
          }

          .logo-tagline {
            font-size: 0.6rem;
          }

          .mobile-menu {
            top: 70px;
            max-height: calc(100vh - 70px);
          }
        }

        @media (max-width: 480px) {
          .modern-navbar {
            position: fixed !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
          }

          .navbar-container {
            padding: 0 1rem;
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
          }

          .navbar-logo {
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
          }

          .mobile-toggle {
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
          }

          .logo-main {
            font-size: 1.1rem;
          }

          .logo-tagline {
            font-size: 0.55rem;
            letter-spacing: 1.5px;
          }
        }

        /* Smooth scrolling offset for fixed navbar */
        html {
          scroll-padding-top: 100px;
        }
      `}</style>

      <nav className={`modern-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <Link href="/" className="navbar-logo">
            <div className="logo-text">
              <div className="logo-main">
                <span className="accent">One</span> Click
              </div>
              <div className="logo-tagline">Advertisement</div>
            </div>
          </Link>

          {/* Center Navigation */}
          <div className="navbar-nav">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/services" className="nav-link">Services</Link>
            <Link href="/testimonials" className="nav-link">Testimonials</Link>
            <Link href="/blog" className="nav-link">Blog</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
            <Link href="/about" className="nav-link">About Us</Link>
          </div>

          {/* Right Actions */}
          <div className="navbar-actions">
            <Link href="/register" className="btn-campaign">
              Start Your Campaign
            </Link>
            <Link href="/admin/login" className="btn-login">
              Login
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`mobile-toggle ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          <Link href="/" className="mobile-nav-link" onClick={closeMobileMenu}>Home</Link>
          <Link href="/services" className="mobile-nav-link" onClick={closeMobileMenu}>Services</Link>
          <Link href="/testimonials" className="mobile-nav-link" onClick={closeMobileMenu}>Testimonials</Link>
          <Link href="/blog" className="mobile-nav-link" onClick={closeMobileMenu}>Blog</Link>
          <Link href="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>Contact</Link>
          <Link href="/about" className="mobile-nav-link" onClick={closeMobileMenu}>About Us</Link>
        </div>
        
        <div className="mobile-actions">
          <Link href="/register" className="btn-campaign" onClick={closeMobileMenu}>
            Start Your Campaign
          </Link>
          <Link href="/admin/login" className="btn-login" onClick={closeMobileMenu}>
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
