const express = require('express');

const {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario
} = require('../controllers/usuarios.controller');

const router = express.Router();

router.get('/', obtenerUsuarios);

router.get('/:id', obtenerUsuarioPorId);

router.post('/', crearUsuario);

module.exports = router;