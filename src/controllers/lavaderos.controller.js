const Lavadero = require('../models/lavadero.model');

// GET /api/lavaderos
const obtenerLavaderos = async (req, res) => {
try {
const lavaderos = await Lavadero.getAll();


    return res.status(200).json({
        success: true,
        cantidad: lavaderos.length,
        data: lavaderos
    });
} catch (error) {
    console.error('Error al obtener lavaderos:', error);

    return res.status(500).json({
        success: false,
        message: 'Error al obtener los lavaderos'
    });
}


};

// GET /api/lavaderos/:id
const obtenerLavaderoPorId = async (req, res) => {
try {
const lavadero = await Lavadero.getById(req.params.id);


    if (!lavadero) {
        return res.status(404).json({
            success: false,
            message: 'Lavadero no encontrado'
        });
    }

    return res.status(200).json({
        success: true,
        data: lavadero
    });
} catch (error) {
    console.error('Error al obtener lavadero:', error);

    return res.status(500).json({
        success: false,
        message: 'Error al obtener el lavadero'
    });
}


};

// POST /api/lavaderos
const crearLavadero = async (req, res) => {
try {
const { nombre, telefono, direccion, precio } = req.body;


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

    return res.status(201).json({
        success: true,
        message: 'Lavadero creado correctamente',
        data: lavadero
    });
} catch (error) {
    console.error('Error al crear lavadero:', error);

    return res.status(500).json({
        success: false,
        message: 'Error al crear el lavadero'
    });
}


};

// PUT /api/lavaderos/:id
const actualizarLavadero = async (req, res) => {
try {
const existente = await Lavadero.getById(req.params.id);


    if (!existente) {
        return res.status(404).json({
            success: false,
            message: 'Lavadero no encontrado'
        });
    }

    const { nombre, telefono, direccion, precio } = req.body;

    const lavadero = await Lavadero.update(req.params.id, {
        nombre,
        telefono,
        direccion,
        precio
    });

    return res.status(200).json({
        success: true,
        message: 'Lavadero actualizado correctamente',
        data: lavadero
    });
} catch (error) {
    console.error('Error al actualizar lavadero:', error);

    return res.status(500).json({
        success: false,
        message: 'Error al actualizar el lavadero'
    });
}


};

// DELETE /api/lavaderos/:id
const eliminarLavadero = async (req, res) => {
try {
const existente = await Lavadero.getById(req.params.id);


    if (!existente) {
        return res.status(404).json({
            success: false,
            message: 'Lavadero no encontrado'
        });
    }

    await Lavadero.delete(req.params.id);

    return res.status(200).json({
        success: true,
        message: 'Lavadero eliminado correctamente'
    });
} catch (error) {
    console.error('Error al eliminar lavadero:', error);

    return res.status(500).json({
        success: false,
        message: 'Error al eliminar el lavadero'
    });
}


};

module.exports = {
obtenerLavaderos,
obtenerLavaderoPorId,
crearLavadero,
actualizarLavadero,
eliminarLavadero
};
