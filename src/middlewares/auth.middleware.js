const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/usuario.model');

const verificarToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!authHeader || !authHeader.startsWith('Bearer ') || !token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token requerido'
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const usuario = await UsuarioModel.getById(decoded.id);

        if (!usuario || !usuario.token || usuario.token !== token) {
            return res.status(403).json({
                ok: false,
                msg: 'Token no autorizado'
            });
        }

        req.usuario = {
            id: usuario.id,
            correo: usuario.correo
        };

        next();

    } catch (error) {
        if (error.name === 'JsonWebTokenError' ||
            error.name === 'TokenExpiredError') {
            return res.status(403).json({
                ok: false,
                msg: 'Token inválido o expirado'
            });
        }

        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error al verificar el token'
        });
    }
};

module.exports = {
    verificarToken
};