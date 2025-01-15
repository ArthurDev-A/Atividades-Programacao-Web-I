const express = require("express");
const app = express();
const port = 3000;

app.use(express.json())

app.listen(port, () => {
    console.log(`Users API listening at ${port}`)
});

var livraria = [
    {
        "id": 1,
        "titulo": "O Morro dos Ventos Uivantes",
        "autor": "Emily Brontë",
        "editora": "Editora X",
        "ano": 1847,
        "quant": 10,
        "preco": 39.90
    },
    {
        "id": 2,
        "titulo": "1984",
        "autor": "George Orwell",
        "editora": "Editora Y",
        "ano": 1949,
        "quant": 7,
        "preco": 29.90
    },
    {
        "id": 3,
        "titulo": "Dom Quixote",
        "autor": "Miguel de Cervantes",
        "editora": "Editora Z",
        "ano": 1605,
        "quant": 5,
        "preco": 49.90
    }
];

app.get("/livraria", (req, res) => {
    res.json(livraria);
});

app.get("/livraria/:id", (req, res) => {
    const livro = livraria.find(u => u.id === parseInt(req.params.id));
    res.json(livro);
});

app.get("/livraria/editora/:editora", (req, res) => {
    const livros = livraria.filter(u => u.editora === req.params.editora);
    res.json(livros);
});

app.post("/livraria", (req, res) => {
    var lastId = Math.max(...livraria.map(u => u.id));
    const livro = {
        id: ++lastId,
        titulo: req.body.titulo,
        autor: req.body.autor,
        editora: req.body.editora,
        ano: req.body.ano,
        quant: req.body.quant,
        preco: req.body.preco
    };
    livraria.push(livro);
    res.json(livraria);
});

app.delete("/livraria/:id", (req, res) => {
    livraria = livraria.filter(u => u.id !== parseInt(req.params.id));
    res.json(livraria);
});

app.put("/livraria/:id", (req, res) => {
    const index = livraria.findIndex(u => u.id === parseInt(req.params.id));
    livraria[index] = {
        id: parseInt(req.params.id),
        titulo: req.body.titulo,
        autor: req.body.autor,
        editora: req.body.editora,
        ano: req.body.ano,
        quant: req.body.quant,
        preco: req.body.preco
    }
    res.json(livraria);
});