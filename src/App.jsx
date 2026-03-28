import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Chart from 'chart.js/auto';
import './index.css';

// Central UI Layout Setup
import MainLayout from './components/layout/MainLayout';

// Module Imports
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Kyc from './pages/Kyc';
import BankSetup from './pages/BankSetup';
import Policies from './pages/Policies';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Inventory from './pages/Inventory';
import Customers from './pages/Customers';
import Support from './pages/Support';
import Reviews from './pages/Reviews';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Fulfillment from './pages/Fulfillment';
import Campaigns from './pages/Campaigns';
import Coupons from './pages/Coupons';
import Email from './pages/Email';
import Payments from './pages/Payments';
import Invoices from './pages/Invoices';
import Finance from './pages/Finance';
import Tax from './pages/Tax';
import Analytics from './pages/Analytics';
import Forecasting from './pages/Forecasting';
import Reports from './pages/Reports';
import BulkTools from './pages/BulkTools';
import Barcode from './pages/Barcode';
import Suppliers from './pages/Suppliers';
import KeywordTool from './pages/KeywordTool';
import Profile from './pages/Profile';
import Subscription from './pages/Subscription';
import Notifications from './pages/Notifications';
import Team from './pages/Team';
import HelpCenter from './pages/HelpCenter';
import Tutorials from './pages/Tutorials';
import Community from './pages/Community';
import Compliance from './pages/Compliance';
import Security from './pages/Security';
import Integrations from './pages/Integrations';

const ChartInitializer = () => {
    const location = useLocation();

    useEffect(() => {
        // Re-initialize charts natively strictly upon specific tab mount events organically
        const renderCharts = () => {
            ['revenueChart', 'ordersChart', 'salesChart', 'categoryChart', 'conversionChart', 'incomeChart', 'expensesChart', 'trafficChart', 'funnelChart'].forEach(id => {
                const existing = Chart.getChart(id);
                if (existing) existing.destroy();
            });

            const ctx = document.getElementById('revenueChart');
            if (ctx) new Chart(ctx, { type: 'line', data: { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], datasets: [{ label: 'Revenue', data: [120, 190, 150, 220], borderColor: '#e8472a', backgroundColor: 'rgba(232, 71, 42, 0.1)', tension: 0.3 }] }, options: { responsive: true, maintainAspectRatio: false } });

            const ctx2 = document.getElementById('ordersChart');
            if (ctx2) new Chart(ctx2, { type: 'bar', data: { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], datasets: [{ label: 'Orders', data: [800, 950, 850, 1200], backgroundColor: '#f97316' }] }, options: { responsive: true, maintainAspectRatio: false } });

            const ctx3 = document.getElementById('salesChart');
            if (ctx3) new Chart(ctx3, { type: 'line', data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], datasets: [{ label: 'Monthly Sales', data: [250, 320, 280, 400, 450, 487], borderColor: '#e8472a', fill: true, backgroundColor: 'rgba(232, 71, 42, 0.1)' }] }, options: { responsive: true, maintainAspectRatio: false } });

            const ctx4 = document.getElementById('categoryChart');
            if (ctx4) new Chart(ctx4, { type: 'doughnut', data: { labels: ['Electronics', 'Fashion', 'Home', 'Sports'], datasets: [{ data: [567, 234, 189, 89], backgroundColor: ['#e8472a', '#f97316', '#0369a1', '#1a7a4a'] }] }, options: { responsive: true, maintainAspectRatio: false } });
        }
        // Allows DOM propagation
        setTimeout(renderCharts, 100);
    }, [location]);

    return null; // Side Effect Only
};

export default function App() {
    return (
        <BrowserRouter>
            <ChartInitializer />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Advanced Centralized View Wrapper */}
                <Route element={<MainLayout />}>
                    <Route path="/onboarding" element={<Onboarding isActive={true} />} />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/kyc" element={<Kyc isActive={true} />} />
                    <Route path="/bank-setup" element={<BankSetup isActive={true} />} />
                    <Route path="/policies" element={<Policies isActive={true} />} />
                    <Route path="/dashboard" element={<Dashboard isActive={true} />} />
                    <Route path="/orders" element={<Orders isActive={true} />} />
                    <Route path="/products" element={<Products isActive={true} />} />
                    <Route path="/inventory" element={<Inventory isActive={true} />} />
                    <Route path="/customers" element={<Customers isActive={true} />} />
                    <Route path="/support" element={<Support isActive={true} />} />
                    <Route path="/reviews" element={<Reviews isActive={true} />} />
                    <Route path="/shipping" element={<Shipping isActive={true} />} />
                    <Route path="/returns" element={<Returns isActive={true} />} />
                    <Route path="/fulfillment" element={<Fulfillment isActive={true} />} />
                    <Route path="/campaigns" element={<Campaigns isActive={true} />} />
                    <Route path="/coupons" element={<Coupons isActive={true} />} />
                    <Route path="/email" element={<Email isActive={true} />} />
                    <Route path="/payments" element={<Payments isActive={true} />} />
                    <Route path="/invoices" element={<Invoices isActive={true} />} />
                    <Route path="/finance" element={<Finance isActive={true} />} />
                    <Route path="/tax" element={<Tax isActive={true} />} />
                    <Route path="/analytics" element={<Analytics isActive={true} />} />
                    <Route path="/forecasting" element={<Forecasting isActive={true} />} />
                    <Route path="/reports" element={<Reports isActive={true} />} />
                    <Route path="/bulk-tools" element={<BulkTools isActive={true} />} />
                    <Route path="/barcode" element={<Barcode isActive={true} />} />
                    <Route path="/suppliers" element={<Suppliers isActive={true} />} />
                    <Route path="/keyword-tool" element={<KeywordTool isActive={true} />} />
                    <Route path="/profile" element={<Profile isActive={true} />} />
                    <Route path="/subscription" element={<Subscription isActive={true} />} />
                    <Route path="/notifications" element={<Notifications isActive={true} />} />
                    <Route path="/team" element={<Team isActive={true} />} />
                    <Route path="/help-center" element={<HelpCenter isActive={true} />} />
                    <Route path="/tutorials" element={<Tutorials isActive={true} />} />
                    <Route path="/community" element={<Community isActive={true} />} />
                    <Route path="/compliance" element={<Compliance isActive={true} />} />
                    <Route path="/security" element={<Security isActive={true} />} />
                    <Route path="/integrations" element={<Integrations isActive={true} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
