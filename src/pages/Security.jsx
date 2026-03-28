
import React from 'react';

export default function Security({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="security">
                        <h2 style={{marginBottom: "16px", }}>🔒 Security &amp; Audit Logs</h2>

                        <div className="kpi-grid">
                            <div className="kpi-card">
                                <div className="kpi-label">2FA Status</div>
                                <div className="kpi-value" style={{color: "var(--success)", }}>✅ Enabled</div>
                            </div>
                            <div className="kpi-card">
                                <div className="kpi-label">Login Attempts</div>
                                <div className="kpi-value">127</div>
                            </div>
                            <div className="kpi-card">
                                <div className="kpi-label">Failed Logins</div>
                                <div className="kpi-value">3</div>
                            </div>
                            <div className="kpi-card">
                                <div className="kpi-label">Last Backup</div>
                                <div className="kpi-value">Today</div>
                            </div>
                        </div>

                        <div className="panel">
                            <div className="panel-header">
                                <div className="panel-title">Recent Activity &amp; Audit Trail</div>
                            </div>
                            <div className="panel-body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Action</th>
                                            <th>IP</th>
                                            <th>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>You</td>
                                            <td>Login</td>
                                            <td>192.168.1.1</td>
                                            <td>Today, 9:30 AM</td>
                                        </tr>
                                        <tr>
                                            <td>Sarah</td>
                                            <td>Update Inventory</td>
                                            <td>192.168.1.5</td>
                                            <td>Today, 10:15 AM</td>
                                        </tr>
                                        <tr>
                                            <td>John</td>
                                            <td>Process Refund</td>
                                            <td>192.168.1.8</td>
                                            <td>Today, 11:00 AM</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
    );
}
