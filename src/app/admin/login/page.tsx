"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: 'admin@gmail.com', password: 'password123456' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);

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
            <style jsx global>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background: #000;
                    color: white;
                }

                .login-page {
                    display: flex;
                    min-height: 100vh;
                    background: #000;
                }

                .login-left {
                    flex: 1.2;
                    background: #000;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 2.5rem;
                    position: relative;
                }

                .login-right {
                    flex: 1;
                    background-image: url('/admin-billboard.png');
                    background-size: cover;
                    background-position: center;
                    position: relative;
                }

                .login-right::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to left, rgba(12, 12, 12,0.1), rgba(12, 12, 12,0.4));
                }

                .login-form-container {
                    max-width: 380px;
                    width: 100%;
                    margin: 0 auto;
                }

                .login-logo {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 2rem;

                    font-family: 'Bricolage Grotesque', sans-serif;
                    font-weight: 800;
                    font-size: 1.3rem;
                }

                .login-title {
                    font-size: 2rem;
                    font-weight: 800;
                    margin-bottom: 0.4rem;
                    letter-spacing: -1px;
                }

                .login-subtitle {
                    color: rgba(255,255,255,0.6);
                    margin-bottom: 2rem;
                    font-size: 0.95rem;
                    line-height: 1.5;
                }

                .form-group {
                    margin-bottom: 1.2rem;
                }

                .form-input {
                    width: 100%;
                    padding: 0.95rem 1.2rem;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    color: white;
                    font-size: 0.95rem;
                    outline: none;
                    transition: all 0.3s ease;
                }

                .form-input:focus {
                    background: rgba(255,255,255,0.08);
                    border-color: #e61e25;
                }

                .password-container {
                    position: relative;
                }

                .password-toggle {
                    position: absolute;
                    right: 1.1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.4);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                }

                .sign-in-button {
                    width: 100%;
                    padding: 1rem;
                    background: #e61e25;
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s;
                    margin-top: 1.2rem;
                }

                .sign-in-button:hover {
                    background: #ff2a31;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 15px rgba(230, 30, 37, 0.3);
                }

                .divider {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin: 1.5rem 0;
                    color: rgba(255,255,255,0.3);
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .divider::before, .divider::after {
                    content: '';
                    height: 1px;
                    flex: 1;
                    background: rgba(255,255,255,0.1);
                }

                .social-buttons {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1.8rem;
                }

                .social-button {
                    flex: 1;
                    padding: 0.8rem;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .social-button:hover {
                    background: rgba(255,255,255,0.1);
                }

                .create-account {
                    text-align: center;
                    color: rgba(255,255,255,0.5);
                    font-size: 0.95rem;
                }

                .create-account a {
                    color: #e61e25;
                    text-decoration: none;
                    font-weight: 700;
                }

                .keep-logged-in {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    margin: 1.2rem 0;
                    color: rgba(255,255,255,0.6);
                    font-size: 0.85rem;
                    cursor: pointer;
                }

                .error-message {
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    color: #FCA5A5;
                    padding: 0.7rem 1rem;
                    border-radius: 10px;
                    margin-bottom: 1.5rem;
                    font-size: 0.9rem;
                    text-align: center;
                }

                @media (max-width: 1024px) {
                    .login-right {
                        display: none;
                    }
                    .login-left {
                        flex: 1;
                        padding: 3rem 1.5rem;
                    }
                    .login-form-container {
                        max-width: 400px;
                        background: rgba(255,255,255,0.02);
                        padding: 2.5rem;
                        border-radius: 24px;
                        border: 1px solid rgba(255,255,255,0.05);
                    }
                }

                @media (max-width: 480px) {
                    .login-form-container {
                        padding: 1.5rem;
                        background: transparent;
                        border: none;
                    }
                    .login-title {
                        font-size: 2rem;
                    }
                }
            `}</style>

            <div className="login-left">
                <Link href="/" style={{
                    position: 'absolute',
                    top: '2rem',
                    left: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    transition: 'all 0.3s'
                }} className="back-btn"
                   onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                   onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                >
                    <ArrowLeft size={18} /> Back to Home
                </Link>

                <div className="login-form-container">
                    <div className="login-logo">
                        <svg width="32" height="32" viewBox="0 0 28 28">

                            <circle cx="14" cy="14" r="12" fill="none" stroke="#ffffff" strokeWidth="4"/>
                            <rect x="16" y="2" width="8" height="8" fill="#e61e25" rx="1"/>
                        </svg>
                        <span style={{ marginLeft: '2px' }}>ne Click</span>
                    </div>

                    <h1 className="login-title">Sign in</h1>
                    <p className="login-subtitle">Please login to continue to your account.</p>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Email"
                                className="form-input"
                                value={formData.email}
                                readOnly
                                style={{ cursor: 'not-allowed', opacity: 0.8 }}
                            />
                        </div>

                        <div className="form-group">
                            <div className="password-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    className="form-input"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <label className="keep-logged-in">
                            <input
                                type="checkbox"
                                checked={keepLoggedIn}
                                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                            />
                            Keep me logged in
                        </label>

                        <button
                            type="submit"
                            className="sign-in-button"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>

                        <div className="divider">or</div>

                        <div className="social-buttons">
                            <button 
                                type="button" 
                                className="social-button"
                                onClick={() => window.location.href = 'https://accounts.google.com'}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                            </button>
                            <button 
                                type="button" 
                                className="social-button"
                                onClick={() => window.location.href = 'https://www.facebook.com'}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#1877F2' }}>
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            <div className="login-right"></div>
        </div>
    );
}
