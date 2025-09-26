import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import SideBarOptionsService from "../services/SideBarOptionsService.js";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [availableRoutesSideBar, setAvailableRoutesSideBar] = useState([]);
    const loginUrl = import.meta.env.VITE_LOGIN_URL;

    const loadUserFromToken = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setUser(null);
            setAvailableRoutesSideBar([]);
            setLoading(false);
            return;
        }
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                console.log('Token expirado');
                logout();
                return;
            }
            let roles = [];
            if (typeof decodedToken.rol_nombre === 'string') {
                roles = [decodedToken.rol_nombre];
            } else if (Array.isArray(decodedToken.rol_nombre)) {
                roles = decodedToken.rol_nombre.map(role =>
                    typeof role === 'object' && role.rol ? role.rol : role
                );
            }
            const sideBarOptions = SideBarOptionsService.getOptions(roles)
            const routesSideBar = sideBarOptions
                .filter(option => {
                    return option.roles.some(role => roles.includes(role));
                })
                .map(option => option.path);

            setUser({
                id: decodedToken.id || '',
                username : decodedToken.username || '',
                rol: decodedToken.id_rol || '',
                rol_nombre: decodedToken.rol_nombre || '',
            });
            setAvailableRoutesSideBar(routesSideBar);
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };
    const login = (token) => {
        localStorage.setItem('token', token);
        loadUserFromToken();
    };
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setAvailableRoutesSideBar([]);
        window.location.href = loginUrl+"?logout=true";
    };
    const hasAccess = (path) => {
        if (!user) return false;
        if (availableRoutesSideBar.includes(path)) {
            return true;
        }
        return false;
    };

    useEffect(() => {
        loadUserFromToken();
        const handleHashChange = () => {
            const hashToken = window.location.hash.substring(1);
            if (hashToken) {
                login(hashToken);
                window.history.replaceState(null, null, ' ');
            }
        };
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const value = {
        user,
        loading,
        login,
        logout,
        hasAccess,
        availableRoutesSideBar,
        isAuthenticated: !!user,
        reloadUser: loadUserFromToken
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
export default useAuth;