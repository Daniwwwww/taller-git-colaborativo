const pool = require('../config/database');

// Obtener todos los lavaderos
const getAll = async () => {
    const [rows] = await pool.query(
        'SELECT * FROM lavaderos ORDER BY id ASC'
    );

    return rows;
};


// Obtener lavadero por ID
const getById = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM lavaderos WHERE id = ?',
        [id]
    );

    return rows[0];
};


// Crear lavadero
const create = async ({
    nombre,
    telefono,
    direccion,
    precio
}) => {

    const [result] = await pool.query(
        `INSERT INTO lavaderos
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