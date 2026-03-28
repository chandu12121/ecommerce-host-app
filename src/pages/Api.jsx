
import React from 'react';

export default function Api({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="api">
                    <h2 style={{marginBottom: "16px", }}>⚙️ API &amp; Developer Tools</h2>
                    <div className="panel">
                        <div className="panel-header">
                            <div className="panel-title">REST API Keys &amp; Webhooks</div>
                            <button className="panel-action">+ Generate Key</button>
                        </div>
                        <div className="panel-body">
                            <div style={{marginBottom: "20px", }}>
                                <h3 style={{marginBottom: "12px", }}>API Keys</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Key Name</th>
                                            <th>Created</th>
                                            <th>Last Used</th>
                                            <th>Permissions</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Live API Key</td>
                                            <td>Jan 1, 2024</td>
                                            <td>Today</td>
                                            <td>Read/Write All</td>
                                            <td><a href="#" style={{color: "var(--primary)", }}>Revoke</a></td>
                                        </tr>
                                        <tr>
                                            <td>Test API Key</td>
                                            <td>Jan 5, 2024</td>
                                            <td>Dec 18</td>
                                            <td>Read Only</td>
                                            <td><a href="#" style={{color: "var(--primary)", }}>Revoke</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div>
                                <h3 style={{marginBottom: "12px", }}>Webhooks</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Event</th>
                                            <th>Endpoint</th>
                                            <th>Status</th>
                                            <th>Deliveries</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>order.created</td>
                                            <td>https://yourapp.com/webhooks/order</td>
                                            <td><span className="badge badge-success">Active</span></td>
                                            <td>3,247</td>
                                        </tr>
                                        <tr>
                                            <td>order.paid</td>
                                            <td>https://yourapp.com/webhooks/payment</td>
                                            <td><span className="badge badge-success">Active</span></td>
                                            <td>3,145</td>
                                        </tr>
                                        <tr>
                                            <td>customer.created</td>
                                            <td>https://yourapp.com/webhooks/customer</td>
                                            <td><span className="badge badge-success">Active</span></td>
                                            <td>678</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="panel" style={{marginTop: "24px", }}>
                        <div className="panel-header">
                            <div className="panel-title">App Marketplace</div>
                        </div>
                        <div className="panel-body">
                            <table>
                                <thead>
                                    <tr>
                                        <th>App Name</th>
                                        <th>Category</th>
                                        <th>Rating</th>
                                        <th>Installs</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Email Autoresponder</td>
                                        <td>Marketing</td>
                                        <td>4.8★</td>
                                        <td>234</td>
                                        <td><span className="badge badge-success">Installed</span></td>
                                    </tr>
                                    <tr>
                                        <td>Inventory Forecaster</td>
                                        <td>Inventory</td>
                                        <td>4.6★</td>
                                        <td>156</td>
                                        <td><span className="badge badge-success">Installed</span></td>
                                    </tr>
                                    <tr>
                                        <td>Customer Insights</td>
                                        <td>CRM</td>
                                        <td>4.9★</td>
                                        <td>89</td>
                                        <td><span className="badge badge-info">Available</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
    );
}
