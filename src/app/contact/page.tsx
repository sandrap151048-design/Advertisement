"use client";

import { motion, Variants } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, Clock, Send, ExternalLink, ShieldCheck } from 'lucide-react';
import { useState, FormEvent } from 'react';

const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};
const slideDown: Variants = {
    hidden: { opacity: 0, y: -120 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9 } }
};
const dropIn: Variants = {
    hidden: { opacity: 0, y: -800 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 18, stiffness: 90 } }
};
const revealDown: Variants = {
    hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
    visible: { opacity: 1, clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.9 } }
};
const bounceInDown: Variants = {
    hidden: { opacity: 0, y: -200 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 10, stiffness: 80 } }
};
const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const inputStyle = {
    background: 'rgba(124, 58, 237, 0.03)',
    border: '1px solid var(--color-card-border)',
    padding: '1rem',
    borderRadius: '8px',
    color: 'var(--color-text-main)' as const,
    width: '100%',
    outline: 'none',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    transition: 'border-color 0.3s'
};

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) {
                setSubmitStatus({ success: true, message: data.message });
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                setSubmitStatus({ success: false, message: data.error || 'Something went wrong.' });
            }
        } catch {
            setSubmitStatus({ success: false, message: 'Failed to connect to the server.' });
        }
        setIsSubmitting(false);
    };

    return (
        <>
            {/* Hero */}
            <section className="hero-section container" style={{ minHeight: '50vh', paddingTop: '8rem', paddingBottom: '4rem' }}>
                <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ zIndex: 10 }}>
                    <motion.p variants={fadeInDown} style={{ color: 'var(--color-primary)', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'var(--font-navbar)' }}>
                        GET IN TOUCH
                    </motion.p>
                    <motion.h1 variants={bounceInDown} className="hero-title" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", textTransform: 'uppercase', lineHeight: '0.95', fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>
                        CONTACT <span style={{ color: 'var(--color-primary)' }}>US</span>
                    </motion.h1>
                    <motion.p variants={slideDown} style={{ color: 'var(--color-text-muted)', fontSize: '1rem', maxWidth: '550px', marginBottom: '2.5rem', fontFamily: "'Manrope', sans-serif" }}>
                        Ready to transform your brand? Reach out to our team and let us bring your vision to life.
                    </motion.p>
                </motion.div>
            </section>

            {/* Navigation Hub Section */}
            <motion.section className="container" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealDown} style={{ marginBottom: '4rem' }}>
                <div style={{ borderRadius: '32px', overflow: 'hidden', border: '1px solid var(--color-card-border)', background: 'rgba(124, 58, 237, 0.05)', backdropFilter: 'blur(20px)', position: 'relative' }}>
                    <img 
                        src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80" 
                        alt="Technology Innovation" 
                        style={{ 
                            position: 'absolute', 
                            inset: 0, 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover', 
                            opacity: 0.12, 
                            filter: 'brightness(1.3)' 
                        }} 
                    />
                    <div style={{ padding: '4rem 2rem', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                        <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>The <span className="text-gradient">Visibility Nexus</span></h2>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 2.5rem', lineHeight: '1.8' }}>
                            Our primary production hub and global headquarters are centrally located in Al Quoz, Dubai. Visit us for live demonstrations of AI-integrated signage architecture.
                        </p>
                        <button
                            onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Al+Quoz+Industrial+Area+3+Dubai', '_blank')}
                            className="btn btn-primary"
                            style={{ padding: '1.2rem 3.5rem', borderRadius: '14px', fontSize: '1.1rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '12px', boxShadow: '0 20px 40px rgba(124, 58, 237, 0.2)' }}
                        >
                            VIEW LOCATION <MapPin size={20} />
                        </button>
                    </div>
                </div>
            </motion.section>

            {/* Contact Info + Form */}
            <section className="section container">
                <div className="grid-2" style={{ alignItems: 'flex-start', gap: '3rem' }}>
                    {/* Info Cards */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <motion.div variants={fadeInDown}>
                            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-contact)', marginBottom: '1rem' }}>
                                Create Something <span className="text-gradient">Extraordinary</span>
                            </h2>
                            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: '2rem' }}>
                                Your brand deserves to be seen. Contact our UAE experts for a baseline consultation and discover the future of AI-driven advertisement.
                            </p>
                        </motion.div>

                        {[
                            { icon: <Phone size={24} />, title: "Concierge Desk", val: "+971 4 240 8899", desc: "WhatsApp Available", link: "tel:+97142408899" },
                            { icon: <Mail size={24} />, title: "Project Enquiries", val: "projects@oneclickadv.ae", desc: "Response: < 2 Hours", link: "mailto:projects@oneclickadv.ae" },
                            { icon: <ShieldCheck size={24} />, title: "Authority Desk", val: "RTA & DM Approvals", desc: "NOC & Permit Management", link: null },
                            { icon: <MapPin size={24} />, title: "Dubai Hub", val: "Al Quoz Industrial 3", desc: "Global Headquarters, UAE", link: "https://www.google.com/maps/search/?api=1&query=Al+Quoz+Industrial+3+Dubai" },
                            { icon: <Globe size={24} />, title: "Social Hub", val: "@oneclick.adv", desc: "Live AI Portfolio", link: "https://instagram.com" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={dropIn}
                                className="glass-card"
                                style={{
                                    display: 'flex',
                                    gap: '1.5rem',
                                    alignItems: 'center',
                                    padding: '1.5rem',
                                    borderRadius: '20px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    cursor: item.link ? 'pointer' : 'default'
                                }}
                                onClick={() => item.link && window.open(item.link, '_blank')}
                            >
                                <img src="/images/ai_ad_1.png" alt="Card BG" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.03, pointerEvents: 'none', filter: `grayscale(1) brightness(1.5)` }} />
                                <div style={{ width: 50, height: 50, borderRadius: '12px', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', position: 'relative', zIndex: 2 }}>
                                    {item.icon}
                                </div>
                                <div style={{ position: 'relative', zIndex: 2 }}>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', fontFamily: 'var(--font-heading)', color: 'var(--color-text-main)' }}>{item.title}</h4>
                                    <p style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '1rem' }}>{item.val}</p>
                                    <p style={{ color: 'var(--color-primary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        {item.desc} {item.link && <ExternalLink size={12} />}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideDown} className="glass-card" style={{ padding: '3rem', borderRadius: '32px', border: '1px solid var(--color-card-border)', background: 'rgba(255, 255, 255, 0.98)', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 50px rgba(124, 58, 237, 0.1)' }}>
                        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', fontFamily: 'var(--font-contact)', color: 'var(--color-text-main)' }}>Send a <span className="text-gradient">Message</span></h3>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', position: 'relative', zIndex: 2 }}>
                            {submitStatus && (
                                <div style={{ padding: '1rem', borderRadius: '8px', background: submitStatus.success ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: submitStatus.success ? '#4ade80' : '#f87171', border: `1px solid ${submitStatus.success ? '#4ade8033' : '#f8717133'}`, marginBottom: '1rem' }}>
                                    {submitStatus.message}
                                </div>
                            )}
                            <div className="grid-2" style={{ gap: '1.2rem' }}>
                                <input placeholder="Full Name" style={inputStyle} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                                <input placeholder="Email Address" type="email" style={inputStyle} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                            </div>
                            <input placeholder="Phone Number" style={inputStyle} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                            <textarea placeholder="Tell us about your project..." style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} required />

                            <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontSize: '1.1rem', borderRadius: '12px' }}>
                                {isSubmitting ? 'Sending...' : <><Send size={20} /> Send Message ✦</>}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* Locations Section */}
            <section className="section container" style={{ paddingBottom: '8rem' }}>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealDown} style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="section-title" style={{ fontFamily: 'var(--font-contact)' }}>Regional <span className="text-gradient">Presence</span></h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>Serving businesses across the entire United Arab Emirates.</p>
                </motion.div>

                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                    className="grid-3" style={{ gap: '2rem' }}
                >
                    {[
                        { loc: 'Dubai Hub', sub: 'Headquarters & Main Production', desc: 'Our central facility equipped with state-of-the-art machinery for high-volume production and regional logistics.', query: 'Industrial+Area+Dubai', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80' },
                        { loc: 'Abu Dhabi', sub: 'Capital Support Team', desc: 'Dedicated installation and support teams serving government entities and corporate headquarters in the capital.', query: 'Musaffah+Industrial+Area+Abu+Dhabi', img: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=80' },
                        { loc: 'Sharjah', sub: 'Northern Emirates Link', desc: 'Strategically located to provide rapid response times for businesses across Sharjah and the Northern Emirates.', query: 'Industrial+Area+Sharjah', img: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&q=80' },
                        { loc: 'Ajman', sub: 'Local Presence', desc: 'Providing tailored branding and signage solutions for small to medium enterprises in the heart of Ajman.', query: 'Ajman+Industrial+Area', img: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&q=80' },
                        { loc: 'Ras Al Khaimah', sub: 'Industrial Core', desc: 'Supporting the growing industrial and retail sectors with durable, high-impact outdoor branding solutions.', query: 'Ras+Al+Khaimah+Industrial+Area', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80' },
                        { loc: 'Fujairah', sub: 'East Coast Outreach', desc: 'Extending our premium branding services to the Fujairah business community and maritime industries.', query: 'Fujairah+Port', img: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80' }
                    ].map((item, i) => (
                        <motion.div key={i} variants={dropIn} className="glass-card" style={{ padding: '0', textAlign: 'left', borderRadius: '28px', position: 'relative', overflow: 'hidden', border: '1px solid var(--color-card-border)' }}>
                            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                                <img src={item.img} alt={item.loc} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)' }} />
                            </div>
                            <div style={{ padding: '2rem', position: 'relative', zIndex: 2 }}>
                                <h4 style={{ fontFamily: 'var(--font-contact)', fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>{item.loc}</h4>
                                <p style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>{item.sub}</p>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{item.desc}</p>
                                <button
                                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${item.query}`, '_blank')}
                                    style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '12px', color: 'white', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.3s', fontWeight: 600, boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)' }}
                                    onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                    onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    OPEN MAP <ExternalLink size={14} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </>
    );
}
