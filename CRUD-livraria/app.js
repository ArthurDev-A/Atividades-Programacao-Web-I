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
    },
    { //livro para teste da operação like no título e estoque 0
        "id": 4,
        "titulo": "O Quixote",
        "autor": "Miguel de Cervantes",
        "editora": "Editora Z",
        "ano": 1605,
        "quant": 0,
        "preco": 49.90
    }
];

app.get("/livraria/recente", (req, res) => {
    const livros = [...livraria].sort((a, b) => b.ano - a.ano);
    res.json(livros);
});

app.get("/livraria/antigo", (req, res) => {
    const livros = [...livraria].sort((a, b) => a.ano - b.ano);
    res.json(livros);
});

app.get("/livraria/estoque/", (req, res) => {
    const livros = livraria.filter((u => u.quant == 0));
    res.json(livros);
});

app.get("/livraria/editora/:editora", (req, res) => {
    const livros = livraria.filter(u => u.editora === req.params.editora);
    res.json(livros);
});

app.get("/livraria/titulo/:titulo", (req, res) => {
    const livros = livraria.filter(u => u.titulo.includes(req.params.titulo));
    res.json(livros);
});

app.get("/livraria/preco/maior/:preco", (req, res) => {
    const livros = livraria.filter((u => u.preco > parseFloat(req.params.preco)));
    res.json(livros);
});

app.get("/livraria/preco/menor/:preco", (req, res) => {
    const livros = livraria.filter((u => u.preco < parseFloat(req.params.preco)));
    res.json(livros);
});

app.get("/livraria/:id", (req, res) => {
    const livro = livraria.find(u => u.id === parseInt(req.params.id));
    res.json(livro);
});

app.get("/livraria", (req, res) => {
    res.json(livraria);
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

app.use((req, res) => {
    res.status(404).json({ message: "Endpoint não foi encontrado"})
});