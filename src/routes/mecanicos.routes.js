const express = require('express');

const {
    obtenerMecanicos,
    obtenerMecanicoPorId,
    crearMecanico
} = require('../controllers/mecanicos.controller');

const router = express.Router();

router.get('/', obtenerMecanicos);

router.get('/:id', obtenerMecanicoPorId);

router.post('/', crearMecanico);

module.exports = router;