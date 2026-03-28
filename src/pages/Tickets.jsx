
import React from 'react';

export default function Tickets({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="tickets">
                    <h2 style={{marginBottom: "16px", }}>🎫 Support Tickets (3 Pending)</h2>
                    <div className="panel">
                        <div className="panel-header">
                            <div className="panel-title">Open Tickets</div>
                            <button className="panel-action">+ New Ticket</button>
                        </div>
                        <div className="panel-body">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Ticket ID</th>
                                        <th>Customer</th>
                                        <th>Subject</th>
                                        <th>Priority</th>
                                        <th>Status</th>
                                        <th>Created</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>#TK-001</td>
                                        <td>John Doe</td>
                                        <td>Order delay</td>
                                        <td><span className="badge badge-error">High</span></td>
                                        <td><span className="badge badge-warning">Open</span></td>
                                        <td>2 hrs ago</td>
                                    </tr>
                                    <tr>
                                        <td>#TK-002</td>
                                        <td>Jane Smith</td>
                                        <td>Refund inquiry</td>
                                        <td><span className="badge" style={{background: "#fef3c7", color: "#92400e", }}>Medium</span>
                                        </td>
                                        <td><span className="badge badge-info">In Progress</span></td>
                                        <td>4 hrs ago</td>
                                    </tr>
                                    <tr>
                                        <td>#TK-003</td>
                                        <td>Bob Wilson</td>
                                        <td>Product defect</td>
                                        <td><span className="badge badge-error">High</span></td>
                                        <td><span className="badge badge-warning">Open</span></td>
                                        <td>6 hrs ago</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
    );
}
