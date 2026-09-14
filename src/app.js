const express = require('express');
const app = express();

app.use(express.json());

const veloexpressRouter = require('./routes/veloexpress.routes');

app.use('/api', veloexpressRouter);

module.exports = app;