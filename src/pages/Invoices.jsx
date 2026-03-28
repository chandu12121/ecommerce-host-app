import React, { useState, useEffect } from 'react';
import paymentApi from '../services/paymentApi';

export default function Invoices({ isActive }) {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isActive) return;

        const fetchInvoices = async () => {
            try {
                // Fetch user-specific (host) invoices from Payment Service
                const response = await paymentApi.get('/invoices/history');
                setInvoices(response.data.data || []);
            } catch (err) {
                console.error("Failed to fetch invoices", err);
            } finally {
                setLoading(false);
            }
        };
        fetchInvoices();
    }, [isActive]);

    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="invoices">
            <h2 style={{ marginBottom: "16px" }}>🧾 Invoice &amp; Document Generation</h2>

            <div className="panel">
                <div className="panel-header">
                    <div className="panel-title">Recent Invoices</div>
                </div>
                <div className="panel-body">
                    {loading ? (
                        <div style={{ padding: '20px', textAlign: 'center' }}>Synchronizing with Payment Gateway...</div>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Invoice #</th>
                                    <th>Transaction</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.length > 0 ? invoices.map(inv => (
                                    <tr key={inv._id}>
                                        <td>{inv.invoiceNumber}</td>
                                        <td>{inv.transactionId?.transactionNumber || 'N/A'}</td>
                                        <td>₹{inv.totalAmount}</td>
                                        <td>{new Date(inv.createdAt).toLocaleDateString()}</td>
                                        <td><span className={`badge badge-${inv.status === 'paid' ? 'success' : 'warning'}`}>{inv.status}</span></td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center' }}>No historical invoices detected.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
