const sequelize = require('../config/database');
const Cupon = require('../models/Cupon')(sequelize);

class CuponService {
    static async getAllCupones() {
        try {
            const cupones = await Cupon.findAll();
            return cupones;
        } catch (error) {
            throw new Error('Error al obtener cupones: ' + error.message);
        }
    }

    static async getCuponById(id) {
        try {
            const cupon = await Cupon.findByPk(id);
            if (!cupon) {
                throw new Error('Cupón no encontrado');
            }
            return cupon;
        } catch (error) {
            throw error;
        }
    }

    static async crearCupon(cuponData) {
        try {
            const nuevoCupon = await Cupon.create(cuponData);
            return nuevoCupon;
        } catch (error) {
            throw new Error('Error al crear cupón: ' + error.message);
        }
    }

    static async editarCupon(id, cuponData) {
        try {
            const cupon = await Cupon.findByPk(id);
            if (!cupon) {
                throw new Error('Cupón no encontrado');
            }
            await cupon.update(cuponData);
            return cupon;
        } catch (error) {
            throw new Error('Error al actualizar cupón: ' + error.message);
        }
    }

    static async eliminarCupon(id) {
        try {
            const cupon = await Cupon.findByPk(id);
            if (!cupon) {
                throw new Error('Cupón no encontrado');
            }
            // Buscar el estado "inactivo" para marcarlo como eliminado
            const EstadoCupon = require('../models/EstadoCupon')(sequelize);
            const estadoInactivo = await EstadoCupon.findOne({
                where: { nombre: 'inactivo' }
            });

            if (estadoInactivo) {
                await cupon.update({ estado: estadoInactivo.id });
            } else {
                throw new Error('Estado "inactivo" no encontrado en la base de datos');
            }
            return cupon;
        } catch (error) {
            throw new Error('Error al eliminar cupón: ' + error.message);
        }
    }
}

module.exports = CuponService;