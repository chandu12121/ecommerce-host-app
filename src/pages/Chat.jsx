
import React from 'react';

export default function Chat({ isActive }) {
    return (
        <div className={`section ${isActive ? 'active' : ''}`} id="chat">
                    <h2 style={{marginBottom: "16px", }}>💬 Live Chat Support</h2>
                    <div className="panel">
                        <div className="panel-header">
                            <div className="panel-title">Active Conversations (8)</div>
                            <button className="panel-action">Chat Settings</button>
                        </div>
                        <div className="panel-body">
                            <div className="grid-2">
                                <div>
                                    <h3 style={{marginBottom: "12px", }}>Sarah Johnson</h3>
                                    <div className="chat-container">
                                        <div className="chat-messages">
                                            <div className="chat-message customer">Hi, do you have this in blue?</div>
                                            <div className="chat-message support">Yes! We have blue in stock. Which size?
                                            </div>
                                            <div className="chat-message customer">Medium please!</div>
                                        </div>
                                        <div style={{padding: "12px", borderTop: "1px solid var(--border)", display: "flex", gap: "8px", }}>
                                            <input type="text" placeholder="Type message..." style={{flex: "1", }} />
                                            <button className="btn" style={{width: "auto", }}>Send</button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 style={{marginBottom: "12px", }}>Michael Chen</h3>
                                    <div className="chat-container">
                                        <div className="chat-messages">
                                            <div className="chat-message customer">What's the return policy?</div>
                                            <div className="chat-message support">30-day hassle-free returns. Full refund!
                                            </div>
                                            <div className="chat-message customer">Perfect!</div>
                                        </div>
                                        <div style={{padding: "12px", borderTop: "1px solid var(--border)", display: "flex", gap: "8px", }}>
                                            <input type="text" placeholder="Type message..." style={{flex: "1", }} />
                                            <button className="btn" style={{width: "auto", }}>Send</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
}
