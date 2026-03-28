import React, { useEffect, useState } from 'react';
import { dashboardService } from '../services/dashboardService';
import { orderService } from '../services/orderService';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

export default function Dashboard({ isActive = true }) {
    const [stats, setStats] = useState(null);
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isActive) return;

        const loadAll = async () => {
            try {
                const [statsData, ordersData] = await Promise.all([
                    dashboardService.getStats(),
                    orderService.getOrders()
                ]);
                setStats(statsData);
                setRecentOrders(ordersData.slice(0, 5)); // Show last 5
            } catch (error) {
                console.error("Failed fetching dashboard KPIs:", error);
            } finally {
                setLoading(false);
            }
        };

        loadAll();
    }, [isActive]);

    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="dashboard">
            <h2 style={{ marginBottom: "16px" }}>📊 Dashboard</h2>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>Loading Live Intelligence...</div>
            ) : (
                <>
                    <div className="kpi-grid">
                        <div className="kpi-card">
                            <div className="kpi-label">💰 Validated Revenue</div>
                            <div className="kpi-value">${(stats?.sales?.totalRevenue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            <div className="kpi-change" style={{ color: 'var(--success)' }}>Active Pipeline</div>
                        </div>
                        <div className="kpi-card">
                            <div className="kpi-label">📦 Items Sold</div>
                            <div className="kpi-value">{stats?.sales?.totalItemsSold?.toLocaleString() || '0'}</div>
                            <div className="kpi-change">Verified Purchases</div>
                        </div>
                        <div className="kpi-card">
                            <div className="kpi-label">🎁 Live Listings</div>
                            <div className="kpi-value">{stats?.liveActiveListings || 0}</div>
                            <div className="kpi-change">Items fully Approved</div>
                        </div>
                        <div className="kpi-card">
                            <div className="kpi-label">🛒 Total Orders</div>
                            <div className="kpi-value">{recentOrders.length}</div>
                            <div className="kpi-change">From MongoDB</div>
                        </div>
                    </div>

                    <div className="panel">
                        <div className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="panel-title">Recent Transaction Log</div>
                            <Link to="/orders" style={{ textDecoration: 'none' }}>
                                <Button variant="secondary" style={{ padding: "6px 12px", fontSize: "0.85rem" }}>View All Orders</Button>
                            </Link>
                        </div>
                        <div className="panel-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Customer</th>
                                        <th>Items</th>
                                        <th>Revenue</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: "center", padding: "30px", color: "var(--text-light)" }}>
                                                No orders received yet. Run a campaign to start selling!
                                            </td>
                                        </tr>
                                    ) : (
                                        recentOrders.map(order => (
                                            <tr key={order._id}>
                                                <td style={{ fontWeight: 600 }}>#{order._id.slice(-6).toUpperCase()}</td>
                                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                                <td>{order.user?.name || 'Guest Customer'}</td>
                                                <td>{order.hostItems?.length || order.orderItems?.length || 0} item(s)</td>
                                                <td style={{ fontWeight: 600, color: 'var(--success)' }}>
                                                    ${(order.hostRevenue || order.totalPrice || 0).toFixed(2)}
                                                </td>
                                                <td>
                                                    <span className={`status-badge ${order.orderStatus === 'Delivered' ? 'success' : order.isPaid ? 'info' : 'pending'}`}>
                                                        {order.orderStatus || (order.isPaid ? 'Processing' : 'Pending')}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
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
