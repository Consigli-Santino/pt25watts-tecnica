class CanjeDTO {
    static response(canje) {
        return {
            id: canje.id,
            cupon_id: canje.cupon_id,
            usuario_id: canje.usuario_id,
            codigo_canjeado: canje.codigo_canjeado,
            fecha_canjeado: canje.fecha_canje,
            cupon: canje.cupon ? {
                id: canje.cupon.id,
                codigo: canje.cupon.codigo,
                descripcion: canje.cupon.descripcion,
                valor: canje.cupon.valor
            } : null,
            usuario: canje.usuario ? {
                id: canje.usuario.id,
                username: canje.usuario.username
            } : null
        };
    }

    static create(data) {
        return {
            codigo_canjeado: data.codigo,
            cupon_id: data.cupon_id,
            usuario_id: data.usuario_id
        };
    }

    static update(data) {
        const updateData = {};
        if (data.codigo) updateData.codigo = data.codigo;
        if (data.descripcion) updateData.descripcion = data.descripcion;
        if (data.valor) updateData.valor = data.valor;
        if (data.fecha_expiracion) updateData.fecha_expiracion = data.fecha_expiracion;
        if (data.estado !== undefined) updateData.estado = data.estado;
        return updateData;
    }
}

module.exports = CanjeDTO;