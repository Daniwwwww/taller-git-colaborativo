const express = require('express');

const {
    obtenerLavaderos,
    obtenerLavaderoPorId,
    crearLavadero,
    actualizarLavadero,
    eliminarLavadero
} = require('../controllers/lavaderos.controller');

const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

// Públicos
router.get('/', obtenerLavaderos);
router.get('/:id', obtenerLavaderoPorId);

// Privados
router.post('/', verificarToken, crearLavadero);
router.put('/:id', verificarToken, actualizarLavadero);
router.delete('/:id', verificarToken, eliminarLavadero);

module.exports = router;