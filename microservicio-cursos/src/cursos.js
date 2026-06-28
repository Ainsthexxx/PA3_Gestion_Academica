const express = require('express');
const app = express();
app.use(express.json());

// Banco de datos simulado 
let cursos = [
    {
        id: 1,
        codigo: "INF-301",
        nombre: "Diseño y Desarrollo Web",
        creditos: 4,
        docente: "Ing. Juan Pérez"
    }
];

// 1. LISTAR TODOS
app.get('/api/cursos', (req, res) => {
    res.status(200).json(cursos);
});

// 2. CONSULTAR POR ID
app.get('/api/cursos/:id', (req, res) => {
    const curso = cursos.find(c => c.id === parseInt(req.params.id));
    if (!curso) return res.status(404).json({ mensaje: "Curso no encontrado" });
    res.status(200).json(curso);
});

// 3. REGISTRAR
app.post('/api/cursos', (req, res) => {
    const { codigo, nombre, creditos, docente } = req.body;
    const nuevoCurso = { id: cursos.length + 1, codigo, nombre, creditos, docente };
    cursos.push(nuevoCurso);
    res.status(201).json({ mensaje: 'Curso registrado con éxito', curso: nuevoCurso });
});

// 4. ACTUALIZAR
app.put('/api/cursos/:id', (req, res) => {
    const curso = cursos.find(c => c.id === parseInt(req.params.id));
    if (!curso) return res.status(404).json({ mensaje: "Curso no encontrado" });

    const { codigo, nombre, creditos, docente } = req.body;
    curso.codigo = codigo || curso.codigo;
    curso.nombre = nombre || curso.nombre;
    curso.creditos = creditos || curso.creditos;
    curso.docente = docente || curso.docente;

    res.status(200).json({ mensaje: "Curso actualizado correctamente", curso });
});

// 5. ELIMINAR
app.delete('/api/cursos/:id', (req, res) => {
    const index = cursos.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ mensaje: "Curso no encontrado" });

    cursos.splice(index, 1);
    res.status(200).json({ mensaje: "Curso eliminado correctamente" });
});   

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Microservicio Cursos corriendo en http://localhost:${PORT}`);
});
