const Lavadero = require('../models/lavadero.model');


// ==========================================
// GET /api/lavaderos
// ==========================================
const obtenerLavaderos = async (req, res) => {
    try {
        const lavaderos = await Lavadero.getAll();

        res.status(200).json({
            success: true,
            cantidad: lavaderos.length,
            data: lavaderos
        });

    } catch (error) {
        console.error('Error al obtener lavaderos:', error);

        res.status(500).json({
            success: false,
            message: 'Error al obtener los lavaderos'
        });
    }
};


// ==========================================
// GET /api/lavaderos/:id
// ==========================================
const obtenerLavaderoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const lavadero = await Lavadero.getById(id);

        if (!lavadero) {
            return res.status(404).json({
                success: false,
                message: 'Lavadero no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: lavadero
        });

    } catch (error) {
        console.error('Error al obtener lavadero:', error);

        res.status(500).json({
            success: false,
            message: 'Error al obtener el lavadero'
        });
    }
};


// ==========================================
// POST /api/lavaderos
// ==========================================
const crearLavadero = async (req, res) => {
    try {
        const {
            nombre,
            telefono,
            direccion,
            precio
        } = req.body;

        if (!nombre) {
            return res.status(400).json({
                success: false,
                message: 'El nombre es obligatorio'
            });
        }

        const lavadero = await Lavadero.create({
            nombre,
            telefono,
            direccion,
            precio
        });

        res.status(201).json({
            success: true,
            message: 'Lavadero creado correctamente',
            data: lavadero
        });

    } catch (error) {
        console.error('Error al crear lavadero:', error);

        res.status(500).json({
            success: false,
            message: 'Error al crear el lavadero'
        });
    }
};


module.exports = {
    obtenerLavaderos,
    obtenerLavaderoPorId,
    crearLavadero
};