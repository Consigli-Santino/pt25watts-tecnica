class RolDTO {
    static response(rol) {
        return {
            id: rol.id,
            nombre: rol.nombre,
            descripcion: rol.descripcion,
            estado: rol.estado
        };
    }

    static create(data) {
        return {
            nombre: data.nombre,
            descripcion: data.descripcion,
            estado: data.estado !== undefined ? data.estado : true
        };
    }

    static update(data) {
        const updateData = {};
        if (data.nombre) updateData.nombre = data.nombre;
        if (data.descripcion !== undefined) updateData.descripcion = data.descripcion;
        if (data.estado !== undefined) updateData.estado = data.estado;
        return updateData;
    }
}

module.exports = RolDTO;