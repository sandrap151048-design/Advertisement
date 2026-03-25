"use client";

import { motion } from 'framer-motion';
import { Home, LogOut, MessageSquare, Briefcase, Trash2, Mail, Phone, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Contact {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
    createdAt: string;
}

export default function ContactsPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const authToken = localStorage.getItem('adminAuth');
        if (authToken === 'true') {
            setIsAuthenticated(true);
            fetchContacts();
        } else {
            router.push('/admin/login');
        }
    }, [router]);

    const fetchContacts = async () => {
        try {
            const response = await fetch('/api/contact');
            const data = await response.json();
            setContacts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            setContacts([]);
        }
        setIsLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this contact?')) return;

        try {
            const response = await fetch(`/api/contact?id=${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setContacts(contacts.filter(c => c._id !== id));
            }
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminUser');
        router.push('/admin/login');
    };

    if (!isAuthenticated) return null;

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar" style={{ display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)' }}>
                <div style={{ marginBottom: '3rem', marginTop: '1rem', padding: '0 1rem' }}>
                    <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <div style={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #2c4a5e, #ff6b35)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 800,
                            fontSize: '1.1rem',
                            boxShadow: '0 4px 12px rgba(255, 107, 53, 0.4)'
                        }}>
                            OC
                        </div>
                        <div>
                            <div>
                                <span style={{ color: '#ff6b35', fontWeight: 700, fontSize: '1.1rem' }}>One</span>
                                <span style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}> Click</span>
                            </div>
                            <div style={{ fontSize: '0.65rem', fontWeight: 500, color: 'rgba(255,255,255,0.5)', letterSpacing: '1.5px', textTransform: 'uppercase', lineHeight: 1, marginTop: '2px' }}>
                                Admin Portal
                            </div>
                        </div>
                    </Link>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                    <Link href="/admin" className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '4px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', transition: 'all 0.3s', textDecoration: 'none' }}>
                        <Home size={20} color="rgba(255,255,255,0.6)" /> Dashboard
                    </Link>
                    <Link href="/admin/contacts" className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '4px', background: 'rgba(255, 107, 53, 0.2)', color: 'white', cursor: 'pointer', borderLeft: '3px solid #ff6b35', textDecoration: 'none' }}>
                        <MessageSquare size={20} color="#ff6b35" /> Contact Forms
                    </Link>
                    <Link href="/admin/services" className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '4px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', transition: 'all 0.3s', textDecoration: 'none' }}>
                        <Briefcase size={20} color="rgba(255,255,255,0.6)" /> Services
                    </Link>
                </nav>

                <div style={{ marginTop: 'auto' }}>
                    <div onClick={handleLogout} className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '4px', color: '#ef4444', cursor: 'pointer', transition: 'all 0.3s', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.1)' }}>
                        <LogOut size={20} color="#ef4444" /> Logout
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100vh', overflowY: 'auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(44, 74, 94, 0.2)' }}>
                    <div>
                        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', fontFamily: "'Bricolage Grotesque', sans-serif", color: '#1a1a1a' }}>Contact <span style={{ color: '#ff6b35', fontWeight: 700 }}>Forms</span></h1>
                        <p style={{ color: '#666666', fontSize: '0.9rem', fontFamily: "'Manrope', sans-serif" }}>Manage customer inquiries and messages</p>
                    </div>
                    <div style={{ background: 'rgba(255, 107, 53, 0.1)', padding: '0.8rem 1.5rem', borderRadius: '8px', border: '1px solid rgba(255, 107, 53, 0.2)' }}>
                        <span style={{ color: '#ff6b35', fontWeight: 700 }}>{contacts.length} Total</span>
                    </div>
                </header>

                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>
                        <p style={{ color: '#666666' }}>Loading contacts...</p>
                    </div>
                ) : contacts.length === 0 ? (
                    <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                        <MessageSquare size={48} color="#666666" style={{ margin: '0 auto 1rem' }} />
                        <h3 style={{ marginBottom: '0.5rem' }}>No Contact Forms Yet</h3>
                        <p style={{ color: '#666666' }}>Contact form submissions will appear here</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {contacts.map((contact) => (
                            <motion.div
                                key={contact._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-card"
                                style={{ 
                                    padding: '1.5rem',
                                    background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.08) 0%, rgba(255, 107, 53, 0.03) 100%)',
                                    border: '1px solid rgba(255, 107, 53, 0.2)',
                                    boxShadow: '0 4px 12px rgba(255, 107, 53, 0.1)'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontFamily: "'DM Sans', sans-serif", color: '#ff6b35', fontWeight: 700 }}>{contact.name}</h3>
                                        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666666', fontSize: '0.9rem' }}>
                                                <Mail size={16} color="#ff6b35" />
                                                {contact.email}
                                            </div>
                                            {contact.phone && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666666', fontSize: '0.9rem' }}>
                                                    <Phone size={16} color="#ff6b35" />
                                                    {contact.phone}
                                                </div>
                                            )}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666666', fontSize: '0.9rem' }}>
                                                <Calendar size={16} color="#ff6b35" />
                                                {new Date(contact.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(contact._id)}
                                        style={{
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            border: '1px solid rgba(239, 68, 68, 0.3)',
                                            color: '#ef4444',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontSize: '0.9rem',
                                            fontWeight: 600
                                        }}
                                    >
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                                <div style={{ 
                                    background: 'rgba(255, 107, 53, 0.1)', 
                                    padding: '1rem', 
                                    borderRadius: '8px',
                                    border: '1px solid rgba(255, 107, 53, 0.2)'
                                }}>
                                    <p style={{ color: '#1a1a1a', lineHeight: '1.6', margin: 0, fontFamily: "'Manrope', sans-serif" }}>
                                        {contact.message}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Admin Footer */}
                <footer style={{ marginTop: '3rem', padding: '5rem 0', background: '#2c4a5e', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
                        <div style={{ marginBottom: '5rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem', color: 'white' }}>
                                    <span style={{ color: '#ff6b35' }}>One</span> Click
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
                                        <MapPin size={18} color="#facc15" /> Dubai, UAE
                                    </li>
                                    <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                                        <Phone size={18} color="#facc15" /> +971 52 406 5110
                                    </li>
                                    <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                                        <Mail size={18} color="#facc15" /> hello@oneclickadv.ae
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
        </div>
    );
}
