"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check } from 'lucide-react';
import './PremiumScratchCard.css';

interface PremiumScratchCardProps {
    onClaim?: () => void;
    onClose?: () => void;
}

const AD_OFFERS = [
    { title: "ZERO", ribbon: "Creative Design Fees", sub: "For your first 3 months" },
    { title: "OFFER", ribbon: "Branding Package", sub: "Full corporate identity design" },
    { title: "OFFER", ribbon: "Advertisement Design", sub: "Professional billboard design" },
    { title: "OFFER", ribbon: "Expert Consultation", sub: "One-on-one strategy session" },
    { title: "OFFER", ribbon: "Social Media Promotion", sub: "One week of targeted social ads" },
];

export default function PremiumScratchCard({ onClaim, onClose }: PremiumScratchCardProps) {
    const [phase, setPhase] = useState<'shuffling' | 'teaser' | 'scratching' | 'revealed' | 'form'>('shuffling');
    const [currentOffer, setCurrentOffer] = useState(AD_OFFERS[0]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', businessName: '' });
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDrawing = useRef(false);

    useEffect(() => {
        // Fetch dynamic offers from Admin Dashboard
        const fetchOffers = async () => {
            try {
                const res = await fetch('/api/offer-settings');
                const data = await res.json();
                if (data.success && data.offers && data.offers.length > 0) {
                    const formattedOffers = data.offers.map((o: any) => ({
                        title: o.discount || 'WIN',
                        ribbon: o.title,
                        sub: o.description
                    }));
                    
                    // Pick random offer from fetched list
                    const randomOffer = formattedOffers[Math.floor(Math.random() * formattedOffers.length)];
                    setCurrentOffer(randomOffer);
                }
            } catch (err) {
                console.error("Failed to fetch dynamic offers:", err);
            }
        };

        fetchOffers();

        // Shuffle for 1.2 seconds then show teaser
        const timer = setTimeout(() => {
            setPhase('teaser');
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (phase === 'scratching') {
            const timer = setTimeout(initCanvas, 100);
            return () => clearTimeout(timer);
        }
    }, [phase]);

    const initCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        canvas.width = 320;
        canvas.height = 320;

        // IMMEDIATELY Fill with solid color so prize isn't visible while loading
        ctx.fillStyle = '#A0A0A0';
        ctx.fillRect(0, 0, 320, 320);

        // Load and draw the custom scratch surface image
        const img = new Image();
        img.src = '/scratch-surface.png';
        img.onload = () => {
            ctx.drawImage(img, 0, 0, 320, 320);
            
            // Add a subtle overlay text to guide
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.font = '900 24px Montserrat';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('SCRATCH HERE', 160, 160);
        };
    };

    const handleScratch = (clientX: number, clientY: number) => {
        if (phase !== 'scratching') return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 60;
        ctx.beginPath();
        ctx.arc(x, y, 35, 0, Math.PI * 2);
        ctx.fill();

        if (Math.random() > 0.9) checkPercent();
    };

    const checkPercent = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparent = 0;
        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] === 0) transparent++;
        }

        const percent = (transparent / (pixels.length / 4)) * 100;
        if (percent > 45) {
            setPhase('revealed');
            setTimeout(() => setPhase('form'), 3000);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const res = await fetch('/api/offer-leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    offerWon: `${currentOffer.title} - ${currentOffer.ribbon}`
                })
            });

            if (res.ok) {
                setIsSubmitted(true);
                onClaim?.();
            } else {
                alert("Submission failed. Please try again.");
            }
        } catch (err) {
            alert("Network error. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="psc-overlay">
            <motion.div 
                className="psc-container"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 20 }}
            >
                {/* Blurred Advertisement Background */}
                <div className="psc-modal-bg" />
                <div className="psc-modal-overlay" />
                <div className="psc-sunburst" />
                
                {/* Header */}
                <header className="psc-header">
                    {(phase !== 'scratching' && phase !== 'form') && <h2 className="psc-title">THE BEST OFFER!</h2>}
                    <button className="psc-close" onClick={onClose} aria-label="Close">
                        <X size={20} />
                    </button>
                </header>

                <main className="psc-content">
                    <AnimatePresence mode="wait">
                        {/* Phase 0: Shuffling Animation */}
                        {phase === 'shuffling' && (
                            <motion.div 
                                key="shuffling"
                                className="psc-shuffling-wrap"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ position: 'relative', height: '240px', width: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        style={{
                                            position: 'absolute',
                                            width: '160px',
                                            height: '220px',
                                            background: '#1a1a1a',
                                            border: '2px solid #D4AF37',
                                            borderRadius: '16px',
                                            zIndex: 5 - i,
                                            boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        animate={{
                                            x: [0, (i % 2 === 0 ? 30 : -30), 0],
                                            y: [0, (i % 2 === 0 ? -10 : 10), 0],
                                            rotate: [0, (i % 2 === 0 ? 10 : -10), 0],
                                            scale: [1, 1.05, 1],
                                            z: [0, 50, 0]
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            repeat: 3,
                                            delay: i * 0.05,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <div style={{ color: '#D4AF37', fontSize: '40px', fontWeight: 950 }}>?</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {/* Phase 1: Teaser */}
                        {phase === 'teaser' && (
                            <motion.div 
                                key="teaser"
                                className="psc-form-wrap"
                                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: 'spring', damping: 15 }}
                            >
                                <div className="psc-big-text">{currentOffer.title}</div>
                                <div className="psc-ribbon-wrap">
                                    <div className="psc-ribbon">{currentOffer.ribbon}</div>
                                    <div className="psc-badge">Limited Time Offer</div>
                                </div>
                                <p className="psc-small-desc">{currentOffer.sub}</p>
                                <button className="psc-btn-teal" onClick={() => setPhase('scratching')}>
                                    UNLOCK OFFER
                                    <div className="psc-shine" />
                                </button>
                            </motion.div>
                        )}

                        {/* Phase 2: Mystery Scratch Reveal */}
                        {phase === 'scratching' && (
                            <motion.div 
                                key="scratch-reveal"
                                className="psc-form-wrap"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="psc-scratch-box" style={{ width: '320px', height: '320px', position: 'relative', background: '#000', borderRadius: '24px', overflow: 'hidden' }}>
                                    {/* The Underneath (Prize View) */}
                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <div style={{ 
                                            position: 'absolute', 
                                            inset: 0, 
                                            backgroundImage: "url('/cta-campaign-bg.png')",
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            filter: 'blur(4px) brightness(0.6)',
                                        }} />
                                        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '20px' }}>
                                            {/* Removed 'OFFER' text as requested */}
                                            <div className="psc-ribbon" style={{ fontSize: '18px', padding: '10px 30px' }}>{currentOffer.ribbon}</div>
                                            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginTop: '10px', fontWeight: 'bold' }}>EXPIRED SOON!</div>
                                        </div>
                                    </div>

                                    {/* The Scratch Layer */}
                                    <canvas 
                                        ref={canvasRef}
                                        width={320}
                                        height={320}
                                        className="psc-canvas"
                                        style={{ position: 'absolute', inset: 0, zIndex: 10, cursor: 'crosshair', touchAction: 'none' }}
                                        onMouseDown={() => (isDrawing.current = true)}
                                        onMouseUp={() => { isDrawing.current = false; checkPercent(); }}
                                        onMouseMove={(e) => isDrawing.current && handleScratch(e.clientX, e.clientY)}
                                        onTouchStart={(e) => { isDrawing.current = true; handleScratch(e.touches[0].clientX, e.touches[0].clientY); }}
                                        onTouchEnd={() => { isDrawing.current = false; checkPercent(); }}
                                        onTouchMove={(e) => isDrawing.current && handleScratch(e.touches[0].clientX, e.touches[0].clientY)}
                                    />
                                </div>

                                <motion.div 
                                    className="psc-scratch-instr"
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    style={{ 
                                        marginTop: '25px',
                                        color: '#fff', 
                                        fontSize: '18px', 
                                        fontWeight: '950',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        textAlign: 'center',
                                        textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                                    }}
                                >
                                    SCRATCH TO REVEAL YOUR OFFER
                                </motion.div>
                            </motion.div>
                        )}

                        {/* Phase 3: Revealed Celebration */}
                        {phase === 'revealed' && (
                            <motion.div 
                                key="revealed"
                                className="psc-form-wrap"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <Sparkles color="#e61e25" size={48} style={{ marginBottom: '10px' }} />
                                <div className="psc-big-text" style={{ fontSize: '64px', textShadow: '0 0 20px #e61e25', marginBottom: '15px' }}>YOU WON!</div>
                                <div className="psc-ribbon">{currentOffer.ribbon}</div>
                            </motion.div>
                        )}

                        {/* Phase 4: Lead Form */}
                        {phase === 'form' && (
                            <motion.div 
                                key="form"
                                className="psc-form-wrap"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {isSubmitted ? (
                                    <motion.div 
                                        className="psc-success-view"
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                    >
                                        <div className="psc-success-ring">
                                            <Check size={48} color="#33C6B9" />
                                        </div>
                                        <h2 className="psc-big-text" style={{ fontSize: '36px', marginBottom: '10px' }}>THANK YOU!</h2>
                                        <h3 className="psc-form-title" style={{ color: '#fff', fontSize: '20px' }}>Successfully Submitted</h3>
                                        <p className="psc-form-sub" style={{ fontSize: '15px', maxWidth: '280px', margin: '0 auto 30px', color: 'rgba(255,255,255,0.6)' }}>
                                            Your offer has been reserved. Our campaign manager will reach out to you within the hour.
                                        </p>
                                        <button className="psc-btn-teal" onClick={onClose}>CLOSE</button>
                                    </motion.div>
                                ) : (
                                    <>
                                        <h3 className="psc-form-title">Claim Your Special Offer</h3>
                                        <p className="psc-form-sub">Fill your details to secure this limited offer</p>
                                        <form className="psc-fields" onSubmit={handleSubmit}>
                                            <input 
                                                className="psc-input" 
                                                type="text" 
                                                placeholder="Full Name" 
                                                required 
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            />
                                            <input 
                                                className="psc-input" 
                                                type="email" 
                                                placeholder="Email Address" 
                                                required 
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            />
                                            <input 
                                                className="psc-input" 
                                                type="tel" 
                                                placeholder="Phone Number" 
                                                required 
                                                value={formData.phone}
                                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            />
                                            <input 
                                                className="psc-input" 
                                                type="text" 
                                                placeholder="Business Name" 
                                                required 
                                                value={formData.businessName}
                                                onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                                            />
                                            <button type="submit" className="psc-btn-submit" disabled={isSubmitting}>
                                                {isSubmitting ? 'Securing...' : 'Secure My Offer'}
                                                <div className="psc-shine" />
                                            </button>
                                        </form>
                                    </>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </motion.div>
        </div>
    );
}
