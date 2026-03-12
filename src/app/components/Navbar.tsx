"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.mobile-menu-toggle')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isMounted]);

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link href="/" className="nav-logo" onClick={closeMenu}>
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
          onClick={toggleMenu}
          className="mobile-menu-toggle"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={closeMenu}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)'
          }}
        />
      )}

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
        <nav className="mobile-nav-links">
          <Link href="/" className="mobile-nav-link" onClick={closeMenu}>
            <span>Home</span>
          </Link>
          <Link href="/services" className="mobile-nav-link" onClick={closeMenu}>
            <span>Services</span>
          </Link>
          <Link href="/testimonials" className="mobile-nav-link" onClick={closeMenu}>
            <span>Testimonials</span>
          </Link>
          <Link href="/blog" className="mobile-nav-link" onClick={closeMenu}>
            <span>Blog</span>
          </Link>
          <Link href="/contact" className="mobile-nav-link" onClick={closeMenu}>
            <span>Contact</span>
          </Link>
          <Link href="/about" className="mobile-nav-link" onClick={closeMenu}>
            <span>About Us</span>
          </Link>
        </nav>
        
        <div className="mobile-nav-actions">
          <Link href="/register" className="btn btn-outline mobile-btn" onClick={closeMenu}>
            Start Your Campaign
          </Link>
          <Link href="/admin/login" className="btn btn-primary mobile-btn" onClick={closeMenu}>
            Login
          </Link>
        </div>
      </div>

      <style jsx>{`
        .navbar-scrolled {
          background: rgba(11, 11, 15, 0.95) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 4px 20px rgba(124, 58, 237, 0.3);
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
        
        @media (max-width: 768px) {
          .navbar {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100vw !important;
            z-index: 9999 !important;
            height: 75px !important;
            background: #000000 !important;
            border-bottom: 3px solid #FF0000 !important;
            box-shadow: 0 8px 30px rgba(255, 0, 0, 0.8) !important;
            padding: 0 !important;
            margin: 0 !important;
            opacity: 1 !important;
            visibility: visible !important;
            display: block !important;
          }
          
          .nav-inner {
            height: 75px !important;
            min-height: 75px !important;
            padding: 0 1rem !important;
            background: #000000 !important;
            border-radius: 0 !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 1rem !important;
            opacity: 1 !important;
            visibility: visible !important;
          }
          
          .nav-logo {
            display: flex !important;
            align-items: center !important;
            gap: 0.75rem !important;
            padding: 0.6rem 1.2rem !important;
            background: #FF0000 !important;
            border: 3px solid #FFFFFF !important;
            border-radius: 12px !important;
            flex: 1 !important;
            max-width: calc(100% - 85px) !important;
            height: 55px !important;
            box-shadow: 0 4px 20px rgba(255, 0, 0, 0.8) !important;
            opacity: 1 !important;
            visibility: visible !important;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8) !important;
          }

          .nav-logo-icon {
            width: 45px !important;
            height: 45px !important;
            font-size: 1.2rem !important;
            font-weight: 900 !important;
            border-radius: 10px !important;
            border: 2px solid #000000 !important;
            flex-shrink: 0 !important;
            background: #FFFFFF !important;
            color: #FF0000 !important;
            text-shadow: none !important;
          }

          .nav-logo-text {
            color: #FFFFFF !important;
            font-weight: 900 !important;
            font-size: 1rem !important;
            line-height: 1.1 !important;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8) !important;
          }
          
          .brand-primary {
            color: #FFFFFF !important;
            font-weight: 900 !important;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8) !important;
          }

          .brand-secondary {
            color: #FFFF00 !important;
            font-weight: 900 !important;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8) !important;
          }
          
          .brand-tagline {
            font-size: 0.7rem !important;
            font-weight: 800 !important;
            color: #00FF00 !important;
            letter-spacing: 1px !important;
            margin-top: 2px !important;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8) !important;
          }
          
          .mobile-menu-toggle {
            background: #FF0000 !important;
            border: 3px solid #FFFFFF !important;
            box-shadow: 0 6px 25px rgba(255, 0, 0, 0.8) !important;
            width: 65px !important;
            height: 65px !important;
            min-width: 65px !important;
            min-height: 65px !important;
            border-radius: 12px !important;
            padding: 0 !important;
            flex-shrink: 0 !important;
            color: #FFFFFF !important;
            z-index: 10000 !important;
            opacity: 1 !important;
            visibility: visible !important;
            outline: 2px solid #000000 !important;
            outline-offset: 2px !important;
          }

          .mobile-menu-toggle svg {
            width: 28px !important;
            height: 28px !important;
            stroke-width: 3 !important;
            filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.8)) !important;
          }
          
          .mobile-menu {
            background: #000000 !important;
            border-bottom: 3px solid #FF0000 !important;
            box-shadow: 0 10px 40px rgba(255, 0, 0, 0.8) !important;
            top: 75px !important;
            z-index: 9998 !important;
            opacity: 1 !important;
            visibility: visible !important;
          }
        }
        
        @media (max-width: 480px) {
          .navbar {
            height: 70px !important;
          }

          .nav-inner {
            height: 70px !important;
            min-height: 70px !important;
            padding: 0 0.75rem !important;
            gap: 0.75rem !important;
          }

          .nav-logo {
            padding: 0.5rem 1rem !important;
            gap: 0.6rem !important;
            max-width: calc(100% - 70px) !important;
            height: 50px !important;
          }

          .nav-logo-icon {
            width: 40px !important;
            height: 40px !important;
            font-size: 1rem !important;
          }

          .nav-logo-text {
            font-size: 0.9rem !important;
          }
          
          .brand-tagline {
            font-size: 0.6rem !important;
          }

          .mobile-menu-toggle {
            width: 60px !important;
            height: 60px !important;
            min-width: 60px !important;
            min-height: 60px !important;
          }

          .mobile-menu-toggle svg {
            width: 26px !important;
            height: 26px !important;
          }

          .mobile-menu {
            top: 70px !important;
          }
        }
      `}</style>
    </header>
  );
}
