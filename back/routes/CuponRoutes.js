const express = require('express');
const CuponService = require('../services/CuponService');
const CuponDTO = require('../dto/CuponDTO');
const sequelize = require('../config/database');
const router = express.Router();

router.get('/estados', async (req, res) => {
    try {
        const EstadoCupon = sequelize.models.EstadoCupon;
        const estados = await EstadoCupon.findAll();
        res.json({
            success: true,
            data: estados
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

router.get('/estados-form', async (req, res) => {
    try {
        const EstadoCupon = sequelize.models.EstadoCupon;
        const estados = await EstadoCupon.findAll({
            where: {
                nombre: {
                    [sequelize.Sequelize.Op.in]: ['activo', 'inactivo']
                }
            }
        });
        res.json({
            success: true,
            data: estados
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

router.get('/all', async (req, res) => {
    try {
        const cupones = await CuponService.getAllCupones();
        res.json({
            success: true,
            data: cupones.map(cupon => CuponDTO.response(cupon))
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
        const cupon = await CuponService.getCuponById(req.params.id);
        res.json({
            success: true,
            data: CuponDTO.response(cupon)
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
        const cuponData = CuponDTO.create(req.body);
        const nuevoCupon = await CuponService.crearCupon(cuponData);
        res.status(201).json({
            success: true,
            data: CuponDTO.response(nuevoCupon)
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
        const cuponData = CuponDTO.update(req.body);
        const cuponActualizado = await CuponService.editarCupon(req.params.id, cuponData);
        res.json({
            success: true,
            data: CuponDTO.response(cuponActualizado)
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
        const cuponEliminado = await CuponService.eliminarCupon(req.params.id);
        res.json({
            success: true,
            data: CuponDTO.response(cuponEliminado)
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;