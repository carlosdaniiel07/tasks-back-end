const express = require('express')
const routes = require('./routes')
const tokenValidator = require('./middlewares/tokenValidator')

const app = express()

app.use(express.json())
app.use(tokenValidator())
app.use(routes)

module.exports = app