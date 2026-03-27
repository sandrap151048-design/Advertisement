"use client";

import { motion } from 'framer-motion';
import { Home, LogOut, MessageSquare, Briefcase, TrendingUp, Menu, X, Layout } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminUser');
        router.push('/');
    };

    const isActivePath = (path: string) => {
        if (path === '/admin') {
            return pathname === '/admin';
        }
        return pathname.startsWith(path);
    };

    const getNavItemStyle = (path: string) => {
        const isActive = isActivePath(path);
        return {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem 1.2rem',
            borderRadius: '12px',
            color: '#ffffff',
            cursor: 'pointer',
            transition: 'all 0.3s',
            background: isActive ? 'rgba(230, 30, 37, 0.15)' : 'transparent',
            borderLeft: isActive ? '4px solid #e61e25' : '4px solid transparent',
            textDecoration: 'none'
        };
    };

    const getNavIconColor = (path: string) => {
        return isActivePath(path) ? '#e61e25' : 'rgba(255,255,255,0.6)';
    };

    const getNavTextStyle = (path: string) => {
        return {
            fontWeight: isActivePath(path) ? 600 : 500,
            color: isActivePath(path) ? '#e61e25' : 'rgba(255,255,255,0.7)',
            fontSize: '0.95rem'
        };
    };

    return (
        <aside className={`admin-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
            <style jsx global>{`
                .admin-sidebar {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(180deg, #111111 0%, #000000 100%);
                    padding: 3rem 1.5rem;
                    display: flex;
                    flex-direction: column;
                    border-right: 1px solid rgba(255, 255, 255, 0.08);
                    position: relative;
                    z-index: 1000;
                    transition: transform 0.3s ease;
                }

                @media (max-width: 1024px) {
                    .admin-sidebar {
                        position: fixed;
                        width: 320px;
                        left: 0;
                        top: 0;
                        height: 100vh;
                        transform: translateX(-100%);
                    }
                    .admin-sidebar.open {
                        transform: translateX(0);
                    }
                    .admin-mobile-toggle {
                        display: flex !important;
                    }
                }

                .admin-mobile-toggle {
                    display: none;
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 1001;
                    background: #e61e25;
                    border: none;
                    border-radius: 8px;
                    padding: 0.6rem;
                    color: white;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(230, 30, 37, 0.3);
                }

                .admin-mobile-overlay {
                    display: none;
                }

                @media (max-width: 1024px) {
                    .admin-mobile-overlay.visible {
                        display: block;
                        position: fixed;
                        inset: 0;
                        background: rgba(0, 0, 0, 0.5);
                        backdrop-filter: blur(4px);
                        z-index: 999;
                    }
                }
            `}</style>

            <button 
                className="admin-mobile-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div 
                className={`admin-mobile-overlay ${isMobileMenuOpen ? 'visible' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            <div style={{ marginBottom: '3.5rem', padding: '0 0.5rem' }}>
                <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0' }}>
                    <svg width="32" height="32" viewBox="0 0 28 28" style={{ marginRight: '-1px' }}>
                        <circle cx="14" cy="14" r="11" fill="none" stroke="white" strokeWidth="4"/>
                        <rect x="16" y="2" width="9" height="9" fill="#e61e25" rx="1"/>
                    </svg>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ color: 'white', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.5px', marginLeft: '-1px', lineHeight: '1.1' }}>ne Click</div>
                        <div style={{ color: '#e61e25', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginTop: '2px' }}>Admin Portal</div>
                    </div>
                </Link>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                <Link href="/admin" style={{ textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
                    <div style={getNavItemStyle('/admin')}>
                        <Home size={20} color={getNavIconColor('/admin')} /> 
                        <span style={getNavTextStyle('/admin')}>Dashboard</span>
                    </div>
                </Link>
                <Link href="/admin/contacts" style={{ textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
                    <div style={getNavItemStyle('/admin/contacts')}>
                        <MessageSquare size={20} color={getNavIconColor('/admin/contacts')} /> 
                        <span style={getNavTextStyle('/admin/contacts')}>Contact Forms</span>
                    </div>
                </Link>
                <Link href="/admin/services" style={{ textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
                    <div style={getNavItemStyle('/admin/services')}>
                        <Briefcase size={20} color={getNavIconColor('/admin/services')} /> 
                        <span style={getNavTextStyle('/admin/services')}>Services</span>
                    </div>
                </Link>
                <Link href="/admin/campaigns" style={{ textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
                    <div style={getNavItemStyle('/admin/campaigns')}>
                        <TrendingUp size={20} color={getNavIconColor('/admin/campaigns')} /> 
                        <span style={getNavTextStyle('/admin/campaigns')}>Campaigns</span>
                    </div>
                </Link>
                <Link href="/admin/projects" style={{ textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
                    <div style={getNavItemStyle('/admin/projects')}>
                        <Layout size={20} color={getNavIconColor('/admin/projects')} /> 
                        <span style={getNavTextStyle('/admin/projects')}>Projects</span>
                    </div>
                </Link>
            </nav>

            <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem' }}>
                <div 
                    onClick={handleLogout}
                    style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '1rem', 
                        padding: '1rem 1.2rem', 
                        borderRadius: '12px', 
                        cursor: 'pointer',
                        color: '#ef4444',
                        background: 'rgba(239, 68, 68, 0.1)',
                        transition: 'all 0.3s'
                    }}
                >
                    <LogOut size={20} /> 
                    <span style={{ fontWeight: 600, fontSize: '1rem' }}>Logout</span>
                </div>
            </div>
        </aside>
    );
}
