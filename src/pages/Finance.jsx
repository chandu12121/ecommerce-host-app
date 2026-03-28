import React, { useEffect, useState } from 'react';
import { featuresService } from '../services/featuresService';
import { orderService } from '../services/orderService';
import Button from '../components/common/Button';

export default function Finance({ isActive = true }) {
    const [financeData, setFinanceData] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isActive) return;

        const loadFinance = async () => {
            try {
                setLoading(true);
                const [finance, orderList] = await Promise.all([
                    featuresService.getFinance(),
                    orderService.getOrders()
                ]);
                setFinanceData(finance);
                setOrders(orderList);
            } catch (err) {
                console.error("Failed fetching ledger:", err);
            } finally {
                setLoading(false);
            }
        };

        loadFinance();
    }, [isActive]);

    const grossRevenue = financeData?.totalRevenue || 0;
    const platformFee = grossRevenue * 0.15;
    const netEarnings = grossRevenue - platformFee;
    const paidOrders = orders.filter(o => o.isPaid);

    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="finance">
            <h2 style={{ marginBottom: "16px" }}>💰 Finance &amp; Payouts</h2>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>Syncing with General Ledger...</div>
            ) : (
                <>
                    <div className="kpi-grid">
                        <div className="kpi-card" style={{ background: "var(--primary-light)" }}>
                            <div className="kpi-label" style={{ color: "var(--primary)" }}>Gross Revenue</div>
                            <div className="kpi-value">${grossRevenue.toFixed(2)}</div>
                            <div className="kpi-change">Total Before Platform Split</div>
                        </div>
                        <div className="kpi-card" style={{ background: "#fef2f2" }}>
                            <div className="kpi-label" style={{ color: "var(--error)" }}>Platform Fees (15%)</div>
                            <div className="kpi-value">${platformFee.toFixed(2)}</div>
                            <div className="kpi-change" style={{ color: 'var(--error)' }}>Multi-Vendor Cut</div>
                        </div>
                        <div className="kpi-card" style={{ background: "#f0fdf4" }}>
                            <div className="kpi-label" style={{ color: "var(--success)" }}>Net Earnings</div>
                            <div className="kpi-value">${netEarnings.toFixed(2)}</div>
                            <div className="kpi-change" style={{ color: 'var(--success)' }}>Available Balance</div>
                        </div>
                        <div className="kpi-card">
                            <div className="kpi-label">✅ Paid Orders</div>
                            <div className="kpi-value">{paidOrders.length}</div>
                            <div className="kpi-change">Cleared Transactions</div>
                        </div>
                    </div>

                    <div className="panel">
                        <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="panel-title">Transaction Ledger</div>
                            <Button>Request Payout</Button>
                        </div>
                        <div className="panel-body" style={{ padding: 0 }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Customer</th>
                                        <th>Items</th>
                                        <th>Gross</th>
                                        <th>Fee (15%)</th>
                                        <th>Net Payout</th>
                                        <th>Method</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" style={{ textAlign: "center", padding: "30px", color: "var(--text-light)" }}>
                                                No transactions yet. Paid orders will appear here automatically.
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map(o => {
                                            // hostRevenue from the host-specific API, fallback to totalPrice
                                            const gross = o.hostRevenue || o.totalPrice || 0;
                                            const fee = gross * 0.15;
                                            const net = gross - fee;
                                            const itemCount = o.hostItems?.length || o.orderItems?.length || 0;
                                            return (
                                                <tr key={o._id}>
                                                    <td style={{ fontWeight: 600 }}>#{o._id.slice(-8).toUpperCase()}</td>
                                                    <td style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                                                        {new Date(o.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td>{o.user?.name || 'Guest'}</td>
                                                    <td>{itemCount} item(s)</td>
                                                    <td style={{ fontWeight: 600 }}>${gross.toFixed(2)}</td>
                                                    <td style={{ color: 'var(--error)' }}>-${fee.toFixed(2)}</td>
                                                    <td style={{ fontWeight: 600, color: 'var(--success)' }}>${net.toFixed(2)}</td>
                                                    <td>{o.paymentMethod || 'N/A'}</td>
                                                    <td>
                                                        <span className={`status-badge ${o.isPaid ? 'success' : 'pending'}`}>
                                                            {o.isPaid ? 'Paid' : 'Pending'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
