
import React from 'react';

export default function HelpCenter({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="help-center">
                        <h2 style={{marginBottom: "16px", }}>❓ Help Center &amp; Knowledge Base</h2>

                        <div className="help-search">
                            <input type="text" placeholder="🔍 Search help articles..." style={{padding: "12px", fontSize: "1rem", }} />
                        </div>

                        <div className="help-category">
                            <h3>📚 Getting Started</h3>
                            <div className="help-item">Setup Wizard - Complete your seller profile</div>
                            <div className="help-item">Add Your First Product - List and manage products</div>
                            <div className="help-item">Configure Shipping - Set up shipping methods</div>
                        </div>

                        <div className="help-category">
                            <h3>📦 Products &amp; Orders</h3>
                            <div className="help-item">Bulk Upload Products - Import CSV/Excel</div>
                            <div className="help-item">Manage Variants - Create size/color options</div>
                            <div className="help-item">Order Management - Process and track orders</div>
                        </div>

                        <div className="help-category">
                            <h3>💰 Financial</h3>
                            <div className="help-item">Payment Settlement - How payouts work</div>
                            <div className="help-item">Commission Structure - Fee details</div>
                            <div className="help-item">Tax Reporting - GST compliance</div>
                        </div>

                        <div className="help-category">
                            <h3>🚚 Shipping &amp; Returns</h3>
                            <div className="help-item">Shipping Rates - Calculate shipping costs</div>
                            <div className="help-item">Return Management - Handle customer returns</div>
                            <div className="help-item">Tracking Setup - Enable shipment tracking</div>
                        </div>
                    </div>
    );
}
