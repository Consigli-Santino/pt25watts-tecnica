const sequelize = require('../config/database');
const Rol = require('../models/Rol')(sequelize);

class RolService {
    static async getAllRoles() {
        try {
            const roles = await Rol.findAll();
            return roles;
        } catch (error) {
            throw new Error('Error al obtener roles: ' + error.message);
        }
    }

    static async getRolById(id) {
        try {
            const rol = await Rol.findByPk(id);
            if (!rol) {
                throw new Error('Rol no encontrado');
            }
            return rol;
        } catch (error) {
            throw error;
        }
    }

    static async crearRol(rolData) {
        try {
            const nuevoRol = await Rol.create(rolData);
            return nuevoRol;
        } catch (error) {
            throw new Error('Error al crear rol: ' + error.message);
        }
    }

    static async editarRol(id, rolData) {
        try {
            const rol = await Rol.findByPk(id);
            if (!rol) {
                throw new Error('Rol no encontrado');
            }
            await rol.update(rolData);
            return rol;
        } catch (error) {
            throw new Error('Error al actualizar rol: ' + error.message);
        }
    }

    static async eliminarRol(id) {
        try {
            const rol = await Rol.findByPk(id);
            if (!rol) {
                throw new Error('Rol no encontrado');
            }
            await rol.update({ estado: false });
            return rol;
        } catch (error) {
            throw new Error('Error al eliminar rol: ' + error.message);
        }
    }
}

module.exports = RolService;