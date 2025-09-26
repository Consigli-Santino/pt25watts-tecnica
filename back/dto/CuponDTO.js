class CuponDTO {
    static response(cupon) {
        return {
            id: cupon.id,
            codigo: cupon.codigo,
            descripcion: cupon.descripcion,
            valor: cupon.valor,
            fechaExpiracion: cupon.fecha_expiracion,
            estado: cupon.estado,
            fechaCreacion: cupon.fecha_creacion
        };
    }

    static create(data) {
        return {
            codigo: data.codigo,
            descripcion: data.descripcion,
            valor: data.valor,
            fecha_expiracion: data.fecha_expiracion,
            estado: data.estado
        };
    }

    static update(data) {
        const updateData = {};
        if (data.codigo) updateData.codigo = data.codigo;
        if (data.descripcion) updateData.descripcion = data.descripcion;
        if (data.valor) updateData.valor = data.valor;
        if (data.fecha_expiracion !== undefined) updateData.fecha_expiracion = data.fecha_expiracion;
        if (data.estado !== undefined) updateData.estado = data.estado;
        return updateData;
    }
}

module.exports = CuponDTO;