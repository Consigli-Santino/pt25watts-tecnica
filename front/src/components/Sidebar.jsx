import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const Sidebar = ({ sidebarOptions = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { logout } = useAuth();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button 
                className="d-md-none boton-azul position-fixed"
                onClick={toggleSidebar}
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {isOpen && (
                <div 
                    className="d-md-none position-fixed w-100 h-100 bg-dark bg-opacity-50"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className={`position-fixed d-flex flex-column h-100 ${isOpen ? 'd-block' : 'd-none'} d-md-block sidebar-azul shadow`}>
                <div className="p-4 border-bottom border-light">
                    <h3 className="titulo-principal text-white m-0 text-center">
                        25Watts
                    </h3>
                </div>

                <nav className="flex-grow-1 p-3">
                    <ul className="list-unstyled mb-0">
                        {sidebarOptions.map((option, index) => {
                            const isActive = location.pathname === option.path;
                            return (
                                <li key={index} className="mb-2">
                                    <Link
                                        to={option.path}
                                        className={`d-flex align-items-center p-3 text-decoration-none rounded ${
                                            isActive ? 'bg-white text-primary fw-bold' : 'text-white-50'
                                        }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <i className={`bi bi-${option.icon}`}></i>
                                        <span className="ms-2">{option.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="position-absolute bottom-0 start-0 w-100 p-3 border-top border-light">
                    <button
                        onClick={logout}
                        className="d-flex align-items-center w-100 p-3 text-white-50 bg-transparent border-0 rounded"
                    >
                        <LogOut size={18} />
                        <span className="ms-2">Cerrar Sesión</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;