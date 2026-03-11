"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';
import './login.css';

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
        <div className="login-page">
            {/* Background Orbs */}
            <div className="bg-orb orb-1"></div>
            <div className="bg-orb orb-2"></div>
            <div className="bg-orb orb-3"></div>

            <div className="login-container">
                {/* Left Side - Branding */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="branding-section"
                >
                    <div className="branding-content">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="logo-container"
                        >
                            OC
                        </motion.div>
                        
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="brand-title"
                        >
                            One Click
                        </motion.h1>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="brand-subtitle"
                        >
                            Admin Portal
                        </motion.div>
                        
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="brand-description"
                        >
                            Secure access to your premium outdoor media management system
                        </motion.p>
                    </div>
                </motion.div>

                {/* Right Side - Login Form */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="form-section"
                >
                    <div className="form-container">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="form-header"
                        >
                            <h2>Welcome Back</h2>
                            <p>Enter your credentials to access the admin dashboard</p>
                        </motion.div>

                        <motion.form 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            onSubmit={handleSubmit}
                            className="login-form"
                        >
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <div className="input-container">
                                    <Mail className="input-icon" size={20} />
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="admin@oneclickadv.ae"
                                        className="form-input"
                                        autoComplete="email"
                                        autoCapitalize="none"
                                        autoCorrect="off"
                                        spellCheck="false"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className="input-container">
                                    <Lock className="input-icon" size={20} />
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        className="form-input"
                                        autoCapitalize="none"
                                        autoCorrect="off"
                                        spellCheck="false"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="password-toggle"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        tabIndex={0}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="error-message"
                                    >
                                        <ShieldCheck size={16} />
                                        <span>{error}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`submit-button ${isLoading ? 'loading' : ''}`}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="loading-spinner"></div>
                                        Signing In...
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </motion.form>
                    </div>
                </motion.div>
            </div>


        </div>
    );
}