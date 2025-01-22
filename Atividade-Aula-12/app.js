const express = require('express')
const app = express()
const axios = require('axios')
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const port = 3000

app.listen(port, () => {
    console.log('Servidor rodando...')
})

//confirmação de requisição recebida
app.use((req, res, next) => {
    var data = new Date()
    console.log(`Requisição recebida ${req.url} em`, data.toLocaleString('pt-BR'))
    next()
})

//mostrar preço da moeda corrente
app.get('/', async (req, res) => {
    try {
        const bit = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        console.log(bit.data)
        res.render('index', {b: bit.data})
    } catch (err) {
        console.log(err)
    }
})

//excessão 404
app.get('*', (req, res) => {
    res.sendStatus(404)
})