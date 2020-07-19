const { body, param, query } = require('express-validator')

const requestValidator = require('../middlewares/requestValidator')
const cleanController = require('../middlewares/cleanController')

const tasksController = require('../controllers/tasks.controller')

const tasks = routes => {
  routes.get('/tasks', requestValidator([
    query('maxDate').optional().isISO8601(),
  ]), cleanController(tasksController.index))
  
  routes.post('/tasks', requestValidator([
    body('description').notEmpty({ ignore_whitespace: true }).isLength({ min: 3, max: 200 }),
    body('estimateDate').optional({ nullable: true }).isISO8601(),
    body('notify').isBoolean(),
  ]), cleanController(tasksController.save))
  
  routes.get('/tasks/:id', requestValidator([
    param('id').isUUID('4'),
  ]), cleanController(tasksController.show))
  
  routes.put('/tasks/:id', requestValidator([
    body('description').notEmpty({ ignore_whitespace: true }).isLength({ min: 3, max: 200 }),
    body('estimateDate').optional({ nullable: true }).isISO8601(),
    body('doneDate').optional({ nullable: true }).isISO8601(),
    body('notify').isBoolean(),
  ]), cleanController(tasksController.update))
  
  routes.put('/tasks/:id/done', requestValidator([
    param('id').isUUID('4'),
  ]), cleanController(tasksController.markAsDone))
  
  routes.delete('/tasks/:id', requestValidator([
    param('id').isUUID(),
  ]), cleanController(tasksController.remove))
}

module.exports = tasks
