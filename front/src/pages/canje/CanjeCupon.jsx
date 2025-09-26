import React, { useState } from 'react';
import { Gift } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const CanjeCupon = () => {
    const API_BASE = import.meta.env.VITE_BACKEND;
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        codigo: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE}/canjes/crear`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    codigo: formData.codigo,
                    usuario_id: user.id
                })
            });

            const data = await response.json();

            if (data.success) {
                setSuccess('¡Cupón canjeado exitosamente!');
                setFormData({ codigo: '' });
            } else {
                setError(data.error || 'Error al canjear el cupón');
            }
        } catch (error) {
            setError('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid py-4">
            <div className="row mb-4">
                <div className="col">
                    <h2 className="titulo-principal">Canjear Cupón</h2>
                    <p className="texto-gris">Ingresa el código de tu cupón de descuento</p>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="tarjeta">
                        <div className="text-center mb-4">
                            <h4>Canjear Cupón de Descuento</h4>
                            <p className="texto-gris">
                                Introduce el código de tu cupón para aplicar el descuento
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div className="alerta-error mb-3">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="alert alert-success mb-3">
                                    <strong>¡Éxito!</strong> {success}
                                </div>
                            )}

                            <div className="mb-4">
                                <label className="etiqueta">Código del Cupón</label>
                                <input
                                    type="text"
                                    className="input-personalizado text-center"
                                    value={formData.codigo}
                                    onChange={(e) => setFormData({...formData, codigo: e.target.value.toUpperCase()})}
                                    required
                                    placeholder="DESC20"
                                    disabled={loading}
                                />

                            </div>

                            <div className="d-grid">
                                <button
                                    type="submit"
                                    className="boton-azul d-flex align-items-center justify-content-center"
                                    disabled={loading || !formData.codigo.trim()}
                                >
                                    {loading ? (
                                        <>
                                            <div className="spinner-border spinner-border-sm me-2" role="status">
                                                <span className="visually-hidden">Canjeando...</span>
                                            </div>
                                            Canjeando...
                                        </>
                                    ) : (
                                        <>
                                            Canjear Cupón
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default CanjeCupon;