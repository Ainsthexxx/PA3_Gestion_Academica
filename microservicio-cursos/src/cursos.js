const express = require('express');
const app = express();
app.use(express.json());

// Banco de datos simulado para Cursos (Memoria local)
let cursos = [
    {
        id: 1,
        codigo: "INF-301",
        nombre: "Diseño y Desarrollo Web",
        creditos: 4,
        docente: "Ing. Juan Pérez"
    }
];

// 1. LISTAR TODOS LOS CURSOS (GET)
app.get('/api/cursos', (req, res) => {
    res.status(200).json(cursos);
});

// 2. REGISTRAR UN CURSO (POST)
app.post('/api/cursos', (req, res) => {
    try {
        const { codigo, nombre, creditos, docente } = req.body;
        const nuevoCurso = { id: cursos.length + 1, codigo, nombre, creditos, docente };
        cursos.push(nuevoCurso);
        res.status(201).json({ mensaje: 'Curso registrado con éxito', curso: nuevoCurso });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ESCUCHAR EN EL PUERTO 4000
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Microservicio Cursos corriendo en http://localhost:${PORT}`);
});
