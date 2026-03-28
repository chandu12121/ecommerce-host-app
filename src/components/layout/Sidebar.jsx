import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const baseNavStructure = [
    { "title": "Onboarding", "items": [{ "id": "onboarding", "emoji": "🚀", "label": "Setup Wizard", "badge": null }, { "id": "kyc", "emoji": "✅", "label": "KYC Verification", "badge": null }, { "id": "bank-setup", "emoji": "🏦", "label": "Bank Setup", "badge": null }, { "id": "policies", "emoji": "📋", "label": "Policies", "badge": null }] },
    { "title": "Business", "items": [{ "id": "dashboard", "emoji": "📊", "label": "Dashboard", "badge": null }, { "id": "orders", "emoji": "📦", "label": "Orders", "badgeKey": "ordersCount" }, { "id": "products", "emoji": "🎁", "label": "Products", "badge": null }, { "id": "inventory", "emoji": "📈", "label": "Inventory", "badgeKey": "inventoryCount" }] },
    { "title": "Customers", "items": [{ "id": "customers", "emoji": "👥", "label": "Customers", "badge": null }, { "id": "support", "emoji": "💬", "label": "Support", "badgeKey": "openTickets" }, { "id": "reviews", "emoji": "⭐", "label": "Reviews", "badge": null }] },
    { "title": "Operations", "items": [{ "id": "shipping", "emoji": "🚚", "label": "Shipping", "badge": null }, { "id": "returns", "emoji": "🔄", "label": "Returns", "badge": null }, { "id": "fulfillment", "emoji": "📦", "label": "Fulfillment", "badge": null }] },
    { "title": "Marketing", "items": [{ "id": "campaigns", "emoji": "📢", "label": "Campaigns", "badge": null }, { "id": "coupons", "emoji": "🎟️", "label": "Coupons", "badge": null }, { "id": "email", "emoji": "📧", "label": "Email", "badge": null }] },
    { "title": "Financial", "items": [{ "id": "payments", "emoji": "💳", "label": "Payments", "badge": null }, { "id": "invoices", "emoji": "🧾", "label": "Invoices", "badge": null }, { "id": "finance", "emoji": "💰", "label": "Finance", "badge": null }, { "id": "tax", "emoji": "📋", "label": "Tax", "badge": null }] },
    { "title": "Insights", "items": [{ "id": "analytics", "emoji": "📊", "label": "Analytics", "badge": null }, { "id": "forecasting", "emoji": "🔮", "label": "Forecasting", "badge": null }, { "id": "reports", "emoji": "📄", "label": "Reports", "badge": null }] },
    { "title": "Tools", "items": [{ "id": "bulk-tools", "emoji": "⚡", "label": "Bulk Tools", "badge": null }, { "id": "barcode", "emoji": "📊", "label": "Barcode", "badge": null }, { "id": "suppliers", "emoji": "🤝", "label": "Suppliers", "badge": null }, { "id": "keyword-tool", "emoji": "🔍", "label": "Keywords", "badge": null }] },
    { "title": "Account", "items": [{ "id": "profile", "emoji": "👤", "label": "Profile", "badge": null }, { "id": "subscription", "emoji": "💎", "label": "Plans", "badge": null }, { "id": "notifications", "emoji": "🔔", "label": "Notifications", "badge": null }, { "id": "team", "emoji": "👥", "label": "Team", "badge": null }] },
    { "title": "Help", "items": [{ "id": "help-center", "emoji": "❓", "label": "Help Center", "badge": null }, { "id": "tutorials", "emoji": "🎥", "label": "Tutorials", "badge": null }, { "id": "community", "emoji": "👨‍💼", "label": "Community", "badge": null }] },
    { "title": "Compliance", "items": [{ "id": "compliance", "emoji": "⚖️", "label": "Legal", "badge": null }, { "id": "security", "emoji": "🔒", "label": "Security", "badge": null }, { "id": "integrations", "emoji": "🔗", "label": "Integrations", "badge": null }] }
];

export default function Sidebar({ currentPath }) {
    const [badges, setBadges] = useState({ ordersCount: null, inventoryCount: null, openTickets: null });

    useEffect(() => {
        const loadBadges = async () => {
            try {
                const [ordersRes, productsRes, ticketsRes] = await Promise.all([
                    api.get('/host/orders').catch(() => ({ data: [] })),
                    api.get('/host/items').catch(() => ({ data: [] })),
                    api.get('/host/features/tickets').catch(() => ({ data: [] }))
                ]);
                setBadges({
                    ordersCount: ordersRes.data?.length || null,
                    inventoryCount: productsRes.data?.length || null,
                    openTickets: ticketsRes.data?.filter(t => t.status !== 'Resolved')?.length || null
                });
            } catch (err) {
                // Silently fail — badges are cosmetic
            }
        };
        loadBadges();
    }, []);

    return (
        <div className="sidebar">
            <div className="logo-section">
                <div className="logo-mark">🛍️</div>
                <div className="logo-text">Mega<span>Mart</span></div>
            </div>
            {baseNavStructure.map((group, i) => (
                <div className="nav-section" key={i}>
                    <div className="nav-section-title">{group.title}</div>
                    {group.items.map(nav => {
                        const badgeValue = nav.badgeKey ? badges[nav.badgeKey] : nav.badge;
                        return (
                            <Link
                                to={`/${nav.id}`}
                                key={nav.id}
                                style={{ textDecoration: 'none' }}
                            >
                                <div className={`nav-item ${currentPath.includes(nav.id) ? 'active' : ''}`}>
                                    <div className="nav-icon">{nav.emoji}</div><span>{nav.label}</span>
                                    {badgeValue ? <div className="nav-badge">{badgeValue}</div> : null}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
