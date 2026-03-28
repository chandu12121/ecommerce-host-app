
import React from 'react';

export default function MarketingAnalytics({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="marketing-analytics">
                    <h2 style={{marginBottom: "16px", }}>📊 Marketing Analytics</h2>
                    <div className="chart-container">
                        <canvas id="conversionChart"></canvas>
                    </div>
                </div>
    );
}
