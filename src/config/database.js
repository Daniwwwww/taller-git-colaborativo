
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: Number(process.env.DB_POOL_LIMIT || 10),
    waitForConnections: true,
    ssl: process.env.DB_SSL === 'true'
        ? {
            ca: fs.readFileSync(
                path.join(__dirname, '../../ca.pem'),
                'utf8'
            )
        }
        : undefined
});

pool.getConnection()
    .then(conn => {
        console.log('✅ MySQL conectado correctamente');
        conn.release();
    })
    .catch(error => {
        console.error('❌ Error MySQL:', error.message);
    });

module.exports = pool;
