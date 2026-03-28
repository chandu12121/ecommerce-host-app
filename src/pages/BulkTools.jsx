
import React from 'react';

export default function BulkTools({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="bulk-tools">
                        <h2 style={{marginBottom: "16px", }}>⚡ Bulk Operations &amp; Tools</h2>

                        <div className="grid-2">
                            <div className="panel">
                                <div className="panel-header">
                                    <div className="panel-title">Bulk Import</div>
                                </div>
                                <div className="panel-body">
                                    <div className="form-group">
                                        <label>Upload CSV/Excel</label>
                                        <input type="file" placeholder="Select file" />
                                    </div>
                                    <p style={{fontSize: "0.85rem", color: "var(--muted)", marginBottom: "12px", }}>Supported:
                                        CSV, XLSX (Max 10,000 rows)</p>
                                    <button className="btn">Upload &amp; Import</button>
                                </div>
                            </div>

                            <div className="panel">
                                <div className="panel-header">
                                    <div className="panel-title">Bulk Operations</div>
                                </div>
                                <div className="panel-body">
                                    <table style={{fontSize: "0.85rem", }}>
                                        <thead>
                                            <tr>
                                                <th>Operation</th>
                                                <th>Items</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Price Update</td>
                                                <td>45</td>
                                                <td><span className="badge badge-success">Done</span></td>
                                            </tr>
                                            <tr>
                                                <td>Inventory Sync</td>
                                                <td>340</td>
                                                <td><span className="badge badge-info">68%</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
    );
}
