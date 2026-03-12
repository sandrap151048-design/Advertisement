"use client";

import { motion } from 'framer-motion';
import { Home, MessageSquare, Briefcase, LogOut, Star, Plus, Trash2, Quote, Layers, MapPin, Phone, Mail, ShieldCheck, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Testimonial {
    _id: string;
    name: string;
    company: string;
    role: string;
    message: string;
    rating: number;
    createdAt: string;
}

export default function TestimonialsPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        role: '',
        message: '',
        rating: 5
    });

    useEffect(() => {
        const authToken = localStorage.getItem('adminAuth');
        if (authToken === 'true') {
            setIsAuthenticated(true);
            fetchTestimonials();
        } else {
            router.push('/admin/login');
        }
    }, [router]);

    const fetchTestimonials = async () => {
        try {
            const response = await fetch('/api/testimonials');
            const data = await response.json();
            setTestimonials(data.testimonials || []);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        }
        setIsLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await fetch('/api/testimonials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setShowAddModal(false);
                setFormData({ name: '', company: '', role: '', message: '', rating: 5 });
                fetchTestimonials();
            }
        } catch (error) {
            console.error('Error adding testimonial:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) return;

        try {
            const response = await fetch(`/api/testimonials?id=${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setTestimonials(testimonials.filter(t => t._id !== id));
            }
        } catch (error) {
            console.error('Error deleting testimonial:', error);
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
                            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 800,
                            fontSize: '1.1rem',
                            boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)'
                        }}>
                            OC
                        </div>
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
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                    <Link href="/admin" className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '4px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', transition: 'all 0.3s', textDecoration: 'none' }}>
                        <Home size={20} color="rgba(255,255,255,0.6)" /> Dashboard
                    </Link>
                    <Link href="/admin/contacts" className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '4px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', transition: 'all 0.3s', textDecoration: 'none' }}>
                        <MessageSquare size={20} color="rgba(255,255,255,0.6)" /> Contact Forms
                    </Link>
                    <Link href="/admin/services" className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '4px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', transition: 'all 0.3s', textDecoration: 'none' }}>
                        <Briefcase size={20} color="rgba(255,255,255,0.6)" /> Services
                    </Link>
                    <Link href="/admin/testimonials" className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.1)', color: 'white', cursor: 'pointer', borderLeft: '3px solid var(--color-primary)', textDecoration: 'none' }}>
                        <Star size={20} color="var(--color-primary)" /> Testimonials
                    </Link>
                    <Link href="/admin/blog" className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '4px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', transition: 'all 0.3s', textDecoration: 'none' }}>
                        <BookOpen size={20} color="rgba(255,255,255,0.6)" /> Blog & Resources
                    </Link>
                    <Link href="/admin/newsletter" className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '4px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', transition: 'all 0.3s', textDecoration: 'none' }}>
                        <Mail size={20} color="rgba(255,255,255,0.6)" /> Subscribers
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
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-card-border)' }}>
                    <div>
                        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#000000' }}>Testimonials <span className="text-gradient">Management</span></h1>
                        <p style={{ color: '#333333', fontSize: '0.9rem', fontFamily: "'DM Sans', sans-serif" }}>Manage customer testimonials and reviews</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="btn btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem' }}
                    >
                        <Plus size={20} /> Add Testimonial
                    </button>
                </header>

                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>
                        <p style={{ color: 'var(--color-text-muted)' }}>Loading testimonials...</p>
                    </div>
                ) : testimonials.length === 0 ? (
                    <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                        <Quote size={48} color="var(--color-text-muted)" style={{ margin: '0 auto 1rem' }} />
                        <h3 style={{ marginBottom: '0.5rem' }}>No Testimonials Yet</h3>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Start by adding your first testimonial</p>
                        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
                            <Plus size={20} style={{ marginRight: '0.5rem' }} /> Add Testimonial
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                        {testimonials.map((testimonial) => (
                            <motion.div
                                key={testimonial._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-card"
                                style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '0.3rem' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                size={18} 
                                                fill={i < testimonial.rating ? 'var(--color-accent)' : 'none'}
                                                color={i < testimonial.rating ? 'var(--color-accent)' : 'var(--color-text-muted)'}
                                            />
                                        ))}
                                    </div>
                                    <Quote size={24} color="var(--color-primary)" style={{ opacity: 0.3 }} />
                                </div>
                                
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.7', flex: 1, marginBottom: '1.5rem', fontStyle: 'italic', fontFamily: "'Manrope', sans-serif" }}>
                                    "{testimonial.message}"
                                </p>
                                
                                <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-card-border)' }}>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem', color: 'var(--color-text-main)', fontFamily: "'Syne', sans-serif" }}>
                                        {testimonial.name}
                                    </h4>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: "'Space Grotesk', sans-serif" }}>
                                        {testimonial.role} at {testimonial.company}
                                    </p>
                                    
                                    <button
                                        onClick={() => handleDelete(testimonial._id)}
                                        style={{
                                            width: '100%',
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            border: '1px solid rgba(239, 68, 68, 0.3)',
                                            color: '#ef4444',
                                            padding: '0.6rem',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            fontSize: '0.85rem',
                                            fontWeight: 600
                                        }}
                                    >
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Add Testimonial Modal */}
                {showAddModal && (
                    <div style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000
                    }} onClick={() => setShowAddModal(false)}>
                        <div className="glass-card" style={{ 
                            maxWidth: '500px', 
                            width: '90%', 
                            padding: '2rem',
                            maxHeight: '90vh',
                            overflowY: 'auto'
                        }} onClick={(e) => e.stopPropagation()}>
                            <h2 style={{ marginBottom: '1.5rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Add New Testimonial</h2>
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                                        Customer Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g., Ahmed Al Mansoori"
                                        style={{
                                            width: '100%',
                                            padding: '0.8rem',
                                            borderRadius: '8px',
                                            border: '1px solid var(--color-card-border)',
                                            background: 'rgba(124, 58, 237, 0.03)',
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        placeholder="e.g., Emirates Group"
                                        style={{
                                            width: '100%',
                                            padding: '0.8rem',
                                            borderRadius: '8px',
                                            border: '1px solid var(--color-card-border)',
                                            background: 'rgba(124, 58, 237, 0.03)',
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                                        Role/Position
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        placeholder="e.g., Marketing Director"
                                        style={{
                                            width: '100%',
                                            padding: '0.8rem',
                                            borderRadius: '8px',
                                            border: '1px solid var(--color-card-border)',
                                            background: 'rgba(124, 58, 237, 0.03)',
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                                        Rating
                                    </label>
                                    <select
                                        value={formData.rating}
                                        onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                                        style={{
                                            width: '100%',
                                            padding: '0.8rem',
                                            borderRadius: '8px',
                                            border: '1px solid var(--color-card-border)',
                                            background: 'rgba(124, 58, 237, 0.03)',
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        <option value={5}>5 Stars</option>
                                        <option value={4}>4 Stars</option>
                                        <option value={3}>3 Stars</option>
                                        <option value={2}>2 Stars</option>
                                        <option value={1}>1 Star</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                                        Testimonial Message
                                    </label>
                                    <textarea
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Write the testimonial message..."
                                        rows={5}
                                        style={{
                                            width: '100%',
                                            padding: '0.8rem',
                                            borderRadius: '8px',
                                            border: '1px solid var(--color-card-border)',
                                            background: 'rgba(124, 58, 237, 0.03)',
                                            fontSize: '0.95rem',
                                            resize: 'vertical'
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                        className="btn btn-outline"
                                        style={{ flex: 1 }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        style={{ flex: 1 }}
                                    >
                                        Add Testimonial
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

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
        </div>
    );
}
