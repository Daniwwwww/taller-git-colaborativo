const express = require('express');

const {
    obtenerLavaderos,
    obtenerLavaderoPorId,
    crearLavadero
} = require('../controllers/lavaderos.controller');

const router = express.Router();

router.get('/', obtenerLavaderos);

router.get('/:id', obtenerLavaderoPorId);

router.post('/', crearLavadero);

module.exports = router;