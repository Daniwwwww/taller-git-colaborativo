
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const origenesPermitidos = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://veloexpress-ten.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || origenesPermitidos.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Origen no permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.options(/.*/, cors());

app.use(morgan('dev'));
app.use(express.json());

const authRoutes = require('./routes/auth.routes');
const serviciosRoutes = require('./routes/servicios.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const mecanicosRoutes = require('./routes/mecanicos.routes');
const lavaderosRoutes = require('./routes/lavaderos.routes');
const gruasRoutes = require('./routes/gruas.routes');
const montallantasRoutes = require('./routes/montallantas.routes');

app.use('/api/auth', authRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/mecanicos', mecanicosRoutes);
app.use('/api/lavaderos', lavaderosRoutes);
app.use('/api/gruas', gruasRoutes);
app.use('/api/montallantas', montallantasRoutes);

app.get('/', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'API VELOEXPRESS funcionando correctamente'
    });
});

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
