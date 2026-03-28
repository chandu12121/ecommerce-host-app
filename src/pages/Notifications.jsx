
import React from 'react';

export default function Notifications({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="notifications">
                        <h2 style={{marginBottom: "16px", }}>🔔 Notifications &amp; Alerts Center</h2>

                        <div className="panel">
                            <div className="panel-header">
                                <div className="panel-title">Notification Preferences</div>
                            </div>
                            <div className="panel-body">
                                <div style={{marginBottom: "20px", }}>
                                    <label style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", }}>
                                        <span>📧 Email Notifications</span>
                                        <div className="toggle" onclick="this.querySelector('.toggle-switch').classList.toggle('on'); event.stopPropagation();">
                                            <div className="toggle-switch on">
                                                <div className="toggle-dot"></div>
                                            </div>
                                        </div>
                                    </label>

                                    <label style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", }}>
                                        <span>💬 SMS Notifications</span>
                                        <div className="toggle" onclick="this.querySelector('.toggle-switch').classList.toggle('on'); event.stopPropagation();">
                                            <div className="toggle-switch">
                                                <div className="toggle-dot"></div>
                                            </div>
                                        </div>
                                    </label>

                                    <label style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", }}>
                                        <span>🔔 Push Notifications</span>
                                        <div className="toggle" onclick="this.querySelector('.toggle-switch').classList.toggle('on'); event.stopPropagation();">
                                            <div className="toggle-switch on">
                                                <div className="toggle-dot"></div>
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                <h3 style={{marginBottom: "12px", }}>Alert Types</h3>
                                <div style={{fontSize: "0.85rem", }}>
                                    <label style={{display: "block", marginBottom: "8px", }}><input type="checkbox" checked="" />
                                        New Orders</label>
                                    <label style={{display: "block", marginBottom: "8px", }}><input type="checkbox" checked="" />
                                        Low Stock Alerts</label>
                                    <label style={{display: "block", marginBottom: "8px", }}><input type="checkbox" checked="" />
                                        Returns &amp; Disputes</label>
                                    <label style={{display: "block", marginBottom: "8px", }}><input type="checkbox" /> Policy
                                        Violations</label>
                                    <label style={{display: "block", marginBottom: "8px", }}><input type="checkbox" /> Marketing
                                        Campaigns</label>
                                </div>

                                <button className="btn" style={{marginTop: "16px", }}>Save Preferences</button>
                            </div>
                        </div>

                        <div className="panel" style={{marginTop: "20px", }}>
                            <div className="panel-header">
                                <div className="panel-title">Notification History</div>
                            </div>
                            <div className="panel-body">
                                <div className="notification-item">
                                    <div className="notification-icon">📦</div>
                                    <div className="notification-content">
                                        <div className="notification-title">New Order Received</div>
                                        <div className="notification-desc">Order #15847 from Sarah Johnson - $999</div>
                                    </div>
                                </div>
                                <div className="notification-item">
                                    <div className="notification-icon">⚠️</div>
                                    <div className="notification-content">
                                        <div className="notification-title">Low Stock Alert</div>
                                        <div className="notification-desc">Sony A7R V Camera - Only 12 units left</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    );
}
