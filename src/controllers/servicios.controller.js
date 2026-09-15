const Servicio = require('../models/servicio.model');

// ==========================================
// GET /api/servicios
// Obtener todos los servicios
// ==========================================
const obtenerServicios = async (req, res) => {
    try {
        const servicios = await Servicio.getAll();

        res.status(200).json({
            success: true,
            cantidad: servicios.length,
            data: servicios
        });

    } catch (error) {
        console.error('Error al obtener servicios:', error);

        res.status(500).json({
            success: false,
            message: 'Error al obtener los servicios'
        });
    }
};


// ==========================================
// GET /api/servicios/:id
// Obtener servicio por ID
// ==========================================
const obtenerServicioPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const servicio = await Servicio.getById(id);

        if (!servicio) {
            return res.status(404).json({
                success: false,
                message: 'Servicio no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: servicio
        });

    } catch (error) {
        console.error('Error al obtener servicio:', error);

        res.status(500).json({
            success: false,
            message: 'Error al obtener el servicio'
        });
    }
};


// ==========================================
// POST /api/servicios
// Crear servicio
// ==========================================
const crearServicio = async (req, res) => {
    try {
        const {
            nombre,
            descripcion,
            categoria,
            precio
        } = req.body;

        if (!nombre) {
            return res.status(400).json({
                success: false,
                message: 'El nombre del servicio es obligatorio'
            });
        }

        const servicio = await Servicio.create({
            nombre,
            descripcion,
            categoria,
            precio
        });

        res.status(201).json({
            success: true,
            message: 'Servicio creado correctamente',
            data: servicio
        });

    } catch (error) {
        console.error('Error al crear servicio:', error);

        res.status(500).json({
            success: false,
            message: 'Error al crear el servicio'
        });
    }
};


// ==========================================
// PUT /api/servicios/:id
// Actualizar servicio
// ==========================================
const actualizarServicio = async (req, res) => {
    try {
        const { id } = req.params;

        const existente = await Servicio.getById(id);

        if (!existente) {
            return res.status(404).json({
                success: false,
                message: 'Servicio no encontrado'
            });
        }

        const {
            nombre,
            descripcion,
            categoria,
            precio
        } = req.body;

        await Servicio.update(id, {
            nombre,
            descripcion,
            categoria,
            precio
        });

        const servicio = await Servicio.getById(id);

        res.status(200).json({
            success: true,
            message: 'Servicio actualizado correctamente',
            data: servicio
        });

    } catch (error) {
        console.error('Error al actualizar servicio:', error);

        res.status(500).json({
            success: false,
            message: 'Error al actualizar el servicio'
        });
    }
};


// ==========================================
// DELETE /api/servicios/:id
// Eliminar servicio
// ==========================================
const eliminarServicio = async (req, res) => {
    try {
        const { id } = req.params;

        const existente = await Servicio.getById(id);

        if (!existente) {
            return res.status(404).json({
                success: false,
                message: 'Servicio no encontrado'
            });
        }

        await Servicio.remove(id);

        res.status(200).json({
            success: true,
            message: 'Servicio eliminado correctamente'
        });

    } catch (error) {
        console.error('Error al eliminar servicio:', error);

        res.status(500).json({
            success: false,
            message: 'Error al eliminar el servicio'
        });
    }
};


// ==========================================
// EXPORTAR FUNCIONES
// ==========================================
module.exports = {
    obtenerServicios,
    obtenerServicioPorId,
    crearServicio,
    actualizarServicio,
    eliminarServicio
};