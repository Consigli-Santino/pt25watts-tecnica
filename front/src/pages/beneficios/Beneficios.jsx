import React, { useState, useEffect } from 'react';

const Beneficios = () => {
    const API_BASE = import.meta.env.VITE_BACKEND;
    const [canjes, setCanjes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCanjes();
    }, []);

    const fetchCanjes = async () => {
        try {
            const response = await fetch(`${API_BASE}/canjes/all`);
            const data = await response.json();
            if (data.success) {
                setCanjes(data.data);
            } else {
                setError('Error al cargar el historial de canjes');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching canjes:', error);
            setError('Error de conexi�n');
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(value);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid py-4">
            <div className="row mb-4">
                <div className="col">
                    <h2 className="titulo-principal">Historial de Beneficios</h2>
                    <p className="texto-gris">Registro de cupones canjeados</p>
                </div>
            </div>

            {error && (
                <div className="alerta-error mb-4">
                    {error}
                </div>
            )}

            <div className="tarjeta">
                {canjes.length === 0 ? (
                    <div className="text-center py-5">
                        <h5 className="texto-gris">No hay canjes registrados</h5>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th className="text-nowrap">Codigo</th>
                                    <th className="d-none d-md-table-cell">Descripcion</th>
                                    <th className="text-nowrap">Valor</th>
                                    <th className="d-none d-lg-table-cell">Usuario</th>
                                    <th className="text-nowrap">Fecha Canje</th>
                                </tr>
                            </thead>
                            <tbody>
                                {canjes.map((canje) => (
                                    <tr key={canje.id}>
                                        <td>
                                            <code className="bg-light p-2 rounded text-nowrap fw-bold">
                                                {canje.codigo_canjeado}
                                            </code>
                                        </td>
                                        <td className="d-none d-md-table-cell">
                                            <div className="text-truncate" style={{ maxWidth: '250px' }}>
                                                {canje.cupon?.descripcion || 'Sin descripcion'}
                                            </div>
                                        </td>
                                        <td>
                                            <span className="fw-bold text-success">
                                                {formatCurrency(canje.cupon?.valor || 0)}
                                            </span>
                                        </td>
                                        <td className="d-none d-lg-table-cell">
                                            <span className="fw-medium">
                                                {canje.usuario?.username || 'Usuario desconocido'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="text-nowrap">
                                                {formatDate(canje.fecha_canjeado).split(',')[0]}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Beneficios;