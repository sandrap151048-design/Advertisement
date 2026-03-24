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
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          width: calc(100% - 40px);
          max-width: 1300px;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 50px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeInDown 0.6s ease-out;
          border: 1px solid rgba(0, 0, 0, 0.06);
        }

        .modern-navbar.scrolled {
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }

        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          height: 70px;
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
          transform: scale(1.02);
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 800;
          color: #1a1a1a;
          letter-spacing: -0.5px;
        }

        /* Center Navigation */
        .navbar-nav {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
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

        .nav-link:hover {
          color: #7C3AED;
        }

        /* Right CTA Button */
        .navbar-cta {
          flex: 0 0 auto;
        }

        .btn-quote {
          padding: 0.85rem 2rem;
          background: #1a1a1a;
          color: white;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 600;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: 0.3px;
          display: inline-block;
        }

        .btn-quote:hover {
          background: #333;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .btn-quote:active {
          transform: translateY(0);
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
          left: 50%;
          transform: translateX(-50%) translateY(-20px);
          width: calc(100% - 40px);
          max-width: 500px;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 2rem;
          border-radius: 30px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          max-height: calc(100vh - 140px);
          overflow-y: auto;
        }

        .mobile-menu.open {
          transform: translateX(-50%) translateY(0);
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
          border-radius: 15px;
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

        .mobile-actions .btn-quote {
          width: 100%;
          text-align: center;
          padding: 1.2rem;
          font-size: 1rem;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .navbar-nav {
            gap: 2rem;
          }

          .nav-link {
            font-size: 0.9rem;
          }

          .btn-quote {
            padding: 0.8rem 1.8rem;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 768px) {
          .modern-navbar {
            top: 15px;
            width: calc(100% - 30px);
          }

          .navbar-container {
            padding: 0.8rem 1.5rem;
            height: 60px;
          }

          .navbar-nav,
          .navbar-cta {
            display: none;
          }

          .mobile-toggle {
            display: flex;
          }

          .logo-text {
            font-size: 1.3rem;
          }

          .mobile-menu {
            top: 95px;
            width: calc(100% - 30px);
          }
        }

        @media (max-width: 480px) {
          .modern-navbar {
            top: 10px;
            width: calc(100% - 20px);
          }

          .navbar-container {
            padding: 0.7rem 1.2rem;
            height: 55px;
          }

          .logo-text {
            font-size: 1.2rem;
          }

          .mobile-toggle span {
            width: 22px;
          }

          .mobile-menu {
            top: 85px;
            width: calc(100% - 20px);
            padding: 1.5rem;
          }
        }

        /* Smooth scrolling offset for fixed navbar */
        html {
          scroll-padding-top: 120px;
        }
      `}</style>

      <nav className={`modern-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <Link href="/" className="navbar-logo">
            <div className="logo-text">One Click</div>
          </Link>

          {/* Center Navigation */}
          <div className="navbar-nav">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/services" className="nav-link">Services</Link>
            <Link href="/testimonials" className="nav-link">Projects</Link>
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
          </div>

          {/* Right CTA */}
          <div className="navbar-cta">
            <Link href="/register" className="btn-quote">
              Get a Quote
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
          <Link href="/about" className="mobile-nav-link" onClick={closeMobileMenu}>About</Link>
          <Link href="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>Contact</Link>
        </div>
        
        <div className="mobile-actions">
          <Link href="/register" className="btn-quote" onClick={closeMobileMenu}>
            Get a Quote
          </Link>
        </div>
      </div>
    </>
  );
}
