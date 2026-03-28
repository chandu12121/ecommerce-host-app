
import React from 'react';

export default function Team({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="team">
                        <h2 style={{marginBottom: "16px", }}>👥 Team Management &amp; Collaboration</h2>

                        <div className="panel">
                            <div className="panel-header">
                                <div className="panel-title">Team Members (5)</div><button className="panel-action">+ Add
                                    Member</button>
                            </div>
                            <div className="panel-body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>You</td>
                                            <td>owner@store.com</td>
                                            <td>Owner</td>
                                            <td><span className="badge badge-success">Active</span></td>
                                        </tr>
                                        <tr>
                                            <td>Sarah</td>
                                            <td>sarah@store.com</td>
                                            <td>Manager</td>
                                            <td><span className="badge badge-success">Active</span></td>
                                        </tr>
                                        <tr>
                                            <td>John</td>
                                            <td>john@store.com</td>
                                            <td>Support</td>
                                            <td><span className="badge badge-success">Active</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="panel" style={{marginTop: "20px", }}>
                            <div className="panel-header">
                                <div className="panel-title">Tasks &amp; Assignments</div><button className="panel-action">+ New
                                    Task</button>
                            </div>
                            <div className="panel-body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Task</th>
                                            <th>Assigned To</th>
                                            <th>Status</th>
                                            <th>Due</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Review returns</td>
                                            <td>John</td>
                                            <td><span className="badge badge-info">In Progress</span></td>
                                            <td>Dec 20</td>
                                        </tr>
                                        <tr>
                                            <td>Update images</td>
                                            <td>Sarah</td>
                                            <td><span className="badge badge-warning">Pending</span></td>
                                            <td>Dec 22</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
    );
}
