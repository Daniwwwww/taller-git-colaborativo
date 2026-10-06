const express = require('express');

const {
    obtenerGruas,
    obtenerGruaPorId,
    crearGrua,
    actualizarGrua,
    eliminarGrua
} = require('../controllers/gruas.controller');

const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

// Públicos
router.get('/', obtenerGruas);
router.get('/:id', obtenerGruaPorId);

// Privados
router.post('/', verificarToken, crearGrua);
router.put('/:id', verificarToken, actualizarGrua);
router.delete('/:id', verificarToken, eliminarGrua);

module.exports = router;