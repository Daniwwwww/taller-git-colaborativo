const pool = require('../config/database');

// Obtener todos los servicios
const getAll = async () => {
    const [rows] = await pool.query(
        'SELECT * FROM servicios ORDER BY id ASC'
    );

    return rows;
};


// Obtener servicio por ID
const getById = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM servicios WHERE id = ?',
        [id]
    );

    return rows[0];
};


// Crear servicio
const create = async ({
    nombre,
    descripcion,
    categoria,
    precio
}) => {

    const [result] = await pool.query(
        `INSERT INTO servicios
        (nombre, descripcion, categoria, precio)
        VALUES (?, ?, ?, ?)`,
        [
            nombre,
            descripcion ?? null,
            categoria ?? null,
            precio ?? null
        ]
    );

    return getById(result.insertId);
};


// Actualizar servicio
const update = async (id, {
    nombre,
    descripcion,
    categoria,
    precio
}) => {

    const [result] = await pool.query(
        `UPDATE servicios
        SET nombre = COALESCE(?, nombre),
            descripcion = COALESCE(?, descripcion),
            categoria = COALESCE(?, categoria),
            precio = COALESCE(?, precio)
        WHERE id = ?`,
        [
            nombre,
            descripcion,
            categoria,
            precio,
            id
        ]
    );

    return result.affectedRows;
};


// Eliminar servicio
const remove = async (id) => {

    const [result] = await pool.query(
        'DELETE FROM servicios WHERE id = ?',
        [id]
    );

    return result.affectedRows;
};


module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};