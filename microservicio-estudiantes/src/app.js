const express = require('express');
const app = express();
app.use(express.json());

// DATOS SIMULADOS
let estudiantes = [
    {
        id: 1,
        codigo: "A202610",
        nombres: "Moises Flavio",
        apellidos: "Oliva Martinez",
        correo: "moises.oliva@continental.edu.pe",
        carrera: "Ingeniería de Sistemas e Informática"
    }
];

// 1. LISTAR TODO (GET)
app.get('/api/estudiantes', (req, res) => {
    try {
        res.status(200).json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. REGISTRAR (POST)
app.post('/api/estudiantes', (req, res) => {
    try {
        const { codigo, nombres, apellidos, correo, carrera } = req.body;
        const nuevo = { id: estudiantes.length + 1, codigo, nombres, apellidos, correo, carrera };
        estudiantes.push(nuevo);
        res.status(201).json({ mensaje: 'Estudiante registrado con éxito', estudiante: nuevo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Microservicio Estudiantes corriendo en http://localhost:${PORT}`);
});
