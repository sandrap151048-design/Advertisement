"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

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
      <style jsx global>{`
        .nav-link, .dropdown-item, .btn-login, .mobile-toggle, .navbar-logo {
          outline: none !important;
          -webkit-tap-highlight-color: transparent !important;
        }

        .navbar-wrapper {
          position: fixed;
          top: 0; left: 0; right: 0; width: 100%; z-index: 1000;
          display: flex; justify-content: center; padding: 20px 40px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .navbar-wrapper.scrolled {
          padding: 10px 40px;
        }

        .floating-navbar {
          width: 100%; max-width: 1400px;
          background: rgba(10, 10, 10, 0.92);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px; padding: 0 10px;
          transition: all 0.4s ease;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .navbar-container {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 30px;
        }

        .logo-main {
          font-family: 'Bricolage Grotesque', sans-serif; font-size: 1.4rem; font-weight: 800;
          color: white; display: flex; align-items: center; gap: 6px; text-decoration: none;
        }
        
        .logo-tagline { 
          font-size: 0.6rem; font-weight: 700; color: rgba(255,255,255,0.4);
          text-transform: uppercase; letter-spacing: 2px; margin-top: 1px;
        }

        .navbar-nav { display: flex; align-items: center; gap: 32px; }
        
        .nav-link { 
          position: relative; color: white; text-decoration: none; font-size: 0.95rem; font-weight: 600;
          padding: 10px 0; transition: color 0.3s;
        }
        .nav-link:hover { color: #e61e25; }
        .nav-link::after { 
          content: ''; position: absolute; bottom: 8px; left: 0; width: 0; height: 2px;
          background: #e61e25; transition: width 0.3s;
        }
        .nav-link:hover::after { width: 100%; }

        .btn-login {
          padding: 10px 24px; background: #e61e25; color: white; text-decoration: none;
          font-size: 0.9rem; font-weight: 700; border-radius: 6px; transition: all 0.3s;
          white-space: nowrap;
        }
        .btn-login:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(230,30,37,0.3); }

        .mobile-toggle { display: none; color: white; cursor: pointer; padding: 8px; }

        .mobile-menu {
          position: fixed; 
          top: 100px; 
          left: 20px; 
          right: 20px;
          background: rgba(15, 15, 15, 0.98);
          backdrop-filter: blur(30px); 
          -webkit-backdrop-filter: blur(30px);
          padding: 1.5rem; 
          border-radius: 20px; 
          border: 1px solid rgba(255, 255, 255, 0.1);
          opacity: 0; 
          visibility: hidden; 
          transform: translateY(-20px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
          z-index: 1100;
          display: flex; 
          flex-direction: column; 
          gap: 0.5rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        
        .mobile-menu.open { 
          opacity: 1; 
          visibility: visible; 
          transform: translateY(0); 
        }

        .mobile-nav-link {
          display: block; 
          color: white !important; 
          text-decoration: none; 
          font-size: 1.1rem; 
          font-weight: 700;
          padding: 1rem 1.25rem; 
          border-radius: 12px;
          transition: all 0.2s ease;
          background: rgba(255,255,255,0.03);
          z-index: 1101;
        }
        
        .mobile-nav-link:active, .mobile-nav-link:hover {
          background: rgba(230, 30, 37, 0.2);
          color: #e61e25 !important;
        }

        .mobile-nav-link-login {
          background: #e61e25;
          margin-top: 0.5rem;
          text-align: center;
          color: white !important;
        }
        
        .mobile-nav-link-login:active, .mobile-nav-link-login:hover {
          background: #ff2d35;
          color: white !important;
        }

        @media (max-width: 1024px) {
           .navbar-nav { display: none; }
           .mobile-toggle { display: flex; align-items: center; justify-content: center; }
           .navbar-wrapper {
             padding: 12px 12px !important;
             z-index: 9999 !important;
             position: fixed !important;
           }
           .navbar-wrapper.scrolled { padding: 8px 12px !important; }
           .navbar-container { padding: 8px 12px; }
           .logo-main { font-size: 1.1rem; }
           .logo-tagline { font-size: 0.55rem; letter-spacing: 1px; }
           .navbar-actions { display: none !important; }
           
           /* Solid dark background on mobile so it's always visible */
           .floating-navbar {
             background: rgba(5, 5, 5, 0.98) !important;
             border-color: rgba(255,255,255,0.08) !important;
           }

           .mobile-menu { 
             top: 85px !important;
             left: 15px !important;
             right: 15px !important;
             visibility: hidden;
           }
           .mobile-menu.open {
             visibility: visible !important;
             display: flex !important;
           }
        }
      `}</style>

      <div className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <nav className={`floating-navbar ${isScrolled ? 'scrolled' : ''}`}>
          <div className="navbar-container">
            <Link href="/" className="navbar-logo" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', minWidth: '150px' }}>
              <div className="logo-main" style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                <svg width="22" height="22" viewBox="0 0 28 28" style={{ marginRight: '-1px' }}>
                  <circle cx="14" cy="14" r="11" fill="none" stroke="white" strokeWidth="4"/>
                  <rect x="16" y="2" width="9" height="9" fill="#e61e25" rx="1"/>
                </svg>
                <span style={{ marginLeft: '-1px', fontSize: '1.2rem' }}>ne Click</span>
              </div>
              <div className="logo-tagline" style={{ color: '#888', fontWeight: '900', letterSpacing: '2px', fontSize: '0.55rem' }}>ADVERTISEMENT</div>
            </Link>

            <div className="navbar-nav">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/projects" className="nav-link">Projects</Link>
              <Link href="/services" className="nav-link">Services</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
              <Link href="/about" className="nav-link">About</Link>
            </div>

            <div className="navbar-actions" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <Link href="/admin/login" className="btn-login">Login</Link>
            </div>

            <button className="mobile-toggle" onClick={toggleMobileMenu} aria-label="Toggle Menu" style={{ background: 'none', border: 'none' }}>
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link href="/" className="mobile-nav-link" onClick={closeMobileMenu}>Home</Link>
        <Link href="/projects" className="mobile-nav-link" onClick={closeMobileMenu}>Explore Projects</Link>
        <Link href="/services" className="mobile-nav-link" onClick={closeMobileMenu}>Our Services</Link>
        <Link href="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>Get in Touch</Link>
        <Link href="/about" className="mobile-nav-link" onClick={closeMobileMenu}>About</Link>
        <Link href="/admin/login" className="mobile-nav-link mobile-nav-link-login" onClick={closeMobileMenu}>Admin Login</Link>
      </div>


    </>
  );
}
