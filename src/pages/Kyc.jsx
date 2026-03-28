import React, { useState, useEffect } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import hostService from '../services/hostService';

export default function Kyc({ isActive }) {
    const [kycData, setKycData] = useState({
        status: 'Pending',
        documents: {
            governmentId: { url: '', verified: false },
            addressProof: { url: '', verified: false },
            bankProof: { url: '', verified: false },
            selfie: { url: '', verified: false }
        },
        timeline: []
    });

    const [status, setStatus] = useState({ loading: true, saving: false, success: '', error: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await hostService.getProfile();
                if (data.kyc) setKycData(data.kyc);
                setStatus({ loading: false, saving: false, success: '', error: '' });
            } catch (error) {
                setStatus({ loading: false, saving: false, success: '', error: 'Failed to load KYC validation status' });
            }
        };
        fetchProfile();
    }, []);

    const handleDocChange = (key, value) => {
        setKycData(prev => ({
            ...prev,
            documents: {
                ...prev.documents,
                [key]: {
                    ...prev.documents[key],
                    url: value
                }
            }
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setStatus({ loading: false, saving: true, success: '', error: '' });
        try {
            await hostService.updateProfile({ kyc: kycData });
            setStatus({ loading: false, saving: false, success: 'Documents securely submitted for verification!', error: '' });
            setTimeout(() => setStatus(s => ({ ...s, success: '' })), 3000);
        } catch (error) {
            setStatus({ loading: false, saving: false, success: '', error: error.response?.data?.message || 'Update failed' });
        }
    };

    const isAllSubmitted = () => {
        const docs = kycData.documents;
        return docs.governmentId.url && docs.addressProof.url && docs.bankProof.url && docs.selfie.url;
    };

    if (status.loading) return <div className={`section ${isActive ? 'active' : ''}`}>Fetching Legal Vault...</div>;

    const docs = kycData.documents;

    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="kyc">
            <h2 style={{ marginBottom: "24px" }}>✅ KYC (Know Your Customer) Verification</h2>

            {status.error && <div style={{ padding: '12px', background: 'var(--error)', color: 'white', borderRadius: '8px', marginBottom: '20px' }}>⚠️ {status.error}</div>}
            {status.success && <div style={{ padding: '12px', background: 'var(--success)', color: 'white', borderRadius: '8px', marginBottom: '20px' }}>✅ {status.success}</div>}

            <div className="kpi-grid">
                <div className="kpi-card">
                    <div className="kpi-label">Status</div>
                    <div className="kpi-value" style={{ color: kycData.status === 'Verified' ? 'var(--success)' : 'var(--warning)' }}>{kycData.status}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                        {kycData.status === 'Verified' ? 'Approved & Live' : 'Review in progress'}
                    </div>
                </div>
                <div className="kpi-card">
                    <div className="kpi-label">Action Required</div>
                    <div className="kpi-value" style={{ fontSize: '1.2rem' }}>{isAllSubmitted() ? 'None' : 'Upload Docs'}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Complete mandatory fields</div>
                </div>
                <div className="kpi-card">
                    <div className="kpi-label">Expected Verification</div>
                    <div className="kpi-value" style={{ fontSize: "1.2rem" }}>24-48 Hrs</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Post submission</div>
                </div>
            </div>

            <form onSubmit={handleSave} className="panel" style={{ marginTop: '20px' }}>
                <div className="panel-header">
                    <div className="panel-title">📄 Document Secure Vault Upload</div>
                </div>
                <div className="panel-body">
                    <p style={{ color: 'var(--text-light)', marginBottom: '30px' }}>
                        Please enter the Document Reference IDs or Links for verification by our Compliance Team.
                    </p>

                    <div className="grid-2">
                        <Input
                            label="Government ID Number (Passport/License/Aadhar)"
                            placeholder="Aadhar Number / Passport ID"
                            name="governmentId"
                            value={docs.governmentId.url}
                            onChange={(e) => handleDocChange('governmentId', e.target.value)}
                            required
                            disabled={docs.governmentId.verified}
                        />
                        <Input
                            label="Address Proof Document Hash/Link"
                            placeholder="Electricity Bill ID / Link"
                            name="addressProof"
                            value={docs.addressProof.url}
                            onChange={(e) => handleDocChange('addressProof', e.target.value)}
                            required
                            disabled={docs.addressProof.verified}
                        />
                    </div>

                    <div className="grid-2">
                        <Input
                            label="Bank Checking Account Statement ID"
                            placeholder="Statement ID"
                            name="bankProof"
                            value={docs.bankProof.url}
                            onChange={(e) => handleDocChange('bankProof', e.target.value)}
                            required
                            disabled={docs.bankProof.verified}
                        />
                        <Input
                            label="Selfie Verification Token"
                            placeholder="Base64 or Link"
                            name="selfie"
                            value={docs.selfie.url}
                            onChange={(e) => handleDocChange('selfie', e.target.value)}
                            required
                            disabled={docs.selfie.verified}
                        />
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: '20px' }}>
                        <Button type="submit" disabled={status.saving || kycData.status === 'Verified'}>
                            {status.saving ? 'Encrypting...' : 'Submit Documents Securely'}
                        </Button>
                    </div>
                </div>
            </form>

            <div className="timeline" style={{ marginTop: "30px" }}>
                <h3 style={{ marginBottom: "20px" }}>Verification Timeline</h3>
                {kycData.timeline.length > 0 ? (
                    kycData.timeline.map((event, i) => (
                        <div key={i} className="timeline-item">
                            <strong>{event.event}</strong><br />
                            <span style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
                                {new Date(event.date).toLocaleString()}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="timeline-item">
                        <strong>Awaiting Document Submission</strong><br />
                        <span style={{ color: "var(--muted)", fontSize: "0.85rem" }}>Please upload documents above to start the review process.</span>
                    </div>
                )}
            </div>
        </div>
    );
}
