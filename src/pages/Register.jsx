import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [status, setStatus] = useState({ loading: false, success: false, error: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: '' });

        if (formData.password !== formData.confirmPassword) {
            setStatus({ loading: false, success: false, error: 'Passwords do not match!' });
            return;
        }

        try {
            // Using centralized Axios interceptor
            const response = await api.post('/auth/register-host', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            // Store token securely
            localStorage.setItem('hostInfo', JSON.stringify(response.data));
            setStatus({ loading: false, success: true, error: '' });

            // Redirect smoothly to onboarding wizard on success
            setTimeout(() => navigate('/onboarding'), 1500);

        } catch (error) {
            setStatus({
                loading: false,
                success: false,
                error: error.response?.data?.message || 'Server unavailable. Check connection.'
            });
        }
    };

    return (
        <div style={{
            display: 'flex', minHeight: '100vh', width: '100%', boxSizing: 'border-box', background: 'var(--bg)', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
            <div style={{
                display: 'flex', width: '100%', maxWidth: '1100px', background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(26,23,20,0.08)'
            }}>
                {/* Left Side - Visual Story */}
                <div style={{
                    flex: '1', background: 'radial-gradient(circle at top left, var(--primary), var(--primary-dark))', padding: '60px 40px', display: 'flex', flexDirection: 'column', color: 'white'
                }}>
                    <div className="logo-section" style={{ border: 'none', padding: '0', marginBottom: 'auto' }}>
                        <div className="logo-mark" style={{ background: 'white', color: 'var(--primary)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>🛍️</div>
                        <div className="logo-text" style={{ color: 'white', fontSize: '1.5rem' }}>Mega<span style={{ color: '#ffdfd9' }}>Mart</span></div>
                    </div>

                    <div style={{ marginTop: '40px' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '20px', fontFamily: "'Fraunces', serif" }}>
                            Build your global<br />B2B supply chain.
                        </h2>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '1.05rem', opacity: '0.95' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px', borderRadius: '50%', fontSize: '0.8rem' }}>🌍</span> Global reach to million+ buyers
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px', borderRadius: '50%', fontSize: '0.8rem' }}>💰</span> Zero listing fees, pay on sale
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px', borderRadius: '50%', fontSize: '0.8rem' }}>⚡</span> Instant API payout clearing
                            </li>
                        </ul>
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: '40px', fontSize: '0.9rem', opacity: '0.8' }}>
                        Join 2,400+ top-tier vendors globally.
                    </div>
                </div>

                {/* Right Side - Wizard Form */}
                <div style={{ flex: '1.3', padding: '60px 50px', display: 'flex', flexDirection: 'column', overflowY: 'auto', maxHeight: '90vh' }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--ink)' }}>Apply as Host 🚀</h3>
                        <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Step 1 of 3</span>
                    </div>

                    <p style={{ color: 'var(--ink3)', marginBottom: '30px', fontSize: '0.95rem' }}>Create your master account to start unlocking vendor tools and inventory sync.</p>

                    {status.error && (
                        <div style={{ padding: '12px 16px', background: 'var(--error)', color: 'white', borderRadius: '8px', marginBottom: '24px', fontSize: '0.9rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>⚠️</span> {status.error}
                        </div>
                    )}

                    {status.success && (
                        <div style={{ padding: '16px', background: '#dcfce7', color: 'var(--success)', border: '1px solid #bbf7d0', borderRadius: '8px', marginBottom: '24px', fontSize: '0.95rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '1.5rem' }}>✅</span>
                            <div>
                                Verification Success! Secure JWT registered.<br />
                                <span style={{ fontSize: '0.85rem', fontWeight: '400', color: '#166534' }}>Redirecting to dashboard...</span>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <Input
                            label="Full Legal Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="e.g. John Doe"
                            style={{ padding: '12px', fontSize: '0.95rem', borderRadius: '8px' }}
                        />

                        <Input
                            label="Corporate Email Address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="hello@yourbrand.com"
                            style={{ padding: '12px', fontSize: '0.95rem', borderRadius: '8px' }}
                        />

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <Input
                                label="Master Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                style={{ padding: '12px', fontSize: '0.95rem', borderRadius: '8px' }}
                            />
                            <Input
                                label="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                style={{ padding: '12px', fontSize: '0.95rem', borderRadius: '8px' }}
                            />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--ink3)', marginTop: '10px', padding: '10px', background: 'var(--bg)', borderRadius: '8px' }}>
                            <input type="checkbox" required style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
                            <span>I agree to the <b style={{ color: 'var(--ink)', cursor: 'pointer' }}>Host Terms of Service</b> and <b style={{ color: 'var(--ink)', cursor: 'pointer' }}>Privacy Policy</b>.</span>
                        </div>

                        <Button type="submit" disabled={status.loading || status.success} style={{ padding: '16px', fontSize: '1rem', borderRadius: '8px', marginTop: '14px' }}>
                            {status.loading ? 'Provisioning Secure Vendor Environment...' : 'Create Master Account 🚀'}
                        </Button>
                    </form>

                    <div style={{ marginTop: '30px', textAlign: 'center', color: 'var(--muted)', fontSize: '0.95rem' }}>
                        Already have an enterprise account? <br />
                        <span style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '700', display: 'inline-block', marginTop: '8px' }} onClick={() => navigate('/login')}>Sign in securely here</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
