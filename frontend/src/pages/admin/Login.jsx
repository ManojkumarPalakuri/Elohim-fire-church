import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, ShieldCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [focusedField, setFocusedField] = useState('');

    const { login, user } = useAuth();
    const navigate = useNavigate();

    if (user) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const result = await login(email, password);
        if (result.success) {
            navigate('/admin/dashboard');
        } else {
            setError(result.error);
            setIsLoading(false);
        }
    };

    const inputStyle = (name) => ({
        width: '100%',
        padding: '14px 16px 14px 44px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: `1px solid ${focusedField === name ? '#d4af37' : 'rgba(255,255,255,0.12)'}`,
        color: '#ffffff',
        borderRadius: '10px',
        fontFamily: 'inherit',
        fontSize: '0.95rem',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        outline: 'none',
        boxSizing: 'border-box',
        boxShadow: focusedField === name ? '0 0 0 3px rgba(212, 175, 55, 0.15)' : 'none',
    });

    return (
        <>
            <Helmet>
                <title>Admin Login | Elohim Fire Ministries</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            {/* Full-page dark container — always dark regardless of system theme */}
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                background: '#0a0a0c',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Background Orbs */}
                <div style={{
                    position: 'absolute', top: '-15%', right: '-10%',
                    width: '500px', height: '500px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 100, 0, 0.15) 0%, transparent 60%)',
                    filter: 'blur(40px)', pointerEvents: 'none'
                }} />
                <div style={{
                    position: 'absolute', bottom: '-15%', left: '-10%',
                    width: '500px', height: '500px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 60%)',
                    filter: 'blur(40px)', pointerEvents: 'none'
                }} />

                {/* Login Card */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '440px',
                    background: 'rgba(20, 20, 28, 0.75)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)',
                    padding: '3rem 2.5rem',
                    textAlign: 'center',
                }}>
                    {/* Top Gold Line */}
                    <div style={{
                        position: 'absolute', top: 0, left: '10%', right: '10%',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
                        borderRadius: '2px'
                    }} />

                    {/* Logo */}
                    <div style={{
                        margin: '0 auto 1.5rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <img src="/logo.png" alt="Logo" style={{ height: '110px', objectFit: 'contain', borderRadius: '8px', border: '1px solid rgba(212, 175, 55, 0.3)', boxShadow: '0 8px 16px rgba(0,0,0,0.4)' }} />
                    </div>

                    {/* Shield Icon & Heading */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '6px' }}>
                        <ShieldCheck size={18} color="#d4af37" />
                        <span style={{ color: '#d4af37', fontSize: '0.75rem', letterSpacing: '3px', fontWeight: '600', textTransform: 'uppercase' }}>Secure Access</span>
                    </div>
                    <h1 style={{
                        color: '#ffffff',
                        fontSize: '1.6rem',
                        fontFamily: 'var(--font-heading)',
                        letterSpacing: '1px',
                        margin: '0 0 6px',
                        lineHeight: 1.2
                    }}>Admin Portal</h1>
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem', letterSpacing: '2px', marginBottom: '2.5rem', textTransform: 'uppercase' }}>
                        Elohim Fire Ministries
                    </p>

                    {/* Error Banner */}
                    {error && (
                        <div style={{
                            backgroundColor: 'rgba(255, 69, 0, 0.12)',
                            color: '#ff6a00',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            marginBottom: '1.5rem',
                            border: '1px solid rgba(255, 106, 0, 0.3)',
                            fontSize: '0.88rem',
                            textAlign: 'left'
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', textAlign: 'left' }}>
                        {/* Email Field */}
                        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                            <label htmlFor="email" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={16} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    placeholder="admin@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField('')}
                                    required
                                    style={inputStyle('email')}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                            <label htmlFor="password" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} color="rgba(255,255,255,0.3)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    placeholder="••••••••••••"
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField('')}
                                    required
                                    style={inputStyle('password')}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                marginTop: '0.5rem',
                                padding: '15px',
                                backgroundImage: isLoading
                                    ? 'none'
                                    : 'linear-gradient(135deg, #d4af37 0%, #f0c84a 50%, #d4af37 100%)',
                                backgroundColor: isLoading ? 'rgba(212, 175, 55, 0.4)' : 'transparent',
                                backgroundSize: '200% 200%',
                                color: '#0a0a0c',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '0.9rem',
                                fontWeight: '700',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                cursor: isLoading ? 'wait' : 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 20px rgba(212, 175, 55, 0.25)',
                            }}
                            onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.boxShadow = '0 6px 30px rgba(212, 175, 55, 0.5)'; }}
                            onMouseLeave={(e) => { if (!isLoading) e.currentTarget.style.boxShadow = '0 4px 20px rgba(212, 175, 55, 0.25)'; }}
                        >
                            {isLoading ? 'Authenticating…' : 'Login to Dashboard'}
                        </button>
                    </form>

                    <p style={{ marginTop: '2rem', fontSize: '0.76rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.5px' }}>
                        By logging in you agree to the ministry's data protection policy.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
