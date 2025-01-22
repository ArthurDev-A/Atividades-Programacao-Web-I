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

//mostrar preço do bicoin na moeda
app.get('/:moeda', async (req, res, next) => {
    try {
        const bit = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
        // Verifica se a moeda está no banco de dados
        if (bit.data.bpi[req.params.moeda]) {
            console.log(bit.data)
            res.render('index', {b: bit.data, moeda: req.params.moeda})
        } else {
            // Passa para o próximo endpoint, no caso *
            next()
        }
    } catch (err) {
        console.log(err)
    }
})

//excessão 404
app.get('*', (req, res) => {
    console.log("endpoint inexistente")
    res.sendStatus(404)
})