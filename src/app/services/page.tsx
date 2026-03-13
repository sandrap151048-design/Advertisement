"use client";

import { motion, Variants } from 'framer-motion';
import { Edit3, Image as ImageIcon, Car, Layout, Store, Building2, Briefcase } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DynamicService {
    _id: string;
    name: string;
    description: string;
    category: string;
    items?: string[];
    createdAt: string;
}

const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};
const slideDown: Variants = {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};
const dropIn: Variants = {
    hidden: { opacity: 0, y: -400 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 20, stiffness: 120 } }
};
const revealDown: Variants = {
    hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
    visible: { opacity: 1, clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.5 } }
};
const bounceInDown: Variants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 15, stiffness: 100 } }
};
const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const services = [
    {
        icon: <Edit3 size={28} />,
        title: "Branding & Corporate Identity",
        desc: "Complete brand implementation and rollout across all touchpoints.",
        items: ["Brand implementation & rollout", "Corporate identity applications", "Office branding & interior graphics", "Brand consistency across locations"],
        img: "/images/ad_pattern_1.svg"
    },
    {
        icon: <ImageIcon size={28} />,
        title: "Digital Printed Graphics",
        desc: "Large format premium printing for every surface.",
        items: ["Large format digital printing", "Wall, glass & window graphics", "Frosted film & privacy films", "Floor & promotional graphics"],
        img: "/images/ai_ad_1.png"
    },
    {
        icon: <Car size={28} />,
        title: "Vehicle Graphics & Fleet Branding",
        desc: "Turn every vehicle into a moving advertisement.",
        items: ["Full & partial vehicle wraps", "Corporate fleet branding", "Reflective & safety graphics", "Promotional vehicle advertising"],
        img: "/images/ad_vehicle.svg"
    },
    {
        icon: <Layout size={28} />,
        title: "Signage Production",
        desc: "Premium indoor and outdoor signage solutions.",
        items: ["Indoor & outdoor signage", "Illuminated & non-illuminated signboards", "3D letter signs", "Directional, wayfinding & safety signs"],
        img: "/images/ad_facade.svg"
    },
    {
        icon: <Store size={28} />,
        title: "Exhibition & POS Solutions",
        desc: "Impactful exhibition displays and in-store materials.",
        items: ["Exhibition stands & kiosks", "Pop-up systems & backdrops", "Roll-up & X-banners", "POS & in-store displays"],
        img: "/images/ad_pattern_1.svg"
    },
    {
        icon: <Building2 size={28} />,
        title: "Cladding & Facade Solutions",
        desc: "Architectural cladding and facade branding solutions.",
        items: ["ACP cladding works", "Aluminum & composite panel cladding", "Shopfront & facade branding", "Signage-integrated facade solutions"],
        img: "/images/ad_facade.svg"
    }
];

