const express = require('express');

const app = express();

app.use(express.json());

// Rutas

const authRouter = require('./routes/auth.routes');

const serviciosRouter = require('./routes/servicios.routes');

const usuariosRouter = require('./routes/usuarios.routes');

const mecanicosRouter = require('./routes/mecanicos.routes');

const lavaderosRouter = require('./routes/lavaderos.routes');

const gruasRouter = require('./routes/gruas.routes');

const montallantasRouter = require('./routes/montallantas.routes');

app.use('/api/auth', authRouter);

app.use('/api/servicios', serviciosRouter);

app.use('/api/usuarios', usuariosRouter);

app.use('/api/mecanicos', mecanicosRouter);

app.use('/api/lavaderos', lavaderosRouter);

app.use('/api/gruas', gruasRouter);

app.use('/api/montallantas', montallantasRouter);


module.exports = app;