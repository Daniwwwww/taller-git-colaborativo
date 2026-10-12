
const pool = require('../config/database');

// Consultar todas las grúas
const getAll = async () => {
    const [rows] = await pool.query(
        'SELECT * FROM gruas ORDER BY id ASC'
    );
    return rows;
};

// Consultar una grúa por ID
const getById = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM gruas WHERE id = ?',
        [id]
    );
    return rows[0];
};

// Crear una grúa
const create = async ({ nombre, telefono, direccion, precio }) => {
    const [result] = await pool.query(
        `INSERT INTO gruas (nombre, telefono, direccion, precio)
         VALUES (?, ?, ?, ?)`,
        [nombre, telefono ?? null, direccion ?? null, precio ?? null]
    );

    return getById(result.insertId);
};

// Actualizar una grúa
const update = async (id, { nombre, telefono, direccion, precio }) => {
    await pool.query(
        `UPDATE gruas
         SET nombre = ?, telefono = ?, direccion = ?, precio = ?
         WHERE id = ?`,
        [nombre, telefono ?? null, direccion ?? null, precio ?? null, id]
    );

    return getById(id);
};

// Eliminar una grúa
const deleteGrua = async (id) => {
    const [result] = await pool.query(
        'DELETE FROM gruas WHERE id = ?',
        [id]
    );

    return result.affectedRows > 0;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: deleteGrua
};