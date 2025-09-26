import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

const Cupones = () => {
    const API_BASE = import.meta.env.VITE_BACKEND;
    const [cupones, setCupones] = useState([]);
    const [estados, setEstados] = useState([]);
    const [estadosForm, setEstadosForm] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCupon, setEditingCupon] = useState(null);
    const [formData, setFormData] = useState({
        codigo: '',
        descripcion: '',
        valor: '',
        fecha_expiracion: '',
        estado: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCupones();
        fetchEstados();
        fetchEstadosForm();
    }, []);

    const fetchEstados = async () => {
        try {
            const response = await fetch(`${API_BASE}/cupones/estados`);
            const data = await response.json();
            if (data.success) {
                setEstados(data.data);
            }
        } catch (error) {
            console.error('Error fetching estados:', error);
        }
    };

    const fetchEstadosForm = async () => {
        try {
            const response = await fetch(`${API_BASE}/cupones/estados-form`);
            const data = await response.json();
            if (data.success) {
                setEstadosForm(data.data);
            }
        } catch (error) {
            console.error('Error fetching estados form:', error);
        }
    };

    const fetchCupones = async () => {
        try {
            const response = await fetch(`${API_BASE}/cupones/all`);
            const data = await response.json();
            if (data.success) {
                setCupones(data.data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cupones:', error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const url = editingCupon
                ? `${API_BASE}/cupones/editar/${editingCupon.id}`
                : `${API_BASE}/cupones/crear`;

            const method = editingCupon ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                fetchCupones();
                handleCloseModal();
            } else {
                setError(data.error || 'Error al guardar el cup�n');
            }
        } catch (error) {
            setError('Error de conexi�n');
        }
    };

    const handleEdit = (cupon) => {
        setEditingCupon(cupon);
        setFormData({
            codigo: cupon.codigo,
            descripcion: cupon.descripcion,
            valor: cupon.valor,
            fecha_expiracion: cupon.fechaExpiracion ? cupon.fechaExpiracion.split('T')[0] : '',
            estado: cupon.estado
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este cupón?')) {
            try {
                const response = await fetch(`${API_BASE}/cupones/eliminar/${id}`, {
                    method: 'DELETE'
                });

                const data = await response.json();
                if (data.success) {
                    fetchCupones();
                }
            } catch (error) {
                console.error('Error deleting cupon:', error);
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingCupon(null);
        setFormData({
            codigo: '',
            descripcion: '',
            valor: '',
            fecha_expiracion: '',
            estado: estadosForm.length > 0 ? estadosForm[0].id : ''
        });
        setError('');
    };

    const handleOpenModal = () => {
        setFormData({
            codigo: '',
            descripcion: '',
            valor: '',
            fecha_expiracion: '',
            estado: estadosForm.length > 0 ? estadosForm[0].id : ''
        });
        setShowModal(true);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(value);
    };

    const getEstadoNombre = (estadoId) => {
        const estado = estados.find(e => e.id === estadoId);
        return estado ? estado.nombre : 'Desconocido';
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
                    <h2 className="titulo-principal">Gestion de Cupones</h2>
                    <p className="texto-gris">Administra los cupones de descuento</p>
                </div>
                <div className="col-auto">
                    <button
                        className="boton-azul d-flex align-items-center"
                        style={{ width: 'auto', padding: '10px 20px' }}
                        onClick={handleOpenModal}
                    >
                        <Plus size={18} className="me-2" />
                    </button>
                </div>
            </div>

            <div className="tarjeta">
                {cupones.length === 0 ? (
                    <div className="text-center py-5">
                        <p className="texto-gris">No hay cupones registrados</p>
                        <button className="boton-azul" style={{ width: 'auto' }} onClick={handleOpenModal}>
                            Crear primer cupón
                        </button>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th className="text-nowrap">Código</th>
                                    <th className="d-none d-md-table-cell">Descripción</th>
                                    <th className="text-nowrap">Valor</th>
                                    <th className="d-none d-lg-table-cell text-nowrap">Fecha Expiración</th>
                                    <th className="text-nowrap">Estado</th>
                                    <th className="text-nowrap">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cupones.map((cupon) => (
                                    <tr key={cupon.id}>
                                        <td>
                                            <code className="bg-light p-1 rounded text-nowrap">{cupon.codigo}</code>
                                        </td>
                                        <td className="d-none d-md-table-cell">
                                            <div className="text-truncate" style={{ maxWidth: '200px' }}>
                                                {cupon.descripcion}
                                            </div>
                                        </td>
                                        <td className="fw-bold text-success text-nowrap">{formatCurrency(cupon.valor)}</td>
                                        <td className="d-none d-lg-table-cell text-nowrap">{formatDate(cupon.fechaExpiracion)}</td>
                                        <td>
                                            <span className={`badge ${getEstadoNombre(cupon.estado).toLowerCase() === 'activo' ? 'bg-success' : 'bg-danger'}`}>
                                                <span className="d-none d-sm-inline">{getEstadoNombre(cupon.estado)}</span>
                                                <span className="d-inline d-sm-none">{getEstadoNombre(cupon.estado).toLowerCase() === 'activo' ? '✓' : '✗'}</span>
                                            </span>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-1">
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => handleEdit(cupon)}
                                                    title="Editar"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(cupon.id)}
                                                    title="Eliminar"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-backdrop-custom">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {editingCupon ? 'Editar Cupón' : 'Nuevo Cupón'}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleCloseModal}
                                ></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    {error && (
                                        <div className="alerta-error">
                                            {error}
                                        </div>
                                    )}

                                    <div className="mb-3">
                                        <label className="etiqueta">Código</label>
                                        <input
                                            type="text"
                                            className="input-personalizado"
                                            value={formData.codigo}
                                            onChange={(e) => setFormData({...formData, codigo: e.target.value})}
                                            required
                                            placeholder="Ej: DESC20"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="etiqueta">Descripción</label>
                                        <textarea
                                            className="input-personalizado"
                                            value={formData.descripcion}
                                            onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                                            required
                                            rows="3"
                                            placeholder="Describe el cupón de descuento"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="etiqueta">Valor</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="input-personalizado"
                                            value={formData.valor}
                                            onChange={(e) => setFormData({...formData, valor: e.target.value})}
                                            required
                                            placeholder="0.00"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="etiqueta">Fecha de Expiración</label>
                                        <input
                                            type="date"
                                            className="input-personalizado"
                                            value={formData.fecha_expiracion}
                                            onChange={(e) => setFormData({...formData, fecha_expiracion: e.target.value})}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="etiqueta">Estado</label>
                                        <select
                                            className="input-personalizado"
                                            value={formData.estado}
                                            onChange={(e) => setFormData({...formData, estado: parseInt(e.target.value)})}
                                            required
                                        >
                                            <option value="">Selecciona un estado</option>
                                            {estadosForm.map((estado) => (
                                                <option key={estado.id} value={estado.id}>
                                                    {estado.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={handleCloseModal}
                                    >
                                        Cancelar
                                    </button>
                                    <button type="submit" className="boton-azul" style={{ width: 'auto' }}>
                                        {editingCupon ? 'Actualizar' : 'Crear'} Cupón
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show" onClick={handleCloseModal}></div>
                </div>
            )}

            <style jsx>{`
                .modal-backdrop-custom {
                    position: relative;
                    z-index: 1055;
                }
                .modal.show {
                    background: rgba(0, 0, 0, 0.5);
                }
            `}</style>
        </div>
    );
};

export default Cupones;