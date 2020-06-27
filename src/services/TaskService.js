const knex = require('./../database/connection')
const uuid = require('uuid')
const { ApiError } = require('./../middlewares/errorHandler')

class TaskService {
  constructor() {

  }

  async getAll(minDate, maxDate) {
    if (minDate && maxDate) {
      return await knex('tasks').select('*')
        .whereBetween('estimate_date', [minDate, maxDate]).orWhereNull('estimate_date')
        .orderBy('created_at')
    } else {
      return await knex('tasks').select('*').orderBy('created_at')
    }
  }

  async getById(id) {
    const task = await knex('tasks').where({ id }).select('*').first()

    if (!task) {
      throw new ApiError(404, 'Esta tarefa não foi encontrada')
    }

    return task
  }

  async save({ description, estimateDate, notify }) {
    const task = {
      id: uuid.v4(),
      description,
      estimate_date: estimateDate,
      notify,
      created_at: new Date()
    }

    return (await knex('tasks').insert(task, '*'))[0]
  }

  async update(taskId, { description, estimateDate, notify, doneDate }) {
    const task = (await knex('tasks').where({ id: taskId }).update({
      description,
      estimate_date: estimateDate,
      notify,
      done_date: doneDate
    }, '*'))[0]
    
    if (!task) {
      throw new ApiError(404, 'Esta tarefa não foi encontrada')
    }

    return task
  }

  async delete(id) {
    const task = (await knex('tasks').where({ id }).del('*'))[0]

    if (!task) {
      throw new ApiError(404, 'Esta tarefa não foi encontrada')
    }

    return task
  }

  async markAsDone(taskId) {
    const task = await this.getById(taskId)
    const doneDate = task.done_date ? null : new Date()

    return (await knex('tasks').where({ id: taskId }).update({ done_date: doneDate }, '*'))[0]
  }
}

module.exports = TaskService