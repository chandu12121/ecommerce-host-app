import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import hostService from '../services/hostService';

export default function Onboarding({ isActive }) {
    const navigate = useNavigate();
    const [step, setStep] = useState(2); // Since Account/Basic info is already collected in Register

    const hostContext = JSON.parse(localStorage.getItem('hostInfo')) || {};
    const { name, email } = hostContext;

    // Remaining details for Host Onboarding
    const [formData, setFormData] = useState({
        storeName: '',
        storeDescription: '',
        businessType: 'llc',
        gstNumber: '',
        address: ''
    });

    const [status, setStatus] = useState({ loading: false, success: false, error: '' });

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleNext = (e) => {
        e.preventDefault();
        setStep(step + 1);
    };

    const handlePrev = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleFinalSubmit = async () => {
        setStatus({ loading: true, success: false, error: '' });

        try {
            // Update comprehensive profile with the new seller info collected
            await hostService.updateProfile({
                store: {
                    name: formData.storeName,
                    description: formData.storeDescription,
                    businessType: formData.businessType,
                    taxId: formData.gstNumber,
                    address: formData.address
                }
            });

            setStatus({ loading: false, success: true, error: '' });
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);

        } catch (error) {
            setStatus({ loading: false, success: false, error: error.response?.data?.message || 'Failed saving onboarding data' });
        }
    };

    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="onboarding">
            <h2 style={{ marginBottom: "24px" }}>🚀 Seller Setup Wizard</h2>

            {/* Exactly matching original UI layout */}
            <div className="steps">
                <div className={`step ${step === 1 ? 'active' : ''}`}>
                    <div className="step-number" style={{ color: step > 1 ? "var(--success)" : undefined }}>
                        {step > 1 ? "✓" : "1"}
                    </div>
                    <div className="step-title" style={{ color: step > 1 ? "var(--success)" : undefined }}>Account</div>
                </div>
                <div className={`step ${step === 2 ? 'active' : ''}`}>
                    <div className="step-number">2</div>
                    <div className="step-title">Business</div>
                </div>
                <div className={`step ${step === 3 ? 'active' : ''}`}>
                    <div className="step-number">3</div>
                    <div className="step-title">Store</div>
                </div>
                <div className={`step ${step === 4 ? 'active' : ''}`}>
                    <div className="step-number">4</div>
                    <div className="step-title">Shipping</div>
                </div>
                <div className={`step ${step === 5 ? 'active' : ''}`}>
                    <div className="step-number">5</div>
                    <div className="step-title">Verify</div>
                </div>
            </div>

            <div className="onboarding-form">
                {status.error && (
                    <div style={{ marginBottom: "15px", padding: "10px", background: "var(--error)", color: "white", borderRadius: "6px" }}>
                        ⚠️ {status.error}
                    </div>
                )}

                {/* STEP 1: Account Overview */}
                {step === 1 && (
                    <form onSubmit={handleNext}>
                        <h3 style={{ marginBottom: "20px" }}>Step 1: Account Information</h3>

                        <div style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--bg)', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--success)', fontWeight: '600', marginBottom: '20px' }}>
                                <span style={{ fontSize: '1.5rem' }}>✅</span>
                                Secured Identity
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <Input label="Full Legal Name" type="text" value={name || 'Pending...'} readOnly />
                                <Input label="Corporate Email" type="email" value={email || 'Pending...'} readOnly />
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button type="submit">Verify & Continue</Button>
                        </div>
                    </form>
                )}

                {/* STEP 2: Business Details */}
                {step === 2 && (
                    <form onSubmit={handleNext}>
                        <h3 style={{ marginBottom: "20px" }}>Step 2: Business Information</h3>
                        <p style={{ color: "var(--text-light)", marginBottom: "20px" }}>Your account is registered. Let's set up your tax structure.</p>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Business Entity Type *</label>
                                <select className="input-field" name="businessType" value={formData.businessType} onChange={handleChange} required>
                                    <option value="llc">Limited Liability (LLC)</option>
                                    <option value="corp">Corporation (Inc)</option>
                                    <option value="sole">Sole Proprietorship</option>
                                </select>
                            </div>
                            <Input label="Business GST/Tax ID" type="text" name="gstNumber" placeholder="XX-XXXXXXX" value={formData.gstNumber} onChange={handleChange} required />
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                            <Button variant="secondary" type="button" onClick={handlePrev}>Back</Button>
                            <Button type="submit">Continue to Store Setup</Button>
                        </div>
                    </form>
                )}

                {/* STEP 3: Store Details */}
                {step === 3 && (
                    <form onSubmit={handleNext}>
                        <h3 style={{ marginBottom: "20px" }}>Step 3: Storefront Setup</h3>
                        <p style={{ color: "var(--text-light)", marginBottom: "20px" }}>What will customers see when they buy from you?</p>

                        <div className="form-group">
                            <Input label="Public Store Name" type="text" name="storeName" placeholder="e.g. Apex Official Store" value={formData.storeName} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Store Brand Bio *</label>
                            <textarea rows="4" className="input-field" name="storeDescription" placeholder="Tell buyers why they should trust your products..." value={formData.storeDescription} onChange={handleChange} required></textarea>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                            <Button variant="secondary" type="button" onClick={handlePrev}>Back</Button>
                            <Button type="submit">Continue to Shipping</Button>
                        </div>
                    </form>
                )}

                {/* STEP 4: Shipping Context */}
                {step === 4 && (
                    <form onSubmit={handleNext}>
                        <h3 style={{ marginBottom: "20px" }}>Step 4: Warehousing Details</h3>
                        <div className="form-group">
                            <label>Primary Return Address *</label>
                            <textarea rows="2" className="input-field" name="address" placeholder="123 Industrial Way..." value={formData.address} onChange={handleChange} required></textarea>
                        </div>

                        <div className="form-group" style={{ padding: "15px", background: "var(--primary-light)", borderRadius: "8px" }}>
                            <label style={{ display: "flex", alignItems: "center", gap: "10px", margin: 0 }}>
                                <input type="checkbox" style={{ width: "20px", height: "20px" }} defaultChecked />
                                Opt-in to Global Dropship Logistics API (Beta)
                            </label>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                            <Button variant="secondary" type="button" onClick={handlePrev}>Back</Button>
                            <Button type="submit">Review & Finalize</Button>
                        </div>
                    </form>
                )}

                {/* STEP 5: Verify & Complete */}
                {step === 5 && (
                    <div>
                        <h3 style={{ marginBottom: "20px" }}>Step 5: Final Review</h3>

                        <div style={{ background: "var(--bg)", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
                            <div className="grid-2">
                                <div>
                                    <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginBottom: "4px" }}>Store Name</p>
                                    <p style={{ fontWeight: "700" }}>{formData.storeName}</p>
                                </div>
                                <div>
                                    <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginBottom: "4px" }}>Tax ID</p>
                                    <p style={{ fontWeight: "700" }}>{formData.gstNumber}</p>
                                </div>
                            </div>
                        </div>

                        {status.success ? (
                            <div style={{ marginTop: "20px", padding: "15px", background: "#dcfce7", border: "1px solid #bbf7d0", color: "var(--success)", borderRadius: "8px", fontWeight: "600" }}>
                                ✅ Onboarding Complete! Booting your command center...
                            </div>
                        ) : (
                            <div style={{ display: "flex", gap: "10px" }}>
                                <Button variant="secondary" type="button" onClick={handlePrev} style={{ flex: 1 }}>Edit Details</Button>
                                <Button type="button" onClick={handleFinalSubmit} disabled={status.loading} style={{ flex: 1, background: "var(--success)" }}>
                                    {status.loading ? 'Provisioning...' : 'Approve & Enter Dashboard 🚀'}
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
