"use client";

import { motion, Variants } from 'framer-motion';
import { Target, ShieldCheck, MapPin, Globe, Building2, Landmark, Factory, Wrench, Mountain, Anchor } from 'lucide-react';
import Image from 'next/image';

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
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 18, stiffness: 90 } }
};

const revealDown: Variants = {
    hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
    visible: { opacity: 1, clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.9 } }
};

const bounceInDown: Variants = {
    hidden: { opacity: 0, y: -200 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 10, stiffness: 80 } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18 } }
};

export default function AboutPage() {
    return (
        <>
            {/* Hero Banner with Images */}
            <section className="hero-section container" style={{ minHeight: '50vh', paddingTop: '8rem', paddingBottom: '4rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                    {/* Left Side - Text Content */}
                    <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ zIndex: 10 }}>
                        <motion.p variants={fadeInDown} style={{ color: 'var(--color-primary)', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'var(--font-navbar)' }}>
                            WHO WE ARE
                        </motion.p>
                        <motion.h1 variants={bounceInDown} className="hero-title" style={{ fontFamily: 'var(--font-about)', textTransform: 'uppercase', lineHeight: '0.95', fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
                            ABOUT <span style={{ color: 'var(--color-primary)' }}>ONE CLICK</span><br />ADVERTISEMENT
                        </motion.h1>
                        <motion.p variants={slideDown} className="hero-description" style={{ color: 'var(--color-text-muted)', fontSize: '1rem', maxWidth: '600px', fontFamily: 'var(--font-body)' }}>
                            UAE-based advertising and branding solutions company delivering high-quality visual communication services across the Emirates.
                        </motion.p>
                    </motion.div>

                    {/* Right Side - Image Grid */}
                    <motion.div 
                        initial="hidden" 
                        animate="visible" 
                        variants={staggerContainer}
                        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', height: '500px' }}
                    >
                        {/* Large Image - Left */}
                        <motion.div 
                            variants={fadeInDown}
                            style={{ 
                                gridRow: '1 / 3',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                border: '4px solid white',
                                boxShadow: '0 10px 40px rgba(124, 58, 237, 0.2)',
                                position: 'relative'
                            }}
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80"
                                alt="Outdoor Advertising Billboard"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </motion.div>

                        {/* Top Right Image */}
                        <motion.div 
                            variants={fadeInDown}
                            style={{ 
                                borderRadius: '24px',
                                overflow: 'hidden',
                                border: '4px solid white',
                                boxShadow: '0 10px 40px rgba(124, 58, 237, 0.2)'
                            }}
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80"
                                alt="Creative Team Meeting"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </motion.div>

                        {/* Bottom Right Image */}
                        <motion.div 
                            variants={fadeInDown}
                            style={{ 
                                borderRadius: '24px',
                                overflow: 'hidden',
                                border: '4px solid white',
                                boxShadow: '0 10px 40px rgba(124, 58, 237, 0.2)'
                            }}
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80"
                                alt="Brand Strategy Planning"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* AI Ad Image Banner */}
            <motion.section
                className="container"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealDown}
                style={{ marginBottom: '4rem' }}
            >
                <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--color-card-border)', position: 'relative', height: '320px' }}>
                    <img 
                        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80" 
                        alt="Professional Team Collaboration" 
                        style={{ 
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover', 
                            opacity: 0.25, 
                            filter: 'grayscale(0.3) brightness(1.1) contrast(1.1)' 
                        }} 
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(248, 250, 252, 0.95) 40%, rgba(248, 250, 252, 0.2))', display: 'flex', alignItems: 'center', padding: '3rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem', color: 'var(--color-primary)' }}>Elite Visual Architecture</h2>
                            <p style={{ color: 'var(--color-text-muted)', maxWidth: '400px', lineHeight: '1.8', fontSize: '1.1rem' }}>
                                Delivering world-class branding experiences that transform ordinary spaces into extraordinary digital landmarks.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Company Story */}
            <section id="story" className="section container">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInDown}>
                    <h2 className="section-title">Our <span className="text-gradient">Story</span></h2>
                    <p className="section-subtitle">Built on quality, trust, and creative excellence in the UAE market.</p>
                </motion.div>

                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                    className="grid-2" style={{ marginTop: '3rem' }}
                >
                    <motion.div variants={dropIn} className="glass-card" style={{ position: 'relative', overflow: 'hidden' }}>
                        <img src="/images/ad_facade.svg" alt="Facade" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12, pointerEvents: 'none' }} />
                        <div style={{ position: 'relative', zIndex: 2 }}>
                            <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>Who We Are</h3>
                            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
                                We are a UAE-based advertising and branding solutions company delivering high-quality visual communication services to businesses across Dubai, Abu Dhabi, Sharjah, Ajman, and the Northern Emirates.
                            </p>
                            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', marginTop: '1rem' }}>
                                We specialize in premium signage production, branding, digital printed graphics, facade cladding, and vehicle graphics, helping brands achieve strong visibility in highly competitive environments.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div variants={slideDown} className="glass-card" style={{ position: 'relative', overflow: 'hidden' }}>
                        <img src="/images/ad_pattern_1.svg" alt="Pattern" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12, pointerEvents: 'none' }} />
                        <div style={{ position: 'relative', zIndex: 2 }}>
                            <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>Our Commitment</h3>
                            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
                                With a commitment to international standards and local market compliance, we provide complete turnkey solutions — from design and production to installation and maintenance.
                            </p>
                            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', marginTop: '1rem' }}>
                                We are committed to delivering professional workmanship, premium finishing, and long-lasting solutions that withstand UAE's demanding climate.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Vision & Mission */}
            <section id="vision" className="section container">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideDown}>
                    <h2 className="section-title" style={{ fontFamily: 'var(--font-about)' }}>Vision & <span className="text-gradient">Mission</span></h2>
                </motion.div>
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                    className="grid-2" style={{ marginTop: '3rem' }}
                >
                    <motion.div variants={dropIn} className="glass-card" style={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '32px',
                        padding: '3rem',
                        border: '1px solid rgba(79, 70, 229, 0.1)',
                        background: 'white'
                    }}>
                        <img 
                            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80" 
                            alt="Digital Technology" 
                            style={{ 
                                position: 'absolute', 
                                top: 0, 
                                left: 0, 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover', 
                                opacity: 0.08, 
                                pointerEvents: 'none', 
                                filter: 'brightness(1.2)' 
                            }} 
                        />
                        <div style={{ position: 'relative', zIndex: 2 }}>
                            <div style={{ width: 64, height: 64, borderRadius: '16px', background: 'linear-gradient(45deg, var(--color-primary), var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: '0 10px 30px rgba(79, 70, 229, 0.2)' }}>
                                <Target size={32} color="white" />
                            </div>
                            <h3 style={{ fontSize: '2.2rem', marginBottom: '1.5rem', fontFamily: 'var(--font-about)', fontWeight: 700, color: 'var(--color-text-main)' }}>Our Vision</h3>
                            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                                To be recognized as the leading AI-driven branding partner in the UAE, delivering world-class visual solutions that redefine the advertising landscape.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div variants={bounceInDown} className="glass-card" style={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '32px',
                        padding: '3rem',
                        border: '1px solid rgba(6, 182, 212, 0.1)',
                        background: 'white'
                    }}>
                        <img 
                            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" 
                            alt="Technology Innovation" 
                            style={{ 
                                position: 'absolute', 
                                top: 0, 
                                left: 0, 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover', 
                                opacity: 0.08, 
                                pointerEvents: 'none', 
                                filter: 'brightness(1.2)' 
                            }} 
                        />
                        <div style={{ position: 'relative', zIndex: 2 }}>
                            <div style={{ width: 64, height: 64, borderRadius: '16px', background: 'linear-gradient(45deg, var(--color-secondary), var(--color-primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', boxShadow: '0 10px 30px rgba(6, 182, 212, 0.2)' }}>
                                <ShieldCheck size={32} color="white" />
                            </div>
                            <h3 style={{ fontSize: '2.2rem', marginBottom: '1.5rem', fontFamily: 'var(--font-about)', fontWeight: 700, color: 'var(--color-text-main)' }}>Our Mission</h3>
                            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                                To deliver creative, compliant, and high-quality advertising solutions that meet UAE authority requirements while exceeding client expectations in terms of durability, safety, and visual impact.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Core Values Section - More UI */}
            <section className="section container">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInDown} style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="section-title" style={{ fontFamily: 'var(--font-about)' }}>Core <span className="text-gradient">Values</span></h2>
                    <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>The principles that drive our excellence every day.</p>
                </motion.div>

                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                    className="grid-3"
                >
                    {[
                        { title: "Innovation", desc: "Pushing boundaries with AI-driven design and modern materials." },
                        { title: "Quality", desc: "Uncompromising standards in production and final finishing." },
                        { title: "Compliance", desc: "Full adherence to UAE municipal and authority standards." }
                    ].map((value, i) => (
                        <motion.div key={i} variants={dropIn} className="glass-card" style={{ padding: '2.5rem', textAlign: 'center', borderRadius: '24px' }}>
                            <div style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', fontSize: '2.5rem', fontWeight: 900 }}>0{i + 1}</div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-about)' }}>{value.title}</h3>
                            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{value.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* UAE Coverage Section */}
            <section className="section container" style={{ paddingBottom: '8rem' }}>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInDown}>
                    <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                        Nationwide <span className="text-gradient">Presence</span>
                    </h2>
                    <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', maxWidth: '700px', margin: '0 auto 4rem auto', fontSize: '1.1rem' }}>
                        With strategic operations across all seven emirates, we deliver consistent quality and rapid response times throughout the UAE.
                    </p>
                </motion.div>

                <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }} 
                    variants={staggerContainer}
                    className="grid-3"
                    style={{ gap: '2rem' }}
                >
                    {[
                        { 
                            city: 'Dubai', 
                            subtitle: 'Headquarters & Main Hub',
                            services: ['Full Production Facility', '24/7 Emergency Service', 'Design Studio', 'Installation Teams'],
                            icon: Building2
                        },
                        { 
                            city: 'Abu Dhabi', 
                            subtitle: 'Capital Operations',
                            services: ['Government Projects', 'Corporate Branding', 'Large-Scale Installations', 'Maintenance Services'],
                            icon: Landmark
                        },
                        { 
                            city: 'Sharjah', 
                            subtitle: 'Northern Hub',
                            services: ['Industrial Signage', 'Retail Solutions', 'Vehicle Graphics', 'Digital Printing'],
                            icon: Factory
                        },
                        { 
                            city: 'Ajman', 
                            subtitle: 'Local Support Center',
                            services: ['Quick Response Team', 'Small Business Solutions', 'Maintenance & Repairs', 'Consultation Services'],
                            icon: Wrench
                        },
                        { 
                            city: 'Ras Al Khaimah', 
                            subtitle: 'Northern Emirates',
                            services: ['Tourism Sector Signage', 'Hospitality Branding', 'Outdoor Advertising', 'Custom Solutions'],
                            icon: Mountain
                        },
                        { 
                            city: 'Fujairah', 
                            subtitle: 'East Coast Operations',
                            services: ['Port & Marine Signage', 'Industrial Projects', 'Safety Signage', 'Directional Systems'],
                            icon: Anchor
                        }
                    ].map((location, i) => (
                        <motion.div 
                            key={i} 
                            variants={dropIn}
                            className="glass-card"
                            style={{
                                padding: '2.5rem',
                                borderRadius: '24px',
                                position: 'relative',
                                overflow: 'hidden',
                                border: '1px solid rgba(124, 58, 237, 0.15)',
                                background: 'white',
                                transition: 'all 0.3s ease'
                            }}
                            whileHover={{ 
                                y: -8, 
                                boxShadow: '0 20px 40px rgba(124, 58, 237, 0.15)',
                                borderColor: 'var(--color-primary)'
                            }}
                        >
                            <img src="/images/ad_pattern_1.svg" alt="Pattern" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.03, pointerEvents: 'none' }} />
                            
                            <div style={{ position: 'relative', zIndex: 2 }}>
                                {/* Icon & Location */}
                                <div style={{ 
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '20px',
                                    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(167, 139, 250, 0.1))',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1.5rem auto',
                                    border: '2px solid rgba(124, 58, 237, 0.2)',
                                    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.1)'
                                }}>
                                    <location.icon size={40} color="var(--color-primary)" strokeWidth={1.5} />
                                </div>
                                
                                <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '0.5rem',
                                    justifyContent: 'center',
                                    marginBottom: '0.5rem'
                                }}>
                                    <MapPin size={20} color="var(--color-primary)" />
                                    <h3 style={{ 
                                        fontSize: '1.8rem', 
                                        fontWeight: 800,
                                        color: 'var(--color-text-main)',
                                        fontFamily: 'var(--font-heading)'
                                    }}>
                                        {location.city}
                                    </h3>
                                </div>
                                
                                <p style={{ 
                                    color: 'var(--color-primary)', 
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    textAlign: 'center',
                                    marginBottom: '1.5rem'
                                }}>
                                    {location.subtitle}
                                </p>

                                {/* Services List */}
                                <div style={{ 
                                    background: 'rgba(124, 58, 237, 0.03)',
                                    borderRadius: '12px',
                                    padding: '1.2rem',
                                    border: '1px solid rgba(124, 58, 237, 0.1)'
                                }}>
                                    <ul style={{ 
                                        listStyle: 'none', 
                                        padding: 0, 
                                        margin: 0,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.6rem'
                                    }}>
                                        {location.services.map((service, idx) => (
                                            <li key={idx} style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: '0.6rem',
                                                color: 'var(--color-text-muted)',
                                                fontSize: '0.9rem'
                                            }}>
                                                <span style={{ 
                                                    width: '6px', 
                                                    height: '6px', 
                                                    borderRadius: '50%', 
                                                    background: 'var(--color-primary)',
                                                    flexShrink: 0
                                                }}></span>
                                                {service}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Why Choose Our Coverage */}
                <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }} 
                    variants={fadeInDown}
                    className="glass-card"
                    style={{
                        marginTop: '4rem',
                        padding: '3rem',
                        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.05), rgba(167, 139, 250, 0.05))',
                        border: '1px solid rgba(124, 58, 237, 0.2)',
                        borderRadius: '24px'
                    }}
                >
                    <h3 style={{ 
                        textAlign: 'center', 
                        fontSize: '2rem', 
                        fontWeight: 800,
                        marginBottom: '3rem',
                        color: 'var(--color-text-main)',
                        fontFamily: 'var(--font-heading)'
                    }}>
                        Why Our <span className="text-gradient">Nationwide Network</span> Matters
                    </h3>
                    <div className="grid-4" style={{ gap: '2rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1rem auto',
                                boxShadow: '0 8px 20px rgba(124, 58, 237, 0.3)'
                            }}>
                                <Globe size={36} color="white" strokeWidth={2} />
                            </div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>Local Expertise</h4>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                Deep understanding of each emirate's regulations and requirements
                            </p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1rem auto',
                                boxShadow: '0 8px 20px rgba(124, 58, 237, 0.3)'
                            }}>
                                <ShieldCheck size={36} color="white" strokeWidth={2} />
                            </div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>Faster Response</h4>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                Quick deployment and emergency support across all locations
                            </p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1rem auto',
                                boxShadow: '0 8px 20px rgba(124, 58, 237, 0.3)'
                            }}>
                                <Target size={36} color="white" strokeWidth={2} />
                            </div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>Consistent Quality</h4>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                Same high standards maintained across all emirates
                            </p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1rem auto',
                                boxShadow: '0 8px 20px rgba(124, 58, 237, 0.3)'
                            }}>
                                <MapPin size={36} color="white" strokeWidth={2} />
                            </div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>Cost Efficiency</h4>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                Reduced logistics costs with local teams and resources
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>
        </>
    );
}
