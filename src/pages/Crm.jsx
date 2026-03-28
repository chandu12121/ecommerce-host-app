
import React from 'react';

export default function Crm({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="crm">
                    <h2 style={{marginBottom: "16px", }}>📋 CRM &amp; Loyalty Programs</h2>
                    <div className="kpi-grid">
                        <div className="kpi-card">
                            <div className="kpi-label">Loyalty Members</div>
                            <div className="kpi-value">2,340</div>
                        </div>
                        <div className="kpi-card">
                            <div className="kpi-label">Points Issued</div>
                            <div className="kpi-value">1.2M</div>
                        </div>
                        <div className="kpi-card">
                            <div className="kpi-label">Redemptions</div>
                            <div className="kpi-value">$45K</div>
                        </div>
                        <div className="kpi-card">
                            <div className="kpi-label">Avg Tier Level</div>
                            <div className="kpi-value">Silver</div>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="panel-header">
                            <div className="panel-title">Loyalty Program Stats</div>
                            <button className="panel-action">Manage Program</button>
                        </div>
                        <div className="panel-body">
                            <h3 style={{marginBottom: "12px", }}>Tier Benefits</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tier</th>
                                        <th>Members</th>
                                        <th>Earn Rate</th>
                                        <th>Benefits</th>
                                        <th>Upgrade at</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><span className="badge" style={{background: "#fee2e2", color: "#dc2626", }}>Bronze</span>
                                        </td>
                                        <td>1,234</td>
                                        <td>1pt/$1</td>
                                        <td>5% off</td>
                                        <td>$500 spend</td>
                                    </tr>
                                    <tr>
                                        <td><span className="badge" style={{background: "#dbeafe", color: "#0369a1", }}>Silver</span>
                                        </td>
                                        <td>867</td>
                                        <td>1.5pt/$1</td>
                                        <td>10% off + Free Ship</td>
                                        <td>$2,500 spend</td>
                                    </tr>
                                    <tr>
                                        <td><span className="badge" style={{background: "#fcd34d", color: "#92400e", }}>Gold</span>
                                        </td>
                                        <td>234</td>
                                        <td>2pt/$1</td>
                                        <td>15% off + Priority</td>
                                        <td>$5,000 spend</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
    );
}
