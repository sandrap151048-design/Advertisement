"use client";

import { motion } from 'framer-motion';
import { Home, LogOut, MessageSquare, Briefcase, Plus, Trash2, Edit, Layers, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminFooter from '../components/AdminFooter';

interface Service {
    _id: string;
    name: string;
    description: string;
    category: string;
    image?: string;
    items?: string[];
    createdAt: string;
}

export default function ServicesPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        image: '',
        items: ['', '', '', '']
    });

    useEffect(() => {
        const authToken = localStorage.getItem('adminAuth');
        if (authToken === 'true') {
            setIsAuthenticated(true);
            fetchServices();
        } else {
            router.push('/admin/login');
        }
    }, [router]);

    const fetchServices = async () => {
        try {
            const timestamp = new Date().getTime();
            const response = await fetch(`/api/services?t=${timestamp}`, { cache: 'no-store', headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' } });
            const data = await response.json();
            setServices(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching services:', error);
            setServices([]);
        }
        setIsLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await fetch('/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setShowAddModal(false);
                setFormData({ name: '', description: '', category: '', image: '', items: ['', '', '', ''] });
                setSuccessMessage('Service added successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
                fetchServices();
            }
        } catch (error) {
            console.error('Error adding service:', error);
            setSuccessMessage('Failed to add service');
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        try {
            const response = await fetch(`/api/services?id=${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setServices(services.filter(s => s._id !== id));
                setSuccessMessage('Service deleted successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (error) {
            console.error('Error deleting service:', error);
            setSuccessMessage('Failed to delete service');
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminUser');
        router.push('/admin/login');
    };

    if (!isAuthenticated) return null;

    return (
        <div style={{ padding: '2rem', background: '#f8fafc', minHeight: '100vh', paddingBottom: '100px' }}>
                {successMessage && (
                    <div style={{
                        position: 'fixed',
                        top: '20px',
                        right: '20px',
                        background: successMessage.includes('success') ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        color: 'white',
                        padding: '1rem 1.5rem',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        zIndex: 9999,
                        fontWeight: 600,
                        fontSize: '0.95rem'
                    }}>
                        {successMessage}
                    </div>
                )}
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1a1a1a', fontFamily: "'Outfit', sans-serif" }}>Services <span style={{ color: '#e61e25' }}>Management</span></h1>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>Manage your public service offerings</p>
                    </div>
                    <button 
                        onClick={() => setShowAddModal(true)} 
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.5rem', 
                            padding: '0.8rem 1.5rem',
                            background: 'linear-gradient(135deg, #2c4a5e 0%, #e61e25 100%)',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white',
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <Plus size={20} /> Add Service
                    </button>
                </header>

                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>
                        <p style={{ color: '#666666' }}>Loading services...</p>
                    </div>
                ) : services.length === 0 ? (
                    <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                        <Briefcase size={48} color="#666666" style={{ margin: '0 auto 1rem' }} />
                        <h3 style={{ marginBottom: '0.5rem' }}>No Services Yet</h3>
                        <p style={{ color: '#666666', marginBottom: '1.5rem' }}>Start by adding your first service</p>
                        <button 
                            onClick={() => setShowAddModal(true)} 
                            style={{ 
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.8rem 1.5rem',
                                background: 'linear-gradient(135deg, #2c4a5e 0%, #e61e25 100%)',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <Plus size={20} /> Add Service
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {services.map((service) => (
                            <motion.div
                                key={service._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-card"
                                style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                            >
                                <div style={{ height: '160px', width: '100%', position: 'relative', background: '#eee' }}>
                                    {service.image ? (
                                        <img 
                                            src={service.image} 
                                            alt={service.name} 
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80';
                                            }}
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                                            <Briefcase size={40} />
                                        </div>
                                    )}
                                </div>
                                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ marginBottom: '0.5rem' }}>
                                        <span style={{ 
                                            background: 'rgba(230, 30, 37, 0.1)', 
                                            color: '#e61e25',
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '4px',
                                            fontSize: '0.7rem',
                                            fontWeight: 700,
                                            textTransform: 'uppercase'
                                        }}>
                                            {service.category}
                                        </span>
                                    </div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', color: '#1a1a1a', fontWeight: 800 }}>
                                        {service.name}
                                    </h3>
                                    <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: '1.6', flex: 1, marginBottom: '1rem' }}>
                                        {service.description}
                                    </p>
                                    {service.items && service.items.length > 0 && (
                                        <ul style={{ color: 'var(--color-text-muted)', paddingLeft: '0', listStyleType: 'none', fontSize: '0.85rem', lineHeight: '1.8', marginBottom: '1rem' }}>
                                            {service.items.filter(item => item.trim()).map((item, idx) => (
                                                <li key={idx} style={{ marginBottom: '0.5rem', paddingLeft: '1.2rem', position: 'relative' }}>
                                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-primary)', fontWeight: 'bold' }}>•</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                                        <button
                                            onClick={() => handleDelete(service._id)}
                                            style={{
                                                flex: 1,
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
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Add Service Modal */}
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
                            <h2 style={{ marginBottom: '1.5rem', fontFamily: "'Outfit', sans-serif" }}>Add New Service</h2>
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                                        Service Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g., Digital Signage"
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
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        placeholder="e.g., Signage, Branding, Graphics"
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
                                        Description
                                    </label>
                                    <textarea
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Describe the service..."
                                        rows={3}
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
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                                        Image (Direct Upload)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{
                                            width: '100%',
                                            padding: '0.8rem',
                                            borderRadius: '8px',
                                            border: '1px solid var(--color-card-border)',
                                            background: 'rgba(124, 58, 237, 0.03)',
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                    {formData.image && (
                                        <div style={{ marginTop: '1rem', height: '100px', borderRadius: '8px', overflow: 'hidden' }}>
                                            <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                                        Service Items (Features/Details)
                                    </label>
                                    {formData.items.map((item, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            value={item}
                                            onChange={(e) => {
                                                const newItems = [...formData.items];
                                                newItems[index] = e.target.value;
                                                setFormData({ ...formData, items: newItems });
                                            }}
                                            placeholder={`Item ${index + 1} (optional)`}
                                            style={{
                                                width: '100%',
                                                padding: '0.7rem',
                                                borderRadius: '8px',
                                                border: '1px solid var(--color-card-border)',
                                                background: 'rgba(124, 58, 237, 0.03)',
                                                fontSize: '0.9rem',
                                                marginBottom: '0.6rem'
                                            }}
                                        />
                                    ))}
                                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                                        Add up to 4 bullet points describing key features or details
                                    </p>
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
                                        Add Service
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {/* Admin Footer */}
                <AdminFooter />
        </div>
    );
}
