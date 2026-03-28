
import React from 'react';

export default function Integrations({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="integrations">
                        <h2 style={{marginBottom: "16px", }}>🔗 Integrations &amp; APIs</h2>

                        <div className="panel">
                            <div className="panel-header">
                                <div className="panel-title">Connected Services</div>
                            </div>
                            <div className="panel-body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Service</th>
                                            <th>Type</th>
                                            <th>Status</th>
                                            <th>Last Sync</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Shopify</td>
                                            <td>E-commerce</td>
                                            <td><span className="badge badge-success">Connected</span></td>
                                            <td>1h ago</td>
                                        </tr>
                                        <tr>
                                            <td>Stripe</td>
                                            <td>Payments</td>
                                            <td><span className="badge badge-success">Connected</span></td>
                                            <td>30m ago</td>
                                        </tr>
                                        <tr>
                                            <td>GA</td>
                                            <td>Analytics</td>
                                            <td><span className="badge badge-success">Connected</span></td>
                                            <td>2h ago</td>
                                        </tr>
                                        <tr>
                                            <td>Mailchimp</td>
                                            <td>Email</td>
                                            <td><span className="badge badge-success">Connected</span></td>
                                            <td>4h ago</td>
                                        </tr>
                                        <tr>
                                            <td>QuickBooks</td>
                                            <td>Accounting</td>
                                            <td><span className="badge badge-success">Connected</span></td>
                                            <td>Yesterday</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="panel" style={{marginTop: "20px", }}>
                            <div className="panel-header">
                                <div className="panel-title">REST API &amp; Webhooks</div>
                            </div>
                            <div className="panel-body">
                                <h3 style={{marginBottom: "12px", }}>API Keys</h3>
                                <table style={{fontSize: "0.85rem", }}>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Created</th>
                                            <th>Permissions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Live Key</td>
                                            <td>Jan 1, 2024</td>
                                            <td>Read/Write</td>
                                        </tr>
                                        <tr>
                                            <td>Test Key</td>
                                            <td>Jan 5, 2024</td>
                                            <td>Read Only</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <h3 style={{margin: "20px 0 12px", }}>Webhooks</h3>
                                <table style={{fontSize: "0.85rem", }}>
                                    <thead>
                                        <tr>
                                            <th>Event</th>
                                            <th>Endpoint</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>order.created</td>
                                            <td>yourapp.com/webhooks/order</td>
                                            <td><span className="badge badge-success">Active</span></td>
                                        </tr>
                                        <tr>
                                            <td>payment.received</td>
                                            <td>yourapp.com/webhooks/payment</td>
                                            <td><span className="badge badge-success">Active</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
    );
}
