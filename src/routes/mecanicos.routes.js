const express = require('express');

const {
    obtenerMecanicos,
    obtenerMecanicoPorId,
    crearMecanico,
    actualizarMecanico,
    eliminarMecanico
} = require('../controllers/mecanicos.controller');

const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

// Públicos
router.get('/', obtenerMecanicos);
router.get('/:id', obtenerMecanicoPorId);

// Privados
router.post('/', verificarToken, crearMecanico);
router.put('/:id', verificarToken, actualizarMecanico);
router.delete('/:id', verificarToken, eliminarMecanico);

module.exports = router;