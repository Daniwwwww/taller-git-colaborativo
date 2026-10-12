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

// Actualizar mecánico
const update = async (
id,
{ nombre, telefono, especialidad, direccion }
) => {
await pool.query(
`UPDATE mecanicos
         SET nombre = ?, telefono = ?, especialidad = ?, direccion = ?
         WHERE id = ?`,
[
nombre,
telefono ?? null,
especialidad ?? null,
direccion ?? null,
id
]
);


return getById(id);


};

// Eliminar mecánico
const deleteMecanico = async (id) => {
const [result] = await pool.query(
'DELETE FROM mecanicos WHERE id = ?',
[id]
);


return result.affectedRows > 0;


};

module.exports = {
getAll,
getById,
create,
update,
delete: deleteMecanico
};
