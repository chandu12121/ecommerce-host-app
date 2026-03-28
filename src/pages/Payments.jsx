
import React from 'react';

export default function Payments({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="payments">
                        <h2 style={{marginBottom: "16px", }}>💳 Payments &amp; Settlements</h2>

                        <div className="panel">
                            <div className="panel-header">
                                <div className="panel-title">Payment Methods</div>
                            </div>
                            <div className="panel-body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Method</th>
                                            <th>Transactions</th>
                                            <th>Volume</th>
                                            <th>Commission</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>💳 Credit Card</td>
                                            <td>1,245</td>
                                            <td>$187,540</td>
                                            <td>2.5%</td>
                                            <td><span className="badge badge-success">Active</span></td>
                                        </tr>
                                        <tr>
                                            <td>🏦 Bank Transfer</td>
                                            <td>456</td>
                                            <td>$108,320</td>
                                            <td>1.0%</td>
                                            <td><span className="badge badge-success">Active</span></td>
                                        </tr>
                                        <tr>
                                            <td>📱 Wallet</td>
                                            <td>987</td>
                                            <td>$145,680</td>
                                            <td>2.0%</td>
                                            <td><span className="badge badge-success">Active</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
    );
}
