"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                localStorage.setItem('adminAuth', 'true');
                localStorage.setItem('adminUser', JSON.stringify(data.user));
                router.push('/admin');
            } else {
                setError(data.error || 'Invalid email or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Failed to connect to server');
        }
        
        setIsLoading(false);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: '#0f172a',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Left Side - Branding */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '4rem',
                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Animated background elements */}
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    animation: 'pulse 4s ease-in-out infinite'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '15%',
                    width: '250px',
                    height: '250px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(167, 139, 250, 0.12) 0%, transparent 70%)',
                    filter: 'blur(50px)',
                    animation: 'pulse 5s ease-in-out infinite reverse'
                }} />

                <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '500px' }}>
                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '24px',
                            background: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 2rem',
                            boxShadow: '0 20px 60px rgba(124, 58, 237, 0.4), 0 0 0 1px rgba(255,255,255,0.1)',
                            color: 'white',
                            fontWeight: 900,
                            fontSize: '2.5rem',
                            fontFamily: "'Outfit', sans-serif"
                        }}
                    >
                        OC
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        style={{ 
                            fontSize: '3.5rem', 
                            fontWeight: 800, 
                            marginBottom: '0.5rem',
                            background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontFamily: "'Syne', sans-serif",
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em'
                        }}
                    >
                        One Click
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        style={{
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            color: 'rgba(255,255,255,0.7)',
                            fontFamily: "'Space Grotesk', sans-serif",
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            marginBottom: '1.5rem'
                        }}
                    >
                        Admin Portal
                    </motion.div>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        style={{ 
                            color: 'rgba(255,255,255,0.6)', 
                            fontSize: '1.1rem', 
                            lineHeight: 1.6,
                            fontFamily: "'Manrope', sans-serif"
                        }}
                    >
                        Secure access to your premium outdoor media management system
                    </motion.p>
                </div>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4rem',
                    background: '#ffffff',
                    position: 'relative'
                }}
            >
                {/* Decorative elements */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '200px',
                    height: '200px',
                    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, transparent 100%)',
                    borderBottomLeftRadius: '100%'
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '150px',
                    height: '150px',
                    background: 'linear-gradient(135deg, transparent 0%, rgba(167, 139, 250, 0.05) 100%)',
                    borderTopRightRadius: '100%'
                }} />

                <div style={{
                    maxWidth: '440px',
                    width: '100%',
                    position: 'relative',
                    zIndex: 10
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 style={{ 
                            fontSize: '2.25rem', 
                            fontWeight: 800, 
                            marginBottom: '0.75rem',
                            color: '#0f172a',
                            fontFamily: "'Outfit', sans-serif"
                        }}>
                            Welcome Back
                        </h2>
                        <p style={{ 
                            color: '#64748b', 
                            fontSize: '1rem', 
                            marginBottom: '3rem',
                            fontFamily: "'Manrope', sans-serif"
                        }}>
                            Enter your credentials to access the admin dashboard
                        </p>
                    </motion.div>

                    <motion.form 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        onSubmit={handleSubmit} 
                        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                    >
                        {/* Email Field */}
                        <div>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '0.75rem', 
                                color: '#1e293b',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                fontFamily: "'DM Sans', sans-serif"
                            }}>
                                Email Address
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Mail 
                                    size={20} 
                                    style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#94a3b8'
                                    }}
                                />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="admin@oneclickadv.ae"
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1rem 1rem 3rem',
                                        borderRadius: '12px',
                                        border: '2px solid #e2e8f0',
                                        background: '#f8fafc',
                                        color: '#1e293b',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'all 0.3s',
                                        fontFamily: "'Manrope', sans-serif"
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#7c3aed';
                                        e.target.style.background = '#ffffff';
                                        e.target.style.boxShadow = '0 0 0 4px rgba(124, 58, 237, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e2e8f0';
                                        e.target.style.background = '#f8fafc';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label style={{ 
                                display: 'block', 
                                marginBottom: '0.75rem', 
                                color: '#1e293b',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                fontFamily: "'DM Sans', sans-serif"
                            }}>
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Lock 
                                    size={20} 
                                    style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#94a3b8'
                                    }}
                                />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    style={{
                                        width: '100%',
                                        padding: '1rem 3rem 1rem 3rem',
                                        borderRadius: '12px',
                                        border: '2px solid #e2e8f0',
                                        background: '#f8fafc',
                                        color: '#1e293b',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'all 0.3s',
                                        fontFamily: "'Manrope', sans-serif",
                                        WebkitAppearance: 'none',
                                        MozAppearance: 'textfield'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#7c3aed';
                                        e.target.style.background = '#ffffff';
                                        e.target.style.boxShadow = '0 0 0 4px rgba(124, 58, 237, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e2e8f0';
                                        e.target.style.background = '#f8fafc';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#94a3b8',
                                        padding: '0.25rem',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    background: '#fef2f2',
                                    border: '1px solid #fecaca',
                                    color: '#dc2626',
                                    fontSize: '0.95rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontFamily: "'Manrope', sans-serif"
                                }}
                            >
                                <ShieldCheck size={18} />
                                {error}
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '1.125rem',
                                fontSize: '1.05rem',
                                fontWeight: 700,
                                borderRadius: '12px',
                                border: 'none',
                                background: isLoading 
                                    ? 'linear-gradient(135deg, #94a3b8 0%, #cbd5e1 100%)'
                                    : 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
                                color: 'white',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                boxShadow: isLoading 
                                    ? 'none'
                                    : '0 10px 30px rgba(124, 58, 237, 0.3)',
                                transition: 'all 0.3s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.75rem',
                                fontFamily: "'Outfit', sans-serif",
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {isLoading ? (
                                <>
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        border: '3px solid rgba(255,255,255,0.3)',
                                        borderTop: '3px solid white',
                                        borderRadius: '50%',
                                        animation: 'spin 0.8s linear infinite'
                                    }} />
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </motion.button>
                    </motion.form>
                </div>
            </motion.div>

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.05); }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                
                /* Hide browser's default password reveal button */
                input[type="password"]::-ms-reveal,
                input[type="password"]::-ms-clear {
                    display: none;
                }
                
                input[type="password"]::-webkit-credentials-auto-fill-button,
                input[type="password"]::-webkit-strong-password-auto-fill-button {
                    display: none !important;
                }
                
                @media (max-width: 1024px) {
                    div[style*="grid-template-columns"] {
                        grid-template-columns: 1fr !important;
                    }
                    div[style*="grid-template-columns"] > div:first-child {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
}
