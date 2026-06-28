const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
app.use(express.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'bd_estudiantes',
    waitForConnections: true,
    connectionLimit: 10
});

// 1. REGISTRAR
app.post('/api/estudiantes', async (req, res) => {
    try {
        const { codigo, nombres, apellidos, correo, carrera } = req.body;
        await pool.query('CALL sp_registrar_estudiante(?, ?, ?, ?, ?)', [codigo, nombres, apellidos, correo, carrera]);
        res.status(201).json({ mensaje: 'Estudiante registrado con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. LISTAR TODO
app.get('/api/estudiantes', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM estudiantes');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. CONSULTAR POR ID
app.get('/api/estudiantes/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM estudiantes WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. ACTUALIZAR
app.put('/api/estudiantes/:id', async (req, res) => {
    try {
        const { codigo, nombres, apellidos, correo, carrera } = req.body;
        await pool.query(
            'UPDATE estudiantes SET codigo=?, nombres=?, apellidos=?, correo=?, carrera=? WHERE id=?',
            [codigo, nombres, apellidos, correo, carrera, req.params.id]
        );
        res.status(200).json({ mensaje: 'Estudiante actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. ELIMINAR
app.delete('/api/estudiantes/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM estudiantes WHERE id = ?', [req.params.id]);
        res.status(200).json({ mensaje: 'Estudiante eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
