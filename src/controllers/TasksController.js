const TaskService = require('./../services/TaskService')
const taskService = new TaskService()

class TasksController {
  constructor() {

  }

  async index(req, res) {
    const tasks = await taskService.getAll()
    return res.json(tasks)
  }

  async show(req, res) {
    const { id } = req.params
    const task = await taskService.getById(id)

    if (!task) {
      return res.status(404).json({ message: `Not found a task with id ${id}` })
    }

    return res.json(task)
  }

  async save(req, res) {
    const task = await taskService.save(req.body)
    return res.status(201).json(task)
  }

  async update(req, res) {
    const { id } = req.params
    const task = await taskService.update(id, req.body)

    if (!task) {
      return res.status(404).json({ message: `Not found a task with id ${id}` })
    }

    return res.json(task)
  }

  async delete(req, res) {
    const { id } = req.params
    const task = await taskService.delete(id)

    if (!task) {
      return res.status(404).json({ message: `Not found a task with id ${id}` })
    }

    return res.json({ success: true })
  }
}

module.exports = TasksController