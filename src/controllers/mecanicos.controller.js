const Mecanico = require('../models/mecanico.model');

// GET /api/mecanicos
const obtenerMecanicos = async (req, res) => {
try {
const mecanicos = await Mecanico.getAll();


    return res.status(200).json({
        success: true,
        cantidad: mecanicos.length,
        data: mecanicos
    });
} catch (error) {
    console.error('Error al obtener mecánicos:', error);

    return res.status(500).json({
        success: false,
        message: 'Error al obtener los mecánicos'
    });
}


};

// GET /api/mecanicos/:id
const obtenerMecanicoPorId = async (req, res) => {
try {
const mecanico = await Mecanico.getById(req.params.id);


    if (!mecanico) {
        return res.status(404).json({
            success: false,
            message: 'Mecánico no encontrado'
        });
    }

    return res.status(200).json({
        success: true,
        data: mecanico
    });
} catch (error) {
    console.error('Error al obtener mecánico:', error);

    return res.status(500).json({
        success: false,
        message: 'Error al obtener el mecánico'
    });
}


};

// POST /api/mecanicos
const crearMecanico = async (req, res) => {
try {
const { nombre, telefono, especialidad, direccion } = req.body;


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

    return res.status(201).json({
        success: true,
        message: 'Mecánico creado correctamente',
        data: mecanico
    });
} catch (error) {
    console.error('Error al crear mecánico:', error);

    return res.status(500).json({
        success: false,
        message: 'Error al crear el mecánico'
    });
}


};

// PUT /api/mecanicos/:id
const actualizarMecanico = async (req, res) => {
try {
const mecanicoExistente = await Mecanico.getById(req.params.id);


    if (!mecanicoExistente) {
        return res.status(404).json({
            success: false,
            message: 'Mecánico no encontrado'
        });
    }

    const { nombre, telefono, especialidad, direccion } = req.body;

    const mecanico = await Mecanico.update(req.params.id, {
        nombre,
        telefono,
        especialidad,
        direccion
    });

    return res.status(200).json({
        success: true,
        message: 'Mecánico actualizado correctamente',
        data: mecanico
    });
} catch (error) {
    console.error('Error al actualizar mecánico:', error);

    return res.status(500).json({
        success: false,
        message: 'Error al actualizar el mecánico'
    });
}


};

// DELETE /api/mecanicos/:id
const eliminarMecanico = async (req, res) => {
try {
const mecanico = await Mecanico.getById(req.params.id);


    if (!mecanico) {
        return res.status(404).json({
            success: false,
            message: 'Mecánico no encontrado'
        });
    }

    await Mecanico.delete(req.params.id);

    return res.status(200).json({
        success: true,
        message: 'Mecánico eliminado correctamente'
    });
} catch (error) {
    console.error('Error al eliminar mecánico:', error);

    return res.status(500).json({
        success: false,
        message: 'Error al eliminar el mecánico'
    });
}


};

module.exports = {
obtenerMecanicos,
obtenerMecanicoPorId,
crearMecanico,
actualizarMecanico,
eliminarMecanico
};
