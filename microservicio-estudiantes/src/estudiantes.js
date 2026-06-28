const express = require('express');
const app = express();
app.use(express.json());

// Banco de datos simulado 
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

// 1. LISTAR TODOS
app.get('/api/estudiantes', (req, res) => {
    res.status(200).json(estudiantes);
});

// 2. CONSULTAR POR ID
app.get('/api/estudiantes/:id', (req, res) => {
    const estudiante = estudiantes.find(e => e.id === parseInt(req.params.id));
    if (!estudiante) return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    res.status(200).json(estudiante);
});

// 3. REGISTRAR
app.post('/api/estudiantes', (req, res) => {
    const { codigo, nombres, apellidos, correo, carrera } = req.body;
    const nuevo = { id: estudiantes.length + 1, codigo, nombres, apellidos, correo, carrera };
    estudiantes.push(nuevo);
    res.status(201).json({ mensaje: 'Estudiante registrado con éxito', estudiante: nuevo });
});

// 4. ACTUALIZAR
app.put('/api/estudiantes/:id', (req, res) => {
    const estudiante = estudiantes.find(e => e.id === parseInt(req.params.id));
    if (!estudiante) return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    
    const { codigo, nombres, apellidos, correo, carrera } = req.body;
    estudiante.codigo = codigo || estudiante.codigo;
    estudiante.nombres = nombres || estudiante.nombres;
    estudiante.apellidos = apellidos || estudiante.apellidos;
    estudiante.correo = correo || estudiante.correo;
    estudiante.carrera = carrera || estudiante.carrera;

    res.status(200).json({ mensaje: "Estudiante actualizado correctamente", estudiante });
});

// 5. ELIMINAR
app.delete('/api/estudiantes/:id', (req, res) => {
    const index = estudiantes.findIndex(e => e.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ mensaje: "Estudiante no encontrado" });
    
    estudiantes.splice(index, 1);
    res.status(200).json({ mensaje: "Estudiante eliminado correctamente" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Microservicio Estudiantes corriendo en http://localhost:${PORT}`);
});
