const express = require('express');
const CanjeService = require('../services/CanjeService');
const CanjeDTO = require('../dto/CanjeDTO');
const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const canjes = await CanjeService.getAllCanjes();
        res.json({
            success: true,
            data: canjes.map(canje => CanjeDTO.response(canje))
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

router.post('/crear', async (req, res) => {
    try {
        const canjeData = CanjeDTO.create(req.body);
        const nuevoCupon = await CanjeService.crearCanje(canjeData);
        res.status(201).json({
            success: true,
            data: CanjeDTO.response(nuevoCupon)
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});


module.exports = router;