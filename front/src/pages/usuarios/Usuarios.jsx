import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

const Usuarios = () => {
    const API_BASE = import.meta.env.VITE_BACKEND;
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingUsuario, setEditingUsuario] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        id_rol: '',
        estado: true
    });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsuarios();
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await fetch(`${API_BASE}/roles/all`);
            const data = await response.json();
            if (data.success) {
                setRoles(data.data);
            }
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const fetchUsuarios = async () => {
        try {
            const response = await fetch(`${API_BASE}/usuarios/all`);
            const data = await response.json();
            if (data.success) {
                setUsuarios(data.data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching usuarios:', error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const url = editingUsuario
                ? `${API_BASE}/usuarios/editar/${editingUsuario.id}`
                : `${API_BASE}/usuarios/crear`;

            const method = editingUsuario ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                fetchUsuarios();
                handleCloseModal();
            } else {
                setError(data.error || 'Error al guardar el usuario');
            }
        } catch (error) {
            setError('Error de conexión');
        }
    };

    const handleEdit = (usuario) => {
        setEditingUsuario(usuario);
        setFormData({
            username: usuario.username,
            password: '',
            id_rol: usuario.id_rol,
            estado: usuario.estado
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            try {
                const response = await fetch(`${API_BASE}/usuarios/eliminar/${id}`, {
                    method: 'DELETE'
                });

                const data = await response.json();
                if (data.success) {
                    fetchUsuarios();
                }
            } catch (error) {
                console.error('Error deleting usuario:', error);
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingUsuario(null);
        setFormData({
            username: '',
            password: '',
            id_rol: roles.length > 0 ? roles[0].id : '',
            estado: true
        });
        setError('');
    };

    const handleOpenModal = () => {
        setFormData({
            username: '',
            password: '',
            id_rol: roles.length > 0 ? roles[0].id : '',
            estado: true
        });
        setShowModal(true);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const getRolNombre = (rolId) => {
        const rol = roles.find(r => r.id === rolId);
        return rol ? rol.nombre : 'Desconocido';
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
                    <h2 className="titulo-principal">Gestión de Usuarios</h2>
                    <p className="texto-gris">Administra los usuarios del sistema</p>
                </div>
                <div className="col-auto">
                    <button
                        className="boton-azul d-flex align-items-center"
                        style={{ width: 'auto', padding: '10px 20px' }}
                        onClick={handleOpenModal}
                    >
                        <Plus size={18} className="me-2" />
                        Nuevo Usuario
                    </button>
                </div>
            </div>

            <div className="tarjeta">
                {usuarios.length === 0 ? (
                    <div className="text-center py-5">
                        <p className="texto-gris">No hay usuarios registrados</p>
                        <button className="boton-azul" style={{ width: 'auto' }} onClick={handleOpenModal}>
                            Crear primer usuario
                        </button>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th className="text-nowrap">Username</th>
                                    <th className="d-none d-md-table-cell">Rol</th>
                                    <th className="text-nowrap">Estado</th>
                                    <th className="text-nowrap">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td>
                                            <span className="fw-bold">{usuario.username}</span>
                                        </td>
                                        <td className="d-none d-md-table-cell">
                                            <span className="badge bg-info">{getRolNombre(usuario.id_rol)}</span>
                                        </td>
                                        <td>
                                            <span className={`badge ${usuario.estado ? 'bg-success' : 'bg-danger'}`}>
                                                <span className="d-none d-sm-inline">{usuario.estado ? 'Activo' : 'Inactivo'}</span>
                                                <span className="d-inline d-sm-none">{usuario.estado ? '✓' : '✗'}</span>
                                            </span>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-1">
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => handleEdit(usuario)}
                                                    title="Editar"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(usuario.id)}
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
                                    {editingUsuario ? 'Editar Usuario' : 'Nuevo Usuario'}
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
                                        <label className="etiqueta">Username</label>
                                        <input
                                            type="text"
                                            className="input-personalizado"
                                            value={formData.username}
                                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                                            required
                                            placeholder="Ingresa el username"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="etiqueta">
                                            {editingUsuario ? 'Nueva Contraseña (opcional)' : 'Contraseña'}
                                        </label>
                                        <input
                                            type="password"
                                            className="input-personalizado"
                                            value={formData.password}
                                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                                            required={!editingUsuario}
                                            placeholder={editingUsuario ? 'Dejar vacío para mantener actual' : 'Ingresa la contraseña'}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="etiqueta">Rol</label>
                                        <select
                                            className="input-personalizado"
                                            value={formData.id_rol}
                                            onChange={(e) => setFormData({...formData, id_rol: parseInt(e.target.value)})}
                                            required
                                        >
                                            <option value="">Selecciona un rol</option>
                                            {roles.map((rol) => (
                                                <option key={rol.id} value={rol.id}>
                                                    {rol.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label className="etiqueta">Estado</label>
                                        <select
                                            className="input-personalizado"
                                            value={formData.estado}
                                            onChange={(e) => setFormData({...formData, estado: e.target.value === 'true'})}
                                        >
                                            <option value={true}>Activo</option>
                                            <option value={false}>Inactivo</option>
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
                                        {editingUsuario ? 'Actualizar' : 'Crear'} Usuario
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

export default Usuarios;