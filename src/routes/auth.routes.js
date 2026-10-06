const express = require('express');

const {
    register,
    login
} = require('../controllers/auth.controller');

const router = express.Router();

// Registrar usuario
router.post('/register', register);

// Iniciar sesión
router.post('/login', login);

module.exports = router;