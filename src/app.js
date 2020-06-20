const express = require('express')
const routes = require('./routes')

const tokenValidator = require('./middlewares/tokenValidator')
const { errorHandler } = require('./middlewares/errorHandler')

const app = express()

app.use(express.json())
app.use(tokenValidator())
app.use(routes)
app.use(errorHandler())

module.exports = app