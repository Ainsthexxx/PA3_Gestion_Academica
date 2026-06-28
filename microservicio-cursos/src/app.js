const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
app.use(express.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'bd_cursos',
    waitForConnections: true,
    connectionLimit: 10
});

// 1. REGISTRAR CURSO
app.post('/api/cursos', async (req, res) => {
    try {
        const { codigo, nombre, creditos, docente } = req.body;
        await pool.query('CALL sp_registrar_curso(?, ?, ?, ?)', [codigo, nombre, creditos, docente]);
        res.status(201).json({ mensaje: 'Curso registrado con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. LISTAR TODOS LOS CURSOS
app.get('/api/cursos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM cursos');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. CONSULTAR CURSO POR ID
app.get('/api/cursos/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM cursos WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ mensaje: 'Curso no encontrado' });
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. ACTUALIZAR CURSO
app.put('/api/cursos/:id', async (req, res) => {
    try {
        const { codigo, nombre, creditos, docente } = req.body;
        await pool.query(
            'UPDATE cursos SET codigo=?, nombre=?, creditos=?, docente=? WHERE id=?',
            [codigo, nombre, creditos, docente, req.params.id]
        );
        res.status(200).json({ mensaje: 'Curso actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. ELIMINAR CURSO
app.delete('/api/cursos/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM cursos WHERE id = ?', [req.params.id]);
        res.status(200).json({ mensaje: 'Curso eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;
