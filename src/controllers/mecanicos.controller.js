const Mecanico = require('../models/mecanico.model');


// ==========================================
// GET /api/mecanicos
// ==========================================
const obtenerMecanicos = async (req, res) => {
    try {
        const mecanicos = await Mecanico.getAll();

        res.status(200).json({
            success: true,
            cantidad: mecanicos.length,
            data: mecanicos
        });

    } catch (error) {
        console.error('Error al obtener mecánicos:', error);

        res.status(500).json({
            success: false,
            message: 'Error al obtener los mecánicos'
        });
    }
};


// ==========================================
// GET /api/mecanicos/:id
// ==========================================
const obtenerMecanicoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const mecanico = await Mecanico.getById(id);

        if (!mecanico) {
            return res.status(404).json({
                success: false,
                message: 'Mecánico no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: mecanico
        });

    } catch (error) {
        console.error('Error al obtener mecánico:', error);

        res.status(500).json({
            success: false,
            message: 'Error al obtener el mecánico'
        });
    }
};


// ==========================================
// POST /api/mecanicos
// ==========================================
const crearMecanico = async (req, res) => {
    try {
        const {
            nombre,
            telefono,
            especialidad,
            direccion
        } = req.body;

        if (!nombre) {
            return res.status(400).json({
                success: false,
                message: 'El nombre es obligatorio'
            });
        }

        const mecanico = await Mecanico.create({
            nombre,
            telefono,
            especialidad,
            direccion
        });

        res.status(201).json({
            success: true,
            message: 'Mecánico creado correctamente',
            data: mecanico
        });

    } catch (error) {
        console.error('Error al crear mecánico:', error);

        res.status(500).json({
            success: false,
            message: 'Error al crear el mecánico'
        });
    }
};


module.exports = {
    obtenerMecanicos,
    obtenerMecanicoPorId,
    crearMecanico
};