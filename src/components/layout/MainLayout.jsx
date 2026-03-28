import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function MainLayout() {
    const location = useLocation();

    // Dynamically derive the page title from the Route Pathname cleanly
    const pathName = location.pathname.split('/').pop() || 'dashboard';
    const pageTitle = pathName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <div className="app-wrapper">
            <Sidebar currentPath={location.pathname} />
            <div className="main-content">
                <Topbar pageTitle={pageTitle} />
                <div className="content">
                    {/* The Active Component Injects Here */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
