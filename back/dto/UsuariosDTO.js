class UsuariosDTO {
    static response(usuario) {
        return {
            id: usuario.id,
            username: usuario.username,
            id_rol: usuario.id_rol,
            estado: usuario.estado,
            fechaCreacion: usuario.fecha_creacion || null,
            rol_nombre: usuario.rol_nombre || (usuario.rol && usuario.rol.nombre ? usuario.rol.nombre : null)
        };
    }

    static login(data) {
        return {
            username: data.username,
            password: data.password
        };
    }

    static loginResponse(result) {
        return {
            usuario: this.response(result.usuario),
            token: result.token
        };
    }

    static create(data) {
        return {
            username: data.username,
            password: data.password,
            id_rol: data.id_rol,
            estado: data.estado !== undefined ? data.estado : true
        };
    }

    static update(data) {
        const updateData = {};
        if (data.username) updateData.username = data.username;
        if (data.password) updateData.password = data.password;
        if (data.id_rol !== undefined) updateData.id_rol = data.id_rol;
        if (data.estado !== undefined) updateData.estado = data.estado;
        return updateData;
    }
}

module.exports = UsuariosDTO;