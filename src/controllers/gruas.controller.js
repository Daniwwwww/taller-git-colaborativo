
const Grua = require('../models/grua.model');

// Consultar todas las grúas
const obtenerGruas = async (req, res) => {
    try {
        const gruas = await Grua.getAll();
        return res.status(200).json({
            success: true,
            cantidad: gruas.length,
            data: gruas
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener las grúas'
        });
    }
};

// Consultar una grúa por ID
const obtenerGruaPorId = async (req, res) => {
    try {
        const grua = await Grua.getById(req.params.id);

        if (!grua) {
            return res.status(404).json({
                success: false,
                message: 'Grúa no encontrada'
            });
        }

        return res.status(200).json({
            success: true,
            data: grua
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error al consultar la grúa'
        });
    }
};

// Crear una grúa
const crearGrua = async (req, res) => {
    try {
        const { nombre, telefono, direccion, precio } = req.body;

        if (!nombre) {
            return res.status(400).json({
                success: false,
                message: 'El nombre es obligatorio'
            });
        }

        const grua = await Grua.create({
            nombre, telefono, direccion, precio
        });

        return res.status(201).json({
            success: true,
            message: 'Grúa creada correctamente',
            data: grua
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error al crear la grúa'
        });
    }
};

// Actualizar una grúa
const actualizarGrua = async (req, res) => {
    try {
        const existente = await Grua.getById(req.params.id);

        if (!existente) {
            return res.status(404).json({
                success: false,
                message: 'Grúa no encontrada'
            });
        }

        const { nombre, telefono, direccion, precio } = req.body;

        const grua = await Grua.update(req.params.id, {
            nombre: nombre ?? existente.nombre,
            telefono: telefono ?? existente.telefono,
            direccion: direccion ?? existente.direccion,
            precio: precio ?? existente.precio
        });

        return res.status(200).json({
            success: true,
            message: 'Grúa actualizada correctamente',
            data: grua
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar la grúa'
        });
    }
};

// Eliminar una grúa
const eliminarGrua = async (req, res) => {
    try {
        const eliminada = await Grua.delete(req.params.id);

        if (!eliminada) {
            return res.status(404).json({
                success: false,
                message: 'Grúa no encontrada'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Grúa eliminada correctamente'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar la grúa'
        });
    }
};

module.exports = {
    obtenerGruas,
    obtenerGruaPorId,
    crearGrua,
    actualizarGrua,
    eliminarGrua
};