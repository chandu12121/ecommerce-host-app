import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

export default function Profile({ isActive = true }) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [storeName, setStoreName] = useState('');
    const [storeDescription, setStoreDescription] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        if (!isActive) return;
        const loadProfile = async () => {
            try {
                const res = await api.get('/auth/profile');
                setProfile(res.data);
                setStoreName(res.data.sellerInfo?.storeName || '');
                setStoreDescription(res.data.sellerInfo?.storeDescription || '');
            } catch (err) {
                console.error('Failed to load seller profile:', err);
            } finally {
                setLoading(false);
            }
        };
        loadProfile();
    }, [isActive]);

    const handleSave = async () => {
        setSaving(true);
        setSuccessMsg('');
        try {
            await api.put('/auth/profile', { sellerInfo: { storeName, storeDescription } });
            setSuccessMsg('Store brand details updated successfully.');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            alert('Failed to save profile: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className={`section ${isActive ? 'active' : ''}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <div style={{ color: 'var(--muted)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '20px', height: '20px', border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                    Syncing Enterprise Profile...
                </div>
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="profile" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="section-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '24px', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: "'Fraunces', serif" }}>Account Settings</h2>
                    <p style={{ color: "var(--text-light)", marginTop: "8px" }}>Manage your store identity, corporate details, and public presentation.</p>
                </div>
                <Button>Contact Vendor Support</Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '32px', alignItems: 'start' }}>

                {/* Left Column: Form Settings */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    <div className="card" style={{ padding: '0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px' }}>Corporate Identity</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Immutable KYC details tied to your tax ID.</p>
                        </div>
                        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', background: '#fafafa' }}>
                            <div className="form-row" style={{ margin: 0, gap: '24px' }}>
                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--ink3)', display: 'block', marginBottom: '8px' }}>Legal Representative</label>
                                    <div style={{ padding: '12px', background: 'var(--border)', borderRadius: '8px', color: 'var(--ink)', fontSize: '0.95rem', fontWeight: '500' }}>
                                        {profile?.name || 'N/A'}
                                    </div>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--ink3)', display: 'block', marginBottom: '8px' }}>Registered Email</label>
                                    <div style={{ padding: '12px', background: 'var(--border)', borderRadius: '8px', color: 'var(--ink)', fontSize: '0.95rem', fontWeight: '500' }}>
                                        {profile?.email || 'N/A'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ padding: '0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px' }}>Public Storefront</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>This information is visible to customers across the marketplace.</p>
                            </div>
                        </div>
                        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <Input
                                label="Brand Name"
                                value={storeName}
                                onChange={e => setStoreName(e.target.value)}
                                placeholder="e.g. Apex Electronics Official"
                            />
                            <div className="form-group">
                                <label style={{ fontSize: '0.9rem', fontWeight: '600', display: 'block', marginBottom: '8px' }}>Store Bio</label>
                                <textarea
                                    rows="4"
                                    className="input-field"
                                    placeholder="Tell customers about your brand story and quality guarantees..."
                                    value={storeDescription}
                                    onChange={e => setStoreDescription(e.target.value)}
                                    style={{ resize: 'vertical' }}
                                />
                            </div>
                        </div>
                        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', background: 'var(--primary-light)', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px' }}>
                            {successMsg && <span style={{ color: 'var(--success)', fontWeight: '600', fontSize: '0.9rem' }}>{successMsg}</span>}
                            <Button onClick={handleSave} disabled={saving} style={{ padding: '10px 24px' }}>
                                {saving ? 'Syncing...' : 'Save Public Profile'}
                            </Button>
                        </div>
                    </div>

                </div>

                {/* Right Column: Stats & Preview */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* Live Preview Card */}
                    <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
                        <div style={{ height: '80px', background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}></div>
                        <div style={{ padding: '24px', position: 'relative' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'white', border: '4px solid white', position: 'absolute', top: '-32px', left: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', color: 'var(--primary)' }}>
                                🛍️
                            </div>
                            <h3 style={{ marginTop: '20px', fontSize: '1.1rem', fontWeight: '800' }}>
                                {storeName || 'Your Brand Name'}
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--muted)', marginTop: '4px' }}>
                                <span style={{ color: '#fbbf24' }}>★</span> {profile?.sellerInfo?.rating ? Number(profile.sellerInfo.rating).toFixed(1) : '0.0'}
                                <span>({profile?.sellerInfo?.numReviews || 0} Ratings)</span>
                                <span>•</span> <span style={{ color: 'var(--success)' }}>Verified Seller</span>
                            </div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--ink2)', marginTop: '16px', lineHeight: '1.5' }}>
                                {storeDescription || "Your store bio will be rendered here for millions of marketplace buyers. Ensure it feels professional and concise."}
                            </p>
                            <div style={{ marginTop: '20px', width: '100%', height: '40px', background: 'var(--bg)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '700' }}>
                                Follow Store +
                            </div>
                        </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="card" style={{ padding: '20px' }}>
                        <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '16px', letterSpacing: '0.5px' }}>Account Trust Score</h4>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '36px', height: '36px', background: '#dcfce7', color: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>✓</div>
                                <div>
                                    <div style={{ fontSize: '0.95rem', fontWeight: '600' }}>KYC Cleared</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Level 2 Verified</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '36px', height: '36px', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>👑</div>
                                <div>
                                    <div style={{ fontSize: '0.95rem', fontWeight: '600' }}>Vendor Tier</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Enterprise Partner</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
