
import React from 'react';

export default function Barcode({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="barcode">
                        <h2 style={{marginBottom: "16px", }}>📊 Barcode &amp; Label Generator</h2>

                        <div className="panel">
                            <div className="panel-header">
                                <div className="panel-title">Generate Barcodes</div>
                            </div>
                            <div className="panel-body">
                                <div className="form-group">
                                    <label>Product SKU</label>
                                    <input type="text" placeholder="SKU-IP15-256" />
                                </div>
                                <div className="form-group">
                                    <label>Quantity</label>
                                    <input type="number" value="100" />
                                </div>
                                <button className="btn">Generate &amp; Print</button>
                            </div>
                        </div>
                    </div>
    );
}
