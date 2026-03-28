
import React from 'react';

export default function Forecasting({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="forecasting">
                        <h2 style={{marginBottom: "16px", }}>🔮 Sales Forecasting &amp; Inventory Prediction</h2>

                        <div className="panel">
                            <div className="panel-header">
                                <div className="panel-title">AI-Powered Forecasts</div>
                            </div>
                            <div className="panel-body">
                                <h3 style={{marginBottom: "12px", }}>📈 Next 30 Days Projection</h3>
                                <div className="kpi-grid">
                                    <div className="stat-box">
                                        <div className="stat-label">Projected Revenue</div>
                                        <div className="stat-value">$650K</div>
                                        <div style={{fontSize: "0.8rem", color: "var(--success)", }}>↑ +35% vs current</div>
                                    </div>
                                    <div className="stat-box">
                                        <div className="stat-label">Expected Orders</div>
                                        <div className="stat-value">4,200</div>
                                        <div style={{fontSize: "0.8rem", color: "var(--success)", }}>↑ +29%</div>
                                    </div>
                                    <div className="stat-box">
                                        <div className="stat-label">Recommended Stock</div>
                                        <div className="stat-value">45K units</div>
                                        <div style={{fontSize: "0.8rem", color: "var(--success)", }}>↑ +8K needed</div>
                                    </div>
                                    <div className="stat-box">
                                        <div className="stat-label">Peak Season Date</div>
                                        <div className="stat-value">Dec 26</div>
                                        <div style={{fontSize: "0.8rem", }}>3,200 daily orders</div>
                                    </div>
                                </div>

                                <h3 style={{margin: "20px 0 12px", }}>🎯 Product Recommendations</h3>
                                <ul style={{marginLeft: "20px", }}>
                                    <li>📈 iPhone 15 Pro - Will peak on Dec 26 (stock up 30%)</li>
                                    <li>🔴 Sony Camera - May face shortage, reorder immediately</li>
                                    <li>📊 MacBook Pro - Steady demand, current stock sufficient</li>
                                </ul>
                            </div>
                        </div>
                    </div>
    );
}
