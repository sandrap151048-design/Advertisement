"use client";

import { motion } from 'framer-motion';
import { Home, Users, LogOut, MessageSquare, Briefcase, TrendingUp, Activity, Clock, CheckCircle, Star, Layers, MapPin, Phone, Mail, ShieldCheck, BookOpen, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPath, setCurrentPath] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [stats, setStats] = useState({
        contacts: 0,
        services: 0
    });
    const [recentContacts, setRecentContacts] = useState<any[]>([]);

    useEffect(() => {
        const authToken = localStorage.getItem('adminAuth');
        if (authToken === 'true') {
            setIsAuthenticated(true);
            fetchStats();
            fetchRecentContacts();
        } else {
            router.push('/admin/login');
        }
        setIsLoading(false);
        
        // Set current path for active navigation
        setCurrentPath(window.location.pathname);
    }, [router]);

    const fetchStats = async () => {
        try {
            const [contactsRes, servicesRes] = await Promise.all([
                fetch('/api/contact'),
                fetch('/api/services')
            ]);

            const contacts = await contactsRes.json();
            const services = await servicesRes.json();

            setStats({
                contacts: contacts.length || 0,
                services: services.length || 0
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const fetchRecentContacts = async () => {
        try {
            const response = await fetch('/api/contact');
            const data = await response.json();
            setRecentContacts(data.slice(0, 5));
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminUser');
        router.push('/admin/login');
    };

    const isActivePath = (path: string) => {
        if (path === '/admin') {
            return currentPath === '/admin';
        }
        return currentPath.startsWith(path);
    };

    const getNavItemStyle = (path: string) => {
        const isActive = isActivePath(path);
        return {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem 1.2rem',
            borderRadius: '12px',
            color: '#1e293b',
            cursor: 'pointer',
            transition: 'all 0.3s',
            background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            borderLeft: isActive ? '4px solid var(--color-primary)' : '4px solid transparent',
            boxShadow: isActive ? '0 2px 8px rgba(124, 58, 237, 0.2)' : 'none'
        };
    };

    const getNavIconColor = (path: string) => {
        return isActivePath(path) ? 'var(--color-primary)' : 'rgba(255,255,255,0.6)';
    };

    const getNavTextStyle = (path: string) => {
        return {
            fontWeight: isActivePath(path) ? 600 : 500,
            color: isActivePath(path) ? 'white' : 'rgba(255,255,255,0.7)'
        };
    };

    if (isLoading) {
        return (
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center' }}
                >
                    <div style={{ 
                        width: '60px', 
                        height: '60px', 
                        border: '4px solid rgba(255,255,255,0.3)',
                        borderTop: '4px solid white',
                        borderRadius: '50%',
                        margin: '0 auto 1rem',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <p style={{ color: 'white', fontSize: '1.1rem', fontWeight: 600 }}>Loading Dashboard...</p>
                </motion.div>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100
            }
        }
    };

    return (
        <div className="admin-layout">
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="admin-mobile-overlay"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`admin-sidebar ${isMobileMenuOpen ? 'admin-sidebar-open' : ''}`}>
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: '3rem', marginTop: '1rem' }}
                >
                    <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring" as const, stiffness: 400 }}
                            style={{
                                width: '45px',
                                height: '45px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 800,
                                fontSize: '1.1rem',
                                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)'
                            }}
                        >
                            OC
                        </motion.div>
                        <div>
                            <div>
                                <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '1.1rem' }}>One</span>
                                <span style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}> Click</span>
                            </div>
                            <div style={{ fontSize: '0.65rem', fontWeight: 500, color: 'rgba(255,255,255,0.5)', letterSpacing: '1.5px', textTransform: 'uppercase', lineHeight: 1, marginTop: '2px' }}>
                                Admin Portal
                            </div>
                        </div>
                    </Link>
                </motion.div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    <Link href="/admin" style={{ textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
                        <motion.div 
                            whileHover={{ x: 5 }}
                            className="nav-item" 
                            style={getNavItemStyle('/admin')}
                        >
                            <Home size={22} color={getNavIconColor('/admin')} /> 
                            <span style={getNavTextStyle('/admin')}>Dashboard</span>
                        </motion.div>
                    </Link>
                    <Link href="/admin/contacts" style={{ textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
                        <motion.div 
                            whileHover={{ x: 5, background: 'rgba(255, 255, 255, 0.05)' }}
                            className="nav-item" 
                            style={getNavItemStyle('/admin/contacts')}
                        >
                            <MessageSquare size={22} color={getNavIconColor('/admin/contacts')} /> 
                            <span style={getNavTextStyle('/admin/contacts')}>Contact Forms</span>
                        </motion.div>
                    </Link>
                    <Link href="/admin/services" style={{ textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
                        <motion.div 
                            whileHover={{ x: 5, background: 'rgba(255, 255, 255, 0.05)' }}
                            className="nav-item" 
                            style={getNavItemStyle('/admin/services')}
                        >
                            <Briefcase size={22} color={getNavIconColor('/admin/services')} /> 
                            <span style={getNavTextStyle('/admin/services')}>Services</span>
                        </motion.div>
                    </Link>
                    <Link href="/admin/testimonials" style={{ textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
                        <motion.div 
                            whileHover={{ x: 5, background: 'rgba(255, 255, 255, 0.05)' }}
                            className="nav-item" 
                            style={getNavItemStyle('/admin/testimonials')}
                        >
                            <Star size={22} color={getNavIconColor('/admin/testimonials')} /> 
                            <span style={getNavTextStyle('/admin/testimonials')}>Testimonials</span>
                        </motion.div>
                    </Link>
                    <Link href="/admin/blog" style={{ textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
                        <motion.div 
                            whileHover={{ x: 5, background: 'rgba(255, 255, 255, 0.05)' }}
                            className="nav-item" 
                            style={getNavItemStyle('/admin/blog')}
                        >
                            <BookOpen size={22} color={getNavIconColor('/admin/blog')} /> 
                            <span style={getNavTextStyle('/admin/blog')}>Blog & Resources</span>
                        </motion.div>
                    </Link>
                    <Link href="/admin/newsletter" style={{ textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
                        <motion.div 
                            whileHover={{ x: 5, background: 'rgba(255, 255, 255, 0.05)' }}
                            className="nav-item" 
                            style={getNavItemStyle('/admin/newsletter')}
                        >
                            <Mail size={22} color={getNavIconColor('/admin/newsletter')} /> 
                            <span style={getNavTextStyle('/admin/newsletter')}>Subscribers</span>
                        </motion.div>
                    </Link>
                </nav>

                <motion.div 
                    whileHover={{ x: 5 }}
                    style={{ marginTop: 'auto' }}
                >
                    <div 
                        onClick={handleLogout}
                        className="nav-item" 
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '1rem', 
                            padding: '1rem 1.2rem', 
                            borderRadius: '12px', 
                            color: '#ef4444', 
                            cursor: 'pointer', 
                            transition: 'all 0.3s',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            background: 'rgba(239, 68, 68, 0.1)'
                        }}
                    >
                        <LogOut size={22} color="#ef4444" /> 
                        <span style={{ fontWeight: 500 }}>Logout</span>
                    </div>
                </motion.div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                {/* Header */}
                <motion.header 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="admin-header"
                    style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        paddingBottom: '1.5rem', 
                        borderBottom: '2px solid #e2e8f0',
                        background: 'white',
                        padding: '1.5rem 2rem',
                        borderRadius: '16px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        marginBottom: '2rem'
                    }}
                >
                    <div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.3rem', fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
                            Welcome Back, <span className="text-gradient">Admin</span>
                        </h1>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: "'DM Sans', sans-serif" }}>
                            <Clock size={16} />
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="admin-mobile-toggle"
                            style={{
                                display: 'none',
                                background: 'var(--color-primary)',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '0.75rem',
                                color: 'white',
                                cursor: 'pointer',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            onClick={() => router.push('/admin/login')}
                            style={{ 
                                width: 55, 
                                height: 55, 
                                borderRadius: '16px', 
                                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                boxShadow: '0 8px 20px rgba(124, 58, 237, 0.3)',
                                cursor: 'pointer'
                            }}
                        >
                            <Users size={28} color="white" />
                        </motion.div>
                    </div>
                </motion.header>

                {/* Stats Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem'
                    }}
                >
                    {[
                        { 
                            title: "Contact Forms", 
                            value: stats.contacts, 
                            icon: <MessageSquare size={28} />, 
                            color: '#7c3aed',
                            bgColor: 'rgba(124, 58, 237, 0.1)',
                            link: '/admin/contacts',
                            trend: '+12%'
                        },
                        { 
                            title: "Active Services", 
                            value: stats.services, 
                            icon: <Briefcase size={28} />, 
                            color: '#10b981',
                            bgColor: 'rgba(16, 185, 129, 0.1)',
                            link: '/admin/services',
                            trend: '+8%'
                        },
                        { 
                            title: "Total Records", 
                            value: stats.contacts + stats.services, 
                            icon: <Activity size={28} />, 
                            color: '#f59e0b',
                            bgColor: 'rgba(245, 158, 11, 0.1)',
                            link: '/admin',
                            trend: '+20%'
                        }
                    ].map((stat, i) => (
                        <Link href={stat.link} key={i} style={{ textDecoration: 'none' }}>
                            <motion.div 
                                variants={itemVariants}
                                whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
                                style={{
                                    background: 'white',
                                    padding: '2rem',
                                    borderRadius: '20px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                    border: '1px solid #e2e8f0',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: stat.bgColor, borderRadius: '50%', opacity: 0.5 }} />
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem', position: 'relative', zIndex: 2 }}>
                                    <div style={{ 
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '16px',
                                        background: stat.bgColor,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: stat.color
                                    }}>
                                        {stat.icon}
                                    </div>
                                    <div style={{ 
                                        background: stat.bgColor,
                                        color: stat.color,
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '20px',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.3rem'
                                    }}>
                                        <TrendingUp size={14} />
                                        {stat.trend}
                                    </div>
                                </div>

                                <div style={{ position: 'relative', zIndex: 2 }}>
                                    <h5 style={{ color: 'var(--color-text-muted)', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: "'Space Grotesk', sans-serif" }}>
                                        {stat.title}
                                    </h5>
                                    <h2 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--color-text-main)', fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
                                        {stat.value}
                                    </h2>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>

                {/* Bottom Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '1.5rem'
                    }}
                >
                    {/* Recent Activity */}
                    <motion.div 
                        variants={itemVariants}
                        style={{
                            background: 'white',
                            padding: '2rem',
                            borderRadius: '20px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            border: '1px solid #e2e8f0'
                        }}
                    >
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: "'Syne', sans-serif" }}>
                            <Activity size={24} color="var(--color-primary)" />
                            Recent Contacts
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {recentContacts.length > 0 ? recentContacts.map((contact, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    style={{
                                        padding: '1rem',
                                        background: 'rgba(124, 58, 237, 0.03)',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(124, 58, 237, 0.1)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <div>
                                        <p style={{ fontWeight: 600, marginBottom: '0.2rem', color: 'var(--color-text-main)', fontFamily: "'DM Sans', sans-serif" }}>{contact.name}</p>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontFamily: "'Manrope', sans-serif" }}>{contact.email}</p>
                                    </div>
                                    <CheckCircle size={20} color="#10b981" />
                                </motion.div>
                            )) : (
                                <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '2rem' }}>No recent contacts</p>
                            )}
                        </div>
                    </motion.div>

                    {/* Analytics Overview */}
                    <motion.div 
                        variants={itemVariants}
                        style={{
                            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                            padding: '2rem',
                            borderRadius: '20px',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                            color: 'white',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        <h3 style={{ marginBottom: '2rem', fontSize: '1.3rem', fontWeight: 700, fontFamily: "'Syne', sans-serif", display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <TrendingUp size={24} color="var(--color-primary)" />
                            Analytics Overview
                        </h3>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                                    {stats.contacts}
                                </div>
                                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Client Inquiries
                                </div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginBottom: '0.5rem' }}>
                                    {stats.services}
                                </div>
                                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Service Offerings
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ 
                                padding: '1rem', 
                                background: 'rgba(255,255,255,0.05)', 
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Response Rate</span>
                                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981' }}>98.5%</span>
                            </div>
                            <div style={{ 
                                padding: '1rem', 
                                background: 'rgba(255,255,255,0.05)', 
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Client Satisfaction</span>
                                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>4.9/5</span>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(124, 58, 237, 0.1)', borderRadius: '12px', border: '1px solid rgba(124, 58, 237, 0.2)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <ShieldCheck size={18} color="var(--color-primary)" />
                                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)' }}>System Status</span>
                            </div>
                            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>All Services Operational</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Admin Footer */}
                <footer style={{ marginTop: '3rem', padding: '5rem 0', background: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
                        <div style={{ marginBottom: '5rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem', color: 'white' }}>
                                    <span style={{ color: 'var(--color-primary)' }}>One</span> Click
                                </h3>
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>
                                    PREMIUM OUTDOOR MEDIA SOLUTIONS
                                </p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                            <div>
                                <h4 style={{ marginBottom: '1rem', fontSize: '1rem', color: 'white' }}>Quick Links</h4>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', listStyle: 'none', padding: 0 }}>
                                    <li><a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a></li>
                                    <li><a href="/services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</a></li>
                                    <li><a href="/testimonials" style={{ color: 'inherit', textDecoration: 'none' }}>Testimonials</a></li>
                                    <li><a href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a></li>
                                </ul>
                            </div>

                            <div>
                                <h4 style={{ marginBottom: '1rem', fontSize: '1rem', color: 'white' }}>Contact Us</h4>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', listStyle: 'none', padding: 0 }}>
                                    <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                                        <MapPin size={18} color="var(--color-primary)" /> Dubai, UAE
                                    </li>
                                    <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                                        <Phone size={18} color="var(--color-primary)" /> +971 00 000 0000
                                    </li>
                                    <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                                        <Mail size={18} color="var(--color-primary)" /> info@oneclickadv.ae
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', paddingTop: '2rem', marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                            &copy; {new Date().getFullYear()} One Click Advertisement. All Rights Reserved.
                        </div>
                    </div>
                </footer>
            </main>

            <style jsx>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
