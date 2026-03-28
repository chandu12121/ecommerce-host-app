import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function Topbar({ pageTitle }) {
    const [user, setUser] = useState(null);
    const [unreadNotifs, setUnreadNotifs] = useState(0);

    useEffect(() => {
        const stored = localStorage.getItem('hostInfo');
        if (stored) {
            const parsed = JSON.parse(stored);
            setUser(parsed);
        }
        // Load unread notifications count
        api.get('/host/features/tickets').then(res => {
            const open = res.data?.filter(t => t.status !== 'Resolved')?.length || 0;
            setUnreadNotifs(open);
        }).catch(() => { });
    }, []);

    const initial = user?.name ? user.name.charAt(0).toUpperCase() : '?';

    const handleLogout = () => {
        localStorage.removeItem('hostInfo');
        window.location.href = '/login';
    };

    return (
        <div className="topbar">
            <div className="topbar-left">
                <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.4rem", color: "var(--ink)" }}>{pageTitle}</h1>
                <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '20px', fontSize: '0.85rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600, padding: '6px 12px', border: '1px solid var(--primary)', borderRadius: '6px' }}>
                    View Customer Store 🛒
                </a>
                {user?.role === 'admin' && (
                    <a href="http://localhost:3002" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px', fontSize: '0.85rem', color: '#8b5cf6', textDecoration: 'none', fontWeight: 600, padding: '6px 12px', border: '1px solid #8b5cf6', borderRadius: '6px' }}>
                        Admin Portal 🔑
                    </a>
                )}
            </div>
            <div className="topbar-right">
                <Link to="/notifications" style={{ textDecoration: 'none' }}>
                    <div className="topbar-btn">
                        🔔
                        {unreadNotifs > 0 && <div className="topbar-badge">{unreadNotifs}</div>}
                    </div>
                </Link>
                <Link to="/support" style={{ textDecoration: 'none' }}>
                    <div className="topbar-btn">💬</div>
                </Link>
                <Link to="/security" style={{ textDecoration: 'none' }}>
                    <div className="topbar-btn">⚙️</div>
                </Link>
                <div
                    className="avatar"
                    title={`${user?.name || 'Host'} — Click to logout`}
                    onClick={handleLogout}
                    style={{ cursor: 'pointer' }}
                >
                    {initial}
                </div>
            </div>
        </div>
    );
}
