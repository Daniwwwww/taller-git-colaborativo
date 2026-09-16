const pool = require('../config/database');

// Obtener todos los montallantas
const getAll = async () => {
    const [rows] = await pool.query(
        'SELECT * FROM montallantas ORDER BY id ASC'
    );

    return rows;
};


// Obtener montallantas por ID
const getById = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM montallantas WHERE id = ?',
        [id]
    );

    return rows[0];
};


// Crear montallantas
const create = async ({
    nombre,
    telefono,
    direccion,
    precio
}) => {

    const [result] = await pool.query(
        `INSERT INTO montallantas
        (nombre, telefono, direccion, precio)
        VALUES (?, ?, ?, ?)`,
        [
            nombre,
            telefono ?? null,
            direccion ?? null,
            precio ?? null
        ]
    );

    return getById(result.insertId);
};


module.exports = {
    getAll,
    getById,
    create
};