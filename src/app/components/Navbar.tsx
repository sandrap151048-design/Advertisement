"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

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

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <style>{`
        .nav-link, .mobile-nav-link, .btn-login, .mobile-toggle, .navbar-logo {
          outline: none !important;
          -webkit-tap-highlight-color: transparent !important;
        }

        .nav-link {
          position: relative; color: white; text-decoration: none;
          font-size: 0.88rem; font-weight: 600;
          padding: 8px 0; transition: color 0.3s;
        }
        .nav-link:hover { color: #e61e25; }
        .nav-link::after {
          content: ''; position: absolute; bottom: 8px; left: 0;
          width: 0; height: 2px; background: #e61e25; transition: width 0.3s;
        }
        .nav-link:hover::after { width: 100%; }

        .btn-login {
          padding: 8px 18px; background: #e61e25; color: white;
          text-decoration: none; font-size: 0.85rem; font-weight: 700;
          border-radius: 6px; transition: all 0.6s; white-space: nowrap;
        }
        .btn-login:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(230,30,37,0.3); }

        .mobile-nav-link {
          display: block; color: white !important; text-decoration: none;
          font-size: 1.1rem; font-weight: 700; padding: 1rem 1.25rem;
          border-radius: 12px; transition: all 0.6s ease;
          background: rgba(255,255,255,0.03);
        }
        .mobile-nav-link:active, .mobile-nav-link:hover {
          background: rgba(230, 30, 37, 0.2); color: #e61e25 !important;
        }
        .mobile-nav-link-login {
          background: #e61e25 !important; margin-top: 0.5rem;
          text-align: center; color: white !important;
        }
        .mobile-nav-link-login:active, .mobile-nav-link-login:hover {
          background: #ff2d35 !important; color: white !important;
        }
      `}</style>

      {/* ===== NAVBAR WRAPPER — Always fixed, always on top ===== */}
      <div
        style={{
          position: 'absolute',
          top: 8, // Moved higher for a cleaner floating effect
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 99999,
          display: 'flex',
          justifyContent: 'center',
          padding: '12px 16px',
          pointerEvents: 'none',   /* allow clicks through the wrapper gap */
        }}
      >
        <nav
          style={{
            width: '100%',
            maxWidth: '1200px',
            background: 'rgba(8, 8, 8, 0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(12, 12, 12,0.4)',
            pointerEvents: 'all',   /* re-enable clicks on the nav pill */
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 16px',
            }}
          >
            {/* Logo */}
            <Link href="/" className="navbar-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <Logo size="small" showFullText={true} />
            </Link>
            {/* Desktop Nav Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }} className="desktop-nav">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/projects" className="nav-link">Projects</Link>
              <Link href="/services" className="nav-link">Services</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
              <Link href="/about" className="nav-link">About</Link>
            </div>

            {/* Desktop Login Button */}
            <div className="desktop-nav">
              <Link href="/admin/login" className="btn-login" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>Login</Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
              className="mobile-toggle"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '8px',
              }}
            >
              {isMobileMenuOpen ? <X size={26} color="white" /> : <Menu size={26} color="white" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        style={{
          position: 'fixed',
          top: isMobileMenuOpen ? '80px' : '-400px',
          left: '16px',
          right: '16px',
          background: 'rgba(22, 22, 22, 0.98)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '1.5rem',
          zIndex: 99998,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          boxShadow: '0 20px 60px rgba(12, 12, 12,0.6)',
          transition: 'top 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? 'all' : 'none',
        }}
      >
        <Link href="/" className="mobile-nav-link" onClick={closeMobileMenu}>Home</Link>
        <Link href="/projects" className="mobile-nav-link" onClick={closeMobileMenu}>Projects</Link>
        <Link href="/services" className="mobile-nav-link" onClick={closeMobileMenu}>Services</Link>
        <Link href="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>Contact</Link>
        <Link href="/about" className="mobile-nav-link" onClick={closeMobileMenu}>About</Link>
        <Link href="/admin/login" className="mobile-nav-link mobile-nav-link-login" onClick={closeMobileMenu}>Admin Login</Link>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
        @media (min-width: 1025px) {
          .mobile-toggle {
            display: none !important;
          }
          .desktop-nav {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
