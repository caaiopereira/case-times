// Importações dos packages
const express = require('express')
const cors = require('cors')

// Instanciando o servidor
const app = express()

// configurando o servidor para receber requisições com o corpo no formato JSON
app.use(express.json())

// Usado para aceitar requisições vindas de origens diferentes, ou seja, qualquer outro http .... diferente do nosso.
app.use(cors())

// Importando o Controller
const timesController = require('./controllers/timesController')

// Chamando as rotas
timesController.rotas(app)

// Exportação do app
module.exports = app




  