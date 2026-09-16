const pool = require('../config/database');

// Obtener todas las grúas
const getAll = async () => {
    const [rows] = await pool.query(
        'SELECT * FROM gruas ORDER BY id ASC'
    );

    return rows;
};


// Obtener grúa por ID
const getById = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM gruas WHERE id = ?',
        [id]
    );

    return rows[0];
};


// Crear grúa
const create = async ({
    nombre,
    telefono,
    direccion,
    precio
}) => {

    const [result] = await pool.query(
        `INSERT INTO gruas
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