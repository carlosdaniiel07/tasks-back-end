const express = require('express')

const TasksController = require('./controllers/TasksController')
const AuthController = require('./controllers/AuthController')

const tasksController = new TasksController()
const authController = new AuthController()

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

// sign up and auth routes
routes.post('/sign-up', authController.createUser)
routes.post('/auth', authController.login)

module.exports = routes