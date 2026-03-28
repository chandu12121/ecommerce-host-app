
import React from 'react';

export default function Reports({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="reports">
                        <h2 style={{marginBottom: "16px", }}>📄 Reports &amp; Data Exports</h2>

                        <div className="panel">
                            <div className="panel-header">
                                <div className="panel-title">Available Reports</div>
                            </div>
                            <div className="panel-body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Report Type</th>
                                            <th>Period</th>
                                            <th>Format</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Monthly Sales Summary</td>
                                            <td>December</td>
                                            <td>PDF/Excel</td>
                                            <td><a href="#" style={{color: "var(--primary)", }}>Download</a></td>
                                        </tr>
                                        <tr>
                                            <td>Customer Analytics</td>
                                            <td>December</td>
                                            <td>PDF</td>
                                            <td><a href="#" style={{color: "var(--primary)", }}>Download</a></td>
                                        </tr>
                                        <tr>
                                            <td>Inventory Report</td>
                                            <td>Current</td>
                                            <td>Excel</td>
                                            <td><a href="#" style={{color: "var(--primary)", }}>Download</a></td>
                                        </tr>
                                        <tr>
                                            <td>Tax Report</td>
                                            <td>Q4 2024</td>
                                            <td>PDF</td>
                                            <td><a href="#" style={{color: "var(--primary)", }}>Download</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
    );
}
