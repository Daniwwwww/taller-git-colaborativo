const express = require('express');

const {
    obtenerGruas,
    obtenerGruaPorId,
    crearGrua
} = require('../controllers/gruas.controller');

const router = express.Router();

router.get('/', obtenerGruas);

router.get('/:id', obtenerGruaPorId);

router.post('/', crearGrua);

module.exports = router;