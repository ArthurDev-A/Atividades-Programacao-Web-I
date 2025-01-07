const express =
require('express');
const app = express();
const PORT = 8000;

app.listen(PORT, () => {
console.log('sever on port 8000');
})

app.get('/', function(req,
res) {
res.send('hello, world!');
console.log('sever on port 8000');
})

app.get('/v2/:name/json', function(req, res)
{
res.json({msg: 'hello, ' + req.params.name});
})

app.get('/v3/:name/:lang/json', function(req, res)
{
    switch (req.params.lang) {
        case "en":
            res.json({msg: 'Hello, ' + req.params.name});
            break;
        case "pt-br":
            res.json({msg: 'Olá, ' + req.params.name});
            break;
        default:
            res.json({msg: req.params.name + ', este idioma não está disponível'});
    }
})

app.get('/v3/*', function(req, res) {
    res.status(404).json({error: 'Rota não encontrada'});
});