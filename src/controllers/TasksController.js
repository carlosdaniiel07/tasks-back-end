const TaskService = require('./../services/TaskService')
const taskService = new TaskService()

class TasksController {
  constructor() {

  }

  async index(req, res) {
    const {  maxDate } = req.query
    const tasks = await taskService.getAll(maxDate)
    return res.json(tasks)
  }

  async show(req, res, next) {
    const { id } = req.params
    
    try {
      const task = await taskService.getById(id)
      return res.json(task)
    } catch (err) {
      next(err)
    }
  }

  async save(req, res) {
    const task = await taskService.save(req.body)
    return res.status(201).json(task)
  }

  async update(req, res, next) {
    const { id } = req.params
    
    try {
      const task = await taskService.update(id, req.body)
      return res.json(task)
    } catch (err) {
      next(err)
    }
  }

  async delete(req, res, next) {
    const { id } = req.params
    
    try {
      const task = await taskService.delete(id)
      return res.json({ success: true })
    } catch(err) {
      next(err)
    }
  }

  async markAsDone(req, res, next) {
    const { id } = req.params

    try {
      const task = await taskService.markAsDone(id)
      return res.json(task)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = TasksController