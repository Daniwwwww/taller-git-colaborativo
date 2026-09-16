const Usuario = require('../models/usuario.model');


// ==========================================
// GET /api/usuarios
// ==========================================
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.getAll();

        res.status(200).json({
            success: true,
            cantidad: usuarios.length,
            data: usuarios
        });

    } catch (error) {
        console.error('Error al obtener usuarios:', error);

        res.status(500).json({
            success: false,
            message: 'Error al obtener los usuarios'
        });
    }
};


// ==========================================
// GET /api/usuarios/:id
// ==========================================
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await Usuario.getById(id);

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: usuario
        });

    } catch (error) {
        console.error('Error al obtener usuario:', error);

        res.status(500).json({
            success: false,
            message: 'Error al obtener el usuario'
        });
    }
};


// ==========================================
// POST /api/usuarios
// ==========================================
const crearUsuario = async (req, res) => {
    try {
        const {
            nombre,
            correo,
            telefono,
            password
        } = req.body;

        if (!nombre || !correo) {
            return res.status(400).json({
                success: false,
                message: 'Nombre y correo son obligatorios'
            });
        }

        const usuario = await Usuario.create({
            nombre,
            correo,
            telefono,
            password
        });

        res.status(201).json({
            success: true,
            message: 'Usuario creado correctamente',
            data: usuario
        });

    } catch (error) {
        console.error('Error al crear usuario:', error);

        res.status(500).json({
            success: false,
            message: 'Error al crear el usuario'
        });
    }
};


module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario
};