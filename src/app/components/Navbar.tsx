"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
          font-size: 0.95rem; font-weight: 600;
          padding: 10px 0; transition: color 0.3s;
        }
        .nav-link:hover { color: #e61e25; }
        .nav-link::after {
          content: ''; position: absolute; bottom: 8px; left: 0;
          width: 0; height: 2px; background: #e61e25; transition: width 0.3s;
        }
        .nav-link:hover::after { width: 100%; }

        .btn-login {
          padding: 10px 24px; background: #e61e25; color: white;
          text-decoration: none; font-size: 0.9rem; font-weight: 700;
          border-radius: 6px; transition: all 0.3s; white-space: nowrap;
        }
        .btn-login:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(230,30,37,0.3); }

        .mobile-nav-link {
          display: block; color: white !important; text-decoration: none;
          font-size: 1.1rem; font-weight: 700; padding: 1rem 1.25rem;
          border-radius: 12px; transition: all 0.2s ease;
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
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 99999,
          background: isScrolled ? 'rgba(8, 8, 8, 0.98)' : 'rgba(8, 8, 8, 0.4)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
          boxShadow: isScrolled ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isScrolled ? '12px 24px' : '20px 24px',
            transition: 'padding 0.4s ease',
          }}
        >
          {/* Logo */}
          <Link href="/" className="navbar-logo" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              <svg width="24" height="24" viewBox="0 0 28 28">
                <circle cx="14" cy="14" r="11" fill="none" stroke="white" strokeWidth="4"/>
                <rect x="18" y="2" width="9" height="9" fill="#e61e25" rx="1"/>
              </svg>
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: '1.4rem', color: 'white', marginLeft: '-1px' }}>ne Click</span>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: '3px', fontSize: '0.6rem', textTransform: 'uppercase', marginTop: '1px' }}>ADVERTISEMENT</div>
          </Link>

          {/* Desktop Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }} className="desktop-nav">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/projects" className="nav-link">Projects</Link>
            <Link href="/services" className="nav-link">Services</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
            <Link href="/about" className="nav-link">About</Link>
          </div>

          {/* Desktop Login Button */}
          <div className="desktop-nav">
            <Link href="/admin/login" className="btn-login">Login</Link>
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
            }}
          >
            {isMobileMenuOpen ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div
        style={{
          position: 'fixed',
          top: isMobileMenuOpen ? '80px' : '-400px',
          left: '16px',
          right: '16px',
          background: 'rgba(10, 10, 10, 0.98)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '1.5rem',
          zIndex: 99998,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          transition: 'top 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? 'all' : 'none',
        }}
      >
        <Link href="/" className="mobile-nav-link" onClick={closeMobileMenu}>🏠 Home</Link>
        <Link href="/projects" className="mobile-nav-link" onClick={closeMobileMenu}>🎨 Projects</Link>
        <Link href="/services" className="mobile-nav-link" onClick={closeMobileMenu}>⚡ Services</Link>
        <Link href="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>📬 Contact</Link>
        <Link href="/about" className="mobile-nav-link" onClick={closeMobileMenu}>ℹ️ About</Link>
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
