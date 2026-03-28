import React, { useEffect, useState } from 'react';
import { featuresService } from '../services/featuresService';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

export default function Campaigns({ isActive = true }) {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isActive) return;

        const loadCampaigns = async () => {
            try {
                setLoading(true);
                const data = await featuresService.getCampaigns();
                setCampaigns(data);
            } catch (err) {
                console.error("Failed fetching internal marketing loops:", err);
            } finally {
                setLoading(false);
            }
        };

        loadCampaigns();
    }, [isActive]);

    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="campaigns">
            <h2 style={{ marginBottom: "16px" }}>📢 Marketing Campaigns</h2>
            <div className="filters">
                <Input type="text" placeholder="Search Campaign Title..." className="search-bar" />
                <select className="input-field" style={{ width: "150px" }}>
                    <option>Status: Active</option>
                    <option>Paused</option>
                    <option>Completed</option>
                    <option>Draft</option>
                </select>
                <div style={{ display: 'flex', gap: "10px" }}>
                    <Button variant="secondary">Campaign ROI Map</Button>
                    <Button>+ Create New Ad Campaign</Button>
                </div>
            </div>

            <div className="card" style={{ padding: "0" }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Campaign Name</th>
                            <th>Type Focus</th>
                            <th>Status</th>
                            <th>Budget Limit</th>
                            <th>Current Spend</th>
                            <th>Views / Clicks</th>
                            <th>Calculated ROI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>Analyzing Advertising Datasets...</td></tr>
                        ) : campaigns.length === 0 ? (
                            <tr><td colSpan="7" style={{ textAlign: "center", padding: "40px", color: "var(--text-light)" }}>
                                <strong>You have no active Ad Campaigns.</strong><br />
                                Launch your first Banner Ad or Carousel internally to boost store traffic directly within the e-commerce search algorithm.
                            </td></tr>
                        ) : (
                            campaigns.map((camp) => (
                                <tr key={camp._id}>
                                    <td style={{ fontWeight: 600, color: "var(--primary)" }}>{camp.name}</td>
                                    <td>{camp.type}</td>
                                    <td>
                                        <span className={`status-badge ${camp.status === 'Active' ? 'success' : 'pending'}`}>
                                            {camp.status}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: 600 }}>${camp.budget?.toLocaleString() || '0.00'}</td>
                                    <td>{camp.metrics?.opens?.toLocaleString() || 0} opens</td>
                                    <td>{camp.metrics?.opens || 0} / {camp.metrics?.clicks || 0}</td>
                                    <td style={{ color: "var(--success)", fontWeight: 600 }}>
                                        {camp.metrics?.revenueGenerated > 0
                                            ? `$${camp.metrics.revenueGenerated.toLocaleString()}`
                                            : 'N/A'
                                        }
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
