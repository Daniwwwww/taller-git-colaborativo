const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UsuarioModel = require('../models/usuario.model');

// REGISTRAR USUARIO
const register = async (req, res) => {
    try {
        const { nombre, correo, telefono, password } = req.body;

        if (!nombre || !correo || !password) {
            return res.status(400).json({
                ok: false,
                msg: 'Nombre, correo y password son obligatorios'
            });
        }

        const usuarioExiste = await UsuarioModel.getByCorreo(correo);

        if (usuarioExiste) {
            return res.status(409).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        // Encriptar contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        const usuario = await UsuarioModel.create({
            nombre,
            correo,
            telefono,
            password: passwordHash
        });

        const token = jwt.sign(
            {
                id: usuario.id,
                correo: usuario.correo
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        res.status(201).json({
            ok: true,
            msg: 'Usuario registrado correctamente',
            token
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: 'Error al registrar usuario'
        });
    }
};


// INICIAR SESIÓN
const login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        const usuario = await UsuarioModel.getByCorreo(correo);

        if (!usuario) {
            return res.status(401).json({
                ok: false,
                msg: 'Correo o contraseña incorrectos'
            });
        }

        const passwordCorrecta = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!passwordCorrecta) {
            return res.status(401).json({
                ok: false,
                msg: 'Correo o contraseña incorrectos'
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                correo: usuario.correo
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        res.json({
            ok: true,
            msg: 'Login exitoso',
            token
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            ok: false,
            msg: 'Error al iniciar sesión'
        });
    }
};


module.exports = {
    register,
    login
};