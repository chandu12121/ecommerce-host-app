
import React from 'react';

export default function Shipping({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="shipping">
                        <h2 style={{marginBottom: "16px", }}>🚚 Shipping &amp; Logistics</h2>

                        <div className="kpi-grid">
                            <div className="kpi-card">
                                <div className="kpi-label">Pending</div>
                                <div className="kpi-value">24</div>
                            </div>
                            <div className="kpi-card">
                                <div className="kpi-label">In Transit</div>
                                <div className="kpi-value">89</div>
                            </div>
                            <div className="kpi-card">
                                <div className="kpi-label">Delivered</div>
                                <div className="kpi-value">834</div>
                            </div>
                            <div className="kpi-card">
                                <div className="kpi-label">Avg Cost</div>
                                <div className="kpi-value">$12.50</div>
                            </div>
                        </div>

                        <div className="panel">
                            <div className="panel-header">
                                <div className="panel-title">Shipments with Tracking</div>
                            </div>
                            <div className="panel-body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Order</th>
                                            <th>Tracking #</th>
                                            <th>Carrier</th>
                                            <th>Status</th>
                                            <th>Est. Delivery</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#15847</td>
                                            <td>DHL-123456</td>
                                            <td>DHL</td>
                                            <td><span className="badge badge-success">Delivered</span></td>
                                            <td>Delivered</td>
                                        </tr>
                                        <tr>
                                            <td>#15846</td>
                                            <td>FDX-789012</td>
                                            <td>FedEx</td>
                                            <td><span className="badge badge-info">In Transit</span></td>
                                            <td>Dec 22</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
    );
}
