
import React from 'react';

export default function Email({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="email">
                        <h2 style={{marginBottom: "16px", }}>📧 Email Marketing</h2>

                        <div className="kpi-grid">
                            <div className="kpi-card">
                                <div className="kpi-label">Campaigns</div>
                                <div className="kpi-value">156</div>
                            </div>
                            <div className="kpi-card">
                                <div className="kpi-label">Subscribers</div>
                                <div className="kpi-value">45K</div>
                            </div>
                            <div className="kpi-card">
                                <div className="kpi-label">Open Rate</div>
                                <div className="kpi-value">28%</div>
                            </div>
                            <div className="kpi-card">
                                <div className="kpi-label">Click Rate</div>
                                <div className="kpi-value">4.2%</div>
                            </div>
                        </div>

                        <div className="panel">
                            <div className="panel-header">
                                <div className="panel-title">Email Templates</div>
                            </div>
                            <div className="panel-body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Template</th>
                                            <th>Type</th>
                                            <th>Sent</th>
                                            <th>Open Rate</th>
                                            <th>Revenue</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Order Confirmation</td>
                                            <td>Transactional</td>
                                            <td>3,247</td>
                                            <td>95%</td>
                                            <td>N/A</td>
                                        </tr>
                                        <tr>
                                            <td>Abandoned Cart</td>
                                            <td>Recovery</td>
                                            <td>234</td>
                                            <td>42%</td>
                                            <td>$12,450</td>
                                        </tr>
                                        <tr>
                                            <td>Welcome Series</td>
                                            <td>Automation</td>
                                            <td>678</td>
                                            <td>38%</td>
                                            <td>$8,900</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
    );
}
