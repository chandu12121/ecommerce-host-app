import React, { useEffect, useState } from 'react';
import { featuresService } from '../services/featuresService';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

export default function Customers({ isActive = true }) {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isActive) return;

        const loadCRM = async () => {
            try {
                setLoading(true);
                const data = await featuresService.getCustomers();
                setCustomers(data);
            } catch (err) {
                console.error("Failed fetching CRM dataset:", err);
            } finally {
                setLoading(false);
            }
        };

        loadCRM();
    }, [isActive]);

    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="customers">
            <h2 style={{ marginBottom: "16px" }}>👥 Customer Relationship Management</h2>
            <div className="filters">
                <Input type="text" placeholder="Search customer ID or email..." className="search-bar" />
                <select className="input-field" style={{ width: "150px" }}>
                    <option>All Tiers</option>
                    <option>VIP</option>
                    <option>Gold</option>
                    <option>Standard</option>
                </select>
                <Button variant="secondary">Export CRM</Button>
            </div>

            <div className="card" style={{ padding: "0" }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Customer Profile</th>
                            <th>Lifetime Orders</th>
                            <th>Total Spent</th>
                            <th>Loyalty Tier</th>
                            <th>Last Purchase</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>Querying CRM Profiles...</td></tr>
                        ) : customers.length === 0 ? (
                            <tr><td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>Your CRM logic is tracking active orders. Complete a sale to register profiles!</td></tr>
                        ) : (
                            customers.map(c => (
                                <tr key={c._id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '32px', height: '32px', background: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 'bold' }}>
                                                {c.customer?.name ? c.customer.name.charAt(0).toUpperCase() : '?'}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{c.customer?.name || "Verified Purchase"}</div>
                                                <div style={{ fontSize: '0.8rem', color: "var(--text-light)" }}>{c.customer?.email || "ID Hidden"}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{c.orderCount || 0}</td>
                                    <td style={{ fontWeight: 600 }}>${(c.totalSpent || 0).toLocaleString()}</td>
                                    <td>
                                        <span className={`status-badge ${c.loyaltyTier === 'Platinum' || c.loyaltyTier === 'Gold' ? 'success' : 'pending'}`}>
                                            {c.loyaltyTier}
                                        </span>
                                    </td>
                                    <td>{c.lastOrderDate ? new Date(c.lastOrderDate).toLocaleDateString() : new Date(c.updatedAt).toLocaleDateString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
