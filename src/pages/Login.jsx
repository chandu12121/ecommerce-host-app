import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function Login() {
    const [email, setEmail] = useState('guest@host.com');
    const [password, setPassword] = useState('password123');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Using centralized Axios interceptor
            const response = await api.post('/auth/login', { email, password });

            // Securely store the enterprise JWT
            localStorage.setItem('hostInfo', JSON.stringify(response.data));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Check your credentials or backend server status.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex', minHeight: '100vh', width: '100%', boxSizing: 'border-box', background: 'var(--bg)', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
            <div style={{
                display: 'flex', width: '100%', maxWidth: '1000px', background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(26,23,20,0.08)'
            }}>
                {/* Left Side - Visual Focus */}
                <div style={{
                    flex: '1', background: 'linear-gradient(135deg, var(--primary), var(--accent))', padding: '60px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white'
                }}>
                    <div className="logo-section" style={{ border: 'none', padding: '0', marginBottom: '40px' }}>
                        <div className="logo-mark" style={{ background: 'white', color: 'var(--primary)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>🛍️</div>
                        <div className="logo-text" style={{ color: 'white', fontSize: '1.5rem' }}>Mega<span style={{ color: '#ffdfd9' }}>Mart</span></div>
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '20px', fontFamily: "'Fraunces', serif" }}>
                        Command your<br />multi-channel<br />empire.
                    </h2>
                    <p style={{ fontSize: '1.05rem', opacity: '0.9', lineHeight: '1.6' }}>
                        Access your global dashboard, manage inventory across 14 regions, and track daily payouts instantly.
                    </p>
                </div>

                {/* Right Side - Form */}
                <div style={{ flex: '1', padding: '60px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '8px', color: 'var(--ink)' }}>Welcome back to Host</h3>
                    <p style={{ color: 'var(--muted)', marginBottom: '30px', fontSize: '0.95rem' }}>Enter your credentials to access your dashboard.</p>

                    {error && (
                        <div style={{ padding: '12px 16px', background: 'var(--error)', color: 'white', borderRadius: '8px', marginBottom: '24px', fontSize: '0.9rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <Input
                            label="Business Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="e.g. hello@yourbrand.com"
                            style={{ padding: '14px', fontSize: '1rem', borderRadius: '8px' }}
                        />
                        <Input
                            label="Security Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            style={{ padding: '14px', fontSize: '1rem', borderRadius: '8px', letterSpacing: '2px' }}
                        />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--ink3)' }}>
                                <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }} />
                                Remember me
                            </label>
                            <span style={{ color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}>Forgot password?</span>
                        </div>

                        <Button type="submit" disabled={loading} style={{ padding: '16px', fontSize: '1rem', borderRadius: '8px', marginTop: '10px' }}>
                            {loading ? 'Authenticating Handshake...' : 'Sign In Securely 🚀'}
                        </Button>
                    </form>

                    <div style={{ marginTop: '30px', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.95rem' }}>
                        Ready to start selling? <span style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '700' }} onClick={() => navigate('/register')}>Apply as a Host today</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
