const pool = require('../config/database');

// Obtener todos los usuarios
const getAll = async () => {
    const [rows] = await pool.query(
        'SELECT * FROM usuarios ORDER BY id ASC'
    );

    return rows;
};


// Obtener usuario por ID
const getById = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM usuarios WHERE id = ?',
        [id]
    );

    return rows[0];
};


// Crear usuario
const create = async ({
    nombre,
    correo,
    telefono,
    password
}) => {

    const [result] = await pool.query(
        `INSERT INTO usuarios
        (nombre, correo, telefono, password)
        VALUES (?, ?, ?, ?)`,
        [
            nombre,
            correo,
            telefono ?? null,
            password ?? null
        ]
    );

    return getById(result.insertId);
};


module.exports = {
    getAll,
    getById,
    create
};