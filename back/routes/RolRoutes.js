const express = require('express');
const RolService = require('../services/RolService');
const RolDTO = require('../dto/RolDTO');
const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const roles = await RolService.getAllRoles();
        res.json({
            success: true,
            data: roles.map(rol => RolDTO.response(rol))
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
        const rol = await RolService.getRolById(req.params.id);
        res.json({
            success: true,
            data: RolDTO.response(rol)
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
        const rolData = RolDTO.create(req.body);
        const nuevoRol = await RolService.crearRol(rolData);
        res.status(201).json({
            success: true,
            data: RolDTO.response(nuevoRol)
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
        const rolData = RolDTO.update(req.body);
        const rolActualizado = await RolService.editarRol(req.params.id, rolData);
        res.json({
            success: true,
            data: RolDTO.response(rolActualizado)
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
        const rolEliminado = await RolService.eliminarRol(req.params.id);
        res.json({
            success: true,
            data: RolDTO.response(rolEliminado)
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;