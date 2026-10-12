const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas de autenticación
const authRoutes = require('./routes/auth.routes');

// Rutas de VELOEXPRESS
const serviciosRoutes = require('./routes/servicios.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const mecanicosRoutes = require('./routes/mecanicos.routes');
const lavaderosRoutes = require('./routes/lavaderos.routes');
const gruasRoutes = require('./routes/gruas.routes');
const montallantasRoutes = require('./routes/montallantas.routes');

// Registrar rutas
app.use('/api/auth', authRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/mecanicos', mecanicosRoutes);
app.use('/api/lavaderos', lavaderosRoutes);
app.use('/api/gruas', gruasRoutes);
app.use('/api/montallantas', montallantasRoutes);

// Middleware global de errores
app.use((err, req, res, next) => {
    console.error(err);

    if (res.headersSent) {
        return next(err);
    }

    res.status(500).json({
        ok: false,
        msg: 'Error interno del servidor'
    });
});

module.exports = app;