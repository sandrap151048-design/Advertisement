"use client";

import { motion } from 'framer-motion';
import { Home, Users, LogOut, MessageSquare, Briefcase, TrendingUp, Activity, Clock, CheckCircle, Layers, MapPin, Phone, Mail, ShieldCheck, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminFooter from './components/AdminFooter';

export default function AdminPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPath, setCurrentPath] = useState('');
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [stats, setStats] = useState({
        contacts: 0,
        services: 0
    });
    const [recentContacts, setRecentContacts] = useState<any[]>([]);
    const [selectedContact, setSelectedContact] = useState<any | null>(null);

    useEffect(() => {
        const authToken = localStorage.getItem('adminAuth');
        const adminUserStr = localStorage.getItem('adminUser');
        const adminUser = adminUserStr ? JSON.parse(adminUserStr) : null;

        if (authToken === 'true' && adminUser?.email === 'admin@gmail.com') {
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
        router.push('/');
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
            color: '#ffffff',
            cursor: 'pointer',
            transition: 'all 0.3s',
            background: isActive ? 'rgba(255, 107, 53, 0.2)' : 'transparent',
            borderLeft: isActive ? '4px solid #e61e25' : '4px solid transparent',
            boxShadow: isActive ? '0 2px 8px rgba(255, 107, 53, 0.3)' : 'none'
        };
    };

    const getNavIconColor = (path: string) => {
        return isActivePath(path) ? '#e61e25' : 'rgba(255,255,255,0.6)';
    };

    const getNavTextStyle = (path: string) => {
        return {
            fontWeight: isActivePath(path) ? 600 : 500,
            color: isActivePath(path) ? '#e61e25' : 'rgba(255,255,255,0.7)'
        };
    };

    if (isLoading) {
        return (
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: '100vh',
                background: '#f5f5f5'
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center' }}
                >
                    <div style={{ 
                        width: '60px', 
                        height: '60px', 
                        border: '4px solid rgba(255, 107, 53, 0.3)',
                        borderTop: '4px solid #e61e25',
                        borderRadius: '50%',
                        margin: '0 auto 1rem',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <p style={{ color: '#1c1c1c', fontSize: '1.1rem', fontWeight: 600 }}>Loading Dashboard...</p>
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
        <div style={{ padding: '0' }}>
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
                        borderBottom: '2px solid rgba(255, 107, 53, 0.3)',
                        background: '#ffffff',
                        padding: '1.5rem 2rem',
                        borderRadius: '16px',
                        boxShadow: '0 1px 3px rgba(12, 12, 12, 0.1)',
                        marginBottom: '2rem'
                    }}
                >
                    <div>
<div onClick={() => window.location.href='/'} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}><div style={{ display: 'flex', alignItems: 'center', gap: '0', fontSize: '1.5rem', fontWeight: 900, color: '#1c1c1c', fontFamily: "'Bricolage Grotesque', sans-serif" }}><svg width="26" height="26" viewBox="0 0 28 28" style={{ marginRight: '-1px' }}><circle cx="14" cy="14" r="11" fill="none" stroke="#1c1c1c" strokeWidth="4"/><rect x="16" y="2" width="9" height="9" fill="#e61e25" rx="1"/></svg><span style={{ marginLeft: '-1px' }}>ne Click</span></div><div style={{ color: '#888', fontWeight: '900', letterSpacing: '4px', fontSize: '0.65rem' }}>ADVERTISEMENT</div></div>
<h1 style={{ fontSize: '2rem', marginBottom: '0.3rem', fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: '#1c1c1c' }}>
                            Welcome Back, <span style={{ color: '#e61e25' }}>Admin</span>
                        </h1>
                        <p style={{ color: '#666666', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: "'DM Sans', sans-serif" }}>
                            <Clock size={16} color="#facc15" />
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>



                        {/* Go to Website Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push('/')}
                            style={{
                                background: 'linear-gradient(135deg, #2c4a5e 0%, #e61e25 100%)',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '0.75rem 1.5rem',
                                color: 'white',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <Home size={18} />
                            Go to Website
                        </motion.button>
                        
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            onClick={() => router.push('/admin/login')}
                            style={{ 
                                width: 55, 
                                height: 55, 
                                borderRadius: '16px', 
                                background: 'linear-gradient(135deg, #2c4a5e, #e61e25)', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                boxShadow: '0 8px 20px rgba(255, 107, 53, 0.3)',
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
                    className="admin-stats-grid"
                    style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '2rem'
                    }}
                >
                    {[
                        { 
                            title: "Contact Forms", 
                            value: stats.contacts, 
                            icon: <MessageSquare size={28} />, 
                            color: '#2c4a5e',
                            bgColor: 'rgba(44, 74, 94, 0.15)',
                            link: '/admin/contacts',
                            trend: '+12%'
                        },
                        { 
                            title: "Active Services", 
                            value: stats.services, 
                            icon: <Briefcase size={28} />, 
                            color: '#e61e25',
                            bgColor: 'rgba(255, 107, 53, 0.15)',
                            link: '/admin/services',
                            trend: '+8%'
                        }
                    ].map((stat, i) => (
                        <div key={i} onClick={() => router.push(stat.link)} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                            <motion.div 
                                variants={itemVariants}
                                whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(12, 12, 12,0.1)' }}
                                style={{
                                    background: '#ffffff',
                                    padding: '2rem',
                                    borderRadius: '20px',
                                    boxShadow: '0 4px 12px rgba(12, 12, 12, 0.08)',
                                    border: '1px solid rgba(44, 74, 94, 0.2)',
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
                                    <h5 style={{ color: '#666666', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: "'Space Grotesk', sans-serif" }}>
                                        {stat.title}
                                    </h5>
                                    <h2 style={{ fontSize: '2.5rem', margin: 0, color: '#1c1c1c', fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
                                        {stat.value}
                                    </h2>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>

                {/* Bottom Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="admin-bottom-grid"
                    style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '1.5rem',
                        marginTop: '2rem'
                    }}
                >
                    {/* Recent Activity */}
                    <motion.div 
                        variants={itemVariants}
                        style={{
                            background: '#ffffff',
                            padding: '2rem',
                            borderRadius: '20px',
                            boxShadow: '0 4px 12px rgba(12, 12, 12, 0.08)',
                            border: '1px solid rgba(44, 74, 94, 0.2)'
                        }}
                    >
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: "'Syne', sans-serif", color: '#1c1c1c' }}>
                            <Activity size={24} color="#e61e25" />
                            Recent Contacts
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {recentContacts.length > 0 ? recentContacts.map((contact, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => setSelectedContact(contact)}
                                    style={{
                                        padding: '1rem',
                                        background: 'rgba(255, 107, 53, 0.1)',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255, 107, 53, 0.3)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                    whileHover={{ scale: 1.02, boxShadow: '0 4px 16px rgba(230,30,37,0.15)' }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div>
                                        <p style={{ fontWeight: 600, marginBottom: '0.2rem', color: '#1c1c1c', fontFamily: "'DM Sans', sans-serif" }}>{contact.name}</p>
                                        <p style={{ fontSize: '0.85rem', color: '#666666', fontFamily: "'Manrope', sans-serif" }}>{contact.email}</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '0.75rem', color: '#e61e25', fontWeight: 600 }}>View</span>
                                        <CheckCircle size={20} color="#e61e25" />
                                    </div>
                                </motion.div>
                            )) : (
                                <p style={{ color: '#666666', textAlign: 'center', padding: '2rem' }}>No recent contacts</p>
                            )}
                        </div>
                    </motion.div>

                    {/* Contact Detail Modal */}
                    {selectedContact && (
                        <div
                            onClick={() => setSelectedContact(null)}
                            style={{
                                position: 'fixed', inset: 0,
                                background: 'rgba(12, 12, 12,0.55)',
                                zIndex: 9999,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '1.5rem'
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    background: '#ffffff',
                                    borderRadius: '24px',
                                    padding: '2.5rem',
                                    maxWidth: '520px',
                                    width: '100%',
                                    boxShadow: '0 24px 64px rgba(12, 12, 12,0.18)',
                                    border: '1px solid rgba(230,30,37,0.1)',
                                    position: 'relative'
                                }}
                            >
                                {/* Close button */}
                                <button
                                    onClick={() => setSelectedContact(null)}
                                    style={{
                                        position: 'absolute', top: '1.5rem', right: '1.5rem',
                                        background: '#f5f5f5', border: 'none', borderRadius: '50%',
                                        width: '36px', height: '36px', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.2rem', color: '#666', transition: 'all 0.2s'
                                    }}
                                >
                                    ✕
                                </button>

                                {/* Avatar */}
                                <div style={{
                                    width: '60px', height: '60px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #e61e25, #ff6b6b)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: '1.5rem',
                                    fontSize: '1.6rem', fontWeight: 800, color: 'white'
                                }}>
                                    {(selectedContact.name || 'U').charAt(0).toUpperCase()}
                                </div>

                                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.3rem', fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                                    {selectedContact.name || 'Unknown'}
                                </h2>
                                <p style={{ color: '#e61e25', fontWeight: 600, fontSize: '0.85rem', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact Submission</p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '12px' }}>
                                        <Mail size={18} color="#e61e25" style={{ marginTop: '2px', flexShrink: 0 }} />
                                        <div>
                                            <p style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>Email</p>
                                            <p style={{ color: '#111827', fontWeight: 600, wordBreak: 'break-all' }}>{selectedContact.email || '—'}</p>
                                        </div>
                                    </div>

                                    {selectedContact.phone && (
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '12px' }}>
                                            <Phone size={18} color="#e61e25" style={{ marginTop: '2px', flexShrink: 0 }} />
                                            <div>
                                                <p style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>Phone</p>
                                                <p style={{ color: '#111827', fontWeight: 600 }}>{selectedContact.phone}</p>
                                            </div>
                                        </div>
                                    )}

                                    {selectedContact.message && (
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '12px' }}>
                                            <MessageSquare size={18} color="#e61e25" style={{ marginTop: '2px', flexShrink: 0 }} />
                                            <div>
                                                <p style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.3rem' }}>Message</p>
                                                <p style={{ color: '#374151', lineHeight: 1.6, fontSize: '0.95rem' }}>{selectedContact.message}</p>
                                            </div>
                                        </div>
                                    )}

                                    {selectedContact.createdAt && (
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '12px' }}>
                                            <Clock size={18} color="#e61e25" style={{ marginTop: '2px', flexShrink: 0 }} />
                                            <div>
                                                <p style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>Submitted</p>
                                                <p style={{ color: '#111827', fontWeight: 600 }}>{new Date(selectedContact.createdAt).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                                    <a
                                        href={`mailto:${selectedContact.email}`}
                                        style={{
                                            flex: 1, padding: '0.875rem', background: '#e61e25',
                                            color: 'white', border: 'none', borderRadius: '12px',
                                            fontWeight: 700, cursor: 'pointer', textDecoration: 'none',
                                            textAlign: 'center', fontSize: '0.95rem', display: 'flex',
                                            alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <Mail size={16} /> Reply via Email
                                    </a>
                                    <button
                                        onClick={() => setSelectedContact(null)}
                                        style={{
                                            padding: '0.875rem 1.5rem', background: '#f5f5f5',
                                            color: '#374151', border: 'none', borderRadius: '12px',
                                            fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        Close
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {/* Analytics Overview */}
                    <motion.div 
                        variants={itemVariants}
                        style={{
                            background: 'linear-gradient(135deg, #2c4a5e 0%, #1a2f3d 100%)',
                            padding: '2rem',
                            borderRadius: '20px',
                            boxShadow: '0 8px 24px rgba(44, 74, 94, 0.2)',
                            color: 'white',
                            border: '1px solid rgba(255, 107, 53, 0.3)'
                        }}
                    >
                        <h3 style={{ marginBottom: '2rem', fontSize: '1.3rem', fontWeight: 700, fontFamily: "'Syne', sans-serif", display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <TrendingUp size={24} color="#e61e25" />
                            Analytics Overview
                        </h3>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#e61e25', marginBottom: '0.5rem' }}>
                                    {stats.contacts}
                                </div>
                                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Client Inquiries
                                </div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#facc15', marginBottom: '0.5rem' }}>
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
                                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e61e25' }}>98.5%</span>
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

                        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(34, 211, 238, 0.1)', borderRadius: '12px', border: '1px solid rgba(34, 211, 238, 0.3)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <ShieldCheck size={18} color="var(--color-secondary)" />
                                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-secondary)' }}>System Status</span>
                            </div>
                            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>All Services Operational</span>
                        </div>
                    </motion.div>
                </motion.div>



                {/* Admin Footer */}
                <AdminFooter />
            <style jsx>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
