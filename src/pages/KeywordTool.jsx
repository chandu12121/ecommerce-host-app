
import React from 'react';

export default function KeywordTool({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="keyword-tool">
                        <h2 style={{marginBottom: "16px", }}>🔍 Keyword Research &amp; SEO</h2>

                        <div className="panel">
                            <div className="panel-header">
                                <div className="panel-title">Keyword Research Tool</div>
                            </div>
                            <div className="panel-body">
                                <div className="form-group">
                                    <label>Enter Keyword</label>
                                    <input type="text" placeholder="e.g., iPhone 15 Pro" />
                                </div>
                                <button className="btn">Search</button>

                                <div style={{marginTop: "20px", }}>
                                    <h3 style={{marginBottom: "12px", }}>Search Results</h3>
                                    <table style={{fontSize: "0.85rem", }}>
                                        <thead>
                                            <tr>
                                                <th>Keyword</th>
                                                <th>Search Volume</th>
                                                <th>Competition</th>
                                                <th>Difficulty</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>iPhone 15 Pro</td>
                                                <td>125K</td>
                                                <td>High</td>
                                                <td>85/100</td>
                                            </tr>
                                            <tr>
                                                <td>iPhone 15 price</td>
                                                <td>89K</td>
                                                <td>High</td>
                                                <td>78/100</td>
                                            </tr>
                                            <tr>
                                                <td>buy iPhone 15 online</td>
                                                <td>45K</td>
                                                <td>Medium</td>
                                                <td>62/100</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
    );
}
