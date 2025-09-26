import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import '../../styles/styles.css'
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const API_BASE = import.meta.env.VITE_BACKEND;
    const { login } = useAuth();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!formData.username.trim() || !formData.password.trim()) {
            setError('Por favor completa todos los campos');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/usuarios/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            });

            const data = await response.json();
            if (response.ok) {
                login(data.data.token);
                navigate('/home');
            } else {
                setError(data.detail || 'Error en las credenciales');
            }
        } catch (error) {
            setError('Error de conexión. Intenta nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 px-3">
            <div className="tarjeta col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
                <h1 className="titulo-principal">25Watts</h1>
                <p className="texto-gris">
                    Ingresa con tu usuario y contraseña para continuar.
                </p>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <div className="alerta-error d-flex align-items-center">
                            <AlertCircle size={16} className="me-2" />
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="etiqueta">Usuario</label>
                        <input
                            type="text"
                            name="username"
                            className="input-personalizado"
                            value={formData.username}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label className="etiqueta">Contraseña</label>
                        <div className="input-con-icono">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className="input-personalizado"
                                value={formData.password}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                            <div
                                className="icono-input"
                                onClick={() => setShowPassword(!showPassword)}
                            >

                            </div>
                        </div>
                    </div>


                    <button
                        type="submit"
                        className="boton-azul"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="d-flex align-items-center justify-content-center">
                                <div className="spinner-border spinner-border-sm me-2"></div>
                                Iniciando sesión...
                            </div>
                        ) : (
                            'INICIAR SESIÓN'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;