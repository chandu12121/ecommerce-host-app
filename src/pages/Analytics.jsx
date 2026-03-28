
import React from 'react';

export default function Analytics({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="analytics">
                        <h2 style={{marginBottom: "16px", }}>📊 Advanced Analytics &amp; Insights</h2>

                        <div className="grid-2">
                            <div className="chart-container">
                                <canvas id="salesChart"></canvas>
                            </div>
                            <div className="chart-container">
                                <canvas id="categoryChart"></canvas>
                            </div>
                        </div>

                        <div className="grid-2">
                            <div className="chart-container">
                                <canvas id="trafficChart"></canvas>
                            </div>
                            <div className="chart-container">
                                <canvas id="funnelChart"></canvas>
                            </div>
                        </div>
                    </div>
    );
}
