"use client";

import { motion, Variants } from 'framer-motion';
import { Star, Quote, Award, Users, TrendingUp, CheckCircle, Building2, Sparkles, ShieldCheck, Clock, Headphones, DollarSign, BadgeCheck, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Testimonial {
    _id: string;
    name: string;
    company: string;
    role: string;
    message: string;
    rating: number;
    createdAt: string;
}

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchTestimonials();
    }, []);

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

    // Calculate average rating
    const averageRating = testimonials.length > 0 
        ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
        : '0.0';

    return (
        <>
            {/* Hero Section */}
            <section className="hero-section container" style={{ minHeight: '60vh', paddingTop: '10rem', paddingBottom: '5rem', position: 'relative', overflow: 'hidden' }}>
                {/* Background Image */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <img 
                        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&q=80"
                        alt="AI Advertising Background"
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover',
                            opacity: 0.15,
                            filter: 'brightness(0.8) contrast(1.2) grayscale(0.2)'
                        }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, var(--color-bg-start) 85%)' }} />
                </div>

                {/* Background Decoration */}
                <div style={{ position: 'absolute', top: '10%', right: '5%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124, 58, 237, 0.08), transparent)', filter: 'blur(60px)', zIndex: 1 }} />
                <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(167, 139, 250, 0.08), transparent)', filter: 'blur(60px)', zIndex: 1 }} />

                <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <motion.div variants={fadeInDown} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', background: 'rgba(124, 58, 237, 0.1)', padding: '0.6rem 1.5rem', borderRadius: '50px', border: '1px solid rgba(124, 58, 237, 0.2)' }}>
                        <Sparkles size={18} color="var(--color-primary)" />
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-primary)' }}>CLIENT TESTIMONIALS</span>
                    </motion.div>

                    <motion.h1 variants={fadeInUp} className="hero-title" style={{ fontFamily: "'Outfit', sans-serif", lineHeight: '1.1', fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
                        What Our <span className="text-gradient">Clients</span><br />Say About Us
                    </motion.h1>
                    
                    <motion.p variants={fadeInUp} style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto 3rem auto', fontFamily: "'Manrope', sans-serif" }}>
                        Trusted by leading brands across the UAE for exceptional quality, innovation, and service excellence.
                    </motion.p>

                    {/* Stats Row */}
                    <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>7</div>
                            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Emirates Coverage</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>15+</div>
                            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Industry Sectors</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>50+</div>
                            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Cities Served</div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Trust Indicators */}
            <section className="container" style={{ marginBottom: '5rem' }}>
                <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }} 
                    variants={staggerContainer}
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}
                >
                    {[
                        { icon: <Award size={32} />, title: 'Award Winning', desc: 'Recognized for excellence in outdoor advertising' },
                        { icon: <Users size={32} />, title: '150+ Brands', desc: 'Serving top companies across the UAE' },
                        { icon: <TrendingUp size={32} />, title: '2500+ Projects', desc: 'Successfully delivered with precision' },
                        { icon: <CheckCircle size={32} />, title: '48Hr Delivery', desc: 'Fast turnaround without compromising quality' }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            variants={scaleIn}
                            whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(124, 58, 237, 0.15)' }}
                            className="glass-card"
                            style={{
                                padding: '2rem',
                                textAlign: 'center',
                                borderRadius: '20px',
                                background: 'white',
                                border: '1px solid rgba(124, 58, 237, 0.1)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(167, 139, 250, 0.1))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem auto',
                                color: 'var(--color-primary)',
                                border: '2px solid rgba(124, 58, 237, 0.2)'
                            }}>
                                {item.icon}
                            </div>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>{item.title}</h3>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{item.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Testimonials Grid */}
            <section className="section container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
                <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }} 
                    variants={fadeInDown}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h2 className="section-title" style={{ marginBottom: '1rem', fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>
                        Client <span className="text-gradient">Success Stories</span>
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', fontFamily: "'Space Grotesk', sans-serif" }}>
                        Real feedback from real clients who have experienced our commitment to excellence
                    </p>
                </motion.div>

                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '4rem' }}>
                        <div style={{ 
                            width: '60px', 
                            height: '60px', 
                            border: '5px solid rgba(124, 58, 237, 0.2)',
                            borderTop: '5px solid var(--color-primary)',
                            borderRadius: '50%',
                            margin: '0 auto 1.5rem',
                            animation: 'spin 1s linear infinite'
                        }} />
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', fontWeight: 600 }}>Loading testimonials...</p>
                    </div>
                ) : testimonials.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card" 
                        style={{ 
                            padding: '5rem 2rem', 
                            textAlign: 'center',
                            maxWidth: '700px',
                            margin: '0 auto',
                            background: 'white'
                        }}
                    >
                        <Quote size={80} color="var(--color-primary)" style={{ margin: '0 auto 2rem', opacity: 0.2 }} />
                        <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-text-main)', fontWeight: 700 }}>No Testimonials Yet</h3>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                            We're collecting feedback from our valued clients. Check back soon to see what they have to say about our services.
                        </p>
                        <Link href="/contact" className="btn btn-primary">
                            Be Our First Reviewer
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true, margin: "-50px" }} 
                        variants={staggerContainer}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
                            gap: '2rem'
                        }}
                    >
                        {testimonials.map((testimonial, i) => (
                            <motion.div
                                key={testimonial._id}
                                variants={fadeInUp}
                                whileHover={{ y: -10, boxShadow: '0 25px 50px rgba(124, 58, 237, 0.15)' }}
                                className="glass-card"
                                style={{
                                    padding: '2.5rem',
                                    borderRadius: '24px',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    border: '1px solid rgba(124, 58, 237, 0.1)',
                                    background: 'white',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Quote Icon Background */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-30px',
                                    right: '-30px',
                                    width: '140px',
                                    height: '140px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.06), rgba(167, 139, 250, 0.06))',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Quote size={70} color="var(--color-primary)" style={{ opacity: 0.12 }} />
                                </div>

                                {/* Star Rating */}
                                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem', position: 'relative', zIndex: 2 }}>
                                    {[...Array(5)].map((_, starIndex) => (
                                        <motion.div
                                            key={starIndex}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: starIndex * 0.1 }}
                                        >
                                            <Star 
                                                size={24} 
                                                fill={starIndex < testimonial.rating ? 'var(--color-accent)' : 'none'}
                                                color={starIndex < testimonial.rating ? 'var(--color-accent)' : '#e2e8f0'}
                                                style={{ transition: 'all 0.3s' }}
                                            />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Testimonial Message */}
                                <p style={{ 
                                    color: 'var(--color-text-main)', 
                                    fontSize: '1.05rem', 
                                    lineHeight: '1.8', 
                                    flex: 1, 
                                    marginBottom: '2rem',
                                    fontStyle: 'italic',
                                    position: 'relative',
                                    zIndex: 2,
                                    fontWeight: 500
                                }}>
                                    "{testimonial.message}"
                                </p>

                                {/* Client Info */}
                                <div style={{ 
                                    paddingTop: '1.5rem', 
                                    borderTop: '2px solid rgba(124, 58, 237, 0.1)',
                                    position: 'relative',
                                    zIndex: 2
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontWeight: 800,
                                            fontSize: '1.2rem',
                                            flexShrink: 0
                                        }}>
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 style={{ 
                                                fontSize: '1.2rem', 
                                                marginBottom: '0.2rem', 
                                                color: 'var(--color-text-main)',
                                                fontWeight: 700
                                            }}>
                                                {testimonial.name}
                                            </h4>
                                            <p style={{ 
                                                color: 'var(--color-text-muted)', 
                                                fontSize: '0.9rem',
                                                lineHeight: '1.4'
                                            }}>
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(167, 139, 250, 0.1))',
                                        padding: '0.5rem 1.2rem',
                                        borderRadius: '25px',
                                        border: '1px solid rgba(124, 58, 237, 0.2)'
                                    }}>
                                        <Building2 size={16} color="var(--color-primary)" />
                                        <span style={{ 
                                            color: 'var(--color-primary)', 
                                            fontSize: '0.9rem',
                                            fontWeight: 700
                                        }}>
                                            {testimonial.company}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </section>

            {/* Why Clients Choose Us */}
            <section className="section container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInDown}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h2 className="section-title" style={{ marginBottom: '1rem', fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>
                        Why Clients <span className="text-gradient">Choose Us</span>
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', fontFamily: "'Space Grotesk', sans-serif" }}>
                        The key factors that make us the preferred choice for outdoor advertising in the UAE
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}
                >
                    {[
                        { 
                            title: 'Quality Assurance', 
                            desc: 'Premium materials and meticulous attention to detail in every project', 
                            icon: <ShieldCheck size={32} />,
                            color: '#7C3AED'
                        },
                        { 
                            title: 'Timely Delivery', 
                            desc: '48-hour turnaround time with guaranteed on-schedule completion', 
                            icon: <Clock size={32} />,
                            color: '#F59E0B'
                        },
                        { 
                            title: 'Expert Team', 
                            desc: 'Skilled professionals with years of experience in outdoor advertising', 
                            icon: <Award size={32} />,
                            color: '#10B981'
                        },
                        { 
                            title: 'Competitive Pricing', 
                            desc: 'Best value for money without compromising on quality', 
                            icon: <TrendingUp size={32} />,
                            color: '#3B82F6'
                        },
                        { 
                            title: 'Full Compliance', 
                            desc: 'All projects meet UAE regulations and municipality standards', 
                            icon: <CheckCircle size={32} />,
                            color: '#EF4444'
                        },
                        { 
                            title: '24/7 Support', 
                            desc: 'Round-the-clock customer service for all your needs', 
                            icon: <Headphones size={32} />,
                            color: '#8B5CF6'
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            variants={fadeInUp}
                            whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(124, 58, 237, 0.12)' }}
                            style={{
                                padding: '2.5rem',
                                borderRadius: '20px',
                                background: 'white',
                                border: '1px solid rgba(124, 58, 237, 0.1)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {/* Simple Icon Container */}
                            <div style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '16px',
                                background: `${item.color}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem',
                                color: item.color,
                                border: `2px solid ${item.color}30`
                            }}>
                                {item.icon}
                            </div>

                            <h3 style={{ 
                                fontSize: '1.4rem', 
                                fontWeight: 700, 
                                marginBottom: '0.8rem', 
                                color: 'var(--color-text-main)'
                            }}>
                                {item.title}
                            </h3>
                            <p style={{ 
                                color: 'var(--color-text-muted)', 
                                fontSize: '0.95rem', 
                                lineHeight: '1.7'
                            }}>
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* CTA Section */}
            <section className="section container" style={{ paddingBottom: '8rem' }}>
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass-card" 
                    style={{ 
                        textAlign: 'center', 
                        padding: '5rem 2rem', 
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                        border: 'none',
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '32px'
                    }}
                >
                    {/* Decorative Elements */}
                    <div style={{
                        position: 'absolute',
                        top: '-100px',
                        right: '-100px',
                        width: '350px',
                        height: '350px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        filter: 'blur(80px)'
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: '-100px',
                        left: '-100px',
                        width: '350px',
                        height: '350px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        filter: 'blur(80px)'
                    }} />
                    
                    <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 2rem auto',
                                border: '3px solid rgba(255,255,255,0.3)'
                            }}
                        >
                            <Sparkles size={40} color="white" />
                        </motion.div>

                        <h2 style={{ 
                            fontSize: 'clamp(2rem, 4vw, 3rem)', 
                            marginBottom: '1.5rem', 
                            color: 'white',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 800,
                            lineHeight: '1.2'
                        }}>
                            Ready to Join Our Happy Clients?
                        </h2>
                        <p style={{ 
                            color: 'rgba(255,255,255,0.95)', 
                            maxWidth: '650px', 
                            margin: '0 auto 3rem auto', 
                            lineHeight: '1.8',
                            fontSize: '1.15rem'
                        }}>
                            Experience the same quality and service that our clients rave about. Let's bring your vision to life with our expert team.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/contact" style={{ textDecoration: 'none' }}>
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(0,0,0,0.3)' }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        padding: '1.3rem 3.5rem',
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        borderRadius: '14px',
                                        border: 'none',
                                        background: 'white',
                                        color: 'var(--color-primary)',
                                        cursor: 'pointer',
                                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    Get Started Today
                                </motion.button>
                            </Link>
                            <Link href="/services" style={{ textDecoration: 'none' }}>
                                <motion.button
                                    whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.25)' }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        padding: '1.3rem 3.5rem',
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        borderRadius: '14px',
                                        border: '2px solid white',
                                        background: 'rgba(255,255,255,0.15)',
                                        color: 'white',
                                        cursor: 'pointer',
                                        backdropFilter: 'blur(10px)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    View Our Services
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

        </>
    );
}
