
import React from 'react';

export default function Settings({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="settings">
                    <h2 style={{marginBottom: "16px", }}>⚡ Store Settings</h2>
                    <div className="panel">
                        <div className="panel-header">
                            <div className="panel-title">General Settings</div>
                        </div>
                        <div className="panel-body">
                            <div className="form-group">
                                <label>Store Name</label>
                                <input type="text" value="TechPro Electronics" />
                            </div>
                            <div className="form-group">
                                <label>Store URL</label>
                                <input type="text" value="techproelectronics.megamart.com" />
                            </div>
                            <div className="form-group">
                                <label>Store Description</label>
                                <textarea>Premium electronics and gadgets with fast shipping</textarea>
                            </div>
                            <button className="btn">Save Changes</button>
                        </div>
                    </div>
                </div>
    );
}
