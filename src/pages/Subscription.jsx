
import React from 'react';

export default function Subscription({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="subscription">
                        <h2 style={{marginBottom: "16px", }}>💎 Subscription Plans &amp; Billing</h2>

                        <div className="grid-3">
                            <div className="panel">
                                <div className="panel-header" style={{background: "var(--bg)", }}>
                                    <div className="panel-title">FREE</div>
                                </div>
                                <div className="panel-body" style={{textAlign: "center", }}>
                                    <div style={{fontSize: "2rem", fontWeight: "800", marginBottom: "16px", }}>$0</div>
                                    <ul style={{listStyle: "none", marginBottom: "16px", fontSize: "0.85rem", }}>
                                        <li>✓ 50 Products</li>
                                        <li>✓ Basic Analytics</li>
                                        <li>✓ Email Support</li>
                                        <li>✗ Advanced Tools</li>
                                    </ul>
                                    <button className="btn btn-secondary">Current Plan</button>
                                </div>
                            </div>

                            <div className="panel">
                                <div className="panel-header" style={{background: "var(--primary-light)", }}>
                                    <div className="panel-title">PRO</div>
                                </div>
                                <div className="panel-body" style={{textAlign: "center", }}>
                                    <div style={{fontSize: "2rem", fontWeight: "800", marginBottom: "16px", }}>$99<span style={{fontSize: "0.8rem", }}>/mo</span></div>
                                    <ul style={{listStyle: "none", marginBottom: "16px", fontSize: "0.85rem", }}>
                                        <li>✓ 1,000 Products</li>
                                        <li>✓ Advanced Analytics</li>
                                        <li>✓ Priority Support</li>
                                        <li>✓ Bulk Tools</li>
                                    </ul>
                                    <button className="btn">Upgrade to Pro</button>
                                </div>
                            </div>

                            <div className="panel">
                                <div className="panel-header" style={{background: "var(--accent)", }}>
                                    <div className="panel-title">ENTERPRISE</div>
                                </div>
                                <div className="panel-body" style={{textAlign: "center", }}>
                                    <div style={{fontSize: "2rem", fontWeight: "800", marginBottom: "16px", }}>Custom</div>
                                    <ul style={{listStyle: "none", marginBottom: "16px", fontSize: "0.85rem", }}>
                                        <li>✓ Unlimited Products</li>
                                        <li>✓ Custom Features</li>
                                        <li>✓ Dedicated Support</li>
                                        <li>✓ API Access</li>
                                    </ul>
                                    <button className="btn">Contact Sales</button>
                                </div>
                            </div>
                        </div>

                        <div className="panel" style={{marginTop: "20px", }}>
                            <div className="panel-header">
                                <div className="panel-title">Billing History</div>
                            </div>
                            <div className="panel-body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Plan</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Dec 1, 2024</td>
                                            <td>Free Plan</td>
                                            <td>$0</td>
                                            <td><span className="badge badge-success">Active</span></td>
                                        </tr>
                                        <tr>
                                            <td>Nov 1, 2024</td>
                                            <td>Free Plan</td>
                                            <td>$0</td>
                                            <td><span className="badge badge-success">Paid</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
    );
}
