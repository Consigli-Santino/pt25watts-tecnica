const express = require('express');
const UsuarioService = require('../services/UsuarioService');
const UsuariosDTO = require('../dto/UsuariosDTO');
const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const usuarios = await UsuarioService.getAllUsuarios();
        res.json({
            success: true,
            data: usuarios
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const usuario = await UsuarioService.getUsuarioById(req.params.id);
        res.json({
            success: true,
            data: UsuariosDTO.response(usuario)
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        });
    }
});

router.post('/crear', async (req, res) => {
    try {
        const userData = UsuariosDTO.create(req.body);
        const nuevoUsuario = await UsuarioService.crearUsuario(userData);
        res.status(201).json({
            success: true,
            data: UsuariosDTO.response(nuevoUsuario)
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

router.put('/editar/:id', async (req, res) => {
    try {
        const userData = UsuariosDTO.update(req.body);
        const usuarioActualizado = await UsuarioService.editarUsuario(req.params.id, userData);
        res.json({
            success: true,
            data: UsuariosDTO.response(usuarioActualizado)
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

router.delete('/eliminar/:id', async (req, res) => {
    try {
        const usuarioEliminado = await UsuarioService.eliminarUsuario(req.params.id);
        res.json({
            success: true,
            data: UsuariosDTO.response(usuarioEliminado)
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const loginData = UsuariosDTO.login(req.body);
        const result = await UsuarioService.login(loginData.username, loginData.password);

        res.json({
            success: true,
            message: 'Login exitoso',
            data: UsuariosDTO.loginResponse(result)
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;