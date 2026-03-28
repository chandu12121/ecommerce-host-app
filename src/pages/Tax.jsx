
import React from 'react';

export default function Tax({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="tax">
                        <h2 style={{marginBottom: "16px", }}>📋 Tax Compliance</h2>

                        <div className="kpi-grid">
                            <div className="kpi-card">
                                <div className="kpi-label">Tax Due</div>
                                <div className="kpi-value">$48,750</div>
                            </div>
                            <div className="kpi-card">
                                <div className="kpi-label">Tax Rate</div>
                                <div className="kpi-value">18%</div>
                            </div>
                            <div className="kpi-card">
                                <div className="kpi-label">Paid</div>
                                <div className="kpi-value">$25,000</div>
                            </div>
                            <div className="kpi-card">
                                <div className="kpi-label">Remaining</div>
                                <div className="kpi-value">$23,750</div>
                            </div>
                        </div>

                        <div className="panel">
                            <div className="panel-header">
                                <div className="panel-title">Tax Documents</div>
                            </div>
                            <div className="panel-body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Document</th>
                                            <th>Period</th>
                                            <th>Tax Due</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>GST Return</td>
                                            <td>Q4 2024</td>
                                            <td>$48,750</td>
                                            <td><span className="badge badge-warning">Partial</span></td>
                                        </tr>
                                        <tr>
                                            <td>Tax Certificate</td>
                                            <td>2024</td>
                                            <td>$195,000</td>
                                            <td><span className="badge badge-success">Complete</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
    );
}
