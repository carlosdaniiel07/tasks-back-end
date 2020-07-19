const knex = require('./../database/connection')
const uuid = require('uuid')
const { ApiError } = require('./../middlewares/errorHandler')

class TaskService {
  constructor() {

  }

  async getAll(maxDate, userId) {
    if (maxDate) {
      return await knex('tasks').select('*')
        .where('estimate_date', '<=', maxDate).orWhereNull('estimate_date').andWhere({ user_id: userId })
        .orderBy('estimate_date')
    } else {
      return await knex('tasks').select('*').where({ user_id: userId }).orderBy('estimate_date')
    }
  }

  async getById(id, userId) {
    const task = await knex('tasks').where({ id, user_id: userId }).select('*').first()

    if (!task) {
      throw new ApiError(404, 'Esta tarefa não foi encontrada')
    }

    return task
  }

  async save({ description, estimateDate, notify }, userId) {
    const task = {
      id: uuid.v4(),
      description,
      estimate_date: estimateDate,
      notify,
      created_at: new Date(),
      user_id: userId,
    }

    return (await knex('tasks').insert(task, '*'))[0]
  }

  async update(taskId, { description, estimateDate, notify, doneDate }, userId) {
    const task = (await knex('tasks').where({ id: taskId, user_id: userId }).update({
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

  async delete(id, userId) {
    const task = (await knex('tasks').where({ id, user_id: userId }).del('*'))[0]

    if (!task) {
      throw new ApiError(404, 'Esta tarefa não foi encontrada')
    }

    return task
  }

  async markAsDone(taskId, userId) {
    const task = await this.getById(taskId, userId)
    const doneDate = task.done_date ? null : new Date()

    return (await knex('tasks').where({ id: taskId, user_id: userId }).update({ done_date: doneDate }, '*'))[0]
  }
}

module.exports = TaskService