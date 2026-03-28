import React, { useEffect, useState } from 'react';
import { couponService } from '../services/couponService';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

export default function Coupons({ isActive = true }) {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        code: '',
        discountType: 'percent',
        discountValue: '',
        expirationDate: '',
        minPurchaseAmount: 0
    });

    useEffect(() => {
        if (!isActive) return;
        loadCoupons();
    }, [isActive]);

    const loadCoupons = async () => {
        try {
            setLoading(true);
            const data = await couponService.getCoupons();
            setCoupons(data);
        } catch (err) {
            console.error('Failed to load coupons:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await couponService.createCoupon(formData);
            setShowModal(false);
            setFormData({ code: '', discountType: 'percent', discountValue: '', expirationDate: '', minPurchaseAmount: 0 });
            loadCoupons();
        } catch (err) {
            alert('Failed to generate discount code.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to deactivate and remove this coupon?')) {
            try {
                await couponService.deleteCoupon(id);
                loadCoupons();
            } catch (err) {
                alert('Deletion failed.');
            }
        }
    };

    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="coupons">
            <div className="section-header">
                <div>
                    <h2 style={{ marginBottom: "8px" }}>🎟️ Discount Engineering</h2>
                    <p style={{ color: "var(--text-light)" }}>Manage promotional codes and campaign-specific discounts.</p>
                </div>
                <Button onClick={() => setShowModal(true)}>+ Create New Coupon</Button>
            </div>

            <div className="card" style={{ padding: '0', overflowX: 'auto' }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Discount</th>
                            <th>Usage Count</th>
                            <th>Min. Purchase</th>
                            <th>Expires</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>Fetching active codes...</td></tr>
                        ) : coupons.length === 0 ? (
                            <tr><td colSpan="6" style={{ textAlign: "center", padding: "30px", color: "var(--text-light)" }}>No active coupons. Create your first promotion to boost sales!</td></tr>
                        ) : (
                            coupons.map((coupon) => (
                                <tr key={coupon._id}>
                                    <td style={{ fontWeight: 800, letterSpacing: '1px', color: 'var(--primary)' }}>{coupon.code}</td>
                                    <td style={{ fontWeight: 600 }}>
                                        {coupon.discountType === 'percent' ? `${coupon.discountValue}% Off` : `$${coupon.discountValue} Flat`}
                                    </td>
                                    <td style={{ color: 'var(--text-light)' }}>{coupon.usedCount} total redemptions</td>
                                    <td>${coupon.minPurchaseAmount || 0}</td>
                                    <td style={{ fontWeight: 500 }}>{new Date(coupon.expirationDate).toLocaleDateString()}</td>
                                    <td>
                                        <Button variant="secondary" style={{ padding: '4px 8px', fontSize: '0.8rem', color: 'var(--error)' }} onClick={() => handleDelete(coupon._id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h3>🏷️ Initialize Coupon Code</h3>
                            <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleCreate} style={{ display: 'contents' }}>
                            <div className="modal-body">
                                <h4 className="modal-section-title">✨ Promo Configuration</h4>
                                <Input label="Coupon Code" name="code" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })} placeholder="e.g. SUMMERFLASH50" required />

                                <div className="grid-2" style={{ marginTop: '16px' }}>
                                    <div className="form-group">
                                        <label>Discount Schema</label>
                                        <select className="input-field" value={formData.discountType} onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}>
                                            <option value="percent">Percentage Split (%)</option>
                                            <option value="fixed">Fixed Currency Amount ($)</option>
                                        </select>
                                    </div>
                                    <Input label="Discount Value" type="number" name="discountValue" value={formData.discountValue} onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })} placeholder="20" required />
                                </div>

                                <h4 className="modal-section-title">📅 Validity & Guards</h4>
                                <div className="grid-2">
                                    <Input label="Expiry Date" type="date" name="expirationDate" value={formData.expirationDate} onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })} required />
                                    <Input label="Min. Cart Value ($)" type="number" name="minPurchaseAmount" value={formData.minPurchaseAmount} onChange={(e) => setFormData({ ...formData, minPurchaseAmount: e.target.value })} placeholder="0" />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>Discard</Button>
                                <Button type="submit" style={{ minWidth: '180px' }}>Activate Promo Code</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
