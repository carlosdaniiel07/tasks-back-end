const express = require('express')
const routes = express.Router()

const appRoutes = require('./routers')

// main route
routes.get('/', (req, res) => {
  return res.json({
    status: res.statusCode,
    success: true,
    timestamp: new Date().getTime(),
  })
})

// apply routes
appRoutes.forEach(route => route(routes))

module.exports = routes