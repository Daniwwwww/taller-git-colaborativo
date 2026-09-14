const express = require('express');
const router = express.Router();

// 1. Obtener todos los servicios
router.get('/servicios', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Lista de servicios'
    });
});

// 2. Obtener servicio por ID
router.get('/servicios/:id', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Servicio por ID'
    });
});

// 3. Crear servicio
router.post('/servicios', (req, res) => {
    res.status(201).json({
        ok: true,
        mensaje: 'Servicio creado'
    });
});

// 4. Actualizar servicio
router.put('/servicios/:id', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Servicio actualizado'
    });
});

// 5. Eliminar servicio
router.delete('/servicios/:id', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Servicio eliminado'
    });
});

// 6. Obtener usuarios
router.get('/usuarios', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Lista de usuarios'
    });
});

// 7. Obtener usuario por ID
router.get('/usuarios/:id', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Usuario por ID'
    });
});

// 8. Crear usuario
router.post('/usuarios', (req, res) => {
    res.status(201).json({
        ok: true,
        mensaje: 'Usuario creado'
    });
});

// 9. Obtener mecánicos
router.get('/mecanicos', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Lista de mecánicos'
    });
});

// 10. Obtener mecánico por ID
router.get('/mecanicos/:id', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Mecánico por ID'
    });
});

// 11. Obtener lavaderos
router.get('/lavaderos', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Lista de lavaderos'
    });
});

// 12. Obtener grúas
router.get('/gruas', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Lista de grúas'
    });
});

// 13. Obtener montallantas
router.get('/montallantas', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Lista de montallantas'
    });
});

// 14. Buscar servicios por categoría
router.get('/servicios/categoria/:categoria', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Búsqueda por categoría'
    });
});

// 15. Buscar servicio por nombre
router.get('/buscar/:nombre', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Búsqueda de servicio'
    });
});

module.exports = router;