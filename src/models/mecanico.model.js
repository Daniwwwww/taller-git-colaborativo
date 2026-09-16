const pool = require('../config/database');

// Obtener todos los mecánicos
const getAll = async () => {
    const [rows] = await pool.query(
        'SELECT * FROM mecanicos ORDER BY id ASC'
    );

    return rows;
};


// Obtener mecánico por ID
const getById = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM mecanicos WHERE id = ?',
        [id]
    );

    return rows[0];
};


// Crear mecánico
const create = async ({
    nombre,
    telefono,
    especialidad,
    direccion
}) => {

    const [result] = await pool.query(
        `INSERT INTO mecanicos
        (nombre, telefono, especialidad, direccion)
        VALUES (?, ?, ?, ?)`,
        [
            nombre,
            telefono ?? null,
            especialidad ?? null,
            direccion ?? null
        ]
    );

    return getById(result.insertId);
};


module.exports = {
    getAll,
    getById,
    create
};