const express = require('express');

const {
    obtenerServicios,
    obtenerServicioPorId,
    crearServicio,
    actualizarServicio,
    eliminarServicio
} = require('../controllers/servicios.controller');

const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

// Rutas públicas
router.get('/', obtenerServicios);
router.get('/:id', obtenerServicioPorId);

// Rutas privadas
router.post('/', verificarToken, crearServicio);
router.put('/:id', verificarToken, actualizarServicio);
router.delete('/:id', verificarToken, eliminarServicio);

module.exports = router;