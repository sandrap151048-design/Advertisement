"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });
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
        <>

            <style jsx global>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                }

                .login-page {
                    display: flex;
                    min-height: 100vh;
                    background: #000;
                }

                .login-left {
                    flex: 1;
                    background: #000;
                    padding: 4rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    color: white;
                }

                .login-logo {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    font-size: 1.3rem;
                    font-weight: 700;
                    position: absolute;
                    top: 4rem;
                    left: 4rem;
                }

                .logo-icon {
                    width: 32px;
                    height: 32px;
                    background: transparent;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .login-form-container {
                    max-width: 340px;
                    width: 100%;
                    margin: 0 auto;
                    margin-top: 3rem;
                }

                .login-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }

                .login-subtitle {
                    color: rgba(255,255,255,0.7);
                    margin-bottom: 3rem;
                    font-size: 1rem;
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }

                .form-input {
                    width: 100%;
                    padding: 1rem 1.2rem;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px;
                    color: white;
                    font-size: 1rem;
                    outline: none;
                    transition: all 0.3s;
                }

                .form-input:focus {
                    border-color: rgba(255,255,255,0.3);
                    background: rgba(255,255,255,0.08);
                }

                .form-input::placeholder {
                    color: rgba(255,255,255,0.4);
                }

                .password-container {
                    position: relative;
                }

                .password-toggle {
                    position: absolute;
                    right: 1rem;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    color: rgba(255,255,255,0.5);
                    cursor: pointer;
                    padding: 0.5rem;
                    display: flex;
                    align-items: center;
                }

                .password-toggle:hover {
                    color: rgba(255,255,255,0.8);
                }

                .keep-logged-in {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 2rem;
                    color: rgba(255,255,255,0.8);
                    font-size: 0.95rem;
                }

                .keep-logged-in input[type="checkbox"] {
                    width: 18px;
                    height: 18px;
                    cursor: pointer;
                }

                .sign-in-button {
                    width: 100%;
                    padding: 1rem;
                    background: #e61e25;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                    margin-bottom: 1.5rem;
                }

                .sign-in-button:hover {
                    background: #cc1a21;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(230, 30, 37, 0.3);
                }

                .sign-in-button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .divider {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin: 1.5rem 0;
                    color: rgba(255,255,255,0.4);
                    font-size: 0.9rem;
                }

                .divider::before,
                .divider::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: rgba(255,255,255,0.1);
                }

                .social-buttons {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .social-button {
                    flex: 1;
                    padding: 0.9rem;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .social-button:hover {
                    background: rgba(255,255,255,0.1);
                    border-color: rgba(255,255,255,0.2);
                }

                .social-button svg {
                    width: 24px;
                    height: 24px;
                }

                .create-account {
                    text-align: center;
                    color: rgba(255,255,255,0.7);
                    font-size: 0.95rem;
                }

                .create-account a {
                    color: #e61e25;
                    text-decoration: none;
                    font-weight: 600;
                }

                .create-account a:hover {
                    text-decoration: underline;
                }

                .login-right {
                    flex: 1;
                    background-image: url('https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80');
                    background-size: cover;
                    background-position: center;
                    position: relative;
                }

                .login-right::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1));
                }

                .error-message {
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    color: #FCA5A5;
                    padding: 0.8rem 1rem;
                    border-radius: 8px;
                    margin-bottom: 1.5rem;
                    font-size: 0.9rem;
                }

                @media (max-width: 968px) {
                    .login-page {
                        flex-direction: column;
                    }

                    .login-left {
                        padding: 2rem;
                        position: relative;
                    }

                    .login-logo {
                        position: static;
                        margin-bottom: 2rem;
                    }

                    .login-right {
                        min-height: 300px;
                    }
                }
            `}</style>

            <div className="login-page">

                {/* Left Side - Form */}
                <div className="login-left">
                    <div className="login-logo">
                        <div className="logo-icon">
                          <svg width="28" height="28" viewBox="0 0 28 28">
                            <circle cx="14" cy="14" r="12" fill="none" stroke="#ffffff" strokeWidth="4"/>
                            <rect x="16" y="2" width="8" height="8" fill="#e61e25" rx="1"/>
                          </svg>
                        </div>
                        <span style={{ marginLeft: '-15px' }}>ne Click</span>
                    </div>

                    <div className="login-form-container">
                        <h1 className="login-title">Sign in</h1>
                        <p className="login-subtitle">Please login to continue to your account.</p>

                        {error && (
                            <div className="error-message">{error}</div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="form-input"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
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
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
                                <button type="button" className="social-button">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                    </svg>
                                </button>
                                <button type="button" className="social-button">
                                    <svg viewBox="0 0 24 24" fill="#1877F2">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </button>
                            </div>

                            <div className="create-account">
                                Need an account? <a href="/register">Create one</a>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="login-right"></div>
            </div>
        </>
    );
}
