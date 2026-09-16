const express = require('express');

const {
    obtenerMontallantas,
    obtenerMontallantaPorId,
    crearMontallanta
} = require('../controllers/montallantas.controller');

const router = express.Router();

router.get('/', obtenerMontallantas);

router.get('/:id', obtenerMontallantaPorId);

router.post('/', crearMontallanta);

module.exports = router;