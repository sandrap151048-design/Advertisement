"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        .floating-navbar {
          position: fixed;
          top: 20px;
          left: 40px;
          right: 40px;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 16px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          border: 1px solid rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          max-width: 1400px;
          margin: 0 auto;
        }

        .floating-navbar.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 30px;
          gap: 2rem;
        }

        /* Logo Section */
        .navbar-logo {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          text-decoration: none;
          transition: transform 0.3s ease;
        }

        .navbar-logo:hover {
          transform: scale(1.05);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .logo-main {
          font-size: 1.3rem;
          font-weight: 800;
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
          font-size: 0.6rem;
          font-weight: 600;
          color: #666;
          letter-spacing: 1.8px;
          text-transform: uppercase;
          margin-top: 2px;
        }

        /* Center Navigation */
        .navbar-nav {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 28px;
        }

        .nav-link {
          position: relative;
          color: #1a1a1a;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.3px;
          transition: color 0.3s ease;
          padding: 0.5rem 0;
          outline: none;
        }

        .nav-link:focus {
          outline: none;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #EF4444;
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-link:hover {
          color: #EF4444;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-link:active::after {
          width: 100%;
          background: #DC2626;
        }

        /* Right Actions */
        .navbar-actions {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-campaign {
          padding: 10px 24px;
          color: #1a1a1a;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 600;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.3px;
          position: relative;
          outline: none;
        }

        .btn-campaign:focus {
          outline: none;
        }

        .btn-campaign::after {
          content: '';
          position: absolute;
          bottom: 8px;
          left: 24px;
          right: 24px;
          height: 2px;
          background: #EF4444;
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .btn-campaign:hover {
          color: #EF4444;
        }

        .btn-campaign:hover::after {
          transform: scaleX(1);
        }

        .btn-campaign:active::after {
          transform: scaleX(1);
          background: #DC2626;
        }

        .btn-login {
          padding: 10px 20px;
          background: #111;
          color: white;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 600;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: 0.3px;
          outline: none;
        }

        .btn-login:focus {
          outline: none;
        }

        .btn-login:hover {
          background: #1a1a1a;
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
        }

        .btn-login:active {
          transform: scale(0.98);
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
          top: 110px;
          left: 40px;
          right: 40px;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 2rem;
          border-radius: 16px;
          transform: translateY(-20px);
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          max-height: calc(100vh - 140px);
          overflow-y: auto;
          border: 1px solid rgba(0, 0, 0, 0.08);
          max-width: 1400px;
          margin: 0 auto;
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
          font-weight: 600;
          padding: 1rem;
          border-radius: 15px;
          transition: all 0.3s ease;
          letter-spacing: 0.3px;
          outline: none;
        }

        .mobile-nav-link:focus {
          outline: none;
        }

        .mobile-nav-link:hover {
          background: rgba(239, 68, 68, 0.08);
          color: #EF4444;
          transform: translateX(8px);
        }

        .mobile-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mobile-actions .btn-campaign {
          width: 100%;
          text-align: center;
          padding: 1rem;
          background: rgba(239, 68, 68, 0.08);
          border-radius: 15px;
          outline: none;
        }

        .mobile-actions .btn-campaign:focus {
          outline: none;
        }

        .mobile-actions .btn-campaign::after {
          display: none;
        }

        .mobile-actions .btn-login {
          width: 100%;
          text-align: center;
          padding: 1rem;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .navbar-nav {
            gap: 20px;
          }

          .nav-link {
            font-size: 0.9rem;
          }

          .btn-campaign,
          .btn-login {
            padding: 9px 18px;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 768px) {
          .floating-navbar {
            top: 15px;
            left: 20px;
            right: 20px;
          }

          .navbar-container {
            padding: 10px 20px;
          }

          .navbar-nav,
          .navbar-actions {
            display: none;
          }

          .mobile-toggle {
            display: flex;
          }

          .logo-main {
            font-size: 1.2rem;
          }

          .logo-tagline {
            font-size: 0.55rem;
          }

          .mobile-menu {
            top: 95px;
            left: 20px;
            right: 20px;
          }
        }

        @media (max-width: 480px) {
          .floating-navbar {
            top: 10px;
            left: 15px;
            right: 15px;
          }

          .navbar-container {
            padding: 8px 18px;
          }

          .logo-main {
            font-size: 1.1rem;
          }

          .logo-tagline {
            font-size: 0.5rem;
            letter-spacing: 1.5px;
          }

          .mobile-toggle span {
            width: 22px;
          }

          .mobile-menu {
            top: 85px;
            left: 15px;
            right: 15px;
            padding: 1.5rem;
          }
        }

        /* Smooth scrolling offset for fixed navbar */
        html {
          scroll-padding-top: 120px;
        }
      `}</style>

      <nav className={`floating-navbar ${isScrolled ? 'scrolled' : ''}`}>
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
            <Link href="/testimonials" className="nav-link">Projects</Link>
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
          <Link href="/testimonials" className="mobile-nav-link" onClick={closeMobileMenu}>Projects</Link>
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
