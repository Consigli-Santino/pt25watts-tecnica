const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './environments/.env' });

class AuthService {
    static generateToken(usuario) {
        const payload = {
            id: usuario.id,
            username: usuario.username,
            rol_nombre: usuario.rol.nombre,
            id_rol: usuario.id_rol
        };

        return jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
    }

    static async hashPassword(password) {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }

    static async verifyPassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }

    static verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new Error('Token inválido');
        }
    }
}

module.exports = AuthService;