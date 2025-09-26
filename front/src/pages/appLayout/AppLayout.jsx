import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Sidebar from '../../components/Sidebar.jsx';
import SideBarOptionsService from '../../services/SideBarOptionsService.js';

const AppLayout = () => {
    const { user, availableRoutesSideBar, isAuthenticated } = useAuth();
    const location = useLocation();

    const publicRoutes = ['/login', '/unauthorized'];
    if (publicRoutes.includes(location.pathname) || !isAuthenticated) {
        return <Outlet />;
    }

    const sidebarOptions = SideBarOptionsService.getOptions([user?.rol_nombre || '']);
    const filteredSidebarOptions = sidebarOptions.filter((option) => {
        return availableRoutesSideBar.includes(option.path);
    });

    return (
        <div className="d-flex min-vh-100">
            <Sidebar sidebarOptions={filteredSidebarOptions} />
            
            <main className="flex-grow-1 d-none d-md-block p-4" style={{ marginLeft: '250px' }}>
                <Outlet />
            </main>
            <main className="flex-grow-1 d-md-none pt-5 p-3">
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;