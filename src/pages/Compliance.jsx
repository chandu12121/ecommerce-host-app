
import React from 'react';

export default function Compliance({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="compliance">
                        <h2 style={{marginBottom: "16px", }}>⚖️ Legal &amp; Compliance</h2>

                        <div className="panel">
                            <div className="panel-header">
                                <div className="panel-title">Seller Agreement &amp; Policies</div>
                            </div>
                            <div className="panel-body">
                                <div style={{marginBottom: "16px", }}>
                                    <label style={{display: "flex", gap: "8px", marginBottom: "8px", }}>
                                        <input type="checkbox" checked="" disabled="" /> ✅ Accepted Seller Terms (Dec 20, 2024)
                                    </label>
                                    <label style={{display: "flex", gap: "8px", marginBottom: "8px", }}>
                                        <input type="checkbox" checked="" disabled="" /> ✅ Accepted Privacy Policy (Dec 20,
                                        2024)
                                    </label>
                                    <label style={{display: "flex", gap: "8px", marginBottom: "8px", }}>
                                        <input type="checkbox" checked="" disabled="" /> ✅ Accepted Commission Structure (Dec
                                        20, 2024)
                                    </label>
                                </div>

                                <button className="btn">View Latest Agreements</button>
                            </div>
                        </div>

                        <div className="panel" style={{marginTop: "20px", }}>
                            <div className="panel-header">
                                <div className="panel-title">Dispute Resolution Center</div>
                            </div>
                            <div className="panel-body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Case ID</th>
                                            <th>Customer</th>
                                            <th>Reason</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#DISP-001</td>
                                            <td>John Doe</td>
                                            <td>Item defective</td>
                                            <td><span className="badge badge-success">Resolved</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
    );
}
