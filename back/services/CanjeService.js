const sequelize = require('../config/database');

class CanjeService {

    static async getAllCanjes() {
        try {
            const Canje = sequelize.models.Canje;
            return await Canje.findAll({
                include: [
                    {
                        model: sequelize.models.Cupon,
                        as: 'cupon',
                        attributes: ['id', 'codigo', 'descripcion', 'valor']
                    },
                    {
                        model: sequelize.models.Usuario,
                        as: 'usuario',
                        attributes: ['id', 'username']
                    }
                ],
                order: [['fecha_canje', 'DESC']]
            });
        } catch (error) {
            throw new Error('Error al obtener los canjes: ' + error.message);
        }
    }

    static async validateCupon(cuponData) {
        const cupon = await sequelize.models.Cupon.findOne({
            where: { codigo: cuponData.codigo_canjeado }
        });
        if (!cupon) {
            throw new Error('El cupon no existe.');
        }

        const canjeExistente = await sequelize.models.Canje.findOne({
            where: { cupon_id: cupon.id }
        });
        if (canjeExistente) {
            throw new Error('El cupon ya fue canjeado.');
        }
        if (cupon.estado !== 1) {
            throw new Error('El cupon no está activo.');
        }
        if (new Date(cupon.fecha_expiracion) < new Date()) {
            throw new Error('El cupon ha expirado.');
        }
        return cupon;
    }

    static async crearCanje(canjeData) {
        try {
            const cupon = await this.validateCupon(canjeData);
            await cupon.update({ estado: 3 });
            const Canje = sequelize.models.Canje;
            const canjeCompleto = {
                ...canjeData,
                cupon_id: cupon.id
            };
            return await Canje.create(canjeCompleto);
        } catch (error) {
            throw new Error('Error: ' + error.message);
        }
    }
}

module.exports = CanjeService;