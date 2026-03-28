
import React from 'react';

export default function Fulfillment({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="fulfillment">
                        <h2 style={{marginBottom: "16px", }}>📦 Multi-Warehouse Fulfillment</h2>

                        <div className="panel">
                            <div className="panel-header">
                                <div className="panel-title">Warehouse Status</div>
                            </div>
                            <div className="panel-body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Warehouse</th>
                                            <th>Location</th>
                                            <th>Stock</th>
                                            <th>Capacity</th>
                                            <th>Pending Orders</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Primary</td>
                                            <td>Mumbai</td>
                                            <td>18,543</td>
                                            <td>87%</td>
                                            <td>12</td>
                                        </tr>
                                        <tr>
                                            <td>Secondary</td>
                                            <td>Delhi</td>
                                            <td>7,234</td>
                                            <td>62%</td>
                                            <td>5</td>
                                        </tr>
                                        <tr>
                                            <td>Regional</td>
                                            <td>Bangalore</td>
                                            <td>11,456</td>
                                            <td>75%</td>
                                            <td>8</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
    );
}
