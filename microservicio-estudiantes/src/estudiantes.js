const express = require('express');
const app = express();
app.use(express.json());

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

app.get('/api/estudiantes', (req, res) => {
    res.status(200).json(estudiantes);
});

app.post('/api/estudiantes', (req, res) => {
    const { codigo, nombres, apellidos, correo, carrera } = req.body;
    const nuevo = { id: estudiantes.length + 1, codigo, nombres, apellidos, correo, carrera };
    estudiantes.push(nuevo);
    res.status(201).json({ mensaje: 'Estudiante registrado con éxito', estudiante: nuevo });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Microservicio Estudiantes corriendo en http://localhost:${PORT}`);
});
