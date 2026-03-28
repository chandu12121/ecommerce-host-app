
import React from 'react';

export default function Tutorials({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="tutorials">
                        <h2 style={{marginBottom: "16px", }}>🎥 Video Tutorials &amp; Learning</h2>

                        <div className="grid-2">
                            <div className="panel">
                                <div className="panel-header">
                                    <div className="panel-title">🎬 Getting Started Series</div>
                                </div>
                                <div className="panel-body">
                                    <div style={{marginBottom: "12px", }}>
                                        <strong style={{display: "block", marginBottom: "4px", }}>1. Seller
                                            Registration</strong>
                                        <a href="#" style={{color: "var(--primary)", fontSize: "0.85rem", }}>Watch Video (5
                                            min)</a>
                                    </div>
                                    <div style={{marginBottom: "12px", }}>
                                        <strong style={{display: "block", marginBottom: "4px", }}>2. KYC Verification</strong>
                                        <a href="#" style={{color: "var(--primary)", fontSize: "0.85rem", }}>Watch Video (3
                                            min)</a>
                                    </div>
                                    <div style={{marginBottom: "12px", }}>
                                        <strong style={{display: "block", marginBottom: "4px", }}>3. Add Your First
                                            Product</strong>
                                        <a href="#" style={{color: "var(--primary)", fontSize: "0.85rem", }}>Watch Video (8
                                            min)</a>
                                    </div>
                                </div>
                            </div>

                            <div className="panel">
                                <div className="panel-header">
                                    <div className="panel-title">🚀 Advanced Training</div>
                                </div>
                                <div className="panel-body">
                                    <div style={{marginBottom: "12px", }}>
                                        <strong style={{display: "block", marginBottom: "4px", }}>Bulk Product Upload</strong>
                                        <a href="#" style={{color: "var(--primary)", fontSize: "0.85rem", }}>Watch Video (10
                                            min)</a>
                                    </div>
                                    <div style={{marginBottom: "12px", }}>
                                        <strong style={{display: "block", marginBottom: "4px", }}>Marketing Campaigns</strong>
                                        <a href="#" style={{color: "var(--primary)", fontSize: "0.85rem", }}>Watch Video (12
                                            min)</a>
                                    </div>
                                    <div style={{marginBottom: "12px", }}>
                                        <strong style={{display: "block", marginBottom: "4px", }}>Analytics &amp; Growth</strong>
                                        <a href="#" style={{color: "var(--primary)", fontSize: "0.85rem", }}>Watch Video (15
                                            min)</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="panel" style={{marginTop: "20px", }}>
                            <div className="panel-header">
                                <div className="panel-title">📚 Certification Courses</div>
                            </div>
                            <div className="panel-body">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Course</th>
                                            <th>Duration</th>
                                            <th>Level</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Seller Mastery 101</td>
                                            <td>6 hours</td>
                                            <td>Beginner</td>
                                            <td><a href="#" style={{color: "var(--primary)", }}>Enroll</a></td>
                                        </tr>
                                        <tr>
                                            <td>Advanced Marketing</td>
                                            <td>8 hours</td>
                                            <td>Intermediate</td>
                                            <td><a href="#" style={{color: "var(--primary)", }}>Enroll</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
    );
}
