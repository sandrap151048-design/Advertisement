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
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 1000;
          display: flex;
          justify-content: center;
          padding: 15px 40px;
          transition: all 0.4s ease;
        }

        .floating-navbar {
          width: 100%;
          max-width: 1400px;
          background: rgba(10, 10, 10, 0.9);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 0 10px;
          transition: all 0.4s ease;
        }

        .navbar-wrapper.scrolled {
          padding: 10px 40px;
        }

        .floating-navbar.scrolled {
          background: rgba(10, 10, 10, 0.85);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
          border-color: rgba(230, 30, 37, 0.2);
        }

        .navbar-container {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 30px;
        }

        .logo-main {
          font-family: 'Bricolage Grotesque', sans-serif; font-size: 1.3rem; font-weight: 800;
          color: white; display: flex; align-items: center; gap: -3px; text-decoration: none;
        }
        .logo-tagline { 
          font-size: 0.55rem; font-weight: 700; color: rgba(255,255,255,0.4);
          text-transform: uppercase; letter-spacing: 2.5px; margin-top: 1px;
        }

        .navbar-nav { display: flex; align-items: center; gap: 32px; }
        .nav-link { 
          position: relative; color: white; text-decoration: none; font-size: 0.95rem; font-weight: 600;
          padding: 10px 0; transition: color 0.3s; display: flex; align-items: center; gap: 4px;
        }
        .nav-link:hover { color: #e61e25; }
        .nav-link::after { 
          content: ''; position: absolute; bottom: 8px; left: 0; width: 0; height: 2px;
          background: #e61e25; transition: width 0.3s;
        }
        .nav-link:hover::after { width: 100%; }

        .btn-login {
          padding: 10px 24px; background: #e61e25; color: white; text-decoration: none;
          font-size: 0.9rem; font-weight: 700; border-radius: 4px; transition: all 0.3s;
        }
        .btn-login:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(230,30,37,0.3); }

        .mobile-toggle { display: none; color: white; cursor: pointer; }
        
        @media (max-width: 1024px) {
          .navbar-nav, .navbar-actions { display: none; }
          .mobile-toggle { display: block; }
          .navbar-container { padding: 10px 20px; }
          .navbar-wrapper { padding: 10px 20px; }
        }

        .mobile-menu {
          position: fixed; inset: 0; top: 75px; background: rgba(10, 10, 10, 0.98);
          backdrop-filter: blur(25px); padding: 30px; transform: scale(0.98); opacity: 0;
          visibility: hidden; transition: all 0.3s; z-index: 999;
          border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); margin: 0 20px;
          height: fit-content;
        }
        .mobile-menu.open { transform: scale(1); opacity: 1; visibility: visible; }
        .mobile-nav-link {
          display: block; color: white; text-decoration: none; font-size: 1.3rem; font-weight: 800;
          padding: 15px 10px; border-bottom: 1px solid rgba(255,255,255,0.05);
        }
      `}</style>

      <div className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <nav className={`floating-navbar ${isScrolled ? 'scrolled' : ''}`}>
          <div className="navbar-container">
            <Link href="/" className="navbar-logo" style={{ textDecoration: 'none' }}>
              <div className="logo-main">
                <svg width="24" height="24" viewBox="0 0 28 28">
                  <circle cx="14" cy="14" r="12" fill="none" stroke="white" strokeWidth="4"/>
                  <rect x="16" y="2" width="8" height="8" fill="#e61e25" rx="1"/>
                </svg>
                <span>ne Click</span>
              </div>
              <div className="logo-tagline">Advertisement</div>
            </Link>

            <div className="navbar-nav">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/projects" className="nav-link">Projects</Link>
              <Link href="/services" className="nav-link">Services</Link>
              <Link href="/about" className="nav-link">About</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
            </div>

            <div className="navbar-actions" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <Link href="/admin/login" className="btn-login">Login</Link>
            </div>

            <button className="mobile-toggle" onClick={toggleMobileMenu} style={{ background: 'none', border: 'none' }}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link href="/" className="mobile-nav-link" onClick={closeMobileMenu}>Home</Link>
        <Link href="/projects" className="mobile-nav-link" onClick={closeMobileMenu}>Explore Projects</Link>
        <Link href="/services" className="mobile-nav-link" onClick={closeMobileMenu}>Our Services</Link>
        <Link href="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>Get in Touch</Link>
        <Link href="/admin/login" className="mobile-nav-link" onClick={closeMobileMenu}>Login</Link>
      </div>
    </>
  );
}
