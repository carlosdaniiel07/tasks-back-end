const knex = require('./../database/connection')
const uuid = require('uuid')

class TaskService {
  constructor() {

  }

  async getAll() {
    return await knex('tasks').select('*')
  }

  async getById(id) {
    return await knex('tasks').where({ id }).select('*').first()
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
    return (await knex('tasks').where({ id: taskId }).update({
      description,
      estimate_date: estimateDate,
      notify,
      done_date: doneDate
    }, '*'))[0]
  }

  async delete(id) {
    return (await knex('tasks').where({ id }).del('*'))[0]
  }
}

module.exports = TaskService