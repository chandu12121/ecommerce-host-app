import React, { useEffect, useState } from 'react';
import { orderService } from '../services/orderService';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

export default function Orders({ isActive = true }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isActive) return;

        const loadOrders = async () => {
            try {
                setLoading(true);
                const data = await orderService.getOrders();
                setOrders(data);
                setError(null);
            } catch (err) {
                console.error("Failed loading order pipeline:", err);
                setError("Unable to retrieve remote orders.");
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [isActive]);

    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="orders">
            <h2 style={{ marginBottom: "16px" }}>📦 Order Management</h2>
            <div className="filters">
                <Input type="text" placeholder="Search order ID or customer..." className="search-bar" />
                <select className="input-field" style={{ width: "150px" }}>
                    <option>All Status</option>
                    <option>Pending Fulfillment</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                </select>
                <select className="input-field" style={{ width: "150px" }}>
                    <option>Last 30 Days</option>
                    <option>Last 7 Days</option>
                    <option>Yesterday</option>
                    <option>Today</option>
                </select>
                <Button>Export CSV</Button>
            </div>

            <div className="card" style={{ padding: "0", overflowX: "auto" }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Your Revenue</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>Syncing with Pipeline...</td></tr>
                        ) : error ? (
                            <tr><td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: 'red' }}>⚠️ {error}</td></tr>
                        ) : orders.length === 0 ? (
                            <tr><td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-light)' }}>No active orders found for your inventory. It's time to run a campaign!</td></tr>
                        ) : (
                            orders.map(order => (
                                <tr key={order._id}>
                                    <td style={{ fontWeight: 600 }}>#{order._id.substring(order._id.length - 6).toUpperCase()}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <div>{order.user?.name || 'Guest'}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{order.user?.email || 'N/A'}</div>
                                    </td>
                                    <td>{(order.hostItems?.length || order.orderItems?.length || 0)} items ({(order.hostItems || order.orderItems || []).reduce((acc, i) => acc + (i.qty || 0), 0)} qty)</td>
                                    <td style={{ fontWeight: 600 }}>${(order.hostRevenue || order.totalPrice || 0).toFixed(2)}</td>
                                    <td>
                                        <span className={`status-badge ${order.orderStatus === 'Delivered' ? 'success' : order.isPaid ? 'info' : 'warning'}`}>
                                            {order.orderStatus || (order.isPaid ? 'Processing' : 'Pending Payment')}
                                        </span>
                                    </td>
                                    <td>
                                        <Button variant="secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>View Detail</Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
