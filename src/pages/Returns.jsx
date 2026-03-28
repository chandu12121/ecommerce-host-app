import React, { useEffect, useState } from 'react';
import { orderService } from '../services/orderService';

export default function Returns({ isActive = true }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isActive) return;
        const load = async () => {
            try {
                const data = await orderService.getOrders();
                setOrders(data);
            } catch (err) {
                console.error('Failed to load returns data:', err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [isActive]);

    const returnedOrders = orders.filter(o => o.orderStatus === 'Returned');
    const totalRefundValue = returnedOrders.reduce((acc, o) => acc + o.totalPrice, 0);
    const returnRate = orders.length > 0 ? ((returnedOrders.length / orders.length) * 100).toFixed(1) : '0.0';

    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="returns">
            <h2 style={{ marginBottom: "16px" }}>🔄 Returns &amp; Refunds</h2>

            <div className="kpi-grid">
                <div className="kpi-card">
                    <div className="kpi-label">Total Returns</div>
                    <div className="kpi-value">{returnedOrders.length}</div>
                </div>
                <div className="kpi-card">
                    <div className="kpi-label">Total Orders</div>
                    <div className="kpi-value">{orders.length}</div>
                </div>
                <div className="kpi-card">
                    <div className="kpi-label">Refunded Value</div>
                    <div className="kpi-value">${totalRefundValue.toFixed(2)}</div>
                </div>
                <div className="kpi-card">
                    <div className="kpi-label">Return Rate</div>
                    <div className="kpi-value">{returnRate}%</div>
                </div>
            </div>

            <div className="panel" style={{ marginTop: '20px' }}>
                <div className="panel-header">
                    <div className="panel-title">Return Requests</div>
                </div>
                <div className="panel-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Products</th>
                                <th>Payment Method</th>
                                <th>Status</th>
                                <th>Refund Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Scanning return pipeline...</td></tr>
                            ) : returnedOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}>
                                        <strong>No returns registered.</strong><br />
                                        Orders marked as "Returned" will appear here automatically.
                                    </td>
                                </tr>
                            ) : (
                                returnedOrders.map(o => (
                                    <tr key={o._id}>
                                        <td style={{ fontWeight: 600 }}>#{o._id.slice(-8).toUpperCase()}</td>
                                        <td>{o.orderItems?.map(i => i.name).join(', ')}</td>
                                        <td>{o.paymentMethod}</td>
                                        <td><span className="status-badge error">Returned</span></td>
                                        <td style={{ fontWeight: 600, color: 'var(--error)' }}>${o.totalPrice?.toFixed(2)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
