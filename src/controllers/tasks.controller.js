const TaskService = require('../services/TaskService')
const taskService = new TaskService()

const index = async (req, res) => {
  const { maxDate } = req.query
  const tasks = await taskService.getAll(maxDate)
  
  return { status: 200, data: tasks }
}

const show = async (req, res) => {
  const { id } = req.params
  const task = await taskService.getById(id)
  
  return { status: 200, data: task }
}

const save = async (req, res) => {
  const task = await taskService.save(req.body)
  return { status: 201, data: task }
}

const update = async (req, res) => {
  const { id } = req.params
  const task = await taskService.update(id, req.body)
  
  return { status: 200, data: task }
}

const remove = async (req, res) => {
  const { id } = req.params
  const task = await taskService.delete(id)
  
  return { status: 200, data: { success: true } }
}

const markAsDone = async (req, res) => {
  const { id } = req.params
  const task = await taskService.markAsDone(id)
  
  return { status: 200, data: task }
}

module.exports = {
  index,
  show,
  save,
  update,
  remove,
  markAsDone,
}