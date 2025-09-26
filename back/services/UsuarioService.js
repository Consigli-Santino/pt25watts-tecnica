
const { Usuario, Rol } = require('../models');
const AuthService = require('./auth/AuthService');

class UsuarioService {
    static async getAllUsuarios() {
        try {
            const usuarios = await Usuario.findAll();
            return usuarios;
        } catch (error) {
            throw new Error('Error al obtener usuarios: ' + error.message);
        }
    }

    static async login(username, password) {
        try {
            const usuario = await Usuario.findOne({
                where: { username: username },
                include: [{
                    model: Rol,
                    as: 'rol',
                    attributes: ['id', 'nombre']
                }]
            });

            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            const passwordValida = await AuthService.verifyPassword(password, usuario.password);

            if (!passwordValida) {
                throw new Error('Contraseña incorrecta');
            }

            const token = AuthService.generateToken(usuario);
            console.log(usuario.rol)
            console.log('Rol dataValues:', usuario.rol.dataValues);
            console.log('Rol nombre:', usuario.rol.dataValues.nombre);

            return {
                usuario: {
                    id: usuario.id,
                    username: usuario.username,
                    id_rol: usuario.id_rol,
                    rol_nombre: usuario.rol.dataValues.nombre
                },
                token: token
            };

        } catch (error) {
            throw error;
        }
    }

    static async crearUsuario(userData) {
        try {
            userData.password = await AuthService.hashPassword(userData.password);
            const nuevoUsuario = await Usuario.create(userData);
            return nuevoUsuario;
        } catch (error) {
            throw new Error('Error al crear usuario: ' + error.message);
        }
    }

    static async getUsuarioById(id) {
        try {
            const usuario = await Usuario.findByPk(id, {
                include: [{
                    model: Rol,
                    as: 'rol',
                    attributes: ['id', 'nombre']
                }]
            });
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }
            return usuario;
        } catch (error) {
            throw error;
        }
    }

    static async editarUsuario(id, userData) {
        try {
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            if (userData.password) {
                userData.password = await AuthService.hashPassword(userData.password);
            }

            await usuario.update(userData);
            return usuario;
        } catch (error) {
            throw new Error('Error al actualizar usuario: ' + error.message);
        }
    }

    static async eliminarUsuario(id) {
        try {
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }
            await usuario.update({ estado: false });
            return usuario;
        } catch (error) {
            throw new Error('Error al eliminar usuario: ' + error.message);
        }
    }
}

module.exports = UsuarioService;