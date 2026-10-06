const express = require('express');

const {
    obtenerMontallantas,
    obtenerMontallantaPorId,
    crearMontallanta
} = require('../controllers/montallantas.controller');

const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

// Públicos
router.get('/', obtenerMontallantas);
router.get('/:id', obtenerMontallantaPorId);

// Privado
router.post('/', verificarToken, crearMontallanta);

module.exports = router;