const Montallanta = require('../models/montallanta.model');


// ==========================================
// GET /api/montallantas
// ==========================================
const obtenerMontallantas = async (req, res) => {
    try {
        const montallantas = await Montallanta.getAll();

        res.status(200).json({
            success: true,
            cantidad: montallantas.length,
            data: montallantas
        });

    } catch (error) {
        console.error('Error al obtener montallantas:', error);

        res.status(500).json({
            success: false,
            message: 'Error al obtener los montallantas'
        });
    }
};


// ==========================================
// GET /api/montallantas/:id
// ==========================================
const obtenerMontallantaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const montallanta = await Montallanta.getById(id);

        if (!montallanta) {
            return res.status(404).json({
                success: false,
                message: 'Montallantas no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: montallanta
        });

    } catch (error) {
        console.error('Error al obtener montallantas:', error);

        res.status(500).json({
            success: false,
            message: 'Error al obtener el montallantas'
        });
    }
};


// ==========================================
// POST /api/montallantas
// ==========================================
const crearMontallanta = async (req, res) => {
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

        const montallanta = await Montallanta.create({
            nombre,
            telefono,
            direccion,
            precio
        });

        res.status(201).json({
            success: true,
            message: 'Montallantas creado correctamente',
            data: montallanta
        });

    } catch (error) {
        console.error('Error al crear montallantas:', error);

        res.status(500).json({
            success: false,
            message: 'Error al crear el montallantas'
        });
    }
};


module.exports = {
    obtenerMontallantas,
    obtenerMontallantaPorId,
    crearMontallanta
};