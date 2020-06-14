const express = require('express')

const routes = express.Router()

// main route
routes.get('/', (req, res) => {
  return res.json({
    status: res.statusCode,
    success: true,
    timestamp: new Date().getTime(),
  })
})

module.exports = routes