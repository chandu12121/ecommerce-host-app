
import React from 'react';

export default function Suppliers({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="suppliers">
                        <h2 style={{marginBottom: "16px", }}>🤝 Supplier Management</h2>

                        <div className="panel">
                            <div className="panel-header">
                                <div className="panel-title">Suppliers Directory</div><button className="panel-action">+ Add
                                    Supplier</button>
                            </div>
                            <div className="panel-body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Supplier</th>
                                            <th>Contact</th>
                                            <th>Products</th>
                                            <th>Rating</th>
                                            <th>Lead Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Apple Distributor</td>
                                            <td>+91 9999...</td>
                                            <td>45</td>
                                            <td>4.8★</td>
                                            <td>3-5 days</td>
                                        </tr>
                                        <tr>
                                            <td>Samsung Wholesale</td>
                                            <td>+91 8888...</td>
                                            <td>32</td>
                                            <td>4.6★</td>
                                            <td>5-7 days</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
    );
}
