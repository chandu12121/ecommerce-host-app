import React, { useState, useEffect } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import hostService from '../services/hostService';

export default function Policies({ isActive }) {
    const [policies, setPolicies] = useState({
        refundDurationDays: 30,
        refundDescription: '',
        processingTimeDays: 2,
        shippingDescription: '',
        agreedToTerms: false
    });

    const [status, setStatus] = useState({ loading: true, saving: false, success: '', error: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await hostService.getProfile();
                if (data.store && data.store.policies) {
                    setPolicies(data.store.policies);
                }
                setStatus({ loading: false, saving: false, success: '', error: '' });
            } catch (error) {
                setStatus({ loading: false, saving: false, success: '', error: 'Failed to fully load merchant policies' });
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setPolicies(prev => ({ ...prev, [e.target.name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setStatus({ loading: false, saving: true, success: '', error: '' });
        try {
            await hostService.updateProfile({ store: { policies } });
            setStatus({ loading: false, saving: false, success: 'Policies & Legal Setup Successfully Enforced!', error: '' });
            setTimeout(() => setStatus(s => ({ ...s, success: '' })), 3000);
        } catch (error) {
            setStatus({ loading: false, saving: false, success: '', error: error.response?.data?.message || 'Update failed' });
        }
    };

    if (status.loading) return <div className={`section ${isActive ? 'active' : ''}`}>Loading Legal Terms...</div>;

    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="policies">
            <h2 style={{ marginBottom: "24px" }}>📋 Store Policies & Legal Setup</h2>

            {status.error && <div style={{ padding: '12px', background: 'var(--error)', color: 'white', borderRadius: '8px', marginBottom: '20px' }}>⚠️ {status.error}</div>}
            {status.success && <div style={{ padding: '12px', background: 'var(--success)', color: 'white', borderRadius: '8px', marginBottom: '20px' }}>✅ {status.success}</div>}

            <form onSubmit={handleSave}>
                <div className="grid-2">
                    <div className="panel">
                        <div className="panel-header">
                            <div className="panel-title">✏️ Refund Policy</div>
                        </div>
                        <div className="panel-body">
                            <Input
                                label="Refund Duration (Days)"
                                type="number"
                                name="refundDurationDays"
                                value={policies.refundDurationDays}
                                onChange={handleChange}
                            />
                            <div className="form-group" style={{ marginTop: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '8px' }}>Policy Description</label>
                                <textarea
                                    rows="4"
                                    className="input-field"
                                    name="refundDescription"
                                    value={policies.refundDescription}
                                    onChange={handleChange}
                                    placeholder="Items can be returned within X days..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="panel">
                        <div className="panel-header">
                            <div className="panel-title">✏️ Shipping Policy</div>
                        </div>
                        <div className="panel-body">
                            <Input
                                label="Processing Time (Days)"
                                type="number"
                                name="processingTimeDays"
                                value={policies.processingTimeDays}
                                onChange={handleChange}
                            />
                            <div className="form-group" style={{ marginTop: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '8px' }}>Policy Description</label>
                                <textarea
                                    rows="4"
                                    className="input-field"
                                    name="shippingDescription"
                                    value={policies.shippingDescription}
                                    onChange={handleChange}
                                    placeholder="Orders are processed within X days..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="panel" style={{ marginTop: "20px" }}>
                    <div className="panel-header">
                        <div className="panel-title">⚖️ Marketplace Seller Agreement</div>
                    </div>
                    <div className="panel-body">
                        <p style={{ marginBottom: "12px" }}>By becoming a seller on MegaMart, you agree to:</p>
                        <ul style={{ marginLeft: "20px", lineHeight: "1.8" }}>
                            <li>Comply with all marketplace rules and policies</li>
                            <li>Maintain product quality standards</li>
                            <li>Honor refund and return policies</li>
                            <li>Pay applicable commissions and fees</li>
                            <li>Not engage in fraudulent activities</li>
                            <li>Protect customer data and privacy</li>
                        </ul>
                        <label style={{ marginTop: "20px", display: "flex", gap: "10px", alignItems: 'center', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="agreedToTerms"
                                checked={policies.agreedToTerms}
                                onChange={handleChange}
                                style={{ width: "20px", height: "20px" }}
                                required
                            />
                            <span style={{ fontWeight: '600' }}>I have read and agree to all Seller Agreements</span>
                        </label>

                        <div style={{ marginTop: "30px", borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                            <Button type="submit" disabled={status.saving}>
                                {status.saving ? 'Binding Legal Policies...' : 'Accept & Publish Policies'}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
