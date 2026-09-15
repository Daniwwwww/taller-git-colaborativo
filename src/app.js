const express = require('express');

const app = express();

app.use(express.json());

// Rutas
const serviciosRouter = require('./routes/servicios.routes');

app.use('/api/servicios', serviciosRouter);

module.exports = app;