export default function ServicesPage() {
    const [dynamicServices, setDynamicServices] = useState<DynamicService[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch('/api/services');
            const data = await response.json();
            setDynamicServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
        setIsLoading(false);
    };

    return (
        <>
            {/* Hero */}
            <section className="hero-section container" style={{ minHeight: '50vh', paddingTop: '8rem', paddingBottom: '4rem' }}>
                <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ zIndex: 10 }}>
                    <motion.p variants={fadeInDown} style={{ color: 'var(--color-primary)', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'var(--font-navbar)' }}>
                        WHAT WE OFFER
                    </motion.p>
                    <motion.h1 variants={bounceInDown} className="hero-title" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", textTransform: 'uppercase', lineHeight: '0.95', fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.01em' }}>
                        OUR <span style={{ color: 'var(--color-primary)' }}>CORE</span><br />SERVICES
                    </motion.h1>
                    <motion.p variants={slideDown} style={{ color: 'var(--color-text-muted)', fontSize: '1rem', maxWidth: '600px', marginBottom: '2.5rem', fontFamily: "'DM Sans', sans-serif" }}>
                        Delivering world-class visual solutions that enhance brand presence and support business growth across the UAE.
                    </motion.p>
                </motion.div>
            </section>

            {/* AI Ad Image Strip */}
            <motion.section className="container" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealDown} style={{ marginBottom: '1rem' }}>
                <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--color-card-border)', position: 'relative', height: '260px' }}>
                    <img 
                        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80" 
                        alt="Services Visual" 
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover' 
                        }} 
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,23,42,0.3) 0%, rgba(15,23,42,0.85) 100%)', display: 'flex', alignItems: 'flex-end', padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', color: 'white' }}>End-to-End Visual Communication Solutions</h2>
                    </div>
                </div>
            </motion.section>

            {/* Services Grid */}
            <section className="section container">
                <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true, margin: "-50px" }} 
                    variants={staggerContainer} 
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '2rem'
                    }}
                >
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            variants={i % 3 === 0 ? dropIn : i % 3 === 1 ? bounceInDown : slideDown}
                            className="glass-card"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: '24px',
                                padding: '2rem 1.8rem',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                background: '#000000',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                                minHeight: '420px'
                            }}
                            whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(124, 58, 237, 0.15)', borderColor: 'rgba(124, 58, 237, 0.3)' }}
                        >
                            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div style={{ width: 64, height: 64, borderRadius: '16px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'white', boxShadow: '0 8px 24px rgba(124, 58, 237, 0.25)' }}>
                                    {service.icon}
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)', fontWeight: 700, lineHeight: '1.3', color: '#ffffff', minHeight: '60px' }}>{service.title}</h3>
                                <p style={{ color: '#cccccc', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6', minHeight: '50px' }}>{service.desc}</p>
                                <ul style={{ color: '#ffffff', paddingLeft: '0', listStyleType: 'none', fontSize: '0.9rem', lineHeight: '1.8', flex: 1 }}>
                                    {service.items.map((item, id) => (
                                        <li key={id} style={{ marginBottom: '0.7rem', paddingLeft: '1.5rem', position: 'relative' }}>
                                            <span style={{ position: 'absolute', left: 0, color: 'var(--color-primary)', fontWeight: 'bold' }}>•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Process Section - More UI */}
            <section className="section container">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInDown} style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="section-title" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}>Our <span className="text-gradient">Process</span></h2>
                    <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto', fontFamily: "'Manrope', sans-serif" }}>From initial concept to final installation, we ensure perfection at every step.</p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
                    {[
                        { step: "01", title: "Consultation", desc: "Understanding your brand requirements and UAE compliance needs." },
                        { step: "02", title: "Design & Mockup", desc: "AI-assisted design visualizations and professional engineering." },
                        { step: "03", title: "Production", desc: "Precision manufacturing using premium materials and technology." },
                        { step: "04", title: "Installation", desc: "Expert on-site installation with safety and quality guarantee." }
                    ].map((p, i) => (
                        <motion.div
                            key={i}
                            variants={dropIn}
                            className="glass-card"
                            style={{ padding: '2rem', borderRadius: '20px', position: 'relative', display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '2rem', fontWeight: 900, opacity: 0.1 }}>{p.step}</div>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', fontFamily: 'var(--font-services)' }}>{p.title}</h3>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>{p.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Vehicle Ad Visual */}
            <motion.section className="container" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInDown} style={{ marginBottom: '4rem' }}>
                <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--color-card-border)', position: 'relative', height: '300px' }}>
                    <img src="/images/ad_vehicle.svg" alt="Vehicle Branding" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(124, 58, 237, 0.9) 35%, rgba(167, 139, 250, 0.3))', display: 'flex', alignItems: 'center', padding: '3rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', marginBottom: '0.8rem', color: 'white' }}>Fleet Branding</h2>
                            <p style={{ color: 'rgba(255, 255, 255, 0.95)', maxWidth: '380px', lineHeight: '1.8' }}>
                                Transform your vehicles into powerful mobile advertisements reaching thousands daily across the UAE.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Dynamic Services from Admin */}
            {!isLoading && dynamicServices.length > 0 && (
                <section className="section container">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInDown} style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 className="section-title" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}>Additional <span className="text-gradient">Services</span></h2>
                        <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto', fontFamily: "'Manrope', sans-serif" }}>Explore our extended range of specialized advertising solutions</p>
                    </motion.div>

                    <motion.div 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true, margin: "-50px" }} 
                        variants={staggerContainer} 
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '2rem'
                        }}
                    >
                        {dynamicServices.map((service, i) => (
                            <motion.div
                                key={service._id}
                                variants={i % 3 === 0 ? dropIn : i % 3 === 1 ? bounceInDown : slideDown}
                                className="glass-card"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    borderRadius: '32px',
                                    padding: '3rem 2.5rem',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    background: '#000000',
                                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                                    minHeight: '420px'
                                }}
                                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(124, 58, 237, 0.15)', borderColor: 'rgba(124, 58, 237, 0.3)' }}
                            >
                                <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <div style={{ width: 80, height: 80, borderRadius: '20px', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', color: 'white', boxShadow: '0 8px 24px rgba(124, 58, 237, 0.25)' }}>
                                        <Briefcase size={28} />
                                    </div>
                                    <h3 style={{ fontSize: '1.75rem', marginBottom: '1.2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, lineHeight: '1.3', color: '#ffffff', minHeight: '70px' }}>{service.name}</h3>
                                    <p style={{ color: '#cccccc', fontSize: '1rem', marginBottom: '2rem', lineHeight: '1.7', minHeight: '55px' }}>{service.description}</p>
                                    {service.items && service.items.length > 0 ? (
                                        <ul style={{ color: '#ffffff', paddingLeft: '0', listStyleType: 'none', fontSize: '0.95rem', lineHeight: '2', flex: 1 }}>
                                            {service.items.map((item, id) => (
                                                <li key={id} style={{ marginBottom: '0.8rem', paddingLeft: '1.5rem', position: 'relative' }}>
                                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-primary)', fontWeight: 'bold' }}>•</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div style={{ flex: 1 }} />
                                    )}
                                    <div style={{ 
                                        marginTop: 'auto',
                                        paddingTop: '1rem',
                                        borderTop: '1px solid rgba(124, 58, 237, 0.1)'
                                    }}>
                                        <span style={{ 
                                            background: 'rgba(124, 58, 237, 0.1)', 
                                            color: 'var(--color-primary)',
                                            padding: '0.4rem 1rem',
                                            borderRadius: '20px',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            textTransform: 'uppercase',
                                            display: 'inline-block'
                                        }}>
                                            {service.category}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>
            )}

            {/* Compliance CTA */}
            <section className="section container" style={{ paddingBottom: '8rem' }}>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealDown}>
                    <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem', borderColor: 'var(--color-secondary)', position: 'relative', overflow: 'hidden' }}>
                        <img 
                            src="https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&q=80" 
                            alt="Billboard Advertising" 
                            style={{ 
                                position: 'absolute', 
                                top: 0, 
                                left: 0, 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover', 
                                opacity: 0.15, 
                                pointerEvents: 'none',
                                filter: 'brightness(0.6) contrast(1.2)'
                            }} 
                        />
                        <h2 className="section-title text-gradient" style={{ fontSize: '2rem', position: 'relative', zIndex: 2, fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>UAE Authority Compliant</h2>
                        <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.8', position: 'relative', zIndex: 2, fontFamily: "'Space Grotesk', sans-serif" }}>
                            All our services are delivered in full compliance with UAE municipality, RTA, and mall management standards.
                        </p>
                    </div>
                </motion.div>
            </section>
        </>
    );
}
