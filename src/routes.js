const express = require('express')

const TasksController = require('./controllers/TasksController')
const tasksController = new TasksController()

const routes = express.Router()

// main route
routes.get('/', (req, res) => {
  return res.json({
    status: res.statusCode,
    success: true,
    timestamp: new Date().getTime(),
  })
})

// /tasks
routes.get('/tasks', tasksController.index)
routes.get('/tasks/:id', tasksController.show)
routes.post('/tasks', tasksController.save)
routes.put('/tasks/:id', tasksController.update)
routes.delete('/tasks/:id', tasksController.delete)

module.exports = routes