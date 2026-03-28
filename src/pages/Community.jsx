
import React from 'react';

export default function Community({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="community">
                        <h2 style={{marginBottom: "16px", }}>👨‍💼 Seller Community Forum</h2>

                        <div className="panel">
                            <div className="panel-header">
                                <div className="panel-title">Discussion Forums</div>
                            </div>
                            <div className="panel-body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Topic</th>
                                            <th>Posts</th>
                                            <th>Last Activity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>General Discussion</td>
                                            <td>1,234</td>
                                            <td>Now</td>
                                        </tr>
                                        <tr>
                                            <td>Marketing Tips</td>
                                            <td>567</td>
                                            <td>5 min ago</td>
                                        </tr>
                                        <tr>
                                            <td>Product Optimization</td>
                                            <td>892</td>
                                            <td>12 min ago</td>
                                        </tr>
                                        <tr>
                                            <td>Shipping &amp; Logistics</td>
                                            <td>456</td>
                                            <td>1 hour ago</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="panel" style={{marginTop: "20px", }}>
                            <div className="panel-header">
                                <div className="panel-title">💡 Q&amp;A Section</div>
                            </div>
                            <div className="panel-body">
                                <div style={{padding: "12px", background: "var(--primary-light)", borderRadius: "8px", marginBottom: "12px", }}>
                                    <strong>"How to increase conversion rate?"</strong><br />
                                    <span style={{fontSize: "0.85rem", color: "var(--muted)", }}>Asked 2 hours ago • 5
                                        Answers</span>
                                </div>
                                <div style={{padding: "12px", background: "var(--primary-light)", borderRadius: "8px", }}>
                                    <strong>"Best practices for inventory management"</strong><br />
                                    <span style={{fontSize: "0.85rem", color: "var(--muted)", }}>Asked yesterday • 12
                                        Answers</span>
                                </div>
                            </div>
                        </div>
                    </div>
    );
}
