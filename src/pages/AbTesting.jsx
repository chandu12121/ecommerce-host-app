
import React from 'react';

export default function AbTesting({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="ab-testing">
                    <h2 style={{marginBottom: "16px", }}>🧪 A/B Testing &amp; Optimization</h2>
                    <div className="panel">
                        <div className="panel-header">
                            <div className="panel-title">Active Tests</div>
                            <button className="panel-action">+ New Test</button>
                        </div>
                        <div className="panel-body">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Test Name</th>
                                        <th>Element</th>
                                        <th>Variant A</th>
                                        <th>Variant B</th>
                                        <th>Conversions A</th>
                                        <th>Conversions B</th>
                                        <th>Winner</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Product Page CTA</td>
                                        <td>Button Text</td>
                                        <td>"Buy Now"</td>
                                        <td>"Add to Cart"</td>
                                        <td>234</td>
                                        <td>267</td>
                                        <td>Variant B ✓</td>
                                    </tr>
                                    <tr>
                                        <td>Checkout Price</td>
                                        <td>Discount Display</td>
                                        <td>"Save $50"</td>
                                        <td>"$49.99"</td>
                                        <td>456</td>
                                        <td>512</td>
                                        <td>Variant B ✓</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
    );
}
