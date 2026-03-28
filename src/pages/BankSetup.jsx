import React, { useState, useEffect } from 'react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import hostService from '../services/hostService';

export default function BankSetup({ isActive }) {
    const [formData, setFormData] = useState({
        accountHolder: '',
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        accountType: 'Business Account'
    });

    const [payouts, setPayouts] = useState([]);
    const [verified, setVerified] = useState(false);
    const [status, setStatus] = useState({ loading: true, saving: false, success: '', error: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await hostService.getProfile();
                if (data.bank) {
                    setFormData({
                        accountHolder: data.bank.accountHolder || '',
                        bankName: data.bank.bankName || '',
                        accountNumber: data.bank.accountNumber || '',
                        ifscCode: data.bank.ifscCode || '',
                        accountType: data.bank.accountType || 'Business Account'
                    });
                    setVerified(data.bank.verified || false);
                    setPayouts(data.bank.payoutHistory || []);
                }
                setStatus({ loading: false, saving: false, success: '', error: '' });
            } catch (error) {
                setStatus({ loading: false, saving: false, success: '', error: 'Failed to load bank data' });
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setStatus({ loading: false, saving: true, success: '', error: '' });
        try {
            await hostService.updateProfile({ bank: formData });
            setStatus({ loading: false, saving: false, success: 'Bank details securely saved!', error: '' });
            setTimeout(() => setStatus(s => ({ ...s, success: '' })), 3000);
        } catch (error) {
            setStatus({ loading: false, saving: false, success: '', error: error.response?.data?.message || 'Update failed' });
        }
    };

    if (status.loading) return <div className={`section ${isActive ? 'active' : ''}`}>Loading Secure Vault...</div>;

    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="bank-setup">
            <h2 style={{ marginBottom: "24px" }}>🏦 Bank Account & Payout Setup</h2>

            {status.error && <div style={{ padding: '12px', background: 'var(--error)', color: 'white', borderRadius: '8px', marginBottom: '20px' }}>⚠️ {status.error}</div>}
            {status.success && <div style={{ padding: '12px', background: 'var(--success)', color: 'white', borderRadius: '8px', marginBottom: '20px' }}>✅ {status.success}</div>}

            <form onSubmit={handleSave} className="onboarding-form">
                <h3 style={{ marginBottom: "20px" }}>Add Bank Account for Payouts</h3>

                <div className="grid-2">
                    <Input label="Account Holder Name *" name="accountHolder" value={formData.accountHolder} onChange={handleChange} required />
                    <Input label="Bank Name *" name="bankName" value={formData.bankName} onChange={handleChange} required />
                </div>

                <div className="grid-2">
                    <Input label="Account Number *" name="accountNumber" type="password" placeholder="••••••••••••••" value={formData.accountNumber} onChange={handleChange} required />
                    <Input label="IFSC Code *" name="ifscCode" value={formData.ifscCode} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Account Type *</label>
                    <select className="input-field" name="accountType" value={formData.accountType} onChange={handleChange} required>
                        <option value="Savings Account">Savings Account</option>
                        <option value="Current Account">Current Account</option>
                        <option value="Business Account">Business Account</option>
                    </select>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <Button type="submit" disabled={status.saving}>
                        {status.saving ? 'Encrypting & Saving...' : 'Save & Verify Bank Account'}
                    </Button>
                </div>
            </form>

            <div style={{ marginTop: "20px", padding: "15px", background: verified ? "#dcfce7" : "var(--primary-light)", border: verified ? "1px solid #bbf7d0" : "none", borderRadius: "8px", color: verified ? "var(--success)" : "inherit" }}>
                <strong>{verified ? '✅ Verified Securely' : '🔄 Bank Verification Status'}</strong><br />
                {verified
                    ? "Your account is active and connected to our instant payout API."
                    : "Verification pending. If details are updated, we will initiate 2 micro deposits (₹1-2) to verify ownership."}
            </div>

            <div className="panel" style={{ marginTop: "24px" }}>
                <div className="panel-header">
                    <div className="panel-title">Payout History & Schedule</div>
                </div>
                <div className="panel-body">
                    {payouts.length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Payout ID</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payouts.map((p, i) => (
                                    <tr key={i}>
                                        <td>{p.payoutId}</td>
                                        <td>₹{p.amount.toLocaleString()}</td>
                                        <td>{new Date(p.date).toLocaleDateString()}</td>
                                        <td><span className="badge badge-success">{p.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--muted)' }}>No historical payouts found. Start selling to see transfers here.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
