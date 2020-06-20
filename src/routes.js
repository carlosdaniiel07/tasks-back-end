const express = require('express')
const { body, param } = require('express-validator')

const requestValidator = require('./middlewares/requestValidator')

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

routes.get('/tasks/:id', requestValidator([
  param('id').isUUID('4'),
]), tasksController.show)

routes.post('/tasks', requestValidator([
  body('description').notEmpty({ ignore_whitespace: true }).isLength({ min: 3, max: 200 }),
  body('estimateDate').optional({ nullable: true }).isISO8601(),
  body('notify').isBoolean(),
]), tasksController.save)

routes.put('/tasks/:id', requestValidator([
  body('description').notEmpty({ ignore_whitespace: true }).isLength({ min: 3, max: 200 }),
  body('estimateDate').optional({ nullable: true }).isISO8601(),
  body('doneDate').optional({ nullable: true }).isISO8601(),
  body('notify').isBoolean(),
]), tasksController.update)

routes.delete('/tasks/:id', requestValidator([
  param('id').isUUID(),
]), tasksController.delete)

// sign up and auth routes
routes.post('/sign-up', requestValidator([
  body('name').notEmpty({ ignore_whitespace: true }).isLength({ min: 3, max: 40 }),
  body('login').notEmpty({ ignore_whitespace: true }).isLength({ min: 3, max: 30 }),
  body('email').notEmpty({ ignore_whitespace: true }).isLength({ min: 3, max: 30 }).isEmail(),
  body('password').notEmpty({ ignore_whitespace: true }).isLength({ min: 6, max: 20 }),
]), authController.createUser)

routes.post('/auth', requestValidator([
  body('loginOrEmail').notEmpty({ ignore_whitespace: true }),
  body('password').notEmpty(),
]), authController.login)

module.exports = routes