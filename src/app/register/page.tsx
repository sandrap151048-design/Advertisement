"use client";

import { motion, Variants } from 'framer-motion';
import { UserPlus, Mail, Phone, User, ArrowRight, CheckCircle, Briefcase, Clock, MessageSquare } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
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
    border: '2px solid var(--color-card-border)',
    padding: '1.2rem',
    paddingLeft: '3.5rem',
    borderRadius: '12px',
    color: 'var(--color-text-main)' as const,
    width: '100%',
    outline: 'none',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    transition: 'all 0.3s'
};

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        phone: '', 
        company: '',
        campaignType: '',
        timeline: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string } | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        // Simulate registration (you can add actual API call here)
        setTimeout(() => {
            setSubmitStatus({ success: true, message: 'Registration Successful!' });
            setTimeout(() => {
                router.push('/');
            }, 2000);
        }, 1000);
    };

    return (
        <>
            {/* Hero Section */}
            <section className="hero-section container" style={{ minHeight: '40vh', paddingTop: '8rem', paddingBottom: '3rem' }}>
                <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ textAlign: 'center', zIndex: 10 }}>
                    <motion.div variants={fadeInDown} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', background: 'rgba(124, 58, 237, 0.1)', padding: '0.6rem 1.5rem', borderRadius: '50px', border: '1px solid rgba(124, 58, 237, 0.2)' }}>
                        <UserPlus size={18} color="var(--color-primary)" />
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-primary)' }}>NEW USER REGISTRATION</span>
                    </motion.div>

                    <motion.h1 variants={bounceInDown} className="hero-title" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", textTransform: 'uppercase', lineHeight: '1', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                        JOIN <span style={{ color: 'var(--color-primary)' }}>ONE CLICK</span>
                    </motion.h1>
                    <motion.p variants={fadeInDown} style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', fontFamily: "'Manrope', sans-serif" }}>
                        Register now to get started with our premium advertising services
                    </motion.p>
                </motion.div>
            </section>

            {/* Registration Form */}
            <section className="section container" style={{ paddingTop: '2rem', paddingBottom: '8rem' }}>
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="glass-card" 
                    style={{ 
                        maxWidth: '600px', 
                        margin: '0 auto', 
                        padding: '3rem', 
                        borderRadius: '32px', 
                        border: '1px solid var(--color-card-border)', 
                        background: 'rgba(255, 255, 255, 0.98)', 
                        position: 'relative', 
                        overflow: 'hidden', 
                        boxShadow: '0 20px 50px rgba(124, 58, 237, 0.15)' 
                    }}
                >
                    {/* Background Decoration */}
                    <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
                    
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}>
                            Start Your <span className="text-gradient">Campaign</span>
                        </h2>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem', fontSize: '1rem' }}>
                            Tell us about your advertising needs
                        </p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {submitStatus && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{ 
                                        padding: '1rem', 
                                        borderRadius: '12px', 
                                        background: submitStatus.success ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
                                        color: submitStatus.success ? '#22c55e' : '#ef4444', 
                                        border: `2px solid ${submitStatus.success ? '#22c55e' : '#ef4444'}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontWeight: 600
                                    }}
                                >
                                    {submitStatus.success && <CheckCircle size={20} />}
                                    {submitStatus.message}
                                </motion.div>
                            )}

                            {/* Full Name */}
                            <div style={{ position: 'relative' }}>
                                <User size={20} color="var(--color-primary)" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }} />
                                <input 
                                    type="text"
                                    placeholder="Full Name" 
                                    style={inputStyle} 
                                    value={formData.name} 
                                    onChange={e => setFormData({ ...formData, name: e.target.value })} 
                                    required 
                                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--color-card-border)'}
                                />
                            </div>

                            {/* Email */}
                            <div style={{ position: 'relative' }}>
                                <Mail size={20} color="var(--color-primary)" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }} />
                                <input 
                                    type="email"
                                    placeholder="Email Address" 
                                    style={inputStyle} 
                                    value={formData.email} 
                                    onChange={e => setFormData({ ...formData, email: e.target.value })} 
                                    required 
                                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--color-card-border)'}
                                />
                            </div>

                            {/* Phone */}
                            <div style={{ position: 'relative' }}>
                                <Phone size={20} color="var(--color-primary)" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }} />
                                <input 
                                    type="tel"
                                    placeholder="Phone Number" 
                                    style={inputStyle} 
                                    value={formData.phone} 
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })} 
                                    required 
                                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--color-card-border)'}
                                />
                            </div>

                            {/* Company (Optional) */}
                            <div style={{ position: 'relative' }}>
                                <Briefcase size={20} color="var(--color-primary)" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }} />
                                <input 
                                    type="text"
                                    placeholder="Company Name (Optional)" 
                                    style={inputStyle} 
                                    value={formData.company} 
                                    onChange={e => setFormData({ ...formData, company: e.target.value })} 
                                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--color-card-border)'}
                                />
                            </div>

                            {/* Campaign Type */}
                            <div style={{ position: 'relative' }}>
                                <UserPlus size={20} color="var(--color-primary)" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }} />
                                <select 
                                    style={{...inputStyle, appearance: 'none', cursor: 'pointer'}} 
                                    value={formData.campaignType} 
                                    onChange={e => setFormData({ ...formData, campaignType: e.target.value })} 
                                    required
                                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--color-card-border)'}
                                >
                                    <option value="">Select Campaign Type *</option>
                                    <option value="outdoor-signage">Outdoor Signage</option>
                                    <option value="vehicle-branding">Vehicle Branding</option>
                                    <option value="digital-displays">Digital Displays</option>
                                    <option value="building-facade">Building Facade</option>
                                    <option value="event-branding">Event Branding</option>
                                    <option value="retail-graphics">Retail Graphics</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {/* Project Timeline */}
                            <div style={{ position: 'relative' }}>
                                <Clock size={20} color="var(--color-primary)" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }} />
                                <select 
                                    style={{...inputStyle, appearance: 'none', cursor: 'pointer'}} 
                                    value={formData.timeline} 
                                    onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--color-card-border)'}
                                >
                                    <option value="">Project Timeline (Optional)</option>
                                    <option value="urgent">Urgent (Within 1 week)</option>
                                    <option value="2-4-weeks">2-4 weeks</option>
                                    <option value="1-3-months">1-3 months</option>
                                    <option value="flexible">Flexible</option>
                                </select>
                            </div>

                            {/* Brief Message */}
                            <div style={{ position: 'relative' }}>
                                <MessageSquare size={20} color="var(--color-primary)" style={{ position: 'absolute', left: '1.2rem', top: '1.2rem', zIndex: 2 }} />
                                <textarea 
                                    placeholder="Tell us about your campaign goals (Optional)" 
                                    style={{
                                        ...inputStyle,
                                        minHeight: '120px',
                                        resize: 'vertical',
                                        paddingTop: '1.2rem'
                                    }} 
                                    value={formData.message} 
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--color-card-border)'}
                                />
                            </div>

                            {/* Submit Button */}
                            <motion.button 
                                type="submit" 
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn btn-primary" 
                                style={{ 
                                    padding: '1.3rem', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    gap: '1rem', 
                                    fontSize: '1.1rem', 
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    marginTop: '1rem'
                                }}
                            >
                                {isSubmitting ? 'Submitting...' : (
                                    <>
                                        Start Campaign
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </section>
        </>
    );
}
