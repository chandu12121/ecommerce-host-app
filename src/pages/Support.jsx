import React, { useEffect, useState } from 'react';
import { featuresService } from '../services/featuresService';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

export default function Support({ isActive = true }) {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isActive) return;

        const loadTickets = async () => {
            try {
                setLoading(true);
                const data = await featuresService.getTickets();
                setTickets(data);
            } catch (err) {
                console.error("Failed fetching Customer Support pipelines:", err);
            } finally {
                setLoading(false);
            }
        };

        loadTickets();
    }, [isActive]);

    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="support">
            <h2 style={{ marginBottom: "16px" }}>💬 Helpdesk & Resolution Center</h2>
            <div className="filters">
                <Input type="text" placeholder="Search Ticket # or Customer Name..." className="search-bar" />
                <select className="input-field" style={{ width: "150px" }}>
                    <option>Show: Open</option>
                    <option>Escalated</option>
                    <option>Resolved</option>
                    <option>Archived</option>
                </select>
                <div style={{ display: 'flex', gap: "10px" }}>
                    <Button variant="secondary">Canned Replies</Button>
                    <Button>+ Create Manual Ticket</Button>
                </div>
            </div>

            <div className="card" style={{ padding: "0" }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Ticket ID</th>
                            <th>Priority Flag</th>
                            <th>Status Matrix</th>
                            <th>Associated Subject</th>
                            <th>Target Customer</th>
                            <th>Elapsed Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>Authenticating Helpdesk Database...</td></tr>
                        ) : tickets.length === 0 ? (
                            <tr><td colSpan="6" style={{ textAlign: "center", padding: "40px", color: "var(--text-light)" }}>
                                <strong>Inbox Zero! 🎉</strong><br />
                                You have zero outstanding customer complaints or tickets requiring administrative action.
                            </td></tr>
                        ) : (
                            tickets.map((ticket) => (
                                <tr key={ticket._id}>
                                    <td style={{ fontWeight: 600 }}>#{ticket._id.substring(ticket._id.length - 8).toUpperCase()}</td>
                                    <td>
                                        <span className={`status-badge ${ticket.priority === 'High' ? 'error' : ticket.priority === 'Medium' ? 'warning' : 'info'}`}>
                                            {ticket.priority} Priority
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${ticket.status === 'Resolved' ? 'success' : 'pending'}`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td style={{ color: "var(--primary)" }}>{ticket.subject}</td>
                                    <td>{ticket.customer?.name || "Anonymous Helpdesk User"}</td>
                                    <td style={{ color: "var(--text-light)" }}>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
