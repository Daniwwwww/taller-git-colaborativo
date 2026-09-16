const Grua = require('../models/grua.model');


// ==========================================
// GET /api/gruas
// ==========================================
const obtenerGruas = async (req, res) => {
    try {
        const gruas = await Grua.getAll();

        res.status(200).json({
            success: true,
            cantidad: gruas.length,
            data: gruas
        });

    } catch (error) {
        console.error('Error al obtener grúas:', error);

        res.status(500).json({
            success: false,
            message: 'Error al obtener las grúas'
        });
    }
};


// ==========================================
// GET /api/gruas/:id
// ==========================================
const obtenerGruaPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const grua = await Grua.getById(id);

        if (!grua) {
            return res.status(404).json({
                success: false,
                message: 'Grúa no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            data: grua
        });

    } catch (error) {
        console.error('Error al obtener grúa:', error);

        res.status(500).json({
            success: false,
            message: 'Error al obtener la grúa'
        });
    }
};


// ==========================================
// POST /api/gruas
// ==========================================
const crearGrua = async (req, res) => {
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

        const grua = await Grua.create({
            nombre,
            telefono,
            direccion,
            precio
        });

        res.status(201).json({
            success: true,
            message: 'Grúa creada correctamente',
            data: grua
        });

    } catch (error) {
        console.error('Error al crear grúa:', error);

        res.status(500).json({
            success: false,
            message: 'Error al crear la grúa'
        });
    }
};


module.exports = {
    obtenerGruas,
    obtenerGruaPorId,
    crearGrua
};